# Table Of Contents
- [Values & Types](#values-and-types)
- [Objects](#objects)
- [Converting Between Types](#converting-between-types)
- [Typing and Variables](#typing-and-variables)
- [Scope](#scope)
- [JS Compilation](#js-compilation)
- [Hoisting](#hoisting)
- [Scope Closure](#scope-closure)
- [this](#this)
- [Prototpyes](#prototypes)
- [Polyfilling](#polyfilling)
- [Resources](#resources)

**NOTE**: Believe it or not the **Scope** and **Closure** sections are trimmed down extensively as compared to what's in [js-basics-notes-1](js-basics-notes.md) but still fairly long in here because it's so critical to understand in order to bre a serious and effective JS developer.  You'd be wise to read this entire md file over and over till you get this ingrained into your head.

# *Values* and *Types*

As we asserted in Chapter 1, JavaScript has typed values, not typed variables. The following built-in types are available:

* `string`
* `number`
* `boolean`
* `null` and `undefined`
* `object`
* `symbol` (new to ES6)

There are a couple of other value types that you will commonly interact with in JavaScript programs: *array* and *function*
    - But rather than being proper built-in types, these should be thought of more like **subtypes** -- specialized versions of the `object` type
    - An array is an `object` that holds values (of any type) not particularly in
     named properties/keys, but rather in numerically indexed positions
     - You theoretically could use an array as a normal object with your own named properties, or you could use an `object` but only give it numeric properties (`0`, `1`, etc.) similar to an array
         - However, this would generally be considered improper usage of the respective types
         - The best and most natural approach is to use arrays for numerically positioned values and use `object`s for named properties

- functions are a subtype of `objects`
    - typeof` returns `"function"`, which implies that a `function` is a main type -- and can thus have properties, but you typically will only use function object properties (like `foo.bar`) in limited cases

- Only values have types in JavaScript; variables are just simple containers for those values

JavaScript provides a `typeof` operator that can examine a value and tell you what type it is:

```js
var a;
typeof a;  // "undefined"

a = "hello world";
typeof a;  // "string"

a = 42;
typeof a;  // "number"

a = true;
typeof a;  // "boolean"

a = null;
typeof a;  // "object" -- weird, bug

a = undefined;
typeof a;  // "undefined"

a = { b: "c" };
typeof a;  // "object"
```

- The return value from the **`typeof` operator is always one of six** (seven as of ES6! - the "symbol" type) ***string* values**. That is, **`typeof "abc"` returns `"string"`, not `string`**
- `typeof null` is an interesting case, because it errantly returns `"object"`, when you'd expect it to return `"null"`
    - **Warning:** This is a long-standing bug in JS, but one that is likely never going to be fixed. Too much code on the Web relies on the bug and thus fixing it would cause a lot more bugs!
- `typeof a` is not asking for the "type of `a`", but rather for the "type of the value currently in `a`."
- `a = undefined`. We're explicitly setting `a` to the `undefined` value, but that is behaviorally no different from a variable that has no value set yet, like with the `var a;` line at the top of the snippet
    - A variable can get to this "undefined" value state in several different ways, including functions that return no values and usage of the `void` operator

### Functions As Values

So far, we've discussed functions as the primary mechanism of *scope* in JavaScript
- You recall typical `function` declaration syntax as follows:

    ```js
    function foo() {
        // ..
    }
    ```

Though it may not seem obvious from that syntax, `foo` is basically just a variable in the outer enclosing scope that's given a reference to the `function` being declared
    - That is, the `function` itself is a value, just like `42` or `[1,2,3]` would be

This may sound like a strange concept at first, so take a moment to ponder it
    - Not only can you pass a value (argument) *to* a function, but *a function itself can be a value* that's assigned to variables, or passed to or returned from other functions

 **functional expressions**
 - when you assign a function to a variable
 - ```js
   // assigning an anonymous function (function without a name) to a variable
   var foo = function() {
       // ..
   };
   // assigning a named function to a variable
   var x = function bar(){
       // ..
   };
   ```

# Objects
- The `object` type refers to a compound value where you can set properties (named locations) that each hold their own values of any type.]
- Properties on an object can either be accessed with *dot notation* (i.e., `obj.a`) or *bracket notation* (i.e., `obj["a"]`)
    - Bracket notation is useful if you have a property name that has special characters in it, like `obj["hello world!"]`
        - such properties are often referred to as *keys* when accessed via bracket notation
    - The `[ ]` notation requires either a variable (explained next) or a `string` *literal* (which needs to be wrapped in `" .. "` or `' .. '`)
    - bracket notation is also useful if you want to access a property/key but the name is stored in another variable
        ```js
        var obj = {
            a: "hello world",
            b: 42
        };
        
        var b = "a";
        
        obj[b];   // "hello world"
        obj["b"];  // 42
        ```
- When you use a primitive value like `"hello world"` as an `object` by referencing a property or method (e.g., `a.toUpperCase()` in the previous snippet), JS automatically "boxes" the value to its object wrapper counterpart (hidden under the covers)
    - A `string` value can be wrapped by a `String` object, a `number` can be wrapped by a `Number` object, and a `boolean` can be wrapped by a `Boolean` object
    - For the most part, you don't need to worry about or directly use these object wrapper forms of the values -- prefer the primitive value forms in practically all cases and JavaScript will take care of the rest for you

# Converting Between Types

- **JS implicit coercion**
- there is "explicit" and "implicit" coercion
- JS implicit coercion is controversial
    - a controversial topic is what happens when you try to compare two values that are not already of the same type, which would require implicit coercion
    - When comparing the string "99.99" to the number 99.99, most people would agree they are equivalent
    - But in JS they're not; the same value in two different representations, two different types
    - **To help you out in these common situations, JavaScript will sometimes kick in and implicitly coerce values to the matching types**
    - if you use the == loose equals operator to make the comparison "99.99" == 99.99, JavaScript will convert the left-hand side "99.99" to its number equivalent 99.99
    - The comparison then becomes 99.99 == 99.99, which is of course true
    - While designed to help you, implicit coercion can create confusion if you haven't taken the time to learn the rules that govern its behavior
    - Most JS developers never have, so the common feeling is that implicit coercion is confusing and harms programs with unexpected bugs, and should thus be avoided. It's even sometimes called a flaw in the design of the language
    - However, implicit coercion is a mechanism that can be learned, and moreover should be learned by anyone wishing to take JavaScript programming seriously
        - Not only is it not confusing once you learn the rules, it can actually make your programs better! The effort is well worth it
- **JS explicit coercion**
    - JavaScript provides several different facilities for forcibly coercing between types

### Equality: == vs ===
The difference between `==` and `===` is usually characterized that `==` checks for value equality and `===` checks for both value and type equality. However, this is inaccurate
    - The proper way to characterize them is that `==` checks for value equality with coercion allowed, and `===` checks for value equality without allowing coercion; `===` is often called "strict equality" for this reason

Consider the implicit coercion that's allowed by the `==` loose-equality comparison and not allowed with the `===` strict-equality:

```js
var a = "42";
var b = 42;

a == b;  // true
a === b;  // false
```

In the `a == b` comparison, JS notices that the types do not match, so it goes through an ordered series of steps to coerce one or both values to a different type until the types match, where then a simple value equality can be checked.

If you think about it, there's two possible ways `a == b` could give `true` via coercion
- Either the comparison could end up as `42 == 42` or it could be `"42" == "42"`. So which is it?

The answer: `"42"` becomes `42`, to make the comparison `42 == 42`
- In such a simple example, it doesn't really seem to matter which way that process goes, as the end result is the same
- There are more complex cases where it matters not just what the end result of the comparison is, but *how* you get there

The `a === b` produces `false`, because the coercion is not allowed, so the simple value comparison obviously fails
- Many developers feel that `===` is more predictable, so they advocate always using that form and staying away from `==`. I think this view is very shortsighted
- I believe `==` is a powerful tool that helps your program, *if you take the time to learn how it works*

- Much of the == coercion is pretty sensible, but there are some important corner cases to be careful of
    - You can read section 11.9.3 of the ES5 specification (http://www.ecma-international.org/ecma-262/5.1/) to see the exact rules, and you'll be surprised at just how straightforward this mechanism is, compared to all the negative hype surrounding it

To boil down a whole lot of details to a few simple takeaways, and help you know whether to use `==` or `===` in various situations, here are my simple rules:

* If either value (aka side) in a comparison could be the `true` or `false` value, avoid `==` and use `===`
* If either value in a comparison could be of these specific values (`0`, `""`, or `[]` -- empty array), avoid `==` and use `===`
* In *all* other cases, you're safe to use `==`. Not only is it safe, but in many cases it simplifies your code in a way that improves readability

What these rules boil down to is requiring you to think critically about your code and about what kinds of values can come through variables that get compared for equality
- If you can be certain about the values, and `==` is safe, use it! If you can't be certain about the values, use `===`. It's that simple

The `!=` non-equality form pairs with `==`, and the `!==` form pairs with `===`
- All the rules and observations we just discussed hold symmetrically for these non-equality comparisons.

You should take special note of the `==` and `===` comparison rules if you're comparing two non-primitive values, like `object`s (including `function` and `array`)
- Because those values are actually held by reference, both `==` and `===` comparisons will simply check whether the references match, not anything about the underlying values

For example, `array`s are by default coerced to `string`s by simply joining all the values with commas (`,`) in between
- You might think that two `array`s with the same contents would be `==` equal, but they're not:
    ```js
    var a = [1,2,3];
    var b = [1,2,3];
    var c = "1,2,3";
    
    a == c;  // true
    b == c;  // true
    a == b;  // false
    ```

**Note:** For more information about the `==` equality comparison rules, see the ES5 specification (section 11.9.3) and also consult Chapter 4 of the *Types & Grammar* title of this series; see Chapter 2 for more information about values versus references.

### Inequality

The `<`, `>`, `<=`, and `>=` operators are used for inequality, referred to in the specification as "relational comparison." Typically they will be used with ordinally comparable values like `number`s
- It's easy to understand that `3 < 4`

But JavaScript `string` values can also be compared for inequality, using typical alphabetic rules (`"bar" < "foo"`).

What about coercion? Similar rules as `==` comparison (though not exactly identical!) apply to the inequality operators
- Notably, there are no "strict inequality" operators that would disallow coercion the same way `===` "strict equality" does

Consider:

```js
var a = 41;
var b = "42";
var c = "43";

a < b;  // true
b < c;  // true
```

What happens here? In section 11.8.5 of the ES5 specification, it says that if both values in the `<` comparison are `string`s, as it is with `b < c`, the comparison is made lexicographically (aka alphabetically like a dictionary)
- But if one or both is not a `string`, as it is with `a < b`, then both values are coerced to be `number`s, and a typical numeric comparison occurs

The biggest gotcha you may run into here with comparisons between potentially different value types -- remember, there are no "strict inequality" forms to use -- is when one of the values cannot be made into a valid number, such as:

```js
var a = 42;
var b = "foo";

a < b;  // false
a > b;  // false
a == b;  // false
```

Wait, how can all three of those comparisons be `false`? Because the `b` value is being coerced to the "invalid number value" `NaN` in the `<` and `>` comparisons, and the specification says that `NaN` is neither greater-than nor less-than any other value.

The `==` comparison fails for a different reason. `a == b` could fail if it's interpreted either as `42 == NaN` or `"42" == "foo"` -- as we explained earlier, the former is the case.

**Note:** For more information about the inequality comparison rules, see section 11.8.5 of the ES5 specification and also consult Chapter 4 of the *Types & Grammar* title of this series.

#### Truthy & Falsy

In Chapter 1, we briefly mentioned the "truthy" and "falsy" nature of values: when a non-`boolean` value is coerced to a `boolean`, does it become `true` or `false`, respectively?

The specific list of "falsy" values in JavaScript is as follows:

* `""` (empty string)
* `0`, `-0`, `NaN` (invalid `number`)
* `null`, `undefined`
* `false`

Any value that's not on this "falsy" list is "truthy." Here are some examples of those:

* `"hello"`
* `42`
* `true`
* `[ ]`, `[ 1, "2", 3 ]` (arrays)
* `{ }`, `{ a: 42 }` (objects)
* `function foo() { .. }` (functions)

It's important to remember that a non-`boolean` value only follows this "truthy"/"falsy" coercion if it's actually coerced to a `boolean
    - It's not all that difficult to confuse yourself with a situation that seems like it's coercing a value to a `boolean` when it's not

**Examples**
###### Explicit Conversions
Example 1: Using **Number(..)** (a built-in function)

Example 2:
 ```js
   var a = "42";
   
   var b = Number( a );
   
   a;  // "42"
   b;  // 42 -- the number!
   ```
###### Implicit Conversions
Example 1: comparing two different types with ==
    - "99.99" == 99.99

Example 2:
```js
var a = "42";

var b = a * 1;	// "42" implicitly coerced to 42 here

a;  // "42"
b;  // 42 -- the number!
```

# Typing and Variables
- **Static typing**, otherwise known as **type enforcement**, is typically cited as a benefit for program correctness by preventing unintended value conversions
- **Weak Typing** - Other languages emphasize types for values instead of variables
    - Weak typing, otherwise known as dynamic typing, allows a variable to hold any type of value at any time
    - **JavaScript uses dynamic/weak typing**, meaning *variables can hold values of any type without any type enforcement*

# Scope
(aka ***lexical scope***)
- One of the most fundamental paradigms of nearly all programming languages is the ability to store values in variables, and later retrieve or modify those values
- there's a well-defined set of rules for storing variables in some location, and for finding those variables at a later time. **We'll call that set of rules: *Scope***
- Scope is a set of rules for looking up variables by their identifier name
    - There's usually more than one Scope to consider
- scope consists of a series of "bubbles" that each act as a container or bucket, in which identifiers (variables, functions) are declared
    - These bubbles nest neatly inside each other, and this nesting is defined at author-time
- we defined "scope" as the set of rules that govern how the Engine can look up a variable by its identifier name and find it, either in the current Scope, or in any of the Nested Scopes it's contained within
    - if a variable cannot be found in the immediate scope, Engine consults the next outer containing scope, continuing until found or until the outermost (aka, global) scope has been reached
- JavaScript has function-based scope
    - **each function you declare creates a bubble for itself, but no other structures create their own scope bubbles**
    - Function scope encourages the idea that all variables belong to the function, and can be used and reused throughout the entirety of the function (and indeed, accessible even to nested scopes)
    - however be aware that if you don't take careful precautions, variables existing across the entirety of a scope can lead to some unexpected pitfalls
 - **Lexical Scope** (as opposed to Dynamic Scope) - is by far the most common, used by the vast majority of programming languages and is the scope JavaScript applies
    - In JS, each function gets its own scope
    - Only code inside that function can access that function's scoped variables
    - a scope can be nested inside another scope
        - **If one scope is nested inside another, code inside the innermost scope can access variables from either scope**
    - No matter where a function is invoked from, or even how it is invoked, its lexical scope is only defined by where the function was declared
** Dynamic Scope **
- You examine what happens while executing the program (“at runtime”)
- **Global variables** are also **automatically properties of the global object** (window in browsers, etc.)

#### lexing
- scope that is defined at lexing time
    - is based on where variables and blocks of scope are authored, by you, at write time, and thus is (mostly) set in stone by the time the lexer processes your code
- the first traditional phase of a standard language compiler is called lexing (aka, tokenizing)
- It is this concept which provides the foundation to understand what lexical scope is and where the name comes from
- there are some ways to cheat lexical scope, thereby modifying it after the lexer has passed by, but these are frowned upon (e.g. using eval)
    - It is considered best practice to treat lexical scope as, in fact, lexical-only, and thus entirely author-time in nature

#### Look-ups
- scope bubbles fully explains to the Engine all the places it needs to look to find an identifier
- It first starts with the innermost scope bubble
- if it doesn't find what it's looking for there, so it goes up one level, out to the next nearest scope
- if it eventually finds it while walking from innermost scope to outer, then it'll use it at whichever scope it was found in
- Scope look-up stops once it finds the first match
- The same identifier name (e.g. a variable with the same name found in multiple scopes) can be specified at multiple layers of nested scope, which is called "shadowing"
    - Regardless of shadowing, scope look-up always starts at the innermost scope being executed at the time, and works its way outward/upward until the first match, and stops

#### Scope Hiding
- taking any arbitrary section of code you've written, and wrap a function declaration around it, which in effect "hides" the code
    - The result is that this creates a **scope bubble** around the code in question
          - means that any declarations (variable or function) in that code will now be tied to the scope of the new wrapping function, rather than the previously enclosing scope
          - so in other words, you can "hide" variables and functions by enclosing them in the scope of a function

#### Functions As Scopes
 - remember that we can take any snippet of code and wrap a function around it, and that effectively "hides" any enclosed variable or function declarations from the outside scope inside that function's inner scope
     ```
     var a = 2;
     
     function foo() { // <-- insert this
     
        var a = 3;
        console.log( a ); // 3
     
     } // <-- and this
     foo(); // <-- and this
     
     console.log( a ); // 2
     ```
 - **While this technique "works", it is not necessarily very ideal**
 - There are a few problems it introduces:
     - first we have to declare a named-function foo(), but now the identifier name foo itself "pollutes" the enclosing scope (global, in this case)
     - we also have to explicitly call the function by name (foo()) so that the wrapped code actually executes
     - It would be more ideal if the function didn't need a name (or, rather, the name didn't pollute the enclosing scope), and if the function could automatically be executed
     - JavaScript offers a solution to both problems:
         ```
         var a = 2;
         
         (function foo(){ // <-- insert this
         
            var a = 3;
            console.log( a ); // 3
         
         })(); // <-- and this
         
         console.log( a ); // 2
         ```
         - First, notice that the wrapping function statement starts with (function... as opposed to just function.... While this may seem like a minor detail, it's actually a major change
         - Instead of treating the function as a standard declaration, the function is treated as a function-expression
         - The easiest way to distinguish declaration vs. expression is the position of the word "function" in the statement (not just a line, but a distinct statement). If "function" is the very first thing in the statement, then it's a function declaration. Otherwise, it's a function expression

#### immediately invoked function expression (IIFE)
###### What It Is
  - if you recall a function value should be thought of as an expression, much like any other value or expression.  A function value (functional expression) is when you assign a function to a variable
  - There are a couple ways to execute an functional expression:
    - on the variable: foo()
    - via an IIFE
        ```js
        (function IIFE(){
            console.log( "Hello!" );
        })();
        // "Hello!"
        ```
        - The outer `( .. )` that surrounds the `(function IIFE(){ .. })` function expression is just a nuance of JS grammar needed to prevent it from being treated as a normal function declaration
        - The final `()` on the end of the expression -- the `})();` line -- is what actually executes the function expression referenced immediately before it
        - That may seem strange, but it's not as foreign as first glance. Consider the similarities between `foo` and `IIFE` here:
          ```js
          function foo() { .. }
          
          // `foo` function reference expression,
          // then `()` executes it
          foo();
          
          // `IIFE` function expression,
          // then `()` executes it
          (function IIFE(){ .. })();
          ```
          - As you can see, listing the `(function IIFE(){ .. })` before its executing `()` is essentially the same as including `foo` before its executing `()`

###### IIFE and Scope
  - the fundamental unit of variable scoping in JavaScript has always been the function
  - If you **needed to create a block of scope**, the most prevalent way to do so other than a regular function declaration was the immediately invoked function expression (IIFE)
    - Because an IIFE is just a function, and functions create variable *scope*, using an IIFE in this fashion is often used to declare variables that won't affect the surrounding code outside:
      ```
      var a = 2;
      
      (function IIFE(){
          var a = 3;
          console.log( a )  // 3
      })();
      
      console.log( a );
      ```
#### Block Scopes
- While functions are the most common, other units of scope are possible, and the usage of these other scope units can lead to even better, cleaner to maintain code

**Examples**
###### 1
    ```
    for (var i=0; i<10; i++) {
        console.log( i );
    }
    ```
- We declare the variable i directly inside the for-loop head, most likely because our intent is to use i only within the context of that for-loop, and essentially ignore the fact that the variable actually scopes itself to the enclosing scope (function or global)
- That's what block-scoping is all about. Declaring variables as close as possible, as local as possible, to where they will be used
###### 2
    ```
    var foo = true;
    
    if (foo) {
        var bar = foo * 2;
        bar = something( bar );
        console.log( bar );
    }
    ```
- We are using a bar variable only in the context of the if-statement, so it makes a kind of sense that we would declare it inside the if-block
    - However, where we declare variables is not relevant when using var, because they will always belong to the enclosing scope
    - This snippet is essentially "fake" block-scoping, for stylistic reasons, and relying on self-enforcement not to accidentally use bar in another place in that scope
    - Block scope is a tool to extend information hiding via functions to hiding information further in blocks of our code
###### 3
    ```
    for (var i=0; i<10; i++) {
        console.log( i );
    }
    ```
- Why pollute the entire scope of a function with the i variable that is only going to be (or only should be, at least) used for the for-loop?
- Block-scoping (if it were possible) for the i variable would make i available only for the for-loop, causing an error if i is accessed elsewhere in the function
- This helps ensure variables are not re-used in confusing or hard-to-maintain ways

#### try/catch
- variable declaration in the catch clause of a try/catch to be block-scoped to the catch block
    ```
    try {
        undefined(); // illegal operation to force an exception!
    }
    catch (err) {
        console.log( err ); // works!
    }
    
    console.log( err ); // ReferenceError: `err` not found
    ```
- err exists only in the catch clause, and throws an error when you try to reference it elsewhere

#### let
- Thus far, we've seen that JavaScript only has some strange niche behaviors which expose block scope functionality. If that were all we had, and it was for many, many years, then block scoping would not be terribly useful to the JavaScript developer
- ES6 changes that, and introduces a new keyword let which sits alongside var as another way to declare variables
- let keyword attaches the variable declaration to the scope of whatever block (commonly a { .. } pair) it's contained in
    - In other words, let implicitly hijacks any block's scope for its variable declaration:
        ```
        var foo = true;
        
        if (foo) {
        	let bar = foo * 2;
        	bar = something( bar );
        	console.log( bar );
        }
        
        console.log( bar ); // ReferenceError
        ```
        - Using let to attach a variable to an existing block is somewhat implicit. It can confuse you if you're not paying close attention to which blocks have variables scoped to them, and are in the habit of moving blocks around, wrapping them in other blocks, etc., as you develop and evolve code
        - Creating explicit blocks for block-scoping can address some of these concerns, making it more obvious where variables are attached and not. Usually, explicit code is preferable over implicit or subtle code. This explicit block-scoping style is easy to achieve, and fits more naturally with how block-scoping works in other languages:
            ```
            var foo = true;
            
            if (foo) {
            	{ // <-- explicit block
            		let bar = foo * 2;
            		bar = something( bar );
            		console.log( bar );
            	}
            }
            
            console.log( bar ); // ReferenceError
            ```
            - We can create an arbitrary block for let to bind to by simply including a { .. } pair anywhere a statement is valid grammar
            - In this case, we've made an explicit block inside the if-statement, which may be easier as a whole block to move around later in refactoring, without affecting the position and semantics of the enclosing if-statement
- declarations made with let will not hoist to the entire scope of the block they appear in. Such declarations will not observably "exist" in the block until the declaration statement:
    ```
    {
       console.log( bar ); // ReferenceError!
       let bar = 2;
    }
    ```
#### let Loops
- A particular case where let shines is in the for-loop case
    ```
    for (let i=0; i<10; i++) {
        console.log( i );
    }
    
    console.log( i ); // ReferenceError
    ```
    - Not only does let in the for-loop header bind the i to the for-loop body, but in fact, it **re-binds** it to each iteration of the loop, making sure to re-assign it the value from the end of the previous loop iteration
    - Here's another way of illustrating the per-iteration binding behavior that occurs:
        ```
        {
            let j;
            for (j=0; j<10; j++) {
                let i = j; // re-bound for each iteration!
                console.log( i );
            }
        }
        ```
    - let declarations attach to arbitrary blocks rather than to the enclosing function's scope (or global), there can be gotchas where existing code has a hidden reliance on function-scoped var declarations, and replacing the var with let may require additional care when refactoring code:
        ```
        var foo = true, baz = 10;
        
        if (foo) {
            var bar = 3;
        
            if (baz > bar) {
                console.log( baz );
            }
        
            // ...
        }
        ```
    - This code is fairly easily re-factored as:
        ```
        var foo = true, baz = 10;
        
        if (foo) {
            var bar = 3;
        
            // ...
        }
        
        if (baz > bar) {
            console.log( baz );
        }
        ```
    - be careful of such changes when using block-scoped variables:
        ```
        var foo = true, baz = 10;
        
        if (foo) {
        	let bar = 3;
        
        	if (baz > bar) { // <-- don't forget `bar` when moving!
        		console.log( baz );
        	}
        }
        ```

#### Garbage Collection
- block-scoping is useful as it relates to closures and garbage collection to reclaim memory
    ```
    function process(data) {
        // do something interesting
    }
    
    var someReallyBigData = { .. };
    
    process( someReallyBigData );
    
    var btn = document.getElementById( "my_button" );
    
    btn.addEventListener( "click", function click(evt){
        console.log("button clicked");
    }, /*capturingPhase=*/false );
    ```
- The click function click handler callback doesn't need the someReallyBigData variable at all
    - That means, theoretically, after process(..) runs, the big memory-heavy data structure could be garbage collected
    - However, it's quite likely (though implementation dependent) that the JS engine will still have to keep the structure around, since the click function has a closure over the entire scope
    - Block-scoping can address this concern, making it clearer to the engine that it does not need to keep someReallyBigData around:
        ```
        function process(data) {
        	// do something interesting
        }

        // anything declared inside this block can go away after!
        {
        	let someReallyBigData = { .. };
        
        	process( someReallyBigData );
        }
        
        var btn = document.getElementById( "my_button" );
        
        btn.addEventListener( "click", function click(evt){
        	console.log("button clicked");
        }, /*capturingPhase=*/false );
        ```
- Declaring explicit blocks for variables to locally bind to is a powerful tool that you can add to your code toolbox

**Use Cases**
 - If all variables and functions were in the global scope, they would of course be accessible to any nested scope. But this would violate the "Least..." principle in that you are (likely) exposing many variables or functions which you should otherwise keep private, as proper use of the code would discourage access to those variables/functions
 - Collision Avoidance
    - avoid unintended collision between two different identifiers with the same name but different intended usages
    - Collision results often in unexpected overwriting of values
    - A particularly strong example of (likely) variable collision occurs in the global scope
        - Multiple libraries loaded into your program can quite easily collide with each other if they don't properly hide their internal/private functions and variables
    - Another option for collision avoidance is the more modern "module" approach, using any of various dependency managers
        - Using these tools, no libraries ever add any identifiers to the global scope, but are instead required to have their identifier(s) be explicitly imported into another specific scope through usage of the dependency manager's various mechanisms
        - enforce that no identifiers are injected into any shared scope, and are instead kept in private, non-collision-susceptible scopes, which prevents any accidental scope collisions
        - The key difference we can observe here between a function declaration and a function expression relates to where its name is bound as an identifier
                      - Compare the previous two snippets. In the first snippet, the name foo is bound in the enclosing scope, and we call it directly with foo(). In the second snippet, the name foo is not bound in the enclosing scope, but instead is bound only inside of its own function
                      - In other words, (function foo(){ .. }) as an expression means the identifier foo is found only in the scope where the .. indicates, not in the outer scope. Hiding the name foo inside itself means it does not pollute the enclosing scope unnecessarily

**Examples**
###### Scope Bubbles
```
// global scope

function foo(a) {

  // scope of foo
  var b = a * 2;

  function bar(c) {
  
    // scope of bar
    console.log( a, b, c );
  }

  bar(b * 3);
}

foo( 2 ); // 2 4 12
```
  - There are three nested scopes inherent in this code example
      - global scope has just one identifier in it: foo
      - the scope of foo, which includes the three identifiers: a, bar and b
      - the scope of bar, and it includes just one identifier: c
  - Scope bubbles are defined by where the blocks of scope are written, which one is nested inside the other, etc

###### Function Scope Bubble
```
function foo(a) {
	var b = 2;

	// some code

	function bar() {
		// ...
	}

	// more code

	var c = 3;
}
```
- the scope bubble for foo(..) includes a, b, c and bar
- bar(..) has its own scope bubble. So does the global scope, which has just one identifier attached to it: foo
- Because a, b, c, and bar all belong to the scope bubble of foo(..), they are not accessible outside of foo(..) and also available inside of bar(..)
- (a, b, c, foo, and bar) are accessible inside of foo(..)
- **It doesn't matter *where*** in the scope a declaration appears, the variable or function belongs to the containing scope bubble, regardless

###### Nested Scope
- code inside the inner() function has access to both variables a and b, but code in outer() has access only to a
    ```
    function outer() {
        var a = 1;
    
        function inner() {
            var b = 2;
    
            // we can access both `a` and `b` here
            console.log( a + b );   // 3
        }
    
        inner();
    
        // we can only access `a` here
        console.log( a );   // 1
    }
    
    outer();
    ```

###### Hiding Scope
```
function doSomething(a) {
    b = a + doSomethingElse( a * 2 );

    console.log( b * 3 );
}

function doSomethingElse(a) {
    return a - 1;
}

var b;

doSomething( 2 ); // 15
```
- the b variable and the doSomethingElse(..) function are "private" details of how doSomething(..) does its job
- Giving the enclosing scope "access" to b and doSomethingElse(..) is not only unnecessary but also possibly "dangerous", in that they may be used in unexpected ways
    - A more "proper" design would hide these private details inside the scope of doSomething(..), such as:
        ```
        function doSomething(a) {
            function doSomethingElse(a) {
                return a - 1;
            }
        
            var b;
        
            b = a + doSomethingElse( a * 2 );
        
            console.log( b * 3 );
        }
        
        doSomething( 2 ); // 15
        ```
    - Now, b and doSomethingElse(..) are not accessible to any outside influence, instead controlled only by doSomething(..)
    - The functionality and end-result has not been affected, but the design keeps private details private, which is usually considered better software
###### Collision Avoidance
```
function foo() {
    function bar(a) {
        i = 3; // changing the `i` in the enclosing scope's for-loop
        console.log( a + i );
    }

    for (var i=0; i<10; i++) {
        bar( i * 2 ); // oops, infinite loop ahead!
    }
}

foo();
```
- The i = 3 assignment inside of bar(..) overwrites, unexpectedly, the i that was declared in foo(..) at the for-loop
- In this case, it will result in an infinite loop, because i is set to a fixed value of 3 and that will forever remain < 10
- The assignment inside bar(..) needs to declare a local variable to use, regardless of what identifier name is chosen
- var i = 3; would fix the problem (and would create the previously mentioned "shadowed variable" declaration for i)
- An additional, not alternate, option is to pick another identifier name entirely, such as var j = 3;
- But your software design may naturally call for the same identifier name, so utilizing scope to "hide" your inner declaration is your best/only option in that case

##### [eval - details here](js-basics-notes.md)

# JS Compilation
- despite the fact that JavaScript falls under the general category of "dynamic" or "interpreted" languages, it is in fact a compiled language
- JavaScript engines don't get the luxury (like other language compilers) of having plenty of time to optimize, because JavaScript compilation doesn't happen in a build step ahead of time, as with other languages
    - the compilation that occurs happens, in many cases, mere microseconds (or less!) before the code is executed
    - To ensure the fastest performance, JS engines use all kinds of tricks (like JITs, which lazy compile and even hot re-compile, etc.) which are well beyond the "scope" of our discussion here
    - Let's just say, for simplicity's sake, that any snippet of JavaScript has to be compiled before (usually right before!) it's executed
    - So, the JS compiler will take the program var a = 2; and compile it first, and then be ready to execute it, usually right away

# Hoisting
- There's a temptation to think that all of the code you see in a JavaScript program is interpreted line-by-line, top-down in order, as the program executes
- **the best way to think about things is that all declarations, both variables and functions, are processed first, before any part of your code is executed**
- one way of thinking, sort of metaphorically, about this process, is that **variable and function declarations are "moved" from where they appear in the flow of the code to the top of the code. This gives rise to the name "Hoisting"**
- (declaration) comes before (assignment)
- **Only the declarations themselves are hoisted, while any assignments or other executable logic are left *in place***
- hoisting is per-scope
- **Function *declarations* are hoisted, as we just saw. But function *expressions* are not**
- **Both function declarations and variable declarations are hoisted**
    - **functions are hoisted first**, and then variables

**Examples**
###### Hosting Example 1
```
foo();

function foo() {
	console.log( a ); // undefined

	var a = 2;
}
```
- function foo's declaration (which in this case includes the implied value of it as an actual function) is hoisted, such that the call on the first line is able to execute
###### Per Scope Hosting
- while our previous snippets were simplified in that they only included global scope, the foo(..) function we are now examining itself exhibits that var a is hoisted to the top of foo(..) (not, obviously, to the top of the program)
    - So the program can perhaps be more accurately interpreted like this:
        ```
        function foo() {
            var a;

            console.log( a ); // undefined
        
            a = 2;
        }
        
        foo();
        ```
        - The variable identifier foo is hoisted and attached to the enclosing scope (global) of this program, so foo() doesn't fail as a ReferenceError
        - But foo has no value yet (as it would if it had been a true function declaration instead of expression)
        - So, foo() is attempting to invoke the undefined value, which is a TypeError illegal operation

###### Function Declarations are Hosted, Functional Expressions are not
- even if it's a named function expression, the name identifier is not available in the enclosing scope:
    ```
    foo(); // TypeError
    bar(); // ReferenceError
    
    var foo = function bar() {
        // ...
    };
    ```
- This snippet is more accurately interpreted (with hoisting) as:
    ```
    var foo;
    
    foo(); // TypeError
    bar(); // ReferenceError
    
    foo = function() {
        var bar = ...self...
        // ...
    }
    ```
###### Functions are Hoisted First, then Variables
```
foo(); // 1

var foo;

function foo() {
	console.log( 1 );
}

foo = function() {
	console.log( 2 );
};
```
- 1 is printed instead of 2! This snippet is interpreted by the Engine as:
    ```
    function foo() {
        console.log( 1 );
    }
    
    foo(); // 1
    
    foo = function() {
        console.log( 2 );
    };
    ```

# Scope Closure
- You can think of closure as a **way to "remember" and continue to access a function's scope** (its variables) **even once the function has finished running**
- *Closure* is when **a function is able to remember and access its lexical scope even when that function is executing outside its lexical scope**
- ***Closure lets the function continue to access the lexical scope it was defined in at author-time***
- closure is something all around you in your code
- **Whatever facility we use to *transport an inner function outside of its lexical scope*, it *will maintain a scope reference to where it was originally declared*, and *wherever we execute it, that closure will be exercised***
- whenever and wherever you treat functions (which access their own respective lexical scopes) as first-class values and pass them around, you are likely to see those functions exercising closure

**Examples**
###### Basic Closure 1
```js
function makeAdder(x) {
    // parameter `x` is an inner variable

    // inner function `add()` uses `x`, so
    // it has a "closure" over it
    function add(y) {
      return y + x;
    };

    return add;
}
```
- he reference to the inner `add(..)` function that gets returned with each call to the outer `makeAdder(..)` is able to remember whatever `x` value was passed in to `makeAdder(..)`
```js
// `plusOne` gets a reference to the inner `add(..)`
// function with closure over the `x` parameter of
// the outer `makeAdder(..)`
var plusOne = makeAdder( 1 );

// `plusTen` gets a reference to the inner `add(..)`
// function with closure over the `x` parameter of
// the outer `makeAdder(..)`
var plusTen = makeAdder( 10 );

plusOne( 3 );		// 4  <-- 1 + 3
plusOne( 41 );		// 42 <-- 1 + 41

plusTen( 13 );		// 23 <-- 10 + 13
```

More on how this code works:

1. When we call `makeAdder(1)`, we get back a reference to its inner `add(..)` that remembers `x` as `1`. We call this function reference `plusOne(..)`.
2. When we call `makeAdder(10)`, we get back another reference to its inner `add(..)` that remembers `x` as `10`. We call this function reference `plusTen(..)`.
3. When we call `plusOne(3)`, it adds `3` (its inner `y`) to the `1` (remembered by `x`), and we get `4` as the result.
4. When we call `plusTen(13)`, it adds `13` (its inner `y`) to the `10` (remembered by `x`), and we get `23` as the result.
###### Basic Closure 2
```
function foo() {
    var a = 2;

    function bar() {
        console.log( a );
    }

    return bar;
}

var baz = foo();

baz(); // 2 -- Whoa, closure was just observed, man.
```
- function **bar() has *lexical scope access* to the *inner scope of foo()***
- But then, we take bar(), the function itself, and pass it as a value
- we return the function object itself that bar references
- After we execute foo(), we assign the value it returned (our inner bar() function) to a variable called baz
- then we actually invoke baz(), which of course is invoking our inner function bar(), just by a different identifier reference
- **bar() is executed**, for sure. But in this case, it's executed ***outside of its declared lexical scope***
- After foo() executed, normally we would expect that the entirety of the inner scope of foo() would go away, because we know that the Engine employs a Garbage Collector that comes along and frees up memory once it's no longer in use
- Since it would appear that the contents of foo() are no longer in use, it would seem natural that they should be considered gone
- **But the "magic" of closures does not let this happen. That inner scope is in fact still "in use", and thus does not go away**
    - Who's using it? The function bar() itself
        - By virtue of where it was declared, bar() has a lexical scope closure over that inner scope of foo(), which keeps that scope alive for bar() to reference at any later time
        - **bar() still has a reference to that scope, and *that reference is called closure***
    - a few microseconds later, when the variable baz is invoked (invoking the inner function we initially labeled bar), it duly has access to author-time lexical scope, so it can access the variable a just as we'd expect
- The **function is being invoked well *outside* of its *author-time lexical scope***

###### Passing Functions Around Exercises Closure
- any of the various ways that functions can be passed around as values, and indeed invoked in other locations, are all examples of observing/exercising closure
```
function foo() {
    var a = 2;

    function baz() {
        console.log( a ); // 2
    }

    bar( baz );
}

function bar(fn) {
    fn(); // look ma, I saw closure!
}
```
- We pass the inner function baz over to bar, and call that inner function (labeled fn now), and when we do, its closure over the inner scope of foo() is observed, by accessing a
- These passings-around of functions can be indirect, too
    ```
    var fn;
    
    function foo() {
        var a = 2;
    
        function baz() {
            console.log( a );
        }
    
        fn = baz; // assign `baz` to global variable
    }
    
    function bar() {
        fn(); // look ma, I saw closure!
    }
    
    foo();
    
    bar(); // 2
    ```
    - **Whatever facility we use to *transport an inner function outside of its lexical scope*, it *will maintain a scope reference to where it was originally declared*, and *wherever we execute it, that closure will be exercised***
###### Asynchronous Tasks
```
function wait(message) {

	setTimeout( function timer(){
		console.log( message );
	}, 1000 );

}

wait( "Hello, closure!" );
```
- We take an inner function (named timer) and pass it to setTimeout(..)
- But timer has a scope closure over the scope of wait(..), indeed keeping and using a reference to the variable message
- A thousand milliseconds after we have executed wait(..), and its inner scope should otherwise be long gone, that inner function timer still has closure over that scope
- Deep down in the guts of the Engine, the built-in utility setTimeout(..) has reference to some parameter, probably called fn or func or something like that. Engine goes to invoke that function, which is invoking our inner timer function, and the lexical scope reference is still intact
- whenever and wherever you treat functions (which access their own respective lexical scopes) as first-class values and pass them around, you are likely to see those functions exercising closure
    - Be that timers, event handlers, Ajax requests, cross-window messaging, web workers, or any of the other asynchronous (or synchronous!) tasks, **when you pass in a callback function, get ready to sling some closure around!**
###### For Loop Closure
 ```
for (var i=1; i<=5; i++) {
    setTimeout( function timer(){
        console.log( i );
    }, i*1000 );
}
```
- Linters often complain when you put functions inside of loops, because the mistakes of not understanding closure are so common among developers. We explain how to do so properly here, leveraging the full power of closure. But that subtlety is often lost on linters and they will complain regardless, assuming you don't actually know what you're doing
    - we would normally expect for the behavior to be that the numbers "1", "2", .. "5" would be printed out, one at a time, one per second, respectively
    - if you run this code, you get "6" printed out 5 times, at the one-second intervals
        - Weird right?
            - Firstly, let's explain where 6 comes from
            - The terminating condition of the loop is when i is not <=5
            - The first time that's the case is when i is 6. So, the output is reflecting the final value of the i after the loop terminates
                - This actually seems obvious on second glance
                    - The timeout function callbacks are all running well after the completion of the loop. In fact, as timers go, even if it was setTimeout(.., 0) on each iteration, all those function callbacks would still run strictly after the completion of the loop, and thus print 6 each time
                    - But there's a deeper question at play here. What's missing from our code to actually have it behave as we semantically have implied?
                    - What's missing is that we are trying to imply that each iteration of the loop "captures" its own copy of i, at the time of the iteration
                    - But, the way scope works, all 5 of those functions, though they are defined separately in each loop iteration, all **are closed over the same shared global scope**, which has, in fact, only one i in it
                        - Put that way, of course all functions share a reference to the same i
                        - Something about the loop structure tends to confuse us into thinking there's something else more sophisticated at work. There is not. There's no difference than if each of the 5 timeout callbacks were just declared one right after the other, with no loop at all
                    - What's missing? We need more cowbell closured scope. Specifically, we need a new closured scope for each iteration of the loop
                        - We learned that the IIFE creates scope by declaring a function and immediately executing it
                            ```
                            for (var i=1; i<=5; i++) {
                            	(function(){
                            		setTimeout( function timer(){
                            			console.log( i );
                            		}, i*1000 );
                            	})();
                            }
                            ```
                            - Does that work? **Nope**. But why?
                                - We now obviously have more lexical scope
                                - Each timeout function callback is indeed closing over its own per-iteration scope created respectively by each IIFE
                                - **It's not enough to have a scope to close over if that scope is empty**
                                    - Look closely. Our IIFE is just an empty do-nothing scope. It needs *something* in it to be useful to us
                                    - It needs its own variable, with a copy of the i value at each iteration:
                                        ```
                                        for (var i=1; i<=5; i++) {
                                        	(function(){
                                        		var j = i;
                                        		setTimeout( function timer(){
                                        			console.log( j );
                                        		}, j*1000 );
                                        	})();
                                        }
                                        ```
                                        - It works!
                                        - A slight variation some prefer is:
                                            ```
                                            for (var i=1; i<=5; i++) {
                                            	(function(j){
                                            		setTimeout( function timer(){
                                            			console.log( j );
                                            		}, j*1000 );
                                            	})( i );
                                            }
                                            ```
                                            - since these IIFEs are just functions, we can pass in i, and we can call it j if we prefer, or we can even call it i again
                                            - The use of an IIFE inside each iteration created a new scope for each iteration, which gave our timeout function callbacks the opportunity to close over a new scope for each iteration, one which had a variable with the right per-iteration value in it for us to access
                                            - Problem solved!

###### Module Closures
The most common usage of closure in JavaScript is the module pattern
    - Modules **let you define private implementation details** (*variables*, *functions*) that are hidden from the outside world, as well as a **public API that *is* accessible from the outside**
    - other code patterns which leverage the power of closure but which do not on the surface appear to be about callbacks
    - Let's examine the most powerful of them:the the ***module***:
        ```
        function foo() {
            var something = "cool";
            var another = [1, 2, 3];
        
            function doSomething() {
                console.log( something );
            }
        
            function doAnother() {
                console.log( another.join( " ! " ) );
            }
        }
        ```
        - there's no observable closure going on
            We simply have some private data variables something and another, and a couple of inner functions doSomething() and doAnother(), which both have lexical scope (and thus closure!) over the inner scope of foo()
        - now consider:
            ```
            function CoolModule() {
                var something = "cool";
                var another = [1, 2, 3];
            
                function doSomething() {
                    console.log( something );
                }
            
                function doAnother() {
                    console.log( another.join( " ! " ) );
                }
            
                return {
                    doSomething: doSomething,
                    doAnother: doAnother
                };
            }
            
            var foo = CoolModule();
            
            foo.doSomething(); // cool
            foo.doAnother(); // 1 ! 2 ! 3
            ```
            - This is the pattern in JavaScript we call ***module***
            - CoolModule() is just a function, but it *has to be invoked* for there to be a module instance created
                - Without the execution of the outer function, the creation of the inner scope and the closures would not occur
            - Secondly, the CoolModule() function returns an object, denoted by the object-literal syntax { key: value, ... }
                - The object we return has references on it to our inner functions, but not to our inner data variables
                - We keep those hidden and private
                - It's appropriate to think of this object return value as essentially a **public API for our module**
                    - This object return value is ultimately assigned to the outer variable foo, and then we can access those property methods on the API, like foo.doSomething()
                    - Note: It is not required that we return an actual object (literal) from our module. We could just return back an inner function directly. jQuery is actually a good example of this. The jQuery and $ identifiers are the public API for the jQuery "module", but they are, themselves, just a function (which can itself have properties, since all functions are objects)
            - The doSomething() and doAnother() functions have closure over the inner scope of the module "instance" (arrived at by actually invoking CoolModule())
                - When we transport those functions outside of the lexical scope, by way of property references on the object we return, we have now set up a condition by which closure can be observed and exercised
- To state it more simply, there are two "requirements" for the module pattern to be exercised:
1. There must be an outer enclosing function, and it must be invoked at least once (each time creates a new module instance).

2. The enclosing function must return back at least one inner function, so that this inner function has closure over the private scope, and can access and/or modify that private state
- An object with a function property on it alone is not really a module
- An object which is returned from a function invocation which only has data properties on it and no closured functions is not really a module, in the observable sense
- A slight variation on this pattern is when you only care to have one instance, a "singleton" of sorts
    ```
    var foo = (function CoolModule() {
        var something = "cool";
        var another = [1, 2, 3];
    
        function doSomething() {
            console.log( something );
        }
    
        function doAnother() {
            console.log( another.join( " ! " ) );
        }
    
        return {
            doSomething: doSomething,
            doAnother: doAnother
        };
    })();
    
    foo.doSomething(); // cool
    foo.doAnother(); // 1 ! 2 ! 3
    ```
    - Here, we turned our module function into an IIFE (see Chapter 3), and we immediately invoked it and assigned its return value directly to our single module instance identifier foo
- Modules are just functions, so they can receive parameters:
```
function CoolModule(id) {
    function identify() {
        console.log( id );
    }
    
    return {
        identify: identify
    };
}

var foo1 = CoolModule( "foo 1" );
var foo2 = CoolModule( "foo 2" );

foo1.identify(); // "foo 1"
foo2.identify(); // "foo 2"
```
- Another slight but powerful variation on the module pattern is to name the object you are returning as your public API:
```
var foo = (function CoolModule(id) {
    function change() {
        // modifying the public API
        publicAPI.identify = identify2;
    }

    function identify1() {
        console.log( id );
    }

    function identify2() {
        console.log( id.toUpperCase() );
    }

    var publicAPI = {
        change: change,
        identify: identify1
    };

    return publicAPI;
})( "foo module" );

foo.identify(); // foo module
foo.change();
foo.identify(); // FOO MODULE
```
- By retaining an inner reference to the public API object inside your module instance, you can modify that module instance from the inside, including adding and removing methods, properties, and changing their values

**Examples**
###### Basic Module Closure
```js
function User(){
    var username, password;

    function doLogin(user,pw) {
        username = user;
        password = pw;

        // do the rest of the login work
    }

    var publicAPI = {
        login: doLogin
    };

    return publicAPI;
}

// create a `User` module instance
var fred = User();

fred.login( "fred", "12Battery34!" );
```

- The `User()` function serves as an outer scope that holds the variables `username` and `password`, as well as the inner `doLogin()` function; these are all private inner details of this `User` module that cannot be accessed from the outside world
- Executing `User()` creates an *instance* of the `User` module -- a whole new scope is created, and thus a whole new copy of each of these inner variables/functions
    - We assign this instance to `fred`. If we run `User()` again, we'd get a new instance entirely separate from `fred`'
    - We are not calling `new User()` here, on purpose, despite the fact that probably seems more common to most readers
    - `User()` is just a function, not a class to be instantiated, so it's just called normally. Using `new` would be inappropriate and actually waste resources
- The inner `doLogin()` function has a closure over `username` and `password`, meaning it will retain its access to them even after the `User()` function finishes running
- `publicAPI` is an object with one property/method on it, `login`, which is a reference to the inner `doLogin()` function. When we return `publicAPI` from `User()`, it becomes the instance we call `fred`
- At this point, the outer `User()` function has finished executing
    - Normally, you'd think the inner variables like `username` and `password` have gone away. But here they have not, because there's a closure in the `login()` function keeping them alive
    - That's why we can call `fred.login(..)` -- the same as calling the inner `doLogin(..)` -- and it can still access `username` and `password` inner variables

###### Modern Module Closures
- Various module dependency loaders/managers essentially wrap up this pattern of module definition into a friendly API
```
var MyModules = (function Manager() {
    var modules = {};

    function define(name, deps, impl) {
        for (var i=0; i<deps.length; i++) {
            deps[i] = modules[deps[i]];
        }
        modules[name] = impl.apply( impl, deps );
    }

    function get(name) {
        return modules[name];
    }

    return {
        define: define,
        get: get
    };
})();
```
- The key part of this code is modules[name] = impl.apply(impl, deps)
    - This is invoking the definition wrapper function for a module (passing in any dependencies), and storing the  return value, the module's API, into an internal list of modules tracked by name
- here's how I might use it to define some modules:
    ```
    MyModules.define( "bar", [], function(){
        function hello(who) {
            return "Let me introduce: " + who;
        }
    
        return {
            hello: hello
        };
    } );
    
    MyModules.define( "foo", ["bar"], function(bar){
        var hungry = "hippo";
    
        function awesome() {
            console.log( bar.hello( hungry ).toUpperCase() );
        }
    
        return {
            awesome: awesome
        };
    } );
    
    var bar = MyModules.get( "bar" );
    var foo = MyModules.get( "foo" );
    
    console.log(
        bar.hello( "hippo" )
    ); // Let me introduce: hippo
    
    foo.awesome(); // LET ME INTRODUCE: HIPPO
    ```
    - Both the "foo" and "bar" modules are defined with a function that returns a public API
    - "foo" even receives the instance of "bar" as a dependency parameter, and can use it accordingly


# this
- this is a special identifier keyword that's automatically defined in the scope of every function
- While it may often seem that `this` is related to "object-oriented patterns," in JS `this` is a different mechanism

- `this` does **not** refer to
    -  the **function itself**
        - To reference a function object from inside itself, `this` by itself will typically be insufficient
            - You generally need a reference to the function object via a lexical identifier (variable) that points at it
    - the **function's scope**
        - a reference to the **function's *lexical scope***
    - **where** a **function is declared**
- **what this *is***:
    - It is contextual based on the conditions of the function's invocation
    - has everything to do with the manner in which the function is called (*call-site*)
    - If a function has a `this` reference inside it, that `this` reference usually points to an `object`
        - But which `object` it points to **depends on how the function was called**
    - **When a function is invoked**, an activation record, otherwise known as **an *execution context*, is created**
        -  This record contains information about where the function was called from (the call-stack), *how* the function was invoked, what parameters were passed, etc
        - One of the properties of this record is the `this` **reference** which will be *used for the duration of that function's execution*
    - it's a **binding** that is **made when a function is invoked**, and *what* **it references** is **determined entirely by the *call-site* where the function is called**

**Examples**
###### Basic
```js
function foo() {
    console.log( this.bar );
}

var bar = "global";

var obj1 = {
    bar: "obj1",
    foo: foo
};

var obj2 = {
    bar: "obj2"
};

// --------

foo();  // "global"
obj1.foo();  // "obj1"
foo.call( obj2 );  // "obj2"
new foo();  // undefined
```
- There are four rules for how `this` gets set, and they're shown in those last four lines of that snippet

    1. `foo()` ends up setting `this` to the global object in non-strict mode -- in strict mode, `this` would be `undefined` and you'd get an error in accessing the `bar` property -- so `"global"` is the value found for `this.bar`
    2. `obj1.foo()` sets `this` to the `obj1` object
    3. `foo.call(obj2)` sets `this` to the `obj2` object
    4. `new foo()` sets `this` to a brand new empty object

Bottom line: to understand what `this` points to, you have to examine how the function in question was called
    - It will be one of those four ways just shown, and that will then answer what `this` is

**Use Cases**
- allow functions to be re-used against multiple *context* (`me` and `you`) objects, rather than needing a separate version of the function for each object
    - Instead of relying on `this`, you could have explicitly passed in a context object to both

# Prototypes
- When you reference a property on an object, if that property doesn't exist, JavaScript will automatically use that object's internal prototype reference to find another object to look for the property on
    - You could think of this almost as a fallback if the property is missing

- The internal prototype reference linkage from one object to its fallback happens at the time the object is created
    - The simplest way to illustrate it is with a built-in utility called `Object.create(..)`
- a more natural way of applying prototypes is a pattern called "behavior delegation," where you intentionally design your linked objects to be able to *delegate* from one to the other for parts of the needed behavior


**Examples**
```js
var foo = {
    a: 42
};

// create `bar` and link it to `foo`
var bar = Object.create( foo );

bar.b = "hello world";

bar.b;  // "hello world"
bar.a;  // 42 <-- delegated to `foo`
```

It may help to visualize the `foo` and `bar` objects and their relationship:
- The `a` property doesn't actually exist on the `bar` object, but because `bar` is prototype-linked to `foo`, JavaScript automatically falls back to looking for `a` on the `foo` object, where it's found.

### Polyfilling

- The word "polyfill" is an invented term (by Remy Sharp) (https://remysharp.com/2010/10/08/what-is-a-polyfill) used to refer to taking the definition of a newer feature and producing a piece of code that's equivalent to the behavior, but is able to run in older JS environments

# Resources
- [You Don't Know JS: Scope & Closures](https://github.com/getify/You-Dont-Know-JS/blob/master/scope%20&%20closures/README.md#you-dont-know-js-scope--closures)
- [Variables: Scopes, Environments, and Closures](http://speakingjs.com/es5/ch16.html)

# Awesome Vids
[JavaScript is too convenient](https://vimeo.com/267418198?activityReferer=1) -  SCNA - Sam Jones of Test Double