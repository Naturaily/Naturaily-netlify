[![Netlify Status](https://api.netlify.com/api/v1/badges/b9658706-fb31-461c-87e5-6cb5683e398f/deploy-status)](https://app.netlify.com/sites/natu/deploys)

# Project setup
1. Make sure you have Ruby installed (comes with macOS). To check it, type `ruby -v`. You need version at least 2.4.0.
2. Make sure you have jekyll installed. Run `gem install jekyll bundler`.
3. Make sure you have netlify dev installed. Run `npm install netlify-cli -g`.

# How to run
Project can be started by `netlify dev` command.
In case there are errors, follow instructions in console and install remaining packages.

# Flow
This project utilizes netlify, a platform allowing us to streamline deployment process and jekyll, static site generator (see [documentation](https://jekyllrb.com/docs/))

In order to make changes, create new branch from master (start its name with your initials) and put your code inside. Once your work is done, deploy branch to remote and create merge request. Code builds automatically and sits on `https://deploy-preview-<your branch number>--natu.netlify.com/`. You will be informed on Slack channel when build is done.

To merge feature branch, create pull request on github and wait for code review. After your code is accepted, master will be automatically rebuilt, just as feature branches are.