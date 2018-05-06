
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

**Examples**
###### Explicit Conversions
 - Using Number(..) (a built-in function)
###### Implicit Conversions
- comparing two different types with ==
    - "99.99" == 99.99

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
 - **Lexical Scope** (as opposed to Dynamic Scope) - is by far the most common, used by the vast majority of programming languages and is the scope JavaScript applies
    - In JS, each function gets its own scope
    - Only code inside that function can access that function's scoped variables
    - a scope can be nested inside another scope
        - **If one scope is nested inside another, code inside the innermost scope can access variables from either scope**

    - No matter where a function is invoked from, or even how it is invoked, its lexical scope is only defined by where the function was declared
** Dynamic Scope **
- You examine what happens while executing the program (“at runtime”)

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

***Note:*** Global variables are also automatically properties of the global object (window in browsers, etc.)


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

##### Function Scope Bubble
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

# JS Compilation
- despite the fact that JavaScript falls under the general category of "dynamic" or "interpreted" languages, it is in fact a compiled language
- JavaScript engines don't get the luxury (like other language compilers) of having plenty of time to optimize, because JavaScript compilation doesn't happen in a build step ahead of time, as with other languages
    - the compilation that occurs happens, in many cases, mere microseconds (or less!) before the code is executed
    - To ensure the fastest performance, JS engines use all kinds of tricks (like JITs, which lazy compile and even hot re-compile, etc.) which are well beyond the "scope" of our discussion here
    - Let's just say, for simplicity's sake, that any snippet of JavaScript has to be compiled before (usually right before!) it's executed
    - So, the JS compiler will take the program var a = 2; and compile it first, and then be ready to execute it, usually right away

**Examples**
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
##### [eval - details here](js-basics-notes.md)


# Resources
- [You Don't Know JS: Scope & Closures](https://github.com/getify/You-Dont-Know-JS/blob/master/scope%20&%20closures/README.md#you-dont-know-js-scope--closures)
- [Variables: Scopes, Environments, and Closures](http://speakingjs.com/es5/ch16.html)

# Awesome Vids
[JavaScript is too convenient](https://vimeo.com/267418198?activityReferer=1) -  SCNA - Sam Jones of Test Double