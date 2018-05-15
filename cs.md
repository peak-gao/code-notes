# References


## Big O Notation
#### Videos
- [Big O Notation](https://www.youtube.com/watch?v=v4cd1O4zkGw)
#### Posts


## Data Structures

### Linked Lists
#### Videos
- https://www.youtube.com/watch?v=njTh_OwMljA
#### Posts

### Trees
#### Videos
- [build employee hierarchy tree](https://www.youtube.com/watch?v=p3Ct3hELjSs)
- [Data Structures: Trees](https://www.youtube.com/watch?v=oSWTXtMglKE)
- [Data structures: Introduction to Trees](https://www.youtube.com/watch?v=qH6yxkw0u78)
- [Binary Search Tree - Beau teaches JavaScript](https://www.youtube.com/watch?v=5cU1ILGy6dM)
#### Posts
- [recursive tree construction](https://stackoverflow.com/questions/10347942/recursive-tree-construction?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa)
- [Implement a Binary Search Tree in JavaScript](https://initjs.org/implement-a-binary-search-tree-in-javascript-952a44ee7c26)
= [The HTML Document Tree](http://web.simmons.edu/~grabiner/comm244/weekfour/document-tree.html)
#### github
- [dabeng/OrgChart](https://github.com/dabeng/OrgChart/blob/master/src/js/jquery.orgchart.js) (createNode, buildChildNode)

## Sorts
### Bubble
- [Sorting | packtpub.com](https://www.youtube.com/watch?v=Ymh_AurrMbA)
## JS Utilities
- [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) - use as a hash map / dictionary
    `new Map([iterable])`
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
    myMap.get(keyString);    // "value associated with 'a string'"
    myMap.get(keyObj);       // "value associated with keyObj"
    myMap.get(keyFunc);      // "value associated with keyFunc"
    
    myMap.get('a string');   // "value associated with 'a string'"
                             // because keyString === 'a string'
    myMap.get({});           // undefined, because keyObj !== {}
    myMap.get(function() {}) // undefined, because keyFunc !== function () {}
    ```
    ```
    for (var [key, value] of myMap) {
      console.log(key + ' = ' + value);
    }
    ```

# Katas
For each Kata do them 2 different ways:
- literals and functions only
- Using JS Classes

## CS
Do 2 versions of each for the bigger katas, one version using literals + functions and another using classes + functions
- binary search with array
- Build a Binary Search Tree
- Build a hierarchical Tree
- Build a LinkedList
- Build a thread safe LinkedList
- Create a sequence of dictionary words from a predefined set of letters
- Sorts
    - Bubble Sort
    - Merge Sort
    - 
## JS
- Write a function that mimics JS's setTimeout

## Misc
- Write a debouncer function in JS
    - [JavaScript Debounce Function](https://davidwalsh.name/javascript-debounce-function)
    - [Debounce in JavaScript — Improve Your Application’s Performance](https://levelup.gitconnected.com/debounce-in-javascript-improve-your-applications-performance-5b01855e086)
- Given an array of integers, find the maximum difference of any 2 numbers
    - I'd probably sort the list and then take the highest number and subtract the lowest
- Sum of prime number until 1 million
- Find unique list of integers from given a list of integers
- Coin exchange: given the amount of change you must return and a list of denominations, give the least amount of coins needed to be given for change
- Write a function to reverse all the words in a string separated by spaces. There will be k spaces, and k + 1 words
- Given a time, find the angle between the two hands
