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
    - they are less noise because they're cleaner, easier to read, easy to test, and easy to maintain, and transpile to less code
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