# Benefits of Using React
#### Simplicity
- beauty of React is that you **c*an split complicated UIs into tiny bite-sized, reusable, testable pieces***
    - allows you to think about, maintain, and test each piece in isolation
- ***Stateless Functional (Pure) components*** provide **many benefits**:
    - useful for presentational components that only focus on UI rather than behavior
    - they're efficient
        - Since there’s no state or lifecycle methods to worry about, the React team plans to avoid unnecessary checks and memory allocations in future releases
    - good practice is to add more functional components than classes
        - Functional components actually prevent you from having local state, thus forcing you to put state where it belongs (in a higher level container or elsewhere) or elsewhere in your app (e.g. Redux Store, or some other place)
            - they help force you to keep the component pure
    - they are less noise because they're cleaner, easier to read, easy to test, and easy to maintain (because they're simple), and transpile to less code
        - they don't require use of bind to give this context, you use the "props" param incoming to the method instead of "this.props" etc.
    - easy to test means:
        - What makes it simple is: no mocks necessary, no state manipulation to worry about, no special libraries, no state or lifecycle behavior to worry about, and no test harnesses needed
        - the tests are simple assertions: Given these values for props, I expect it to return this markup
        - the tests isolated and are fast
        - the tests are easy to maintain
        - the tests test very small pieces of behavior
    - When you use ES6 destructuring with your stateless components, the argument list clearly conveys your component’s dependencies, thus it’s easy to spot components that need attention
        - you can then either break up the component or rethink the data structures you’re passing
around
#### Flexiblility
- **lifecycle methods allow you to control what happens** when each **tiny section of your UI** *renders*, *updates*, decides whether to  *re-render,* and *disappears*

#### Efficient
- **React DOM compares the element and its children to the previous one**, and **only applies the DOM updates necessary to bring the DOM to the desired state**

# Pure Functions
#####  Rule #1: *always returns the same result if the same arguments are passed in*
- does not depend on any **state** or **data change** during a program’s execution
- It must **only depend on its input arguments**

##### Rule #2: does *not produce any observable side effects*
- such as network requests, input and output devices, or data mutation

    - Side effects include, but are not limited to:

        - Making a HTTP request
        - Mutating data
        - Printing to a screen or console
        - DOM Query/Manipulation
        - Math.random()
        - Getting the current time
- Note: Not all functions need to be, or should be, pure

##### Examples
**Pure**:
```
function priceAfterTax(productPrice) {
    return (productPrice * 0.20) + productPrice;
}
```
- It passes both rules
- It doesn’t depend on any external input
- If you run this function with the same input 100,000,000 times it **will always produce the same result**

**Impure**:

```
var tax = 20;
function calculateTax(productPrice) {
    return (productPrice * (tax/100)) + productPrice;
}
```
- depends on an external tax variable
- depends on outside variables
- It fails one of the requirements thus this function is impure

# Data Flow
- called a **“top-down”** or **“unidirectional”** data flow
- state is always owned by some specific component
    - any data or UI derived from that state can only affect components “below” them in the tree
    - imagine a component tree as a waterfall of props; each component’s state is like an additional water source that joins it at an arbitrary point but also flows down
- Neither parent nor child components can know if a certain component is stateful or stateless, and they shouldn’t care whether it is defined as a function or a class
    - This is why state is often called local or encapsulated. It is not accessible to any component other than the one that owns and sets it
- A component may choose to pass its state down as props to its child components

# Lifecycle
legacy (UNSAFE) - it still works but will be phased out when React v17 comes out

- methods (“hooks”) that allow you to
    - free up resources taken by the components when they are destroyed
    - special methods on a component class to run some code when a component mounts and unmounts


#### Constructor
- called before it is mounted

#### Mounting
These methods are called when an instance of a component is being created and inserted into the DOM:
- constructor
- static getDerivedStateFromProps
- componentWillMount (_legacy_)
- render
- componentDidMount

#### Updating
An update can be caused by changes to props or state. These methods are called when a component is being re-rendered:
- componentWillReceiveProps (_legacy_)
- static getDerivedStateFromProps (_legacy_)
- shouldComponentUpdate
- componentWillUpdate (_legacy_)
- render
- getSnapshotBeforeUpdate
- componentDidUpdate

#### Constructor
- called before it is mounted

#### Error Handling
This method is called when there is an error during rendering, in a lifecycle method, or in the constructor of any child component.
- componentDidCatch()


Entire List, in order of when they're called:
- componentWillMount (_legacy_)
- componentDidMount
- componentWillReceiveProps(nextProps) (_legacy_)
- shouldComponentUpdate(nextProps, nextState
- componentWillUpdate (_legacy_)
- getSnapshotBeforeUpdate
- componentDidUpdate
- componentWillUnmount
- componentDidCatch

### componentWillMount (_legacy_)
- invoked just before mounting occurs
    - component is going to appear on the screen very shortly
    - there is no component to play with yet
    - component is in default position at this point
- called before render()
- only lifecycle hook called on server rendering
- **Can call setState**: Don’t. Use default state instead

##### Use Cases
- it's a bit of a dud, you will barely use this method since your constructor and other lifecycle methods do most the work
- setup that can only be done at runtime
    - connecting to external API’s
        - e.g. if you use Firebase, you’ll need to get that set up as your app is first mounting
        - but...the key is that such configuration should be done at the highest level component of your app (the root component). That means 99% of your components should probably not use componentWillMount
- *Do **Not** Fetch Data Here*
    - An asynchronous call to fetch data will not return before the render happens. This means the component will render with empty data at least once

### componentDidMount
- invoked immediately after a component is mounted
- Your component is out there and appears on the screen (mounted), and ready to be used
    - now you can do all the fun things you couldn’t do when there was no component to play with
    - do all the setup you couldn’t do without a DOM
- initialization that requires DOM nodes should go here
Can call setState: Yes

###### Use Cases
- good place to instantiate the network request to get data
- draw on a <canvas> element that you just rendered
- initialize a masonry grid layout from a collection of elements
- add event listeners
- set up subscriptions

###### Examples

### componentWillReceiveProps (_legacy_)
- invoked before a mounted component receives new props
- Our component was doing just fine, when all of a sudden a stream of new props arrive to mess things up
    - Perhaps some data that was loaded in by a parent component’s componentDidMount finally arrived, and is being passed down
- Before our component does anything with the new props, componentWillReceiveProps is called, with the next props as the argument
-  we have access to both the next props (via nextProps), and our current props (via this.props)
- Here’s what you should do:
           1. check which props will change (big caveat with componentWillReceiveProps — sometimes it’s called when nothing has changed; React just wants to check in)
           1. If the props will change in a way that is significant, act on it

###### Use Cases
- If you need to update the state in response to prop changes (for example, to reset it)
    - compare this.props and nextProps and perform state transitions using this.setState()

###### Examples

Generic Example
```
componentWillReceiveProps(nextProps) {
    if (parseInt(nextProps.modelId, 10) !== parseInt(this.props.modelId, 10)) {
        this.setState({ postsLoaded: false })
        this.contentLoaded = 0
    }
}
```
*Canvas Example*
-  we have a canvas element
-  we’re drawing a nice circle graphic based on this.props.percent
-  whenever we receive new props, IF the percent has changed, we want to redraw the grid
```
componentWillReceiveProps(nextProps) {
    if (this.props.percent !== nextProps.percent)
        this.setUpCircle(nextProps.percent)
    }
}
```