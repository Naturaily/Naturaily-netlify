---
title: >-
  First steps in a wide, vast app world. Android developer guidance on user
  experience and process thinking
description: >-
  How not to get lost with different screen resolutions, densities and device
  parameters? Take a look at our UX and process thinking guide in Android
  development.
slug: android-development-guide-user-experience-process-thinking
date: '2016-08-30 10:38:01 +0000'
category: Native mobile development
author: Kamil Buczel
avatar: kamil.jpg
image: first-steps.jpg
text-preview: >-
  Creating apps on Android seems like a pretty straightforward task. Just take
  working solutions and put them on mobile devices. On about 11 thousand
  devices, to be exact. With different resolutions, screen densities and
  parameters. So users of every age category can install it on a system that
  gets a new version every year. Well, yeah, let's talk about it...
tags:
  - Native mobile development
  - Java development
  - User experience design
---




Creating apps on Android seems like a pretty straightforward task. Just take working solutions and put them on mobile devices. On about 11 thousand devices, to be exact. With different resolutions, screen densities and parameters. So users of every age category can install it on a system that gets a new version every year. Well, yeah, let's talk about it...

Some of the things described below may seem obvious, but you would be really surprised to hear how many big players forget about them. If you are an app adventurer like myself, chances are you’ll run into one of these quirks along your journey. But if you are just a regular user, you may not be so lucky. Why? Because these apps have probably never soared above the mystical 500-1k downloads and got shamefully branded as “maybe it wasn’t such as good idea”, unless… when they actually were great apps... Only served in an exceptionally uninventive or, even worse, annoying way. So, for posterity, let’s have a look at examples of these little things that can compromise the success of your new brainchild, or make the app disappear, forgotten in the infinitude of Google Play Store. From there, we will continue our journey with a review of traps waiting for a developer in the android world.

## ALT - Annoying little things

Most developers tend to think of their apps as their own children. They want each of them to be great, well developed, innovative and... special. Unfortunately, in this narcissistic pursuit of innovation, we often forget about the most important thing in any application — usability.

Let’s think about it as something very expensive. Say, a large TV. One with the best 4K screen and sharpest colors money can buy. But change just one, tiny thing in it. Like the way remote control works — for example, changing programs takes a double tap. Believe me, the TV may look fancy, but that mall difference will doom it to landfill... Okay, maybe not literally, but surely it will not be a product that you would recommend to anyone, or be happy to use it yourself.

With mobile apps the situation is even worse. There are few things in the world which are easier than deleting an app (or turning it off and forgetting about it forever). But let’s cut to the chase, what is the “broken remote control” in the world of mobile development? I'll show you a few examples of possible solutions, and by them guide you through optimal process thinking.





### **a) Swiping a refresh list nested in tab layout.**

  Want to swipe left to change screen? No problem, but be careful not to move your finger slightly up or down, because it will cause refresh icon to appear and stop changing screens. It gets really annoying when such a simple thing as app navigation causes you trouble. So, how to solve it? Look at some code example:

  ```java
  private ViewPager viewPager;
  private ViewPager.OnPageChangeListener mOnPageChangeListener;

  mOnPageChangeListener = giftListUtils.setViewPagerConstrains(mSwipeRefreshLayout);
  viewPager.addOnPageChangeListener(mOnPageChangeListener);

  ViewPager.OnPageChangeListener	setViewPagerConstrains(final SwipeRefreshLayout mSwipeRefreshLayout) {

      return new ViewPager.OnPageChangeListener() {
          @Override
          public void onPageScrolled(int position, float v, int i1) {
          }

          @Override
          public void onPageSelected(int position) {
          }

          @Override
          public void onPageScrollStateChanged(int state) {
              if (mSwipeRefreshLayout != null) {
                  mSwipeRefreshLayout.setEnabled(state == ViewPager.SCROLL_STATE_IDLE);
              }
          }
      };
  }
  ```

  The best and easiest solution involves creating a listener checking for every started page swap. Inside it we declare constraints which disable (or enable if the user finished swipe) refreshing.

  That example seems pretty easy and straightforward, and what’s important, despite of it being non-intuitive, the functionality is fulfilled. Can you scroll the list and enter some of elements on it? Yes, you can. It’s difficult to detect if one focuses only on instrumental tests because for Espresso and ViewAction swipeRight() / swipeLeft() it doesn’t make a difference, these methods always move straight to one of the sides. Tricky, isn't it?

  So let's move to the next one.

### **b) “Aaargh where'd my window go?” - Few words about disappearing windows.***

  This mostly happens when we try to make our app more uniform, and instead of adding additional activities or wading in fragment swamp we decide to use custom alert dialogs. They can be made out of many editexts and selections (e.g. window responsible for changing password, registering). Closing them by accident by clicking the edge of screen doesn’t seem like a good idea. Thankfully it can be solved easily in two ways:


  1) By calling method ```.setCanceledOnTouchOutside(false)``` on ```AlertDialog```

  ```java
  AlertDialog.Builder builder = new AlertDialog.Builder(giftListActivity);
  ...
  AlertDialog dialog = builder.create();
  dialog.setCanceledOnTouchOutside(false);
  dialog.show()
  ```

  2) Or calling ```.setCancelable(false)``` on ```AlertDialog.Builder``` or ```AlertDialog``` itself.

  ```java
  AlertDialog.Builder builder = new AlertDialog.Builder(giftListActivity);

  builder.setCancelable(false);
  ```

  First one is obvious choice here, as we don’t want to take from user possibility to close window on pressing “back” button. But life is not so easy, and it's same old story device-system-dependency. Let’ say we tested this method and it just doesn’t work as it supposed too**. So we didn’t want to, but we had too. So moving to the next one.

### **c) Cannot close dialog window by pressing “back” button.**

  As mentioned before, setting cancelable to false doesn’t only turn offs closing dialog window by tapping outside of it but additionally disables back button. User trying to close pop-up dialog by intuitively clicking back on functional menu and seeing nothing happens will be kicked from automatic, no-brainer control stream, which makes an app intuitive.
  So, how to solve it? Obvious idea would be to use our previous solution we created for solving refresh/tabView problem. By adding listeners.

  ```java
  private AlertDialog currentDialog;

  Dialog.OnKeyListener keyListener = giftListUtils.generateKeyListener(currentDialog);
  currentEditDialog.setOnKeyListener(keyListener);

  DialogInterface.OnKeyListener generateKeyListener(final AlertDialog currentDialog) {
      return new Dialog.OnKeyListener() {
          @Override
          public boolean onKey(DialogInterface arg0, int keyCode, KeyEvent event) {
              if (keyCode == KeyEvent.KEYCODE_BACK) {
                  currentDialog.dismiss();
              }
              return true;
          }
      };
  }
  ```

  And it works like a charm… well, almost. Testing this solution on a Samsung device showed its one, big flajw. It blocks the operation of soft keyboard backspace button. And it does it in the  weirdest way possible, as holding it still performs clearing edittext. You can delete some characters (if they were added by user to ones put by setText) and some you can't. Implementing the above solution is acceptable only if you disregard all samsung devices completely (which is hard to imagine) or when you don’t have to use keyboard (so don't require any text from user).

  The main purpose of this example is to show how specific programming on mobile devices is and how much process thinking is needed in working on user experience. Solution that works perfectly on one problem, is just not working on another, sometime it does, sometimes it doesn't. It always depends on the device. On Honor and Nexus there were no problem, and backspace worked perfectly fine. Obvious solution for this is agile approach including differential devices base and test most of things through every change and iteration. There are a few problems with that approach, the more obvious one being money and time, and the less obvious being problem->solution->problem streams and ALTs.

  It just takes experience to solve the first one, but the second one... These things are really subtle and hard to grasp because they may be seen differently by you as developer, by a casual user who not really is using functional menu control (why bother when there are shiny buttons on the screen?), and by an advanced user.

  The only way to spot these quirks before they spoil your release day is user testing. The more thorough the better, because these things only become evident when actions in the app are done repeatedly. Sounds like a chore?
  It's analyzing trends on overdrive and adapting to them by being aware how much every innovative change can cost you.

  *You think that’s annoying?  Try to change screen orientation. Instead of "aaargh where'd my window go?" we get "aaarrghhh, my data!!". That could be could resolved with bundles, IcePick states etc. But you could make a whole post  "everything about alert dialogs", and yet purpouse of this one is showing that android is built on these small, annoying things that heavily depend on your project.

  ** Which it really did… On the one of devices (oldy LG) I got some weird mallufoctiong as described [here](http://stackoverflow.com/questions/13526690/why-setcanceledontouchoutsidefalse-doesnt-work-in-alert-builder/13567411#13567411).
  And was in a place where you stop and have to weigh what is more important to you, potential problems on samsung device, compatibility with one of LG devices or trying to make everyone happy. Long story short - you can’t make everyone happy.
