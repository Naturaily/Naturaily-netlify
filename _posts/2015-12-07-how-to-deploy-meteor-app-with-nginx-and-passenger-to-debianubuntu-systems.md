---
title: How to deploy Meteor app with nginx and passenger to debian/ubuntu systems
description: >-
  Creating a web application is so easy. This simple Meteor.js tutorial shows
  how to deploy Meteor.js app with ngnix and passenger.
slug: meteor-app-ngnix-debian
date: '2015-12-07 10:38:01 +0000'
category: JavaScript development
author: Jacek Hiszpański
avatar: /assets/images/jacek.png
image: /assets/images/meteor2.jpg
text-preview: >-
  Meteor is getting more and more popular these days. Creating a web application
  is so easy. But what can we do if we want to push live our great project?
  Unfortunately, there are not too many deployment tools available (yet?). In
  this article I’m going to explain step by step how to release your Meteor
  application to debian/ubuntu system (apt-get command required).
tags:
  - Meteor js development
  - Node js development
---

Meteor is getting more and more popular these days. Creating a web application is so easy. But what can we do if we want to push live our great project? Unfortunately, there are not too many deployment tools available (yet?). In this article I’m going to explain step by step how to release your Meteor application to debian/ubuntu system (apt-get command required).

Before we start, please make sure you have:
* root access - we need to install some software (nginx, node and so on),
* standard user access named deploy - we will use this account to deploy app, we don’t want to use root account, because it’s a security risk,
* installed make and ```g++``` packages (```apt-get install make g++```)

Now we can start installing required software on our server.

Install nodejs
--------------

To install nodejs on debian/ubuntu we can use official repository. First, login as root and install curl - it’s required for nodejs installer:

```bash
    apt-get install -y curl
```

Now, add a repository for apt:

```bash
    curl --silent --location https://deb.nodesource.com/setup_0.12 | bash -
```

Run command to install nodejs:

```bash
    apt-get install -y nodejs
```

Install mongodb
---------------

Mongodb is not required for Meteor app, but it’s highly recommended - we need to store data somewhere, right?

First, let’s add repository for apt:

```bash
    apt-key adv --keyserver keyserver.ubuntu.com --recv 7F0CEB10

    echo "deb http://repo.mongodb.org/apt/debian wheezy/mongodb-org/3.0 main" > /etc/apt/sources.list.d/mongodb-org-3.0.list
```

Run command to install mongodb:

```bash
    apt-get update && apt-get install -y mongodb-org
```

Make sure that mongodb is running:

```bash
    /etc/init.d/mongod restart
```

Install nginx with passenger
----------------------------

Now the most important part. We need to install nginx web server. Standard debian/ubuntu apt repositories don’t contain passenger. That’s why we will use official passenger repository. To add repository for apt execute:

```bash
    apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 561F9B9CAC40B2F7
```

```bash
    apt-get install -y apt-transport-https ca-certificates
```

If you have debian ```jessie``` run:

```bash
    echo deb https://oss-binaries.phusionpassenger.com/apt/passenger jessie main > /etc/apt/sources.list.d/passenger.list
```

If you have ubuntu ```trusty``` run:

```bash
    echo deb https://oss-binaries.phusionpassenger.com/apt/passenger trusty main > /etc/apt/sources.list.d/passenger.list
```

Now we can install nginx with passenger support:

```bash
    apt-get update && apt-get install -y nginx-extras passenger
```

Configure nginx to start node/meteor application
------------------------------------------------

Next thing that we need to do is to tell nginx where the Meteor app main directory is. Also, we need to specify url and mongodb access. All services are already available on our machine so it should be easy. Create file ```/etc/nginx/sites-available/example.com``` and put this content:

```ruby
    server {
        listen *:80;
        # put your real domain here
        server_name example.com;

        # tell Nginx and Passenger where your app's 'public' directory is
        root /home/deploy/www/example/bundle/public;

        # turn on Passenger
        passenger_enabled on;
        # tell Passenger that your app is a Meteor app
        passenger_app_type node;
        passenger_startup_file main.js;

        # tell your app where MongoDB is
        passenger_env_var MONGO_URL mongodb://localhost:27017/example;
        # tell your app what its root URL is
        passenger_env_var ROOT_URL http://example.com;
    }
```

and that’s all. Copy this file to the available sites dir and make a symlink to enable the app:

```bash
    ln -s /etc/nginx/sites-available/example.com
    /etc/nginx/sites-enabled/example.com
```

Now we need to check if passenger configuration has been enabled in nginx.  Open a ```/etc/nginx/nginx.conf``` file and make sure that these two lines are not commented:

```nginx
    passenger_root /usr/lib/ruby/vendor_ruby/phusion_passenger/locations.ini;
    passenger_ruby /usr/bin/passenger_free_ruby;
```

restart nginx

```bash
    /etc/init.d/nginx restart
```

Build and upload Meteor app to the server
-----------------------------------------

Now we are ready to deploy the app. First we need to build the app. Go to your Meteor app dir on local machine and use this command:

```bash
    meteor build /tmp/
```

The compressed build should be available in /tmp directory. Before we upload the image, we need to prepare directories:

```bash
    ssh deploy@example.com "mkdir -p /home/deploy/www/example"
```

upload the image to the remote machine:

```bash
    scp /tmp/example.tar.gz deploy@example.com:/home/deploy/www/example
```

decompress the image:

```bash
    ssh deploy@example.com "cd /home/deploy/www/example && tar xfz example.tar.gz"
```

if we are deploying from MacOSX we need to remove bcrypt package. Then we can install needed packages and bcrypt:

```bash
    ssh deploy@example.com "
    rm -rf /home/deploy/www/example/bundle/programs/server/npm/npm-bcrypt
    cd /home/deploy/www/example/bundle/programs/server && npm install --production && npm install bcrypt
"
```

It will take a minute or two. Warnings can be ignored here.

Create public and tmp dirs because passenger requires them:

```terminal
    ssh deploy@example.com "mkdir -p /home/deploy/www/example/bundle/tmp /home/deploy/www/example/bundle/public"
```

Finally we are ready to restart the app:

```bash
    ssh deploy@example.com "cd /home/deploy/www/example && touch bundle/tmp/restart.txt"
```

Your Meteor application should be up and running now. Go to http://example.com to check it.

![welcome to meteor](/assets/images/meteor.png)

Make automation script for deployment
-------------------------------------

The deployment process is not complicated but it requires a few commands to execute. We don’t want to repeat them every time. To automate the whole deployment process, we can use simple bash script that will do all above things for us:

```bash
    #!/bin/bash

    NAME='example'
    USER='deploy'
    TARGZ_NAME="$NAME.tar.gz"
    DIR="/home/deploy/www/$NAME"

    if [ -z "$1" ]; then
      echo 'Usage: deploy HOSTNAME'
      exit 0
    else
      HOSTNAME=$1
    fi

    URL="http://$HOSTNAME"
    REMOTE="$USER@$HOSTNAME"

    meteor build /tmp/

    # if you also have mobile version add server option:
    # meteor build /tmp/ --server $URL

    ssh $REMOTE "mkdir -p $DIR"

    scp /tmp/$TARGZ_NAME $REMOTE:$DIR

    CMD="
    cd $DIR && tar xfz $TARGZ_NAME
    rm -rf $DIR/bundle/programs/server/npm/npm-bcrypt
    cd $DIR/bundle/programs/server && npm install --production && npm install bcrypt
    mkdir -p $DIR/bundle/tmp $DIR/bundle/public
    cd $DIR && touch bundle/tmp/restart.txt
    "

    ssh $REMOTE "$CMD"

```

Please verify that USER and NAME variables are correct. Then we can easily deploy it using single command:

```bash
    ./deploy.sh example.com
```

This script can be placed in your meter app in main directory. Also, It is highly recommended to upload your public ssh key for ```deploy``` user. Otherwise we will have to type password a few times.

That’s all. We can use this command every time we need to deploy new release.

Final thoughts
--------------

Deploying Meteor app with nginx and passenger is quite easy. The great thing is that we don’t have to worry about restarting node process after deployment or app crash. Passenger process will do it for us. Also, the bash script is not perfect, but it’s a good place to start. It would be great to display some progress messages and handle errors better. But this is something to be taken care of later.
