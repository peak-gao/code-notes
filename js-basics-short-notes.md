##### Note:
the info in the **You Don't Know JS** sections are shortened notes.  Those are very long and so I've taken what I feel are the best parts and included them in here.  Good for brushing up or preparing for interviews as well.

# You Don't Know JS: Up & Going
## Definitions
#### Statements
- *a group of words, numbers, and operators that performs a specific task*: `a = b * 2`
- a and b are called variables
- 2 is just a value itself, called a literal value, because it stands alone without being stored in a variable
- The = and * characters are operators
#### Expressions
- Statements are made up of one or more expressions
- An expression is any reference to a variable or value, or a set of variable(s) and value(s) combined with operators: `a = b * 2;`
    - This statement has four expressions in it:
        - 2 is a literal value expression
        - b is a variable expression, which means to retrieve its current value
        - b * 2 is an arithmetic expression, which means to do the multiplication
        - a = b * 2 is an assignment expression, which means to assign the result of the b * 2 expression to the variable a (more on assignments later)
#### Types
- JavaScript has built-in types for each of these so called primitive values:
    - When you need to do math, you want a number
    - When you need to print a value on the screen, you need a string (one or more characters, words, sentences)
    - When you need to make a decision in your program, you need a boolean (true or false)
#### Literals
- Values that are included directly in the source code
- string literals are surrounded by double quotes "..." or single quotes ('...') -- the only difference is stylistic preference
- number and boolean literals are just presented as is (i.e., 42, true, etc.)
#### Converting Between Types
- JavaScript calls converting types "coercion" (converting one type to another)
    - there is "explicit" and "implicit" coercion
    - **JS implicit coercion is controversial**:
        - a controversial topic is what happens when you try to compare two values that are not already of the same type, which would require implicit coercion
            - When comparing the string "99.99" to the number 99.99, most people would agree they are equivalent
                - But they're not exactly the same, are they? It's the same value in two different representations, two different types. You could say they're "loosely equal," couldn't you?
                - **To help you out in these common situations, JavaScript will sometimes kick in and implicitly coerce values to the matching types**
                    - if you use the == loose equals operator to make the comparison "99.99" == 99.99, JavaScript will convert the left-hand side "99.99" to its number equivalent 99.99
                    - The comparison then becomes 99.99 == 99.99, which is of course true
                - While designed to help you, implicit coercion can create confusion if you haven't taken the time to learn the rules that govern its behavior
                - Most JS developers never have, so the common feeling is that implicit coercion is confusing and harms programs with unexpected bugs, and should thus be avoided. It's even sometimes called a flaw in the design of the language
                - However, implicit coercion is a mechanism that can be learned, and moreover should be learned by anyone wishing to take JavaScript programming seriously
                - Not only is it not confusing once you learn the rules, it can actually make your programs better! The effort is well worth it
        - **explicit** examples:
            - Using Number(..) (a built-in function)
        - **implicit** examples:
    - JavaScript provides several different facilities for forcibly coercing between types
        - Using Number(..) (a built-in function)

#### Typing and Variables
- **Static typing**, otherwise known as **type enforcement**, is typically cited as a benefit for program correctness by preventing unintended value conversions
- **Weak Typing** - Other languages emphasize types for values instead of variables
    - Weak typing, otherwise known as dynamic typing, allows a variable to hold any type of value at any time
    - It's typically cited as a benefit for program flexibility by allowing a single variable to represent a value no matter what type form that value may take at any given moment in the program's logic flow
- **JavaScript uses dynamic/weak typing**, meaning *variables can hold values of any type without any type enforcement*
#### Constants
- The newest version of JavaScript at the time of this writing (commonly called "ES6") includes a new way to declare constants, by using const instead of var: `const TAX_RATE = 0.08;`
- Constants are just like variables except constants also prevent accidentally changing value somewhere else after the initial setting
- If you tried to assign any different value to TAX_RATE after, your program would reject the change (and in strict mode, fail with an error -- see "Strict Mode" in Chapter 2)
####  Blocks
- in code we often need to group a series of statements together, which we often call a *block*
- In JavaScript, a block is defined by wrapping one or more statements inside a curly-brace pair { .. }

### Scope
(aka ***lexical scope***)
- In JS, each function gets its own scope
- Scope is a collection of variables and the rules for how those variables are accessed by name
- Only code inside that function can access that function's scoped variables
- A variable name has to be unique within the same scope
- a scope can be nested inside another scope
    - **If one scope is nested inside another, code inside the innermost scope can access variables from either scope**
        ```
        function outer() {
        	var a = 1;
        
        	function inner() {
        		var b = 2;
        
        		// we can access both `a` and `b` here
        		console.log( a + b );	// 3
        	}
        
        	inner();
        
        	// we can only access `a` here
        	console.log( a );			// 1
        }
        
        outer();
        ```
        - **Lexical scope** rules say that *code in one scope can access variables of either that scope or any scope outside of it*
            - code inside the inner() function has access to both variables a and b, but code in outer() has access only to a -- it cannot access b because that variable is only inside inner()
        ```
        const TAX_RATE = 0.08;
        
        function calculateFinalPurchaseAmount(amt) {
        	// calculate the new amount with the tax
        	amt = amt + (amt * TAX_RATE);
        
        	// return the new amount
        	return amt;
        }
        ```
        - The TAX_RATE constant (variable) is accessible from inside the calculateFinalPurchaseAmount(..) function, even though we didn't pass it in, because of lexical scope

#### Loops
- while loop & do..while loop illustrate repeating a block of statements until a condition no longer evaluates to true:
    ```
    while (numOfCustomers > 0) {
    	console.log( "How may I help you?" );
    
    	// help the customer...
    
    	numOfCustomers = numOfCustomers - 1;
    }
    
    // versus:
    
    do {
    	console.log( "How may I help you?" );
    
    	// help the customer...
    
    	numOfCustomers = numOfCustomers - 1;
    } while (numOfCustomers > 0);
    ```
    - The only difference between these loops is whether the conditional is tested before the first iteration (while) or after the first iteration (do..while)
    - In either form, if the conditional tests as false, the next iteration will not run
        - That means if the condition is initially false, a while loop will never run, but a do..while loop will run just the first time

# You Don't Know JS: Scope & Closures
# What is Scope?
- One of the most fundamental paradigms of nearly all programming languages is the ability to store values in variables, and later retrieve or modify those values
    - the ability to store values and pull values out of variables is what gives a program state
    - But where do those variables live? where are they stored? how does our program find them when it needs them?
    - there's a well-defined set of rules for storing variables in some location, and for finding those variables at a later time. **We'll call that set of rules: *Scope***
    - ***Where and how do these Scope rules get set***
- despite the fact that JavaScript falls under the general category of "dynamic" or "interpreted" languages, it is in fact a compiled language
    - It is not compiled well in advance, as are many traditionally-compiled languages, nor are the results of compilation portable among various distributed systems
    - The JavaScript engine performs many of the same steps, albeit in more sophisticated ways than we may commonly be aware, of any traditional language-compiler

- In traditional ***compiled-language process*** source code, your program will undergo three steps before it's executed, called "compilation":
1. **Tokenizing/Lexing**
    - breaking up a string of characters into meaningful (to the language) chunks, called tokens
    - For instance, consider the program: var a = 2;
    - This program would likely be broken up into the following tokens: var, a, =, 2, and ;
    - Whitespace may or may not be persisted as a token, depending on whether it's meaningful or not.

        **Note:** The difference between tokenizing and lexing is subtle and academic, but it centers on whether or not these tokens are identified in a stateless or stateful way. Put simply, if the tokenizer were to invoke stateful parsing rules to figure out whether a should be considered a distinct token or just part of another token, that would be lexing.
2. **Parsing**
    - taking a stream (array) of tokens and turning it into a tree of nested elements, which collectively represent the grammatical structure of the program
    - This tree is called an "AST" (Abstract Syntax Tree)
    - The tree for var a = 2; might start with a top-level node called VariableDeclaration, with a child node called Identifier (whose value is a), and another child called AssignmentExpression which itself has a child called NumericLiteral (whose value is 2).
3. **Code-Generation**
    - the process of taking an AST and turning it into executable code
    - This part varies greatly depending on the language, the platform it's targeting, etc.
    - there's a way to take our above described AST for var a = 2; and turn it into a set of machine instructions to actually create a variable called a (including reserving memory, etc.), and then store a value into a

- The **JavaScript engine** *is vastly more complex than just those three steps*, as are most other language compilers
    - in the process of parsing and code-generation, there are certainly steps to optimize the performance of the execution, including collapsing redundant elements, etc.
    - JavaScript engines don't get the luxury (like other language compilers) of having plenty of time to optimize, because JavaScript compilation doesn't happen in a build step ahead of time, as with other languages
    - the compilation that occurs happens, in many cases, mere microseconds (or less!) before the code is executed
    - To ensure the fastest performance, JS engines use all kinds of tricks (like JITs, which lazy compile and even hot re-compile, etc.) which are well beyond the "scope" of our discussion here
    - Let's just say, for simplicity's sake, that any snippet of JavaScript has to be compiled before (usually right before!) it's executed
        - So, the JS compiler will take the program var a = 2; and compile it first, and then be ready to execute it, usually right away
### Understanding Scope
this section is extensive so read about it [here](https://github.com/getify/You-Dont-Know-JS/blob/master/scope%20%26%20closures/ch1.md)
### Nested Scope
- Scope is a set of rules for looking up variables by their identifier name
    - There's usually more than one Scope to consider
- Scope is the set of rules that determines where and how a variable (identifier) can be looked-up
- Just as a block or function is nested inside another block or function, scopes are nested inside other scopes
    - So, if a variable cannot be found in the immediate scope, Engine consults the next outer containing scope, continuing until found or until the outermost (aka, global) scope has been reached
        ```
        function foo(a) {
            console.log( a + b );
        }
        
        var b = 2;
        
        foo( 2 ); // 4
        ```
    - The RHS reference for b cannot be resolved inside the function foo, but it can be resolved in the Scope surrounding it (in this case, the global)
    - The **simple rules for traversing nested Scope**:
        - Engine starts at the currently executing Scope, looks for the variable there, then if not found, keeps going up one level, and so on
        - If the outermost global scope is reached, the search stops, whether it finds the variable or not

            *picture here*
        - You resolve LHS and RHS references by looking on your current scope, and if you don't find it, it goes up to look at the next scope, looking there, then the next, and so on. Once you get to the top scope (the global Scope), you either find what you're looking for, or you don't. But you have to stop regardless
### Lexical Scope
- we defined "scope" as the set of rules that govern how the Engine can look up a variable by its identifier name and find it, either in the current Scope, or in any of the Nested Scopes it's contained within
- There are two predominant models for how scope works:
    - **Lexical Scope** - is by far the most common, used by the vast majority of programming languages and is the scope JavaScript applies
    - **Dynamic Scope**
#### lexing
- scope that is defined at lexing time
    - is based on where variables and blocks of scope are authored, by you, at write time, and thus is (mostly) set in stone by the time the lexer processes your code
- the first traditional phase of a standard language compiler is called lexing (aka, tokenizing)
- the lexing process examines a string of source code characters and assigns semantic meaning to the tokens as a result of some stateful parsing
- It is this concept which provides the foundation to understand what lexical scope is and where the name comes from
- there are some ways to cheat lexical scope, thereby modifying it after the lexer has passed by, but these are frowned upon
    - It is considered best practice to treat lexical scope as, in fact, lexical-only, and thus entirely author-time in nature

 **Example**
 ```
function foo(a) {

    var b = a * 2;

    function bar(c) {
        console.log( a, b, c );
    }

    bar(b * 3);
}

foo( 2 ); // 2 4 12
```
- There are three nested scopes inherent in this code example

    *picture here*
    - Bubble 1 encompasses the global scope, and has just one identifier in it: foo
    - Bubble 2 encompasses the scope of foo, which includes the three identifiers: a, bar and b
    - Bubble 3 encompasses the scope of bar, and it includes just one identifier: c
- Scope bubbles are defined by where the blocks of scope are written, which one is nested inside the other, etc

#### Look-ups
- scope bubbles fully explains to the Engine all the places it needs to look to find an identifier
- In the above code snippet, the Engine executes the console.log(..) statement and goes looking for the three referenced variables a, b, and c
    - It first starts with the innermost scope bubble, the scope of the bar(..) function
    - It won't find a there, so it goes up one level, out to the next nearest scope bubble, the scope of foo(..)
    - It finds a there, and so it uses that a
    - Same thing for b. But c, it does find inside of bar(..)
    - Had there been a c both inside of bar(..) and inside of foo(..), the console.log(..) statement would have found and used the one in bar(..), never getting to the one in foo(..)
- **Scope look-up stops once it finds the first match**
    - The same identifier name can be specified at multiple layers of nested scope, which is called "shadowing" (the inner identifier "shadows" the outer identifier)
    - Regardless of shadowing, scope look-up always starts at the innermost scope being executed at the time, and works its way outward/upward until the first match, and stops

    ***Note:*** Global variables are also automatically properties of the global object (window in browsers, etc.), so it is possible to reference a global variable not directly by its lexical name, but instead indirectly as a property reference of the global object
- No matter where a function is invoked from, or even how it is invoked, its lexical scope is only defined by where the function was declared
- The lexical scope look-up process only applies to first-class identifiers, such as the a, b, and c
- If you had a reference to foo.bar.baz in a piece of code, the lexical scope look-up would apply to finding the foo identifier, but once it locates that variable, object property-access rules take over to resolve the bar and baz properties, respectively
#### Cheating Lexical
- If lexical scope is defined only by where a function is declared, which is entirely an author-time decision, how could there possibly be a way to "modify" (aka, cheat) lexical scope at run-time?
    - JavaScript has two such mechanisms
        - Both of them are equally frowned-upon in the wider community as bad practices to use in your code
        - But the typical arguments against them are often missing the most important point: **cheating lexical scope leads to poorer performance**
##### eval
- The eval(..) function in JavaScript takes a string as an argument, and treats the contents of the string as if it had actually been authored code at that point in the program
    - In other words, you can programmatically generate code inside of your authored code, and run the generated code as if it had been there at author time
- eval(..) allows you to modify the lexical scope environment by cheating and pretending that author-time (aka, lexical) code was there all along
- On subsequent lines of code after an eval(..) has executed, the Engine will not "know" or "care" that the previous code in question was dynamically interpreted and thus modified the lexical scope environment
    - The Engine will simply perform its lexical scope look-ups as it always does
    ```
    function foo(str, a) {
        eval( str ); // cheating!
        console.log( a, b );
    }
    
    var b = 2;
    
    foo( "var b = 3;", 1 ); // 1 3
    ```
    - The string "var b = 3;" is treated, at the point of the eval(..) call, as code that was there all along
    - Because that code happens to declare a new variable b, it modifies the existing lexical scope of foo(..)
        - In fact, as mentioned above, this code actually creates variable b inside of foo(..) that shadows the b that was declared in the outer (global) scope
    - When the console.log(..) call occurs, it finds both a and b in the scope of foo(..), and never finds the outer b
    - Thus, we print out "1 3" instead of "1 2" as would have normally been the case
- By default, if a string of code that eval(..) executes contains one or more declarations (either variables or functions), this action modifies the existing lexical scope in which the eval(..) resides
    - eval(..) can be invoked "indirectly", through various tricks (beyond our discussion here), which causes it to instead execute in the context of the global scope, thus modifying it
    - But in either case, ***eval(..) can at runtime modify an author-time lexical scope***

    **Note:** eval(..) when used in a strict-mode program operates in its own lexical scope, which means declarations made inside of the eval() do not actually modify the enclosing scope.
    ```
    function foo(str) {
       "use strict";
       eval( str );
       console.log( a ); // ReferenceError: a is not defined
    }
    
    foo( "var a = 2" );
    ```
    - There are other facilities in JavaScript which amount to a very similar effect to eval(..):
        - setTimeout(..)
        - setInterval(..)
        - both can take a string for their respective first argument, the contents of which are evaluated as the code of a dynamically-generated function. This is old, legacy behavior and long-since deprecated. Don't do it!
    - The new Function(..) function constructor similarly takes a string of code in its last argument to turn into a dynamically-generated function (the first argument(s), if any, are the named parameters for the new function)
        - This function-constructor syntax is slightly safer than eval(..), but it should still be avoided in your code
### Function vs. Block Scope
- scope consists of a series of "bubbles" that each act as a container or bucket, in which identifiers (variables, functions) are declared
    - These bubbles nest neatly inside each other, and this nesting is defined at author-time
#### Scope From Functions
- **what exactly makes a new bubble?** Is it only the function? Can other structures in JavaScript create bubbles of scope?
- The most common answer to those questions is that JavaScript has function-based scope
    - That is, **each function you declare creates a bubble for itself, but no other structures create their own scope bubbles **
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
- **It doesn't matter *where*** in the scope a declaration appears, the variable or function belongs to the containing scope bubble, regardless
- bar(..) has its own scope bubble. So does the global scope, which has just one identifier attached to it: foo
- Because a, b, c, and bar all belong to the scope bubble of foo(..), they are not accessible outside of foo(..)
- so the following code would all result in ReferenceError errors, as the identifiers are not available to the global scope:
    ```
    bar(); // fails
    console.log( a, b, c ); // all 3 fail
    ```
- However, all these identifiers (a, b, c, foo, and bar) are accessible inside of foo(..), and indeed also available inside of bar(..) (assuming there are no shadow identifier declarations inside bar(..))
- Function scope encourages the idea that all variables belong to the function, and can be used and reused throughout the entirety of the function (and indeed, accessible even to nested scopes)
    - On the other hand, if you don't take careful precautions, variables existing across the entirety of a scope can lead to some unexpected pitfalls
#### Hiding In Plain Scope
- The traditional way of thinking about functions is that you declare a function, and then add code inside it. But the inverse thinking is equally powerful and useful: take any arbitrary section of code you've written, and wrap a function declaration around it, which in effect "hides" the code
- The practical result is to create a **scope bubble** around the code in question
    - means that any declarations (variable or function) in that code will now be tied to the scope of the new wrapping function, rather than the previously enclosing scope
    - so in other words, you can "hide" variables and functions by enclosing them in the scope of a function
- Why would "hiding" variables and functions be a useful technique?
    - There's a variety of reasons motivating this scope-based hiding
    - If all variables and functions were in the global scope, they would of course be accessible to any nested scope. But this would violate the "Least..." principle in that you are (likely) exposing many variables or functions which you should otherwise keep private, as proper use of the code would discourage access to those variables/functions:
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
 #### Collision Avoidance
        - Another benefit of "hiding" variables and functions inside a scope is to avoid unintended collision between two different identifiers with the same name but different intended usages
        - Collision results often in unexpected overwriting of values:
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
  #### Global "Namespaces"
  - A particularly strong example of (likely) variable collision occurs in the global scope
  - Multiple libraries loaded into your program can quite easily collide with each other if they don't properly hide their internal/private functions and variables
  - Such libraries typically will create a single variable declaration, often an object, with a sufficiently unique name, in the global scope
  - This object is then used as a "namespace" for that library, where all specific exposures of functionality are made as properties of that object (namespace), rather than as top-level lexically scoped identifiers themselves
  ```
  var MyReallyCoolLibrary = {
  	awesome: "stuff",
  	doSomething: function() {
  		// ...
  	},
  	doAnotherThing: function() {
  		// ...
  	}
  };
  ```
  #### Module Management
  - Another option for collision avoidance is the more modern "module" approach, using any of various dependency managers
  - Using these tools, no libraries ever add any identifiers to the global scope, but are instead required to have their identifier(s) be explicitly imported into another specific scope through usage of the dependency manager's various mechanisms
  - It should be observed that these tools do not possess "magic" functionality that is exempt from lexical scoping rules
  - They simply use the rules of scoping as explained here to enforce that no identifiers are injected into any shared scope, and are instead kept in private, non-collision-susceptible scopes, which prevents any accidental scope collisions
  - As such, you can code defensively and achieve the same results as the dependency managers do without actually needing to use them, if you so choose. See the Chapter 5 for more information about the module pattern

## Functions As Scopes
- remember that we can take any snippet of code and wrap a function around it, and that effectively "hides" any enclosed variable or function declarations from the outside scope inside that function's inner scope:

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
            - The easiest way to distinguish declaration vs. expression is the position of the word "function" in the statement (not just a line, but a distinct statement). If "function" is the very first thing in the statement, then it's a function declaration. Otherwise, it's a function expression.
            - The key difference we can observe here between a function declaration and a function expression relates to where its name is bound as an identifier
            - Compare the previous two snippets. In the first snippet, the name foo is bound in the enclosing scope, and we call it directly with foo(). In the second snippet, the name foo is not bound in the enclosing scope, but instead is bound only inside of its own function
            - In other words, (function foo(){ .. }) as an expression means the identifier foo is found only in the scope where the .. indicates, not in the outer scope. Hiding the name foo inside itself means it does not pollute the enclosing scope unnecessarily
  ### Anonymous vs. Named
  Anonymous functions are quick and easy to type, and many libraries and tools tend to encourage this idiomatic style of code. However, they have several draw-backs to consider:
1. Anonymous functions have no useful name to display in stack traces, which can make debugging more difficult.

2. Without a name, if the function needs to refer to itself, for recursion, etc., the deprecated arguments.callee reference is unfortunately required. Another example of needing to self-reference is when an event handler function wants to unbind itself after it fires.

3. Anonymous functions omit a name that is often helpful in providing more readable/understandable code. A descriptive name helps self-document the code in question

- Providing a name for your function expression quite effectively addresses all these draw-backs, but has no tangible downsides. The best practice is to always name your function expressions:
```
setTimeout( function timeoutHandler(){ // <-- Look, I have a name!
	console.log( "I waited 1 second!" );
}, 1000 );
```
- IIFE's don't need names, necessarily -- the most common form of IIFE is to use an anonymous function expression. While certainly less common, naming an IIFE has all the aforementioned benefits over anonymous function expressions, so it's a good practice to adopt
```
var a = 2;

(function IIFE(){

	var a = 3;
	console.log( a ); // 3

})();

console.log( a ); // 2
```
- There's a slight variation on the traditional IIFE form, which some prefer: (function(){ .. }()):
    - In the first form above, the function expression is wrapped in ( ), and then the invoking () pair is on the outside right after it
    - In the second form, the invoking () pair is moved to the inside of the outer ( ) wrapping pair
    - It's purely a stylistic choice which you prefer
- Another variation on IIFE's which is quite common is to use the fact that they are, in fact, just function calls, and pass in argument(s)
    ```
    var a = 2;
    
    (function IIFE( global ){
    
    	var a = 3;
    	console.log( a ); // 3
    	console.log( global.a ); // 2
    
    })( window );
    
    console.log( a ); // 2
    ```
    - We pass in the window object reference, but we name the parameter global, so that we have a clear stylistic delineation for global vs. non-global references
- Another application of this pattern addresses the (minor niche) concern that the default undefined identifier might have its value incorrectly overwritten, causing unexpected results
    - By naming a parameter undefined, but not passing any value for that argument, we can guarantee that the undefined identifier is in fact the undefined value in a block of code:
    ```
    undefined = true; // setting a land-mine for other code! avoid!
    
    (function IIFE( undefined ){
    
    	var a;
    	if (a === undefined) {
    		console.log( "Undefined is safe here!" );
    	}
    
    })();
    ```
- another variation of the IIFE inverts the order of things, where the function to execute is given second, after the invocation and parameters to pass to it
    - This pattern is used in the UMD (Universal Module Definition) project. Some people find it a little cleaner to understand, though it is slightly more verbose:
    ```
    var a = 2;
    
    (function IIFE( def ){
    	def( window );
    })(function def( global ){
    
    	var a = 3;
    	console.log( a ); // 3
    	console.log( global.a ); // 2
    
    });
    ```
    - The def function expression is defined in the second-half of the snippet, and then passed as a parameter (also called def) to the IIFE function defined in the first half of the snippet
    - Finally, the parameter def (the function) is invoked, passing window in as the global parameter



# You Don't Know JS: this & Object Prototypes
# You Don't Know JS: Types & Grammar
# immediately invoked function expression (IIFE)
- the fundamental unit of variable scoping in JavaScript has always been the function. If you needed to create a block of scope, the most prevalent way to do so other than a regular function declaration was the immediately invoked function expression (IIFE)
    ```
    var a = 2;
    
    (function IIFE(){
        var a = 3;
        console.log( a )  // 3
    })();
    
    console.log( a );
    ```
- **However, we can now create declarations that are bound to any block, called (unsurprisingly) block scoping**
    - This means all we need is a pair of { .. } to create a scope. Instead of using var, which always declares variables attached to the enclosing function (or global, if top level) scope, use let:
        ```
        var a = 2;
        
        {
            let a = 3;
            console.log( a ); // 3
        }
        
        console.log( a ); // 2
        ```
## Blocks As Scopes
- While functions are the most common, other units of scope are possible, and the usage of these other scope units can lead to even better, cleaner to maintain code

Block Scope Example 1:
```
for (var i=0; i<10; i++) {
	console.log( i );
}
```
- We declare the variable i directly inside the for-loop head, most likely because our intent is to use i only within the context of that for-loop, and essentially ignore the fact that the variable actually scopes itself to the enclosing scope (function or global)
- That's what block-scoping is all about. Declaring variables as close as possible, as local as possible, to where they will be used
Block Scope Example 2:
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
Example 3:
```
for (var i=0; i<10; i++) {
	console.log( i );
}
```
- Why pollute the entire scope of a function with the i variable that is only going to be (or only should be, at least) used for the for-loop?
- Block-scoping (if it were possible) for the i variable would make i available only for the for-loop, causing an error if i is accessed elsewhere in the function
- This helps ensure variables are not re-used in confusing or hard-to-maintain ways
### try/catch
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

### let
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
### Garbage Collection
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
The click function click handler callback doesn't need the someReallyBigData variable at all. That means, theoretically, after process(..) runs, the big memory-heavy data structure could be garbage collected. However, it's quite likely (though implementation dependent) that the JS engine will still have to keep the structure around, since the click function has a closure over the entire scope
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
### const
- also creates a block-scoped variable, but whose value is fixed (constant)
    - Any attempt to change that value at a later time results in an error
        ```
        var foo = true;
        
        if (foo) {
        	var a = 2;
        	const b = 3; // block-scoped to the containing `if`
        
        	a = 3; // just fine!
        	b = 4; // error!
        }
        
        console.log( a ); // 3
        console.log( b ); // ReferenceError!
        ```

# References
- [You Don't Know JS: Up & Going](https://github.com/getify/You-Dont-Know-JS/blob/master/up%20&%20going/README.md#you-dont-know-js-up--going)
- [You Don't Know JS: Scope & Closures](https://github.com/getify/You-Dont-Know-JS/blob/master/scope%20&%20closures/README.md#you-dont-know-js-scope--closures)
- [You Don't Know JS: this & Object Prototypes](https://github.com/getify/You-Dont-Know-JS/blob/master/this%20&%20object%20prototypes/README.md#you-dont-know-js-this--object-prototypes)
- [You Don't Know JS: Types & Grammar](https://github.com/getify/You-Dont-Know-JS/blob/master/types%20&%20grammar/README.md#you-dont-know-js-types--grammar)
- [You Don't Know JS: Async & Performance](https://github.com/getify/You-Dont-Know-JS/blob/master/async%20&%20performance/README.md#you-dont-know-js-async--performance)
- [You Don't Know JS: ES6 & Beyond](https://github.com/getify/You-Dont-Know-JS/blob/master/es6%20&%20beyond/README.md#you-dont-know-js-es6--beyond)
