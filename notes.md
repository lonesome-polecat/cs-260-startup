# CS 260 Notes

### Assignment 1 - Git and GitHub

I learned that merging conflicts is tricky business. I had to reset to an earlier commit because I messed things up too much. That is, however, the true beauty of Git. After doing so, I managed to merge my changes.
I learned a bit of markdown for this assignment. I plan to have good looking .md files, particularly for the README.

### Assignment 2 - Startup Specification

I used Google Slides to create a mock layout of my website and, contrary to my initial fears, it was relatively quick. I was able to come up with a basic layout with basic styling in an hour for 4 different tabs.
Also, I just learned in class that I need to call a third-party server/API.

I may want to add customized settings for the user, like emailing a copy of the order receipt or a ready-for-pickup notification.
Also, perhaps choosing pickup times (which would be challenging but impressive) and use WebSocket to update taken and available times.

For my API I will use **Pexels** and display a new image of Arizona everyday on the website.

### Assignment 3 - AWS Services

**Public IP address:** 54.144.126.138

**Website URL:** https://arizonuts.click

### HTML

I learned about how to use the `target` attribute in a link tag to specify how the link should open (i.e. in a new tab, in the current tab, etc.)

I learned that injecting different html into an html page (say like new content for each tab) is very difficult and requires a lot of JavaScript,
so we will just wait on that until React can make that easy for us.

I actually learned this from CS 235, but functions are called methods when they are members of a class

Web Service (API): Disify does email address validation which seems pretty useful. Might incorporate that.


### CSS

Within stylesheet, @tags can make it more dynamic. Use @font-face to bring in fonts to use, @import for external css (also used for fonts)

Animation example: 
p {
  animation: <name-of-animation> <duration #s>;
}

@keyframes <name-of-animation> {
  from {  // start
    font-size: 0vh;
  }
  95% {
    font-size: 20vh;
  }
  to {  // end
    font-size: 10vh;
  }
}

### HTML deliverable

Note: I have no idea what to use the footer for. The instructions say to use it, but I don't have any uses for it yet.

### CSS deliverable

Boostrapping looks very handy. Remember to download their stylesheets in case their servers ever go down.