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
- Most useful programs need to track a value as it changes over the course of the program, undergoing different operations as called for by your program's intended tasks
    - The easiest way to go about that in your program is to assign a value to a symbolic container, called a variable -- so called because the value in this container can vary over time as needed
    - In some programming languages, you declare a variable (container) to hold a specific type of value, such as number or string
- **Static typing**, otherwise known as **type enforcement**, is typically cited as a benefit for program correctness by preventing unintended value conversions
- **Weak Typing** - Other languages emphasize types for values instead of variables
    - Weak typing, otherwise known as dynamic typing, allows a variable to hold any type of value at any time
    - It's typically cited as a benefit for program flexibility by allowing a single variable to represent a value no matter what type form that value may take at any given moment in the program's logic flow
- **JavaScript uses dynamic/weak typing**, meaning *variables can hold values of any type without any type enforcement*
#### Constants
- The newest version of JavaScript at the time of this writing (commonly called "ES6") includes a new way to declare constants, by using const instead of var: `const TAX_RATE = 0.08;`
- Constants are useful just like variables with unchanged values, except that constants also prevent accidentally changing value somewhere else after the initial setting
- If you tried to assign any different value to TAX_RATE after that first declaration, your program would reject the change (and in strict mode, fail with an error -- see "Strict Mode" in Chapter 2)
####  Blocks
- in code we often need to group a series of statements together, which we often call a *block*
- In JavaScript, a block is defined by wrapping one or more statements inside a curly-brace pair { .. }

### Scope
(aka ***lexical scope***)
- In JavaScript, each function gets its own scope
- Scope is basically a collection of variables as well as the rules for how those variables are accessed by name
- Only code inside that function can access that function's scoped variables
- A variable name has to be unique within the same scope -- there can't be two different a variables sitting right next to each other. But the same variable name a could appear in different scopes
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
            - So, code inside the inner() function has access to both variables a and b, but code in outer() has access only to a -- it cannot access b because that variable is only inside inner()
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
- the while loop and the do..while loop forms illustrate the concept of repeating a block of statements until a condition no longer evaluates to true:
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
    - The only practical difference between these loops is whether the conditional is tested before the first iteration (while) or after the first iteration (do..while)
    - In either form, if the conditional tests as false, the next iteration will not run
        - That means if the condition is initially false, a while loop will never run, but a do..while loop will run just the first time
- The for loop has three clauses: the initialization clause (var i=0), the conditional test clause (i <= 9), and the update clause (i = i + 1). So if you're going to do counting with your loop iterations, for is a more compact and often easier form to understand and write
- There are other specialized loop forms that are intended to iterate over specific values, such as the properties of an object (see Chapter 2) where the implied conditional test is just whether all the properties have been processed. The "loop until a condition fails" concept holds no matter what the form of the loop

# You Don't Know JS: Scope & Closures
# What is Scope?
- One of the most fundamental paradigms of nearly all programming languages is the ability to store values in variables, and later retrieve or modify those values. In fact, the ability to store values and pull values out of variables is what gives a program state
    - Without such a concept, a program could perform some tasks, but they would be extremely limited and not terribly interesting
    - But the inclusion of variables into our program begets the most interesting questions we will now address: where do those variables live? In other words, where are they stored? And, most importantly, how does our program find them when it needs them?
    - These questions speak to the need for a well-defined set of rules for storing variables in some location, and for finding those variables at a later time. **We'll call that set of rules: *Scope***
    - ***But, where and how do these Scope rules get set?***
- despite the fact that JavaScript falls under the general category of "dynamic" or "interpreted" languages, it is in fact a compiled language
    - It is not compiled well in advance, as are many traditionally-compiled languages, nor are the results of compilation portable among various distributed systems
    - nevertheless, the JavaScript engine performs many of the same steps, albeit in more sophisticated ways than we may commonly be aware, of any traditional language-compiler

- In a traditional ***compiled-language process***, a chunk of source code, your program, will undergo typically three steps before it is executed, roughly called "compilation":
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
    - So, rather than get mired in details, we'll just handwave and say that there's a way to take our above described AST for var a = 2; and turn it into a set of machine instructions to actually create a variable called a (including reserving memory, etc.), and then store a value into a.

    **Note:** The details of how the engine manages system resources are deeper than we will dig, so we'll just take it for granted that the engine is able to create and store variables as needed.
- The **JavaScript engine** *is vastly more complex than just those three steps*, as are most other language compilers
    - in the process of parsing and code-generation, there are certainly steps to optimize the performance of the execution, including collapsing redundant elements, etc.
    - JavaScript engines don't get the luxury (like other language compilers) of having plenty of time to optimize, because JavaScript compilation doesn't happen in a build step ahead of time, as with other languages
    - the compilation that occurs happens, in many cases, mere microseconds (or less!) before the code is executed
    - To ensure the fastest performance, JS engines use all kinds of tricks (like JITs, which lazy compile and even hot re-compile, etc.) which are well beyond the "scope" of our discussion here
    - Let's just say, for simplicity's sake, that any snippet of JavaScript has to be compiled before (usually right before!) it's executed
        - So, the JS compiler will take the program var a = 2; and compile it first, and then be ready to execute it, usually right away
### Understanding Scope
this section is extensive so read about it [here](https://github.com/getify/You-Dont-Know-JS/blob/master/scope%20%26%20closures/ch1.md) if you need to
### Nested Scope
- Scope is a set of rules for looking up variables by their identifier name
    - There's usually more than one Scope to consider, however
- Scope is the set of rules that determines where and how a variable (identifier) can be looked-up
    - This look-up may be for the purposes of assigning to the variable, which is an LHS (left-hand-side) reference, or it may be for the purposes of retrieving its value, which is an RHS (right-hand-side) reference
    - LHS references result from assignment operations. Scope-related assignments can occur either with the = operator or by passing arguments to (assign to) function parameters
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
    - So, revisiting the conversations between Engine and Scope, we'd overhear:

          Engine: "Hey, Scope of foo, ever heard of b? Got an RHS reference for it."
          Scope: "Nope, never heard of it. Go fish."
          Engine: "Hey, Scope outside of foo, oh you're the global Scope, ok cool. Ever heard of b? Got an RHS reference for it."
          Scope: "Yep, sure have. Here ya go."
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
- lexical scope is scope that is defined at lexing time
    - lexical scope is based on where variables and blocks of scope are authored, by you, at write time, and thus is (mostly) set in stone by the time the lexer processes your code
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
    - The bubble for bar is entirely contained within the bubble for foo, because (and only because) that's where we chose to define the function bar
    - Notice that these nested bubbles are strictly nested. We're not talking about Venn diagrams where the bubbles can cross boundaries
        - In other words, no bubble for some function can simultaneously exist (partially) inside two other outer scope bubbles, just as no function can partially be inside each of two parent functions
#### Look-ups
- The structure and relative placement of these scope bubbles fully explains to the Engine all the places it needs to look to find an identifier
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
- Evaluating eval(..) (pun intended) in that light, it should be clear how eval(..) allows you to modify the lexical scope environment by cheating and pretending that author-time (aka, lexical) code was there all along
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
    - Technically, eval(..) can be invoked "indirectly", through various tricks (beyond our discussion here), which causes it to instead execute in the context of the global scope, thus modifying it
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
##### with
- The other frowned-upon (and now deprecated!) feature in JavaScript which cheats lexical scope is the with keyword
- read more about it [here](https://github.com/getify/You-Dont-Know-JS/blob/master/scope%20%26%20closures/ch2.md)
### Function vs. Block Scope
- as we mentioned scope consists of a series of "bubbles" that each act as a container or bucket, in which identifiers (variables, functions) are declared
    - These bubbles nest neatly inside each other, and this nesting is defined at author-time
#### Scope From Functions
- But **what exactly makes a new bubble?** Is it only the function? Can other structures in JavaScript create bubbles of scope?
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
- in this example, the scope bubble for foo(..) includes identifiers a, b, c and bar
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




# References
- [You Don't Know JS: Up & Going](https://github.com/getify/You-Dont-Know-JS/blob/master/up%20&%20going/README.md#you-dont-know-js-up--going)
- [You Don't Know JS: Scope & Closures](https://github.com/getify/You-Dont-Know-JS/blob/master/scope%20&%20closures/README.md#you-dont-know-js-scope--closures)
- [You Don't Know JS: this & Object Prototypes](https://github.com/getify/You-Dont-Know-JS/blob/master/this%20&%20object%20prototypes/README.md#you-dont-know-js-this--object-prototypes)
- [You Don't Know JS: Types & Grammar](You Don't Know JS: Types & Grammar)
- [You Don't Know JS: Async & Performance](https://github.com/getify/You-Dont-Know-JS/blob/master/async%20&%20performance/README.md#you-dont-know-js-async--performance)
- [You Don't Know JS: ES6 & Beyond](https://github.com/getify/You-Dont-Know-JS/blob/master/es6%20&%20beyond/README.md#you-dont-know-js-es6--beyond)
