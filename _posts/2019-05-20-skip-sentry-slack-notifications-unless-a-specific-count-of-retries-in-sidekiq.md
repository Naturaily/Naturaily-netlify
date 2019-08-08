---
title: >-
  How to skip Sentry Slack notifications until a specific count of retries in
  Sidekiq
description: >-
  Filter out Slack alerts Sentry messages from Sidekiq jobs using Sidekiq
  middleware in custom Shopify integrations.
slug: sidekiq-skip-sentry-slack-notifications
layout: post
twitter-card: >-
  New blog post: How to skip Sentry Slack notifications until a specific count
  of retries in Sidekiq
date: '2019-05-20 09:36:13 +0200'
category: Ruby on Rails development
author: Arek Poczobut
avatar: arek.jpg
image: how-to-skip-sentry-slack-notifications-until-a-specific-count-of-retries-in-sidekiq.jpg
text-preview: >-
  We’ve been working on integrations of many different warehouse systems with
  the Shopify platform. All data exchange between them utilizes Sidekiq workers’
  background jobs. Generally, we want to be notified about the first occurrence
  of an error. So most exceptions are caught by Raven and sent to Sentry.
tags:
  - Ruby on Rails development
---
We’ve been working on integrations of many different warehouse systems with the Shopify platform. All data exchange between them utilizes Sidekiq workers’ background jobs. Generally, we want to be notified about the first occurrence of an error. So most exceptions are caught by Raven and sent to Sentry. However, we faced some exceptions at remote systems, for example, connection issues. Luckily, after some worker retries the problems were solved without any additional actions. In such cases we wanted Sidekiq workers to have silent retries without spamming our Slack channel with Sentry messages.

The bad news is that Sidekiq doesn’t offer access to retry_count param from a worker. Fortunately, Sidekiq offers us developers [middleware](https://github.com/mperham/sidekiq/wiki/Middleware#server-middleware) that allows us to add a functionality which has access to job attributes including `retry_count`. Raven allows to specify in [config](https://docs.sentry.io/clients/ruby/config/) `should_capture` where we will add `Proc`, where we exclude custom error `Sidekiq::SilentRetryError`.

Let’s start with registering our retry middleware.

```ruby
Sidekiq.configure_server do |config|
  config.server_middleware do |chain|
    chain.add Middleware::Sidekiq::RetryMonitoring
  end
end
```

We want to delay some specific network/api errors, so let’s define an array that contains some of them.

```ruby
SILENT_RETRY_ERRORS = [
  EOFError, Errno::ECONNRESET, Errno::EINVAL, Errno::ECONNREFUSED,
  Net::HTTPBadResponse, Net::HTTPHeaderSyntaxError, Net::ProtocolError,
  Net::SSH::Exception, Timeout::Error, SocketError,
  ActiveResource::ServerError, ActiveResource::TimeoutError
]
```

In the next step we define a module which we include in our worker. This module will help us identify monitored worker and also allow us to  define `retry_count _for_sentry` there.

```ruby
module Middleware::Sidekiq::RetryMonitoring::MonitoredWorker
  extend ActiveSupport::Concern

  included do
    def retry_count_for_sentry
      10
    end
  end
end
```

Our custom error class:

```ruby
module Sidekiq
  class SilentRetryError < StandardError; end
end
```

In our middleware, we rescue errors for which we want to delay Sentry notifications. If worker’s `retry_count` is lower than our `retry_count_for_sentry` then we have to replace the original exception with a custom one and raise `Sidekiq::SilentRetryError` – otherwise we would have to reraise the original one. Without that, Sidekiq treats the job as completed.

```ruby
class Middleware::Sidekiq::RetryMonitoring
  def call(worker, job, queue)
    begin
      yield
    rescue *SILENT_RETRY_ERRORS => e
      if silent_error?(worker, job)
        raise Sidekiq::SilentRetryError.new([e.class, e.message].join(" "))
      else
        raise
      end
    end
  end

  private

  def silent_error?(worker, job)
   retry_count = job["retry_count"].present? ? job["retry_count"].to_i + 1 : 0
   worker.is_a?(Middleware::Sidekiq::RetryMonitoring::MonitoredWorker) &&
        retry_count < worker.threshold_retry_count_for_sentry
  end
end
```

The last thing to do is to define `should_capture` for  Raven. We can define `Proc` which checks if the exception contains `Sidekiq::SilentRetryError`.

```ruby
Raven.configure do |config|
  config.should_capture = Proc.new do |e|
    e.to_s.exclude?("Sidekiq::SilentRetryError".freeze)
  end
end
```

## Summary

Sentry will be notified after ninth retry of some errors. We wanted to avoid overflooding Sentry/Slack with notifications. Some jobs after some retries are successful and there’s no need to get notifications from the very beginning.
