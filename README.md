[![Netlify Status](https://api.netlify.com/api/v1/badges/b9658706-fb31-461c-87e5-6cb5683e398f/deploy-status)](https://app.netlify.com/sites/natu/deploys)

# Project setup
1. Make sure you have Ruby installed (comes with macOS). To check it, type `ruby -v`. You need version at least 2.4.0.
2. Make sure you have jekyll installed. Run `gem install jekyll bundler`.
3. Make sure you have netlify dev installed. Run `npm install netlify-cli -g`.

# How to run
Project can be started by `netlify dev` (port 8888).
If you have problems with build slowing down try `bundle exec jekyll clean`
In case there are errors, follow instructions in console and install remaining packages.

If you want to enable hot reload and increase build speed run project with `bundle exec jekyll serve -l --config _config_dev.yml` (port 4000).
Warning: It'll disable unnecessary plugins for development and posts and jobs collections will be excluded. You can compare changes in `_config_dev.yml` file.

For more info go to [jekyll documentation](https://jekyllrb.com/docs/)

# Flow
This project utilizes netlify, a platform allowing us to streamline deployment process and jekyll, static site generator (see [documentation](https://jekyllrb.com/docs/))

In order to make changes, create new branch from master (start its name with your initials) and put your code inside. Once your work is done, deploy branch to remote and create merge request. Code builds automatically and sits on `https://deploy-preview-<your branch number>--natu.netlify.com/`. You will be informed on Slack channel when build is done.

To merge feature branch, create pull request on github and wait for code review. After your code is accepted, master will be automatically rebuilt, just as feature branches are.

# Icomoon manual
When we add new icon, we try doing it through icomoon. These are steppes one needs to take in order to add it correctly:
1. Go to [icomoon site](https://icomoon.io/) and click IcoMooon App button.
2. Click Import Icons button and find selection.json in assets folder. Import that.
3. Click Import Icons and import the icon you want to add.
4. Select new icon (appears at the top in Untitled Set) so it has orange border and click Generate Font button at the bottom of the page. It downloads `icomoon-v1.0.zip` file.
5. With selected icon, click Generate SVG & More button at the bottom of the page. It downloads `icomoon.zip` file.
6. On the same page, find the newly added icon, hover over it and click Get Code button that shows up.
7. From popup that opens, copy HTML part and Symbol Definitions(s) part. Copy them to `public/icomoon/demo.html` file. Symbols go to the middle section of that file and svg code at the bottom.
8. From `icomoon-v1.0.zip` extract .json file and copy it into asset file. Do the same with every file inside fonts folder.
9. Open `style.css` (still in `icomoon-v1.0`), find `.icon-<new icon name>:before` and copy it into `custom-icons.scss` file.
10. Open `icomoon.zip`, go to SVG folder and copy its content to public/icomoon/SVG.
11. To check if everything worked fine, go to `localhost:<your local port>/public/icomoon/demo.html` and see if you can see your new icon there.
12. To add an icon to the project, simply create span element with `class="icon icon-<new icon name>` and it should be available for use.
