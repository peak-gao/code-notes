# Craftsmanship / Professionalism / Agile / XP / Clean Code
- [Developers Should Abandon Agile](https://ronjeffries.com/articles/018-01ff/abandon-1/) - *Ron Jeffries*
- [Speed Kills](https://sites.google.com/site/unclebobconsultingllc/speed-kills) - *Bob Martin*
- [Bob Martin SOLID Principles of Object Oriented and Agile Design](https://www.youtube.com/watch?v=TMuno5RZNeE&t=2180s)
    - [“Uncle Bob” Martin Speaks at Yale SOM](https://som.yale.edu/news/2014/09/uncle-bob-martin-speaks-yale-som)

      <a href="https://www.youtube.com/watch?v=TMuno5RZNeE&t=2180s" target="blank"><img src="images/solid-yale.png" width="200" height="112" title="SOLID Principles of Object Oriented and Agile Design"></a>

- [Clean Architecture](https://8thlight.com/blog/uncle-bob/2012/08/13/the-clean-architecture.html)

    <a href="https://8thlight.com/blog/uncle-bob/2012/08/13/the-clean-architecture.html" target="blank"><img src="images/clean-architecture.jpg" width="160" height="118" title="Land That Scrum Forgot Keynote"></a>

- [Robert C. Martin - The Land that Scrum Forgot](https://www.youtube.com/watch?v=hG4LH6P8Syk)

     <a href="https://www.youtube.com/watch?v=hG4LH6P8Syk" target="blank"><img src="images/land-that-scrum-forgot.png" width="200" height="113" title="The Land That Scrum Forgot Keynote"></a>

    Scrum is the most popular of all the Agile methods. Tens of thousands of people have been certified as Scrum Masters. Thousands of projects have use Scrum to get great work done. But there's a problem. Some of those projects fail, and fail badly. The reason they fail is that Scrum forgot something. Scrum forgot to incorporate the technical disciplines that make Agile work
- [Flaccid Scrum](https://martinfowler.com/bliki/FlaccidScrum.html) *Martin Fowler*
- [Flaccid Agile?](https://medium.com/@marko.bjelac/flaccid-agile-308be2982174) *Marko Bjelac*

# TDD & General Testing

## **[Who is doing TDD?  Find a List here](http://www.wedotdd.com)**

### Posts
- [How TDD Affects My Designs](https://blog.thecodewhisperer.com/permalink/how-tdd-affects-my-designs) - *J. B. Rainsberger*
- [Unit testing and TDD misconceptions](https://www.linkedin.com/pulse/unit-testing-tdd-misconceptions-marko-bjelac) - *Marko Bjelac*

     <a href="https://www.linkedin.com/pulse/unit-testing-tdd-misconceptions-marko-bjelac" target="blank"><img src="images/tdd-misconceptions.png" width="200" height="107" title="Unit testing and TDD misconceptions"></a>

- [Moving Parts](http://bit.ly/parts-moving) *Chris Holland*

    <a href="http://bit.ly/parts-moving" target="blank"><img src="images/tdd-moving-parts.png" width="170" height="114" title="Moving Parts"></a>

### Videos
- [Integrated Tests Are A Scam HD](https://www.youtube.com/watch?v=VDfX44fZoMc) - *J.B. Rainsberger*

     <a href="https://www.youtube.com/watch?v=VDfX44fZoMc" target="blank"><img src="images/integration-tests-are-a-scam.png" width="200" height="111" title="Integrated Tests Are A Scam HD"></a>


- [TDD, where did it all go wrong](https://vimeo.com/68375232) - *Ian Cooper*

     <a href="https://vimeo.com/68375232" target="blank"><img src="images/tdd-where-did-it-all-go-wrong.png" width="200" height="111" title="TDD, where did it all go wrong"></a>
     - Ian talks about the anti TDD patterns discovered over the years.  Very good talk.

- [What Should QA Do?](https://vimeo.com/102329098) - *Eric Smith*

     <a href="https://vimeo.com/102329098" target="blank"><img src="images/what-should-qa-do.png" width="200" height="111" title="What Should QA Do?"></a>

### TDD as if you mean it
**Preface**: [TDD as if you mean it](https://gojko.net/2009/02/27/thought-provoking-tdd-exercise-at-the-software-craftsmanship-conference/) was invented by a guy named [Keith Braithwaite](http://peripateticaxiom.blogspot.com/) in London during the Software Craftsmanship Conference 2009.  His idea is that you can write code with TDD in a way that forces you to make very small steps.  This means you need to respect the following rules:
1. write exactly ONE failing test
2. make the test from (1) pass by first writing implementation code IN THE TEST
3. create a new implementation method/function by:
    - doing extract method on implementation code created as per (2), or
    - moving implementation code as per (2) into an existing implementation method
4. only ever create new methods IN THE TEST CLASS
5. only ever create implementation classes to provide a destination for extracting a method created as per (4)
6. populate implementation classes by doing move method from a test class into them
7. refactor as required
8. go to (1)

- [TDD as if you You Mean It - @ Groupon Greekfest](https://vimeo.com/68375232) - *Chris Powers*

     <a href="https://vimeo.com/68375232" target="blank"><img src="images/tdd-like-you-mean-it.png" width="200" height="112" title="TDD as if you You Mean It - Chris Powers"></a>

- [TDD as if you You Mean It - Classical TDD Series](https://vimeo.com/68375232) - *Adi Bolboaca*

     <a href="https://www.youtube.com/watch?v=zXLG0nE3Upg" target="blank"><img src="images/tdd-as-if-you-mean-it.png" width="200" height="112" title="TDD as if you You Mean It - Classical TDD Series - Adi Bolboaca"></a>

    - [Tdd as if you Meant It: Episode 1 --- Think - Red - Green - Refactor](https://www.youtube.com/watch?v=zXLG0nE3Upg)
    - [Tdd as if you Meant It: Episode 2 --- I care about behavior, not about representation](https://www.youtube.com/watch?v=fLaJOhACcWE)
    - [Tdd as if you Meant It: Episode 3 --- Refactor Primitives to Concepts](https://www.youtube.com/watch?v=YqN11lKUaqo)
    - [Tdd as if you Meant It: Episode 4 --- Refactor to a new class](https://www.youtube.com/watch?v=7t05MD43IHA)
    - [Tdd as if you Meant It: Episode 5 --- Refactoring to Builder](https://www.youtube.com/watch?v=2XJAQ-hISq0)
    - [Tdd as if you Meant It: Episode 6 --- Some Traditional TDD - part 1](https://www.youtube.com/watch?v=Z-a42TemsC4)
    - [Tdd as if you Meant It: Episode 7 --- Some Traditional TDD - part 2](https://www.youtube.com/watch?v=Lq9QnOa6yLc)
    - [Tdd as if you Meant It: Episode 8 --- Create Duplication in order to remove it](https://www.youtube.com/watch?v=w7lWE6ne5qE)
    - [Tdd as if you Meant It: Episode 9 --- Experiment Design Alternatives when Stuck](https://www.youtube.com/watch?v=dSkbXMvgghc)
    - [Tdd as if you Meant It: Episode 10 --- Add Missing Tests for Untested Branches](https://www.youtube.com/watch?v=eCEKX2w-xYs)
    - [Tdd as if you Meant It: Episode 11 --- Refactor and Clean-Up](https://www.youtube.com/watch?v=tgEmOeQUZEE&t=8s)
    - [Tdd as if you Meant It: Episode 12 --- Separate Production from Test Code](https://www.youtube.com/watch?v=bWJniwQcu0U)
    - [Tdd as if you Meant It: Episode 13 --- Clean-up before next Triangulation](https://www.youtube.com/watch?v=3-ofl9RpwKc)
    - [Tdd as if you Meant It: Episode 14 --- Refactor, but in Small Steps Now](https://www.youtube.com/watch?v=OUgaPtf497I)
    - [Tdd as if you Meant It: Episode 15 --- Remote Live Coding with Grenoble](https://www.youtube.com/watch?v=At6XtCXaf3Q)


### Katas / Examples
- [Outside In TDD part I](https://www.youtube.com/watch?v=XHnuMjah6ps) - *Sandro Mancusco*

     <a href="https://www.youtube.com/watch?v=XHnuMjah6ps" target="blank"><img src="images/sandro-outside-in-tdd.png" width="200" height="111" title="Outside In TDD part I"></a>

- [Testing and Refactoring Legacy Code](https://www.youtube.com/watch?v=_NnElPO5BU0) - *Sandro Mancusco*

    <a href="https://www.youtube.com/watch?v=_NnElPO5BU0" target="blank"><img src="images/sandro-refactoring-kata-tdd.png" width="200" height="115" title="Testing and Refactoring Legacy Code"></a>
    - Sandro shows us amazing techniques to refactor messy code

### Twitch
- [WeDoTDD's TDD Stream](https://www.twitch.tv/wedotdd)

    <a href="https://www.twitch.tv/wedotdd" target="blank"><img src="images/we-do-tdd-twitch.png" width="200" height="112" title="WeDoTDD's TDD Twitch Stream"></a>

    - also check out [WeDoTDD.com](WeDoTDD.com)

- [Joe Bew's TDD Stream](https://www.twitch.tv/joebew42) <span style="font-size: 10">*[about Joe](https://joebew42.github.io/twitch/about/)*</a>

    <a href="https://www.twitch.tv/joebew42" target="blank"><img src="images/joe-twitch.png" width="200" height="113" title="Joe Bew's TDD Stream"></a>

- [Coding it Wrong's TDD Stream](https://www.twitch.tv/videos/295562825)

    <a href="ttps://www.twitch.tv/videos/295562825" target="blank"><img src="images/coding-it-wrong.png" width="200" height="113" title="Coding it Wrong's TDD Stream - React Native"></a>
### YouTube

- [8th Light](https://www.youtube.com/channel/UClJNsSHF9yR-MU4v-VosZ1A/videos)
- [Sandro Mancusco](https://www.youtube.com/user/sandromancuso/videos)
- [Adi Bolboaca](https://www.youtube.com/channel/UC7H7P2tu2i3Wnz-ZBdnO13Q)
- [Clean Coders](https://www.youtube.com/user/cleancoders/videos)
- [Chris Holland](https://www.youtube.com/channel/UCtGq0kpqgpc83ShN_rZQFbA) <span style="font-size: 10">*[about Chris](https://twitter.com/chrisholland)*</a>
- [Roy Osherove 1](https://www.youtube.com/channel/UCM9Jz0z1IXlgGy_CY3wGRWA)
- [Roy Osherove 2](https://www.youtube.com/channel/UCuDFkDK8Y_CQFV2zPHfhWIQ?pbjreload=10)
- [Codurance](https://www.youtube.com/channel/UCacyhBPMQpC4Vi-WqtrRpBw)

# JavaScript
### Posts
### Videos
- [Philip Roberts: What the heck is the event loop anyway?](https://www.youtube.com/watch?v=8aGhZQkoFbQ)

    <img src="images/what-is-the-js-even-loop.png" width="200" height="113" title="Land That Scrum Forgot Keynote">
- [JavaScript is Too Convenient](https://vimeo.com/267418198?activityReferer=1) -  SCNA - *Sam Jones*

    <a href="https://vimeo.com/267418198?activityReferer=1" target="blank"><img src="images/javascript-too-convenient.png" width="200" height="112" title="JavaScript is Too Convenient"></a>

### General JS Learning
- [Fun Fun Function](https://www.youtube.com/channel/UCO1cgjhGzsSYb1rsB4bFe4Q) -  an awesome JS YouTube channel
- [You-Dont-Know-JS](https://github.com/getify/You-Dont-Know-JS) - The defacto JS  book - Forget JavaScript the Good parts, this is far better
# GitHub
- [Markdown - Basic writing and formatting syntax](https://help.github.com/articles/basic-writing-and-formatting-syntax/)


