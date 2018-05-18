Below assumes you're using WebStorm on OS X.

## Shortcuts
`cmd + ,` - opens up WebStorm Preferences

## Main Areas of WebStorm I Use
WebStorm is overwhelming at first but if you can get over yourself on that, and learn some of the main parts that most devs will need at a very basic level you'll come to find that this IDE is amazing and kicks editors like Microsoft's VS Code in the ass in terms of productivity

If you're new just focus on a few things, listed below and don't worry about trying to learn everything in WebStorm.

I don't really tweak a ton in preferences, only stuff I absolutely need to for Node, JS, and colors.  Most of the defaults I just leave as is.  That's why I don't get overwhelmed by the options in this IDE.  The defaults have been just fine for me for the most part.

#### Areas I use
- fill this in later

## Performance
- One thing you should always do after installing WebStorm is go into the plugins section in WebStorm preferences and disabble anything you don't need.  This is a must.  It'll have a huge impact on performance if you do
- you can also increase memory by going to Help => Edit Custom VM Options and change the following (increase their values):
    - -Xms2048m
    - -Xmx2048m
- Sometimes, if you're doing something really intensive like editing a very long readme file, you might have to just close and re-open WebStorm to clear memory
- if your unit tests are slow, your problem is not webstorm, your problem is **your tests**.  I'm able to run 300 tests in just a couple seconds.  IF your tests are not well formed and just good tests, no editor or IDE is going to save you there

## My WebStorm Settings
you can import and try these out if you like

- [All of my settings](webstorm-settings-all-5-17-2018.jar)
- [custom live templates (code snippets)](webstorm-settings-custom-live-templates-5-17-2018.jar) - I've created a bunch for TDD here
- [color scheme I'm using](webstorm-settings-editor-theme-5-17-2018.jar)

    ![GitHub Logo](color-scheme-5-17-2018.png)

**Live Templates** location
- `user/Library/Preferences/WebStorm<version>/templates`
- this is where custom live templates you create are stored (always back these up!)
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
