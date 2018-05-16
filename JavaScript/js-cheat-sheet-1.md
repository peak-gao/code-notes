# js-cheat-sheet-1


## this & contexts
- bind(), call(), and apply() attaches _this_ into function

### bind()
`function.bind(thisArg[, arg1[, arg2[, ...]]])`
- creates a new function that, when called, has its this keyword set to the provided value, with a given sequence of arguments preceding any provided when the new function is called
- it's also independent of how the function is called
    - context still stays set to what you first bound it with no matter how anyone calls the func

    **Use Cases**
    - Use .bind() when you want that function to later be called with a certain context
        - this way you **can maintain context in async callbacks and events**

    **Examples**

    1:
    ```
    var module = {
      x: 42,
      getX: function() {
        return this.x;
      }
    }

    var unboundGetX = module.getX;
    console.log(unboundGetX()); // The function gets invoked at the global scope
    // output: undefined

    var boundGetX = unboundGetX.bind(module);
    console.log(boundGetX());
    // output: 42
    ```
    2:
    ```
    function MyObject(element) {
        this.elm = element;
        element.addEventListener('click', this.onClick.bind(this), false);
    };

    MyObject.prototype.onClick = function(e) {
         var t=this;  //do something with [t]...
        // without bind the context of this function wouldn't be a MyObject
        // instance as you would normally expect.
    };
    ```


### call()
`function.call(thisArg, arg1, arg2, ...)`
- calls a function with a given this value and arguments provided **individually** (list of args)

    **Use Cases**
    - when you want to invoke the function immediately, and modify the context

### apply()
`function.apply(thisArg, [argsArray])`
- calls a function with a given this value, and arguments provided **as an array** (or an **array-like object**)

    **Use Cases**
    - when you want to invoke the function immediately, and modify the context

## Common JS Utilities
### String
[split()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split)
- splits a String object into an array of strings
    - _return value_: An Array of strings split at each point where the separator occurs in the given string
    ```
    stringToSplit.split(separator)
    // separators: ' ', ',', etc.
    ```
    using it to reverse a string:
    ```
    var str = 'asdfghjkl';
    var strReverse = str.split('').reverse().join('');  // 'lkjhgfdsa'
    // split() returns an array on which reverse() and join() can be applied
    ```
### Array
[indexOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)
- returns the first index at which a given element can be found in the array, or -1 if it is not present
    ```
    var beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];
    console.log(beasts.indexOf('bison'));
    // output: 1
    ```
[findIndex()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)
- returns the index of the first element in the array that satisfies the provided testing function
    ```
    var array1 = [5, 12, 8, 130, 44];

    function findFirstLargeNumber(element) {
      return element > 13;
    }

    console.log(array1.findIndex(findFirstLargeNumber));
    // expected output: 3
    ```

[keys](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/keys)
- returns a new Array Iterator object that contains the keys for each index in the array
    ```
    var array1 = ['a', 'b', 'c'];
    var iterator = array1.keys();

    for (let key of iterator) {
      console.log(key); // expected output: 0 1 2
    }
    ```
[values()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/values)
- returns a new Array Iterator object that contains the values for each index in the array
    ```
    const array1 = ['a', 'b', 'c'];
    const iterator = array1.values();

    for (const value of iterator) {
      console.log(value);   // expected output: "a" "b" "c"
    }
    ```
[entries()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/entries)
- returns a new Array Iterator object that contains the key/value pairs for each index in the array
    ```
    var array1 = ['a', 'b', 'c'];

    var iterator1 = array1.entries();

    console.log(iterator1.next().value);
    // output: Array [0, "a"]
    ```
[of()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/of)
- creates a new Array instance with a variable number of arguments, regardless of number or type of the arguments
    ```
    Array.of(7);  // [7]
    Array.of(1, 2, 3);  // [1, 2, 3]
    ```
[splice()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)
- changes the contents of an array by removing existing elements and/or adding new
 elements
    ```
    var months = ['Jan', 'March', 'April', 'June'];
    months.splice(1, 0, 'Feb');
    // inserts at 1st index position
    console.log(months);
    // output: Array ['Jan', 'Feb', 'March', 'April', 'June']

    months.splice(4, 1, 'May');
    // replaces 1 element at 4th index
    console.log(months);
    // output: Array ['Jan', 'Feb', 'March', 'April', 'May']
    ```
[join()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join)
- joins all elements of an array (or an array-like object) into a string
    ```
    elements = ['Fire', 'Wind', 'Rain'];
    elements.join();
    // output: Fire,Wind,Rain
    ```
[length](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length) - number of elements in that array

[concat()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)
- merge two or more arrays
     ```
     array1.concat(array2)
     ```
[join()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join)
- joins all elements of an array (or an array-like object) into a string and returns this string
    ```
    var elements = ['Fire', 'Wind', 'Rain'];

    console.log(elements.join());
    // output: Fire,Wind,Rain
    console.log(elements.join(''));
    // output: FireWindRain
    console.log(elements.join('-'));
    // output: Fire-Wind-Rain
    ```
[map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- creates a new array with the results of calling a provided function on every element in the calling array
    ```
    var array1 = [1, 4, 9, 16];

    // pass a function to map
    const map1 = array1.map(x => x * 2);
    ```

[entries()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/entries)
- returns a new Array Iterator object that contains the key/value pairs for each index in the array
    ```
    var array1 = ['a', 'b', 'c'];
    var iterator1 = array1.entries();
    console.log(iterator1.next().value);
    // output: Array [0, "a"]
    ```
[flatten()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatten)
- creates a new array with all sub-array elements concatted into it recursively up to the specified depth
    ```
    var arr1 = [1, 2, [3, 4]];
    arr1.flatten();
    // [1, 2, 3, 4]

    var arr2 = [1, 2, [3, 4, [5, 6]]];
    arr2.flatten();
    // [1, 2, 3, 4, [5, 6]]
    ``

[every()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every)
- tests whether all elements in the array pass the test implemented by the provided function
    ```
    function isBelowThreshold(currentValue) {
      return currentValue < 40;
    }

    var array1 = [1, 30, 39, 29, 10, 13];

    console.log(array1.every(isBelowThreshold));
    // output: true
    ```
[filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
- creates a new array with all elements that pass the test implemented by the provided function
    ```
    var words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];

    const result = words.filter(word => word.length > 6);

    console.log(result);
    // output: Array ["exuberant", "destruction", "present"]
    ```
[find()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
- returns the **value** of the **first element** in the array that satisfies the provided testing function
    ```
    var array1 = [5, 12, 8, 130, 44];

    var found = array1.find(function(element) {
      return element > 10;
    });

    console.log(found);
    // output: 12
    ```
[includes()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)
- determines whether an array includes a certain element, returning true or false as appropriate
    ```
    var array1 = [1, 2, 3];

    console.log(array1.includes(2));
    // output: true
    ```

[forEach()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
- executes a provided function once for each array element
    ```
    var array1 = ['a', 'b'];

    array1.forEach(function(element) {
      console.log(element);
    });

    // expected output: "a"
    // expected output: "b"
    ```
[reverse()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse)
- reverses an array in place. The first array element becomes the last, and the last array element becomes the first
    ```
    var array1 = ['one', 'two', 'three'];
    var reversed = array1.reverse();

    console.log(array1);
    // expected output: Array ['three', 'two', 'one']

    console.log(reversed);
    // expected output: Array ['three', 'two', 'one']
    ```
[shift()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift)
- removes the first element from an array and returns that removed element. This method changes the length of the array
    ```
    var array1 = [1, 2, 3];

    var firstElement = array1.shift();

    console.log(array1);
    // output: Array [2, 3]

    console.log(firstElement);
    // output: 1
    ```
[sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
- sorts the elements of an array in place and returns the array. The sort is not necessarily stable. The default sort order is according to string Unicode code points
    - The time and space complexity of the sort cannot be guaranteed as it is implementation dependent
        ```
        var months = ['March', 'Jan', 'Feb', 'Dec'];
        months.sort();
        console.log(months);
        // output: Array ["Dec", "Feb", "Jan", "March"]

        var array1 = [1, 30, 4, 21];
        array1.sort();
        console.log(array1);
        // output: Array [1, 21, 30, 4]
        ```
[some()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)
- tests whether at least one element in the array passes the test implemented by the provided function
    ```
    var array = [1, 2, 3, 4, 5];

    var even = function(element) {
        // checks whether an element is even
        return element % 2 === 0;
    };

    console.log(array.some(even));
    // output: true
    ```


#### Hash Table / Dictionary / Map
[Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
- use as a hash map / dictionary `new Map([iterable])`
    - A Map object iterates its elements in insertion order
        ```
        var myMap = new Map();

        var keyString = 'a string',
            keyObj = {},
            keyFunc = function() {};

        // setting the values
        myMap.set(keyString, "value associated with 'a string'");
        myMap.set(keyObj, 'value associated with keyObj');
        myMap.set(keyFunc, 'value associated with keyFunc');

        myMap.size; // 3

        // getting the values
        myMap.get(keyString);   // "value associated with 'a string'"
        myMap.get(keyObj);  // "value associated with keyObj"
        myMap.get(keyFunc); // "value associated with keyFunc"

        myMap.get('a string');  // "value associated with 'a string'"
                                                // because keyString === 'a string'
        myMap.get({});  // undefined, because keyObj !== {}
        myMap.get(function() {})    // undefined, because keyFunc !== function () {}
        ```
        ```
        for (var [key, value] of myMap) {
          console.log(key + ' = ' + value);
        }
        ```

## Scope

## JS Engine, Event Loop, Async, Processes, Concurrency
- Even though JavaScript is single-threaded, IO in for example Node.js can happen in parallel due to its async nature
- JavaScript concurrency is much more than just threads and processes since **it can actually multitask using a single process with a single thread**
- Handling I/O is typically performed via events and callbacks, so when the application is waiting for an IndexedDB query to return or an XHR request to return, it can still process other things like user input

**Concurrency**
- Means that you have multiple task queues on multiple processor cores/threads

   - **Sequential**: do this and then do that
   - **Concurrent**: do this and do that without waiting between
   - **Parallel**: do this and do that at the exact same time

**Non-Blocking**
- A very interesting property of the event loop model is that JavaScript, unlike a lot of other languages, never blocks

**Stack**
- Function calls form a stack of frames

**Heap**
- Objects are allocated in a heap which is just a name to denote a large mostly unstructured region of memory

**Queue**
- JavaScript runtime uses a message queue, which is a list of messages to be processed
- Each message has an associated function which gets called in order to handle the message

**How It Works**
- JavaScript is an asynchronous, I/O bound language
    - This means that anything that requires some sort of I/O (user input, read from disk, network response, responses from other processes,… — really anything you’d like to turn into I/O) should be handled asynchronously
    - So, you register what you want to do once you get the data from an I/O source and the event loop will call that code when that event happens
        - This allows for the event loop to run some other code it might have on the queue while waiting for events to happen
    - That’s how you can achieve concurrency using a single process, single thread application
- only one task/function/operation could be executed at a time
- In JavaScript, when an event happens, the event loop will queue some code that will run in response to that event
- At some point during the event loop, the runtime starts handling the messages on the queue, starting with the oldest one
- Every time there’s availability to run something, it will run the next task on the queue and it will run to completion before running another task
- To do so, the message is removed from the queue and its corresponding function is called with the message as an input parameter. As always, calling a function creates a new stack frame for that function's use
- The processing of functions continues until the stack is once again empty; then the event loop will process the next message in the queue

**setTimeout**
- Zero delay doesn't actually mean the call back will fire-off after zero milliseconds. Calling setTimeout with a delay of 0 (zero) milliseconds doesn't execute the callback function after the given interval
- The execution depends on the number of waiting tasks in the queue
- the delay is the minimum time required for the runtime to process the request, but not a guaranteed time
- setTimeout needs to wait for all the codes to complete even though you specified a particular time limit for your setTimeout

### Concurrency
- JavaScript has actual threading support by using Web Workers, and Node.js provides the ability to fork a process and a module called cluster, both allowing the development of multiprocess applications
- Javascript is a programming language with a peculiar twist. Its event driven model means that nothing blocks and everything runs concurrently
    - This is not to be confused with the same type of concurrency as running in parallel on multiple cores
- Javascript is single threaded so each program runs on a single core yet every line of code executes without waiting for anything to return
    - If you want to have any type of sequential ordering you can use events, callbacks, or as of late promises

# Resources
- [Javascript call() & apply() vs bind()?](https://stackoverflow.com/questions/15455009/javascript-call-apply-vs-bind)
- [You-Dont-Know-JS](https://github.com/getify/You-Dont-Know-JS)
- [Speaking JavaScript: An In-Depth Guide for Programmers](https://www.amazon.com/Speaking-JavaScript-Depth-Guide-Programmers/dp/1449365035/ref=cm_cr_arp_d_product_top?ie=UTF8)
- [Concurrency model and Event Loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop)
- [JavaScript concurrency model](https://medium.com/@ktachyon/javascript-concurrency-model-dc98dacab527)
- [Concurrency vs Event Loop vs Event Loop + Concurrency](https://medium.com/@tigranbs/concurrency-vs-event-loop-vs-event-loop-concurrency-eb542ad4067b)
- [Concurrency in JavaScript](https://gist.github.com/montanaflynn/cb349fd109b561c35d6c8500471cdb39)