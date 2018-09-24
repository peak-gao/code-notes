Below assumes you're using WebStorm on OS X.

Below works for IntelliJ as well.

## Shortcuts
`cmd + ,` - opens up WebStorm Preferences

## Configuring Test GUI
### mocha options
You can specify mocha options when you setup a test configuration with mocha.  Here are a few I use:

- -w --compilers js:babel-core/register
- [Image of an espresso machine with UI](https://github.com/WeDoTDD/code-notes/images/mocha-setup-minimal.png)


#### Images of Setup


## Test Scripts (for running tests at command-line instead of GUI)

## Main Areas of WebStorm I Use
WebStorm is overwhelming at first but if you can get over yourself on that, and learn some of the main parts that most devs will need at a very basic level you'll come to find that this IDE is amazing and kicks editors like Microsoft's VS Code in the ass in terms of productivity

If you're new just focus on a few things, listed below and don't worry about trying to learn everything in WebStorm.

I don't really tweak a ton in preferences, only stuff I absolutely need to for Node, JS, and colors.  Most of the defaults I just leave as is.  That's why I don't get overwhelmed by the options in this IDE.  The defaults have been just fine for me for the most part.

I focus more on getting good at the command-line with commands, I focus on adding and finding those plugins in WebStorm preferences that help in terms of what code I work in.  So I'll spend time adding plugins that benefit me in the Plugins section of WebStorm preferences.  I also spend time adding Definitely Typed libraries to help improve the already awesome intellisense. I focus more on setting up test infrastructure, using the WebStorm test runner as opposed to running them in the console.

#### Areas I use
- fill this in later

## Performance
One of the main complaints I hear from devs is that WebStorm is slow.  That's because they don't take the time to get comfortable with WebStorm, they get impatient and jump ship to VSCode but honestly, they're missing out on a ton WebStorm can do that will blow your mind and really help you that VSCode just can't.

### It's not slow if you do the following below, at least try these:

- **disable plugins you don't need.  This is a must.**  I have no idea why WebStorm defaults to installing a shitload of stuff you might not need but they do. It'll have a huge impact on performance if you go through and uncheck plugins you don't need.  Go to **Preferences** => **Plugins** section and start unchecking boxes for those things you won't use
- You can also **increase memory allocation**

    go to **Help** => **Edit Custom VM Options** and change the following (increase their values. Max is 2048):
    - `-Xms2048m`
    - `-Xmx2048m`
- Sometimes, if you're doing something really intensive like editing a very long readme file, you might have to just **close and re-open WebStorm to clear memory**
- **if your unit tests are slow**, your **problem is not WebStorm**, your problem is **your tests**...they suck.  I'm able to run 300 tests in just a couple seconds.  IFf your tests are not well formed and just good tests, no editor or IDE is going to save you there.  So start practicing and improving and learning how to write better tests

## My WebStorm Settings
you can import and try these out if you like

- [All of my settings](webstorm-settings-all-5-17-2018.jar)
- [custom live templates (code snippets)](webstorm-settings-custom-live-templates-5-17-2018.jar) - I've created a bunch for TDD here (_code snippets I create are based on mocha, chai, and enzyme_)
- [color scheme I'm using](webstorm-settings-editor-theme-5-17-2018.jar)

    ![GitHub Logo](color-scheme-5-17-2018.png)

**Live Templates** (AKA Code Snippets) location
- `user/Library/Preferences/WebStorm<version>/templates`
- this is where custom live templates you create are stored (_always back these up!!!_)
## Plugins I Use
- [js-graphql-intellij-plugin](https://github.com/jimkyndemeyer/js-graphql-intellij-plugin)
- [Markdown Navigator](http://vladsch.com/product/markdown-navigator) - a must have, makes working with md file markdown a joy

    **Languages & Frameworks => JavaScript => Libraries**
    - mocha-DefinitelyTyped
    - chai-DefinitelyTyped
    - es6-collections-DefinitelyTyped
    - gulp-DefinitelyTyped
    - jsdom-DefinitelyTyped
    - enzyme-DefinitelyTyped
    - lodash-DefinitelyTyped
    - sinon-DefinitelyTyped
    - react-DefinitelyTyped
    - node-DefinitelyTyped
    - html-DefinitelyTyped


# How To
(bunch of screencasts I've created)
- [Set up Wallaby.js](https://www.youtube.com/watch?v=F8Ar7HDcnOM)
- [Set up a Custom Keymap to run an npm script in WebStorm](https://www.youtube.com/watch?v=nP9qTpjIlMc)
- [My WebStorm IDE Color and Settings Setup - Part 1](https://www.youtube.com/watch?v=QQHxWtFKgjk)
- [My WebStorm IDE Color and Settings Setup - Part 2](https://www.youtube.com/watch?v=-1_rgAGJseQ)
- [The Ultimate Guide to Webstorm / IntelliJ - Part 1 - Colors](https://www.youtube.com/watch?v=7tg9jGDUFQU)
- [The Ultimate Guide to WebStorm / IntelliJ - Part 2 - Live Templates](https://www.youtube.com/watch?v=97pNB6DBfEs)
- [Run Mocha Tests from Command-line or Webstorm Test Runner](https://www.youtube.com/watch?v=WpouIuSwiik)
