## Programming
- In all programs, there are two primary components: the data (the stuff a program knows) and the behaviors
## OOP
- You call function ***on** the object* and do stuff
#### Examples


## Functional
- the code is essentially a combination of functions
- functions operate on well-defined data structures, rather than belonging to the data structures
- you can pass around functions (as args) and return them
- there is no inheritance.  uses the JS prototype chain
- In functional code, a function is not able to change the outside world, and the output value depends only on the given arguments. This allows to keep strong control over the program flow
- JS can be used as a FP language as long as you take care of side effects, there is no builtin mechanism for that

#### Examples

**Functional**: You pass an object to the function and do stuff

`_.map([1, 2, 3], function(n){ return n * 2; });`



`_([1, 2, 3]).map(function(n){ return n * 2; });`

In both examples [1,2,3] (array) is an object.


# References
[Beginner JavaScript OOP vs Functional](https://stackoverflow.com/questions/37231841/beginner-javascript-oop-vs-functional?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa)