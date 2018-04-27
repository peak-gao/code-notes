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
