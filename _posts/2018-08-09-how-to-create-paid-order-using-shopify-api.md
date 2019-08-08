---
title: How to Create Paid Order Using Shopify API
description: >-
  Creating an order using Shopify API with status set to 'paid' might be
  somewhat a tough and tricky task. Surprisingly, this is not a practical or a
  trivial issue. In fact, an ability to catch a payment outside of Shopify,
  using a custom payment gateway, can be really convenient.
slug: paid-order-shopify-api
layout: post
twitter-card: summary_large_image
date: '2018-09-24 12:30:25 +0200'
category: Ruby on Rails development
author: Piotrek Musielak
avatar: piotrek-musielak.jpg
image: paid-order-shopify-api.jpg
text-preview: >-
  Creating an order using Shopify API with status set to 'paid' might be
  somewhat a tough and tricky task. Surprisingly, this is not a practical or a
  trivial issue. In fact, an ability to catch a payment outside of Shopify,
  using a custom payment gateway, can be really convenient.
tags:
  - Ruby on Rails development
---
Creating an order using Shopify API with status set to 'paid' might be somewhat a tough and tricky task. Surprisingly, this is not a practical or a trivial issue. In fact, an ability to catch a payment outside of Shopify, using a custom payment gateway, can be really convenient.

### How to efficiently deal with this problem?

Before we start, I assume that your application has already added 'shopify_api' gem to your Gemfile and you have full project configuration set up. There is a lot of materials on how to prepare your project to query **Shopify API** using 'shopify_api' gem.

But, let’s get back to our 'Orders' issue….

In a basic payment flow, we would like to set an order to 'Paid' after payment was successfully processed. Unfortunately, changing this status via **API** will not be easy. However, a great solution to this problem is to create a 'Draft Order' first and, after a user has paid, we can transform it into our needed state.

#### app/services/shopify_draft_order_creator.rb

```ruby
order = ShopifyAPI::DraftOrder.new(line_items: variant_ids_array, customer: { id: shopify_customer_id })
order.save
```

This will result in new 'Draft Order' in your shopify admin panel.
Ok, but now we would like to convert this into paid an 'Order.' This is really simple:

#### app/jobs/complete_draft_order_job.rb

```ruby
draft_order = ShopifyAPI::DraftOrder.find(draft_order_id)
draft_order.tags = "user_id_#{user_id}"
draft_order.save
draft_order.complete
```

And that’s it! We have successfully created a new paid order using **Shopify API**. As you can see in the example, this code can be implemented into the job to have an ability to perform it in the background. Additionally, this piece of code also shows how to add tags, which will appear in future orders. So basically `draft_order.complete` might be enough for you to close the 'Draft Order.'

Let’s take a look at an example payments controller just to realize how a full payment action would look like with this implementation.

#### app/controllers/payments_controller.rb

```ruby
def create
  draft_order = create_draft_order
  if draft_order.present?
    if create_payment.present?
      CompleteDraftOrderJob.perform_later(draft_order_id, current_user)
      clear_cart_session
      flash[:notice] = "Payment success"
    else
      flash[:alert] = "Payment failure"
    end
  end
  redirect_to root_path
end
```

### This example shows how this logic might be used in real action.

Choosing this solution has **one additional advantage**. 

Every failure leaves a trace in the Shopify admin panel. It can be investigated by the shop administrator. He might not have any access to the application's errors or logs but he can check the abandoned Draft Orders. 

Additionally, we do not pollute our 'Orders' section with failed transactions, etc. Every failure ends up in Drafts what leaves our Order panel nice and clean.

But…

This solution might not fit every shop user needs. Remember, if you plan to use draft orders on your own and complete them manually then this might interfere with your current flow and will not work well for you. This solution is intended to be used in automated and predictable vendors which will use Shopify mostly as an admin panel.

Nevertheless, I hope you will find this small workaround interesting and also helpful.
