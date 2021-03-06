
**Note:** I did not add the [appendix stuff](https://github.com/getify/You-Dont-Know-JS/blob/master/scope%20&%20closures/README.md#you-dont-know-js-scope--closures) in here for **scope & closures**

# Chapter 1: `this` Or That?

- this is a special identifier keyword that's automatically defined in the scope of every function
    - what exactly it refers to bedevils even seasoned JavaScript developers
- without lack of clear understanding, `this` can seem downright magical in *your* confusion

## Why `this`?

- why is it even useful? Is it more trouble than it's worth? Before we jump into the *how*, we should examine the *why*.

Let's try to illustrate the motivation and utility of `this`:

```js
function identify() {
    return this.name.toUpperCase();
}

function speak() {
    var greeting = "Hello, I'm " + identify.call( this );
    console.log( greeting );
}

var me = {
    name: "Kyle"
};

var you = {
    name: "Reader"
};

identify.call( me ); // KYLE
identify.call( you ); // READER

speak.call( me ); // Hello, I'm KYLE
speak.call( you ); // Hello, I'm READER
```

- If the *how* of this snippet confuses you, don't worry!, We'll get to that
- we will first look at *why* more clearly
- this code allows the `identify()` and `speak()` functions to be re-used against multiple *context* (`me` and `you`) objects, rather than needing a separate version of the function for each object
- Instead of relying on `this`, you could have explicitly passed in a context object to both `identify()` and `speak()`

```js
function identify(context) {
    return context.name.toUpperCase();
}

function speak(context) {
    var greeting = "Hello, I'm " + identify( context );
    console.log( greeting );
}

identify( you ); // READER
speak( me ); // Hello, I'm KYLE
```
- the `this` mechanism *provides a more elegant way of implicitly "passing along" an **object reference***, leading to c**leaner API design ** and easier **re-use**

The more complex your usage pattern is, the more clearly you'll see that passing context around as an explicit parameter is often messier than passing around a `this` context
- When we explore objects and prototypes, you will see the helpfulness of a collection of functions being able to automatically reference the proper context object.

## Confusions

lets dispel some misconceptions about how it *doesn't* actually work

- "this" creates confusion when developers try to think about it too literally. There are two meanings often assumed, but both are incorrect.

### Itself

The first common temptation is to assume `this` refers to the function itself
- Why would you want to *refer to a function from inside itself*?
- The most common reasons would be things like **recursion** (calling a function from inside itself) or having an **event handler that can unbind itself when it's first called**
- Developers new to JS's mechanisms often think that referencing the function as an object (all functions in JavaScript are objects!) lets you store *state* (values in properties) between function calls
    - While this is possible and has some limited uses, the rest of the book expands on other patterns for *better* places to store state besides the function object
    - But for just a moment, we'll explore that pattern, to illustrate how `this` **doesn't let a function get a reference to itself like we might have assumed**

Example: we attempt to track how many times a function (`foo`) was called:

```js
function foo(num) {
    console.log( "foo: " + num );

    // keep track of how many times `foo` is called
    this.count++;
}

foo.count = 0;

var i;

for (i=0; i<10; i++) {
    if (i > 5) {
      foo( i );
    }
}
// foo: 6
// foo: 7
// foo: 8
// foo: 9

// how many times was `foo` called?
console.log( foo.count ); // 0 -- WTF?
```

`foo.count` is *still* `0`, even though the four `console.log` statements clearly indicate `foo(..)` was in fact called four times
- The frustration stems from a *too literal* interpretation of what `this` (in `this.count++`) means.
- When the code executes `foo.count = 0`, indeed it's adding a property `count` to the function object `foo`
    - But for the `this.count` reference inside of the function, `this` is not in fact pointing *at all* to that function object
    - Even though the property names are the same, the root objects are different, and confusion ensues.

**Note:**
- "If I was incrementing a `count` property but it wasn't the one I expected, which `count` *was* I incrementing?"
    - If you were to di deeper you'd find that you had had accidentally created a global variable `count` (see Chapter 2 for *how* that happened!), and it currently has the value `NaN`
    - Of course, once you identify this outcome, you then have a whole other set of questions: "How was it global, and why did it end up `NaN` instead of some proper count value?" (see Chapter 2).

- answering those tough but important questions, many developers simply avoid the issue altogether, and hack toward some other solution, such as creating another object to hold the `count` property:

    ```js
    function foo(num) {
        console.log( "foo: " + num );
    
        // keep track of how many times `foo` is called
        data.count++;
    }
    
    var data = {
        count: 0
    };
    
    var i;
    
    for (i=0; i<10; i++) {
        if (i > 5) {
            foo( i );
        }
    }
    // foo: 6
    // foo: 7
    // foo: 8
    // foo: 9
    
    // how many times was `foo` called?
    console.log( data.count ); // 4
    ```
    - While it is true that this approach "solves" the problem, unfortunately it simply **ignores the real problem** -- *lack of understanding what `this` means and how it works* and instead *falls back to the comfort zone of a more familiar mechanism: **lexical scope***
    - Lexical scope is a perfectly fine and useful mechanism; But constantly *guessing* at how to use `this`, and usually being *wrong*, is not a good reason to retreat back to lexical scope and never learn *why* `this` eludes you
    - To reference a function object from inside itself, `this` by itself will typically be insufficient
        - You generally need a reference to the function object via a lexical identifier (variable) that points at it

Consider these functions:

```js
function foo() {
    foo.count = 4; // `foo` refers to itself
}

setTimeout( function(){
    // anonymous function (no name), cannot
    // refer to itself
}, 10 );
```
- In the first function, called a "named function", `foo` is a **reference** that *can be used to refer to the function from inside itself*.
- But in the second example, the function **callback** passed to `setTimeout(..)` **has no name identifier** (so called an "anonymous function"), so there's no proper way to refer to the function object itself

Another solution would be to use the `foo` identifier as a function object reference in each place, and not use `this` at all, which *works*:

```js
function foo(num) {
    console.log( "foo: " + num );

    // keep track of how many times `foo` is called
    foo.count++;
}

foo.count = 0;

var i;

for (i=0; i<10; i++) {
    if (i > 5) {
        foo( i );
    }
}
// foo: 6
// foo: 7
// foo: 8
// foo: 9

// how many times was `foo` called?
console.log( foo.count ); // 4
```
- However, this approach also side-steps *actual* understanding of `this` and relies entirely on the lexical scoping of variable `foo`.

Another way of approaching the issue is to force `this` to actually point at the `foo` function object:

```js
function foo(num) {
    console.log( "foo: " + num );

    // keep track of how many times `foo` is called
    // Note: `this` IS actually `foo` now, based on
    // how `foo` is called (see below)
    this.count++;
}

foo.count = 0;

var i;

for (i=0; i<10; i++) {
    if (i > 5) {
        // using `call(..)`, we ensure the `this`
        // points at the function object (`foo`) itself
        foo.call( foo, i );
    }
}
// foo: 6
// foo: 7
// foo: 8
// foo: 9

// how many times was `foo` called?
console.log( foo.count ); // 4
```

**Instead of avoiding `this`, we embrace it.**

### Its Scope

The next most common misconception about the meaning of `this` is that it somehow refers to the **function's scope**. It's a tricky question, because **in one sense there is some truth, but in the other sense, it's quite misguided**.

- `this` does not, in any way, refer to a function's **lexical scope**
    - It is true that internally, scope is kind of like an object with properties for each of the available identifiers
    - But the scope "object" is not accessible to JavaScript code. It's an inner part of the *Engine*'s implementation

Consider code which attempts (and fails!) to cross over the boundary and use `this` to implicitly refer to a function's lexical scope:

```js
function foo() {
  var a = 2;
  this.bar();
}

function bar() {
  console.log( this.a );
}

foo(); //undefined
```

There's more than one mistake in this snippet
- this is real-world code that has been exchanged in public community help forums
- It's a wonderful (if not sad) illustration of just how misguided `this` assumptions can be
- Firstly, an attempt is made to reference the `bar()` function via `this.bar()`
    - It is almost certainly an *accident* that it works, but we'll explain the *how* of that shortly
- The most natural way to have invoked `bar()` would have been to omit the leading `this.` and just make a lexical reference to the identifier
    - However, the developer who writes such code is attempting to use `this` to create a bridge between the lexical scopes of `foo()` and `bar()`, so that `bar()` has access to the variable `a` in the inner scope of `foo()`.
    - ***No such bridge is possible*.** **You cannot use a `this` reference to look something up in a lexical scope**.
    - Every time you feel yourself trying to mix lexical scope look-ups with `this`, remind yourself: *there is no bridge*.

## What's `this`?

lets talk about *how* `this` mechanism really works.

- We said:
    - `this` is not an author-time binding but a runtime binding
    - It is contextual based on the conditions of the function's invocation
    - `this` binding has nothing to do with where a function is declared, but has instead everything to do with the manner in which the function is called

- **When a function is invoked**, an activation record, otherwise known as **an *execution context*, is created**
    - This record contains information about where the function was called from (the call-stack), *how* the function was invoked, what parameters were passed, etc
    - One of the properties of this record is the `this` **reference** which will be *used for the duration of that function's execution*


## Review

- `this` binding is a constant source of confusion. Guesses, trial-and-error, and blind copy-n-paste from Stack Overflow answers is not an effective or proper way to leverage *this* important `this` mechanism.
- To learn `this`, you first have to learn *what* `this` is *not*, despite any assumptions or misconceptions that may lead you down those paths
    - `this` is neither a reference to the function itself
    - nor is it a reference to the function's *lexical* scope.
- `this` is actually a **binding** that is **made when a function is invoked**, and *what* **it references** is **determined entirely by the *call-site* where the function is called**



# `this` All Makes Sense Now!

## Call-site

To understand `this` binding, we have to understand the **call-*site***: the ***location* in code where a function is *called*** (**not where it's declared**)
- We must inspect the call-site to answer the question: what's *this* `this` a reference to?
- Finding the: "go locate where a function is called from"
    - but it's not always that easy; certain coding patterns can obscure the *true* call-site

**call-*stack*** is the stack of functions that have been called to get us to the current moment in execution
    - The call-site we care about is *in* the invocation *before* the currently executing function

Let's demonstrate **call-stack** and **call-*site***:

```js
function baz() {
    // call-stack is: `baz`
    // so, our call-site is in the global scope

    console.log( "baz" );
    bar(); // <-- call-site for `bar`
}

function bar() {
    // call-stack is: `baz` -> `bar`
    // so, our call-site is in `baz`

    console.log( "bar" );
    foo(); // <-- call-site for `foo`
}

function foo() {
    // call-stack is: `baz` -> `bar` -> `foo`
    // so, our call-site is in `bar`

    console.log( "foo" );
}

baz(); // <-- call-site for `baz`
```

- Take care when analyzing code to **find the actual call-*site*** (*from the call-**stack***), because **it's the only thing that matters for `this` binding**

**Note:**

You can visualize a call-stack in your mind by looking at the chain of function calls in order, as we did with the comments in the above snippet
- But this is painstaking and error-prone
- Another way of seeing the call-stack is using a debugger tool in your browser
    - Most modern desktop browsers have built-in developer tools, which includes a JS debugger
    - In the above snippet, you could have set a breakpoint in the tools for the first line of the `foo()` function, or simply inserted the `debugger;` statement on that first line
    - When you run the page, the debugger will pause at this location, and will show you a list of the functions that have been called to get to that line, which will be your call stack
    - So, if you're trying to diagnose `this` binding, use the developer tools to get the call-stack, then find the second item from the top, and that will show you the real call-site

## Nothing But Rules

Next lets talk about *how* the call-*site* **determines where `this` will point during the execution of a function**

- You must **inspect the call-site and determine which of 4 rules applies**
    - We will first explain each of these 4 rules independently, and then we will illustrate their order of precedence, if multiple rules *could* apply to the call-site.

### Default Binding

The first rule comes from the most common case of function calls: **standalone function invocation**
- Think of *this* `this` rule as the **default catch-all rule when none of the other rules apply**

Example:

```js
function foo() {
    console.log( this.a );
}

var a = 2;

foo(); // 2
```

- The first to notice is that **variables declared in the global scope**, as `var a = 2` is, are synonymous with global-object properties of the same name. **They're not copies of each other**, **they *are* each other**. *Think of it as two sides of the same coin*
- Secondly, when `foo()` is called, `this.a` resolves to our global variable `a`
    - Why? Because in this case, **the *default binding* for `this` applies to the function call**, and **so points `this` at the global object**
- How do we know that the *default binding* rule applies here? We **examine the call-site to see how `foo()` is called**
    - In our snippet, `foo()` is called with a plain, un-decorated function reference
    - None of the other rules we will demonstrate will apply here, so the *default binding* applies instead.

If `strict mode` is in effect, the **global object is not eligible for the *default binding*, so the `this` is instead set to `undefined`**.

```js
function foo() {
    "use strict";

    console.log( this.a );
}

var a = 2;

foo(); // TypeError: `this` is `undefined`
```

- An important detail: even though the overall `this` binding rules are entirely based on the call-site, the global object is **only** eligible for the *default binding* if the **contents** of `foo()` are **not** running in `strict mode`; the `strict mode` state of the call-site of `foo()` is irrelevant.

```js
function foo() {
    console.log( this.a );
}

var a = 2;

(function(){
    "use strict";
    foo(); // 2
})();
```

**Note:** Intentionally mixing `strict mode` and non-`strict mode` together in your own code is generally frowned upon
- **Your entire program should probably either be **Strict** or **non-Strict****
    - However, sometimes you include a third-party library that has different **Strict**'ness than your own code, so care must be taken over these subtle compatibility details.

### Implicit Binding

Another rule to consider is: **does the call-site have a *context object***, also referred to as an **owning or containing object**, though *these* alternate terms could be slightly misleading

Consider:

```js
function foo() {
    console.log( this.a );
}

var obj = {
    a: 2,
    foo: foo
};

obj.foo(); // 2
```

- Firstly, notice the manner in which `foo()` is declared and then later added as a reference property onto `obj`
    - Regardless of whether `foo()` is initially declared *on* `obj`, or is added as a reference later (as this snippet shows), in neither case is the **function** really "owned" or "contained" by the `obj` object
    - However, the call-site *uses* the `obj` context to **reference** the function, so you *could* say that the `obj` object "owns" or "contains" the **function reference** at the time the function is called
    - Whatever you choose to call this pattern, at the point that `foo()` is called, it's preceded by an object reference to `obj`
    - **When there is a context object for a function reference, the *implicit binding* rule says that it's *that* object which should be used for the function call's `this` binding**

- Because `obj` is the `this` for the `foo()` call, `this.a` is synonymous with `obj.a`.
- Only the top/last level of an object property reference chain matters to the call-site. For instance:

```js
function foo() {
    console.log( this.a );
}

var obj2 = {
    a: 42,
    foo: foo
};

var obj1 = {
    a: 2,
    obj2: obj2
};

obj1.obj2.foo(); // 42
```

#### Implicitly Lost

One of the most common frustrations that `this` binding creates is when an ***implicitly bound* function loses that binding**, which usually means **it falls back to the *default binding*, of either the global object or `undefined`**, depending on `strict mode`.

Consider:

```js
function foo() {
    console.log( this.a );
}

var obj = {
    a: 2,
    foo: foo
};

var bar = obj.foo; // function reference/alias!
var a = "oops, global"; // `a` also property on global object
bar(); // "oops, global"
```

- Even though `bar` appears to be a reference to `obj.foo`, in fact, it's really just another reference to `foo` itself
- Moreover, the call-site is what matters, and the call-site is `bar()`, which is a plain, un-decorated call and thus the *default binding* applies

The more subtle, more common, and more unexpected way this occurs is when we consider passing a callback function:

```js
function foo() {
    console.log( this.a );
}

function doFoo(fn) {
    // `fn` is just another reference to `foo`
    fn(); // <-- call-site!
}

var obj = {
    a: 2,
    foo: foo
};

var a = "oops, global"; // `a` also property on global object

doFoo( obj.foo ); // "oops, global"
```

- **Parameter passing** is **just an implicit assignment**, and **since we're passing a function, it's an implicit reference assignment**, so the **end result is the same as the previous snippet**
    - What if the function you're passing your callback to is not your own, but built-in to the language? No difference, same outcome

```js
function foo() {
    console.log( this.a );
}

var obj = {
    a: 2,
    foo: foo
};

var a = "oops, global"; // `a` also property on global object
setTimeout( obj.foo, 100 ); // "oops, global"
```

Think about this crude theoretical pseudo-implementation of `setTimeout()` provided as a built-in from the JavaScript environment:

```js
function setTimeout(fn,delay) {
    // wait (somehow) for `delay` milliseconds
    fn(); // <-- call-site!
}
```

- **function commonly lose their callbacks *lose* their `this` binding**, as we've just seen
- another way that `this` can surprise us is when the **function we've passed our callback to intentionally changes the `this` for the call**
    - **Event handlers** in popular JavaScript libraries are quite fond of forcing your callback to have a `this` which points to, for instance, the DOM element that triggered the event
        - While that may sometimes be useful, other times it can be downright infuriating. Unfortunately, these tools rarely let you choose
        - Either way the `this` is changed unexpectedly, you are not really in control of how your callback function reference will be executed, so you have no way (yet) of controlling the call-site to give your intended binding
        - We'll see shortly a way of "fixing" that problem by *fixing* the `this`

### Explicit Binding

With *implicit binding* as we just saw, we **had to mutate the object in question to include a reference on itself to the function**, and **use this property function reference to indirectly (implicitly) bind `this` to the object**

What if you want to force a function call to use a particular object for the `this` binding, without putting a property function reference on the object?

- "All" functions in the language have some utilities available to them (via their `[[Prototype]]` -- more on that later) which can be useful for this task
    - Specifically, functions have `call(..)` and `apply(..)` methods
    - Technically, JavaScript host environments sometimes provide functions which are special enough (a kind way of putting it!) that they do not have such functionality
        - But those are few. The vast majority of functions provided, and certainly all functions you will create, do have access to `call(..)` and `apply(..)`
- How do these utilities work?
    - They both take, as their first parameter, an object to use for the `this`, and then invoke the function with that `this` specified
    - Since you are directly stating what you want the `this` to be, we call it *explicit binding*

Consider:

```js
function foo() {
      console.log( this.a );
}

var obj = {
    a: 2
};

foo.call( obj ); // 2
```

- Invoking `foo` with *explicit binding* by `foo.call(..)` allows us to force its `this` to be `obj`
- If you pass a simple primitive value (of type `string`, `boolean`, or `number`) as the `this` binding, the primitive value is wrapped in its object-form (`new String(..)`, `new Boolean(..)`, or `new Number(..)`, respectively). This is often referred to as **"boxing"**

**Note:** With respect to `this` binding, **`call(..)` and `apply(..)` are identical**. They *do* behave differently with their additional parameters, but that's not something we care about presently

- Unfortunately, ***explicit binding* alone still doesn't offer any solution to the issue** mentioned previously, of **a function "losing" its intended `this` binding**, or just having it paved over by a framework, etc.

#### Hard Binding

But a variation pattern around *explicit binding* actually does the trick. Consider:

```js
function foo() {
    console.log( this.a );
}

var obj = {
    a: 2
};

var   bar = function() {
    foo.call( obj );
};

bar(); // 2
setTimeout( bar, 100 ); // 2

// `bar` hard binds `foo`'s `this` to `obj`
// so that it cannot be overriden
bar.call( window ); // 2
```

Let's examine how this variation works
- We create a function `bar()` which, internally, manually calls `foo.call(obj)`, thereby forcibly invoking `foo` with `obj` binding for `this`
- No matter how you later invoke the function `bar`, it will always manually invoke `foo` with `obj`. This binding is both explicit and strong, so we call it *hard binding*

The most typical way to wrap a function with a *hard binding* **creates a *pass-thru* of any arguments passed** and **any return value received**:

```js
function foo(something) {
    console.log( this.a, something );
    return this.a + something;
}

var obj = {
    a: 2
};

var bar = function() {
    return foo.apply( obj, arguments );
};

var b = bar( 3 ); // 2 3
console.log( b ); // 5
```

Another way to express this pattern is to create a **re-usable helper**:

```js
function foo(something) {
    console.log( this.a, something );
    return this.a + something;
}

// simple `bind` helper
function bind(fn, obj) {
    return function() {
        return fn.apply( obj, arguments );
    };
}

var obj = {
    a: 2
};

var bar = bind( foo, obj );

var b = bar( 3 ); // 2 3
console.log( b ); // 5
```

Since *hard binding* is such a common pattern, it's provided with a built-in utility as of ES5: `Function.prototype.bind`, and it's used like this:

```js
function foo(something) {
    console.log( this.a, something );
    return this.a + something;
}

var obj = {
    a: 2
};

var bar = foo.bind( obj );

var b = bar( 3 ); // 2 3
console.log( b ); // 5
```

- `bind(..)` returns a new function that is hard-coded to call the original function with the `this` context set as you specified.

**Note:** As of ES6, the hard-bound function produced by `bind(..)` has a `.name` property that derives from the original *target function*. For example: `bar = foo.bind(..)` should have a `bar.name` value of `"bound foo"`, which is the function call name that should show up in a stack trace.

#### API Call "Contexts"

Many libraries' functions, and indeed many new built-in functions in the JavaScript language and host environment, provide an optional parameter, usually called "context", which is designed as a work-around for you not having to use `bind(..)` to ensure your callback function uses a particular `this`.

For instance:

```js
function foo(el) {
    console.log( el, this.id );
}

var obj = {
	id: "awesome"
};

// use `obj` as `this` for `foo(..)` calls
[1, 2, 3].forEach( foo, obj ); // 1 awesome  2 awesome  3 awesome
```

- Internally, these various functions almost certainly use *explicit binding* via `call(..)` or `apply(..)`, saving you the trouble

### `new` Binding

The fourth and final rule for `this` binding **requires us to re-think a very common misconception about functions and objects** in JavaScript.

In traditional class-oriented languages, "constructors" are special methods attached to classes, that when the class is instantiated with a `new` operator, the constructor of that class is called. This usually looks something like:

```js
something = new MyClass(..);
```

- JavaScript has a `new` operator, and the code pattern to use it looks basically identical to what we see in those class-oriented languages;
- most developers assume that JavaScript's mechanism is doing something similar. However, ***there really is *no connection* to class-oriented functionality implied by `new` usage in JS***

- let's re-define what a "constructor" in JavaScript is. In JS
    - constructors are **just functions** that happen to be called with the `new` operator in front of them
    - They are not attached to classes, nor are they instantiating a class
    - They are not even special types of functions
    - They're just regular functions that are, in essence, hijacked by the use of `new` in their invocation.

For example, the `Number(..)` function acting as a constructor, quoting from the ES5.1 spec:

> 15.7.2 The Number Constructor
>
> When Number is called as part of a new expression it is a constructor: it initialises the newly created object.

- So, pretty much any function, including the built-in object functions like `Number(..)` can be called with `new` in front of it
- that makes that function call a *constructor call*
- This is an important but subtle distinction: there's really no such thing as "constructor functions", but rather construction calls *of* functions
- When a function is invoked with `new` in front of it, otherwise known as a constructor call, the following things are done automatically:

1. a brand new object is created (aka, constructed) out of thin air
2. *the newly constructed object is `[[Prototype]]`-linked*
3. the newly constructed object is set as the `this` binding for that function call
4. unless the function returns its own alternate **object**, the `new`-invoked function call will *automatically* return the newly constructed object.

We'll skip over step 2 for now and come back to it in Chapter 5

Consider this code:

```js
function foo(a) {
    this.a = a;
}

var bar = new foo( 2 );
console.log( bar.a ); // 2
```

- By calling `foo(..)` with `new` in front of it, we've constructed a new object and set that new object as the `this` for the call of `foo(..)`
- **So `new` is the final way that a function call's `this` can be bound.** We'll call this *new binding*.

## Everything In Order

So, now we've uncovered the 4 rules, *All* you need to do is find the call-site and inspect it to see which rule applies
- But, what if the call-site has multiple eligible rules? There must be an order of precedence to these rules, and so we will next demonstrate what order to apply the rules
- It should be clear that the ***default binding* is the lowest priority rule of the 4**. So we'll just set that one aside.

Which is more precedent, *implicit binding* or *explicit binding*?

Let's test it:

```js
function foo() {
    console.log( this.a );
}

var obj1 = {
    a: 2,
    foo: foo
};

var obj2 = {
    a: 3,
    foo: foo
};

obj1.foo(); // 2
obj2.foo(); // 3

obj1.foo.call( obj2 ); // 3
obj2.foo.call( obj1 ); // 2
```

- ***explicit binding* takes precedence over *implicit binding***
    - which means you should ask **first** if *explicit binding* applies before checking for *implicit binding*

Now, we just need to figure out *where* *new binding* fits in the precedence.

```js
function foo(something) {
    this.a = something;
}

var obj1 = {
    foo: foo
};

var obj2 = {};

obj1.foo( 2 );
console.log( obj1.a ); // 2

obj1.foo.call( obj2, 3 );
console.log( obj2.a ); // 3

var bar = new obj1.foo( 4 );
console.log( obj1.a ); // 2
console.log( bar.a ); // 4
```

- ***new binding* is more precedent than *implicit binding***
    - But do you think *new binding* is more or less precedent than *explicit binding*?

    **Note:** `**new` and `call`/`apply` cannot be used together**, so `new foo.call(obj1)` is not allowed, to test *new binding* directly against *explicit binding*
    - But we can still use a *hard binding* to test the precedence of the two rules.

Before we explore that in a code listing, **think back to how *hard binding* physically works, which is that `Function.prototype.bind(..)` creates a new wrapper function that is hard-coded to ignore its own `this` binding (whatever it may be)**, and use a manual one we provide.

By that reasoning, it would seem obvious to assume that *hard binding* (which is a form of *explicit binding*) is more precedent than *new binding*, and thus cannot be overridden with `new`.

Let's check:

```js
function foo(something) {
    this.a = something;
}

var obj1 = {};

var bar = foo.bind( obj1 );
bar( 2 );
console.log( obj1.a ); // 2

var baz = new bar( 3 );
console.log( obj1.a ); // 2
console.log( baz.a ); // 3
```

- Whoa! `bar` is hard-bound against `obj1`, but `new bar(3)` did **not** change `obj1.a` to be `3` as we would have expected. Instead, the *hard bound* (to `obj1`) call to `bar(..)` ***is*** able to be overridden with `new`
- Since `new` was applied, we got the newly created object back, which we named `baz`, and we see in fact that  `baz.a` has the value `3`.

This should be surprising if you go back to our "fake" bind helper:

```js
function bind(fn, obj) {
    return function() {
        fn.apply( obj, arguments );
    };
}
```

- If you reason about how the helper's code works, it **does not have a way for a `new` operator call to override the hard-binding to `obj` as we just observed**
- But the built-in `Function.prototype.bind(..)` as of ES5 is more sophisticated, quite a bit so in fact. Here is the (slightly reformatted) polyfill provided by the MDN page for `bind(..)`:

```js
if (!Function.prototype.bind) {
    Function.prototype.bind = function(oThis) {
        if (typeof this !== "function") {
            // closest thing possible to the ECMAScript 5
            // internal IsCallable function
            throw new TypeError( "Function.prototype.bind - what " +
                "is trying to be bound is not callable"
            );
        }

        var aArgs = Array.prototype.slice.call( arguments, 1 ),
            fToBind = this,
            fNOP = function(){},
            fBound = function(){
                return fToBind.apply(
                    (
                        this instanceof fNOP &&
                        oThis ? this : oThis
                    ),
                    aArgs.concat( Array.prototype.slice.call( arguments ) )
                );
            }
        ;

        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();

        return fBound;
    };
}
```

**Note:** The **`bind(..)` polyfill** shown above **differs from the built-in `bind(..)`**
- in ES5 with respect to hard-bound functions that will be used with `new` (see below for why that's useful)
- Because the polyfill cannot create a function without a `.prototype` as the built-in utility does, there's some nuanced indirection to approximate the same behavior
- Tread carefully if you plan to use `new` with a hard-bound function and you rely on this polyfill.

The part that's allowing `new` overriding is:

```js
this instanceof fNOP &&
oThis ? this : oThis

// ... and:

fNOP.prototype = this.prototype;
fBound.prototype = new fNOP();
```

We won't actually dive into explaining how this trickery works (it's complicated and beyond our scope here), but essentially **the utility determines whether or not the hard-bound function has been called with `new` (resulting in a newly constructed object being its `this`)**, and **if so**, it **uses *that* newly created `this` rather than the previously specified *hard binding* for `this`**.

Why is `new` being able to override *hard binding* useful?

- The primary reason for this behavior is to create a function (that can be used with `new` for constructing objects) that essentially ignores the `this` *hard binding* but which presets some or all of the function's argument
- One of the capabilities of `bind(..)` is that any arguments passed after the first `this` binding argument are defaulted as standard arguments to the underlying function (technically called "partial application", which is a subset of "currying").

For example:

```js
function foo(p1,p2) {
    this.val = p1 + p2;
}

// using `null` here because we don't care about
// the `this` hard-binding in this scenario, and
// it will be overridden by the `new` call anyway!
var bar = foo.bind( null, "p1" );

var baz = new bar( "p2" );

baz.val; // p1p2
```

### Determining `this`

Now, we can summarize the rules for determining `this` from a **function call's call-site**, in their **order of precedence**.

**Ask these questions in this order, and stop when the first rule applies**:

1. **Is the function called with `new`** (**new binding**)? If so, `this` is the newly constructed object.

    `var bar = new foo()`

2. **Is the function called with `call` or `apply`** (**explicit binding**), even hidden inside a `bind` *hard binding*? If so, `this` is the explicitly specified object.

    `var bar = foo.call( obj2 )`

3. **Is the function called with a *context*** (**implicit binding**), otherwise known as an owning or containing object? If so, `this` is *that* context object.

    `var bar = obj1.foo()`

4. Otherwise, **default the `this`** (**default binding**). If in `strict mode`, pick `undefined`, otherwise pick the `global` object.

    `var bar = foo()`

**That's it.** **That's *all it takes* to understand the rules of `this` binding for normal function calls**. Well... almost.

## Binding Exceptions

As usual, there are some ***exceptions* to the "rules"**.

- The `this`-binding behavior can in some scenarios be surprising, where you intended a different binding but you end up with binding behavior from the *default binding* rule (see previous).

### Ignored `this`

- If you pass `null` or `undefined` as a `this` binding parameter to `call`, `apply`, or `bind`, those values are effectively ignored, and instead the *default binding* rule applies to the invocation

```js
function foo() {
    console.log( this.a );
}

var a = 2;

foo.call( null ); // 2
```

Why would you intentionally pass something like `null` for a `this` binding?

- It's quite common to use `apply(..)` for spreading out arrays of values as parameters to a function call. Similarly, `bind(..)` can curry parameters (pre-set values), which can be very helpful.

```js
function foo(a,b) {
    console.log( "a:" + a + ", b:" + b );
}

// spreading out array as parameters
foo.apply( null, [2, 3] ); // a:2, b:3

// currying with `bind(..)`
var bar = foo.bind( null, 2 );
bar( 3 ); // a:2, b:3
```

- Both these utilities require a `this` binding for the first parameter. If the functions in question don't care about `this`, you need a placeholder value, and `null` might seem like a reasonable choice as shown in this snippet

    **Note:** We don't cover it in this book, but ES6 has the `...` spread operator which will let you syntactically "spread out" an array as parameters without needing `apply(..)`, such as `foo(...[1,2])`, which amounts to `foo(1,2)` -- syntactically avoiding a `this` binding if it's unnecessary. Unfortunately, there's no ES6 syntactic substitute for currying, so the `this` parameter of the `bind(..)` call still needs attention.

- However, there's a slight hidden "danger" in always using `null` when you don't care about the `this` binding
    - If you ever use that against a function call (for instance, a third-party library function that you don't control), and that function *does* make a `this` reference, the *default binding* rule means it might inadvertently reference (or worse, mutate!) the `global` object (`window` in the browser)
- such a pitfall can lead to a variety of *very difficult* to diagnose/track-down bugs.

#### Safer `this`

- a somewhat "safer" practice is to **pass a specifically set up object for `this` which is guaranteed not to be an object that can create problematic side effects in your program**
    - Borrowing terminology from networking (and the military), we can create a "DMZ" (de-militarized zone) object -- nothing more special than a completely empty, non-delegated (see Chapters 5 and 6) object.

- If we always pass a DMZ object for ignored `this` bindings we don't think we need to care about, we're sure any hidden/unexpected usage of `this` will be restricted to the empty object, which insulates our program's `global` object from side-effects.

- Since this object is totally empty, I personally like to give it the variable name `ø` (the lowercase mathematical symbol for the empty set)
    - On many keyboards (like US-layout on Mac), this symbol is easily typed with `⌥`+`o` (option+`o`). Some systems also let you set up hotkeys for specific symbols
    - If you don't like the `ø` symbol, or your keyboard doesn't make that as easy to type, you can of course call it whatever you want.

- Whatever you call it, **the easiest way to set it up as **totally empty** is `Object.create(null)`** (see Chapter 5). **`Object.create(null)` is similar to `{ }`, but without the delegation to `Object.prototype`**, so it's **"more empty" than just `{ }`**

```js
function foo(a,b) {
    console.log( "a:" + a + ", b:" + b );
}

// our DMZ empty object
var ø = Object.create( null );

// spreading out array as parameters
foo.apply( ø, [2, 3] ); // a:2, b:3

// currying with `bind(..)`
var bar = foo.bind( ø, 2 );
bar( 3 ); // a:2, b:3
```

- Not only functionally "safer", there's a sort of stylistic benefit to `ø`, in that it semantically conveys "I want the `this` to be empty" a little more clearly than `null` might
    - But again, name your DMZ object whatever you prefer

### Indirection

Another thing to be aware of is you can (intentionally or not!) create "indirect references" to functions, and in those cases, when that function reference is invoked, the *default binding* rule also applies.

One of the most common ways that ***indirect references* occur is from an assignment**:

```js
function foo() {
    console.log( this.a );
}

var a = 2;
var o = { a: 3, foo: foo };
var p = { a: 4 };

o.foo(); // 3
(p.foo = o.foo)(); // 2
```

- The *result value* of the assignment expression `p.foo = o.foo` is a reference to just the underlying function object
    - As such, the effective call-site is just `foo()`, not `p.foo()` or `o.foo()` as you might expect. Per the rules above, the *default binding* rule applies.

**Reminder**: regardless of how you get to a function invocation using the *default binding* rule, the `strict mode` status of the **contents** of the invoked function making the `this` reference -- not the function call-site -- determines the *default binding* value: either the `global` object if in non-`strict mode` or `undefined` if in `strict mode`.

### Softening Binding

We saw earlier that *hard binding* was one strategy for preventing a function call falling back to the *default binding* rule inadvertently, by forcing it to be bound to a specific `this` (unless you use `new` to override it!)
- The problem is, *hard-binding* greatly reduces the flexibility of a function, preventing manual `this` override with either the *implicit binding* or even subsequent *explicit binding* attempts.

- It would be nice if there was a way to provide a different default for *default binding* (not `global` or `undefined`), while still leaving the function able to be manually `this` bound via *implicit binding* or *explicit binding* techniques.

We can construct a so-called ***soft binding* utility** which emulates our desired behavior.

```js
if (!Function.prototype.softBind) {
    Function.prototype.softBind = function(obj) {
        var fn = this,
            curried = [].slice.call( arguments, 1 ),
            bound = function bound() {
                return fn.apply(
                    (!this ||
                        (typeof window !== "undefined" &&
                            this === window) ||
                        (typeof global !== "undefined" &&
                            this === global)
                    ) ? obj : this,
                    curried.concat.apply( curried, arguments )
                );
            };
        bound.prototype = Object.create( fn.prototype );
        return bound;
	};
}
```

- The `softBind(..)` utility provided here works similarly to the built-in ES5 `bind(..)` utility, except with our *soft binding* behavior
- It wraps the specified function in logic that checks the `this` at call-time and if it's `global` or `undefined`, uses a pre-specified alternate *default* (`obj`). Otherwise the `this` is left untouched. It also provides optional currying (see the `bind(..)` discussion earlier).

Let's demonstrate its usage:

```js
function foo() {
    console.log("name: " + this.name);
}

var obj = { name: "obj" },
    obj2 = { name: "obj2" },
    obj3 = { name: "obj3" };

var fooOBJ = foo.softBind( obj );

fooOBJ(); // name: obj

obj2.foo = foo.softBind(obj);
obj2.foo(); // name: obj2   <---- look!!!

fooOBJ.call( obj3 ); // name: obj3   <---- look!

setTimeout( obj2.foo, 10 ); // name: obj   <---- falls back to soft-binding
```

- The soft-bound version of the `foo()` function can be manually `this`-bound to `obj2` or `obj3` as shown, but it falls back to `obj` if the *default binding* would otherwise apply.

## Lexical `this`

Normal functions abide by the 4 rules we just covered. But **ES6 introduces a special kind of function that does not use these rules: *arrow-function***.

- Arrow-functions are signified not by the `function` keyword, but by the `=>` so called "fat arrow" operator
- **Instead of using the four standard `this` rules**, **arrow-functions adopt the `this` binding from the enclosing** (function or global) **scope**

Let's illustrate arrow-function lexical scope:

```js
function foo() {
    // return an arrow function
    return (a) => {
        // `this` here is lexically adopted from `foo()`
        console.log( this.a );
    };
}

var obj1 = {
    a: 2
};

var obj2 = {
    a: 3
};

var bar = foo.call( obj1 );
bar.call( obj2 ); // 2, not 3!
```
- The arrow-function created in `foo()` lexically captures whatever `foo()`s `this` is at its call-time
- Since `foo()` was `this`-bound to `obj1`, `bar` (a reference to the returned arrow-function) will also be `this`-bound to `obj1`
- The lexical binding of an arrow-function cannot be overridden (even with `new`!).

The **most common use-case** will likely be in the **use of callbacks**, such as **event handlers** or **timers**:

```js
function foo() {
    setTimeout(() => {
        // `this` here is lexically adopted from `foo()`
        console.log( this.a );
    },100);
}

var obj = {
    a: 2
};

foo.call( obj ); // 2
```

- While arrow-functions provide an alternative to using `bind(..)` on a function to ensure its `this`, which can seem attractive, it's important to note that they essentially are disabling the traditional `this` mechanism in favor of more widely-understood lexical scoping
- Pre-ES6, we already have a fairly common pattern for doing so, which is basically almost indistinguishable from the spirit of ES6 arrow-functions:

```js
function foo() {
    var self = this; // lexical capture of `this`
    setTimeout( function(){
        console.log( self.a );
    }, 100 );
}

var obj = {
    a: 2
};

foo.call( obj ); // 2
```

-** *While `self = this` and arrow-functions both seem like good "solutions" to not wanting to use `bind(..)`, they are essentially fleeing from `this` instead of understanding and embracing it***
    - If you find yourself writing `this`-style code, but most or all the time, you defeat the `this` mechanism with lexical `self = this` or arrow-function "tricks", perhaps you should either:

1. Use only **lexical scope** and **forget the false pretense of `this`-style code**

2. **Embrace `this`-style mechanisms completely**, **including using `bind(..)` where necessary**, and try to **avoid `self = this` and arrow-function "lexical this" tricks**

A program can effectively use both styles of code (lexical and `this`), but inside of the same function, and indeed for the same sorts of look-ups, mixing the two mechanisms is usually asking for harder-to-maintain code, and probably working too hard to be clever.

## Review on this Binding

Determining the `this` binding for an executing function requires **finding the direct call-site of that function**. Once examined, **four rules can be applied to the call-site**, in *this* order of precedence:

1. **Called with `new`?** *Use the newly constructed object*

2. **Called with `call` or `apply` (or `bind`)?** *Use the specified object*

3. **Called with a context object owning the call?** *Use that context object*

4. **Default: `undefined` in `strict mode`, global object otherwise**

- Be careful of accidental/unintentional invoking of the *default binding* rule
- In cases where you want to "safely" ignore a `this` binding, a "DMZ" object like `ø = Object.create(null)` is a good placeholder value that protects the `global` object from unintended side-effects.

- Instead of the four standard binding rules, ES6 arrow-functions use lexical scoping for `this` binding, which means they adopt the `this` binding (whatever it is) from its enclosing function call
    - They are essentially a syntactic replacement of `self = this` in pre-ES6 coding

# Objects

In Chapters 1 and 2, we explained how the `this` binding points to various objects depending on the call-site of the function invocation.

But **what exactly are objects**, and **why do we need to point to them**? We will explore objects in detail in this chapter.

## Syntax

Objects come in two forms:
- **declarative** (*literal*) form
- **constructed** form

The **literal** syntax for an object looks like this:

```js
var myObj = {
    key: value
    // ...
};
```

The **constructed** form looks like this:

```js
var myObj = new Object();
myObj.key = value;
```

- The **constructed** form and the **literal** form ***result in exactly the same sort of object***
- The **only difference really is that you can add one or more key/value pairs to the literal declaration**, whereas with **constructed-form objects**, you **must add the properties one-by-one**

**Note:** **It's extremely uncommon to use the "constructed form" for creating objects as just shown**. You would ***pretty much always want to use the literal syntax form***. The same will be true of most of the built-in objects (see below).

## Type

**Objects** are the general **building block upon which much of JS is built**. They are *one of the 6 primary types* (called "language types" in the specification) in JS:

* `string`
* `number`
* `boolean`
* `null`
* `undefined`
* `object`

Note that the *simple primitives* (`string`, `number`, `boolean`, `null`, and `undefined`) are **not** themselves `objects`. `null` is *sometimes referred to as an object type*, but **this misconception stems from a bug in the language which causes `typeof null` to return the string `"object"` incorrectly** (and confusingly). In fact, **`null` is its own primitive type**

**It's a common mis-statement that "everything in JavaScript is an object". This is clearly not true.**

By contrast, there *are* a few **special object *****sub-types***, which we can refer to as ***complex** primitives*.

- `function` is a sub-type of object (technically, a "callable object"). Functions in JS are said to be "first class" in that they are basically just normal objects (with callable behavior semantics bolted on), and so they can be handled like any other plain object.

- **Arrays** are also a form of **objects, *with extra behavior***
    - The organization of contents in arrays is slightly more structured than for general objects

### Built-in Objects

There are several **other** object **sub-types**, usually referred to as **built-in** objects

- For some of them, their names seem to imply they are directly related to their simple primitives counter-parts, but in fact, their relationship is more complicated, which we'll explore shortly

* `String`
* `Number`
* `Boolean`
* `Object`
* `Function`
* `Array`
* `Date`
* `RegExp`
* `Error`

These built-ins **have the appearance of being actual types**, even classes, if you rely on the similarity to other languages such as Java's `String` class

**But** in JS, **these are actually just built-in *functions***
- Each of these built-in functions can be used as a constructor (that is, a function call with the `new` operator -- see Chapter 2), with the result being a newly *constructed* object of the sub-type in question. For instance:

```js
var strPrimitive = "I am a string";
typeof strPrimitive;							// "string"
strPrimitive instanceof String;					// false

var strObject = new String( "I am a string" );
typeof strObject; 								// "object"
strObject instanceof String;					// true

// inspect the object sub-type
Object.prototype.toString.call( strObject );	// [object String]
```

- We'll see in detail in a later chapter exactly how the `Object.prototype.toString...` bit works, but briefly, we can inspect the internal sub-type by borrowing the base default `toString()` method, and you can see it reveals that `strObject` is an object that was in fact created by the `String` constructor.

- The primitive value `"I am a string"` is not an object, it's a primitive literal and immutable value. To perform operations on it, such as checking its length, accessing its individual character contents, etc, a `String` object is required.

- Luckily, the language automatically coerces a `"string"` primitive to a `String` object when necessary, which means you almost never need to explicitly create the Object form. It is **strongly preferred** by the majority of the JS community to use the literal form for a value, where possible, rather than the constructed object form.

Consider:

```js
var strPrimitive = "I am a string";
console.log( strPrimitive.length ); // 13
console.log( strPrimitive.charAt( 3 ) );  // "m"
```

- In both cases, *we call a property or method on a string primitive*, and the **engine automatically coerces it to a `String` object**, *so that the property/method access works*
- The same sort of coercion happens between the number literal primitive `42` and the `new Number(42)` object wrapper, when using methods like `42.359.toFixed(2)`
    - Likewise for `Boolean` objects from `"boolean"` primitives.
- **`null` and `undefined` have no object wrapper form**, **only their *primitive values***. By contrast, `Date` values can *only* be created with their constructed object form, as they have no literal form counter-part.
- **`Object`s, `Array`s, `Function`s, and `RegExp`s** (regular expressions) **are all objects** regardless of whether the literal or constructed form is used. The constructed form does offer, in some cases, more options in creation than the literal form counterpart. Since objects are created either way, the simpler literal form is almost universally preferred. **Only use the constructed form if you need the extra options.**
- **`Error` objects** are rarely created explicitly in code, but *usually created automatically when exceptions are thrown*
    - They can be created with the constructed form `new Error(..)`, but it's often unnecessary.

## Contents

As mentioned earlier, the **contents of an object consist of values** (any type) **stored at specifically named *locations*, which we call *properties***

*It's important to note that while we say "contents" which implies that these values are *actually* stored inside the object, that's merely an appearance*. The **engine stores values in implementation-dependent ways**, and **may very well not store them *in* some object container**
- What **is* stored in the container* are these **property names**, which ***act as pointers*** (technically, *references*) *to where the values are stored*

Consider:

```js
var myObject = {
    a: 2
};

myObject.a;		// 2
myObject["a"];	// 2
```

- To access the value at the *location* `a` in `myObject`, we need to use either the `.` operator or the `[ ]` operator.
    - The `.a` syntax is usually referred to as "property" access, whereas the `["a"]` syntax is usually referred to as "key" access
    - In reality, they both access the same *location*, and will pull out the same value, `2`, so the terms can be used interchangeably
    - We will use the most common term, "property access" from here on

- The main difference between the two syntaxes is that the `.` operator requires an `Identifier` compatible property name after it, whereas the `[".."]` syntax can take basically any UTF-8/unicode compatible string as the name for the property
    - To reference a property of the name "Super-Fun!", for instance, you would have to use the `["Super-Fun!"]` access syntax, as `Super-Fun!` is not a valid `Identifier` property name.

- Also, since the `[".."]` syntax uses a string's **value** to specify the location, this means the program can programmatically build up the value of the string, such as:

```js
var wantA = true;
var myObject = {
    a: 2
};

var idx;

if (wantA) {
    idx = "a";
}

// later

console.log( myObject[idx] ); // 2
```

- In objects, **property names are **always** strings**
    - If you use any other value besides a `string` (primitive) as the property, it will first be converted to a string.
    - This even includes numbers, which are commonly used as array indexes, so be careful not to confuse the use of numbers between objects and arrays.

```js
var myObject = { };

myObject[true] = "foo";
myObject[3] = "bar";
myObject[myObject] = "baz";

myObject["true"];				// "foo"
myObject["3"];					// "bar"
myObject["[object Object]"];	// "baz"
```

### Computed Property Names

The `myObject[..]` property access syntax we just described is useful if you need to use a computed expression value *as* the key name, like `myObject[prefix + name]`
- But that's not really helpful when declaring objects using the object-literal syntax.
- ES6 adds *computed property names*, where you can specify an expression, surrounded by a `[ ]` pair, in the key-name position of an object-literal declaration:

    ```js
    var prefix = "foo";
    
    var myObject = {
        [prefix + "bar"]: "hello",
        [prefix + "baz"]: "world"
    };
    
    myObject["foobar"]; // hello
    myObject["foobaz"]; // world
    ```

- The most common usage of *computed property names* will probably be for ES6 `Symbol`s, which we will not be covering in detail in this book
    - In short, they're a new primitive data type which has an opaque unguessable value (technically a `string` value)
    - You will be strongly discouraged from working with the *actual value* of a `Symbol` (which can theoretically be different between different JS engines), so the name of the `Symbol`, like `Symbol.Something` (just a made up name!), will be what you use:

    ```js
    var myObject = {
        [Symbol.Something]: "hello world"
    };
    ```

### Property vs. Method

Some developers like to make a distinction when talking about a property access on an object, if the value being accessed happens to be a function
- Because it's tempting to think of the function as *belonging* to the object, and in other languages, functions which belong to objects (aka, "classes") are referred to as "methods", it's not uncommon to hear, "method access" as opposed to "property access".

**The specification makes this same distinction**, interestingly.

Technically, **functions never "belong" to objects**, so **saying that a function that just happens to be accessed on an object reference is automatically a "method" seems a bit of a stretch of semantics**.

- It *is* true that **some functions have `this` references in them**, and that ***sometimes* these `this` references refer to the object reference at the call-site**
    - But this usage really does not make that function any more a "method" than any other function, as `this` is dynamically bound at run-time, at the call-site, and thus its relationship to the object is indirect, at best

- Every time you access a property on an object, that is a **property access**, regardless of the type of value you get back
    - If you *happen* to get a function from that property access, it's not magically a "method" at that point. There's nothing special (outside of possible implicit `this` binding as explained earlier) about a function that comes from a property access

For instance:

```js
function foo() {
    console.log( "foo" );
}

var someFoo = foo;	// variable reference to `foo`

var myObject = {
    someFoo: foo
};

foo;				// function foo(){..}
someFoo;			// function foo(){..}
myObject.someFoo;	// function foo(){..}
```

- `someFoo` and `myObject.someFoo` are just two separate references to the same function, and neither implies anything about the function being special or "owned" by any other object
    - If `foo()` above was defined to have a `this` reference inside it, that `myObject.someFoo` *implicit binding* would be the **only** observable difference between the two references. Neither reference really makes sense to be called a "method"

**Perhaps one could argue** that a function *becomes a method*, not at definition time, but during run-time just for that invocation, depending on how it's called at its call-site (with an object reference context or not -- see Chapter 2 for more details). Even this interpretation is a bit of a stretch

The safest conclusion is probably that **"function" and "method" are interchangeable in JavaScript**.

**Note:** **ES6 adds a `super` reference**, which is typically going to be used with `class` (see Appendix A)
- The way `super` behaves (**static binding** rather than **late binding as `this`**) gives further weight to the idea that **a function which is `super` bound somewhere is more a "method" than "function"**
- But again, these are just subtle semantic (and mechanical) nuances

**Even when you declare a function expression as part of the object-literal**, **that function doesn't magically *belong* more to the object** -- still **just multiple references to the same function object**:

```js
var myObject = {
    foo: function foo() {
        console.log( "foo" );
    }
};

var someFoo = myObject.foo;
someFoo;		// function foo(){..}
myObject.foo;	// function foo(){..}
```

### Arrays

Arrays also use the `[ ]` access form, but as mentioned above, **they have slightly more structured organization for how and where values are stored** (though still no restriction on what *type* of values are stored)
- Arrays **assume *numeric indexing***, which means that **values are stored in locations, usually called *indices*, at non-negative integers**, such as `0` and `42`.

```js
var myArray = [ "foo", 42, "bar" ];
myArray.length;		// 3
myArray[0];			// "foo"
myArray[2];			// "bar"
```

***Arrays *are* objects***, so **even though each index is a positive integer, you can *also* add properties onto the array**:

```js
var myArray = [ "foo", 42, "bar" ];
myArray.baz = "baz";
myArray.length;	// 3
myArray.baz;	// "baz"
```

Notice that ***adding named properties (regardless of `.` or `[ ]` operator syntax) does not change the reported `length` of the array***.

You *could* use an array as a plain key/value object, and never add any numeric indices, but this is a bad idea because arrays have behavior and optimizations specific to their intended use, and likewise with plain objects
- Use objects to store key/value pairs, and arrays to store values at numeric indices.

**Be careful:** If you try to add a property to an array, but the property name *looks* like a number, it will end up instead as a numeric index (thus modifying the array contents):

```js
var myArray = [ "foo", 42, "bar" ];
myArray["3"] = "baz";
myArray.length;	// 4
myArray[3];		// "baz"
```

### Duplicating Objects

One of the most commonly requested features when developers newly take up the JavaScript language is how to duplicate an object. It would seem like there should just be a built-in `copy()` method, right? It turns out that it's a little more complicated than that, because it's not fully clear what, by default, should be the algorithm for the duplication.

For example, consider this object:

```js
function anotherFunction() { /*..*/ }

var anotherObject = {
    c: true
};

var anotherArray = [];

var myObject = {
    a: 2,
    b: anotherObject,	// reference, not a copy!
    c: anotherArray,	// another reference!
    d: anotherFunction
};

anotherArray.push( anotherObject, myObject );
```

What exactly should be the representation of a *copy* of `myObject`?

- Firstly, we should answer if it should be a *shallow* or *deep* copy
    - A *shallow copy* would end up with `a` on the new object as a copy of the value `2`, but `b`, `c`, and `d` properties as just references to the same places as the references in the original object
    - A *deep copy* would duplicate not only `myObject`, but `anotherObject` and `anotherArray`
    - But then we have issues that `anotherArray` has references to `anotherObject` and `myObject` in it, so *those* should also be duplicated rather than reference-preserved
    - Now we have an infinite circular duplication problem because of the circular reference

- Should we detect a circular reference and just break the circular traversal (leaving the deep element not fully duplicated)? Should we error out completely? Something in between?

- Moreover, it's not really clear what "duplicating" a function would mean? There are some hacks like pulling out the `toString()` serialization of a function's source code (which varies across implementations and is not even reliable in all engines depending on the type of function being inspected)

- So how do we resolve all these tricky questions? Various JS frameworks have each picked their own interpretations and made their own decision
    - But which of these (if any) should JS adopt as *the* standard? For a long time, there was no clear answer.

- One subset solution is that **objects which are JSON-safe** (that is, can be serialized to a JSON string and then re-parsed to an object with the same structure and values) **can easily be *duplicated* with:**

```js
var newObj = JSON.parse( JSON.stringify( someObj ) );
```

Of course, that **requires you to ensure your object is JSON safe**. For some situations, that's trivial. For others, it's insufficient.

At the same time, a **shallow copy** is fairly understandable and **has far less issues**, so **ES6 has now defined `Object.assign(..)` for this task. `Object.assign(..)`**
- takes a *target* object as its first parameter, and one or more *source* objects as its subsequent parameters
- It **iterates over all the *enumerable*** (see below), ***owned keys*** (**immediately present**) on the ***source* object(s)** and **copies them (via `=` assignment only) to *target***. It also, helpfully, **returns *target***, as you can see below:

```js
var newObj = Object.assign( {}, myObject );

newObj.a;						// 2
newObj.b === anotherObject;		// true
newObj.c === anotherArray;		// true
newObj.d === anotherFunction;	// true
```

**Note:** In the next section, we describe **"property descriptors"** (property characteristics) and show the use of `Object.defineProperty(..)`
- The duplication that occurs for `Object.assign(..)` however is purely `=` style assignment, so any special characteristics of a property (like `writable`) on a source object **are not preserved** on the target object.

### Property Descriptors

Prior to ES5, the JavaScript language gave no direct way for your code to inspect or draw any distinction between the characteristics of properties, such as whether the property was read-only or not.

But as of ES5, all properties are described in terms of a **property descriptor**.

Consider this code:

```js
var myObject = {
	a: 2
};

Object.getOwnPropertyDescriptor( myObject, "a" );
// {
//    value: 2,
//    writable: true,
//    enumerable: true,
//    configurable: true
// }
```

As you can see, the property descriptor (called a "data descriptor" since it's only for holding a data value) for our normal object property `a` is much more than just its `value` of `2`. It includes 3 other characteristics: `writable`, `enumerable`, and `configurable`.

While we can see what the default values for the property descriptor characteristics are when we create a normal property, we can use `Object.defineProperty(..)` to add a new property, or modify an existing one (if it's `configurable`!), with the desired characteristics.

For example:

```js
var myObject = {};

Object.defineProperty( myObject, "a", {
    value: 2,
    writable: true,
    configurable: true,
    enumerable: true
} );

myObject.a; // 2
```

- Using `defineProperty(..)`, we added the plain, normal `a` property to `myObject` in a manually explicit way. However, you generally wouldn't use this manual approach unless you wanted to modify one of the descriptor characteristics from its normal behavior

#### Writable

The ability for you to change the value of a property is controlled by `writable`.

Consider:

```js
var myObject = {};

Object.defineProperty( myObject, "a", {
    value: 2,
    writable: false, // not writable!
    configurable: true,
    enumerable: true
} );

myObject.a = 3;
myObject.a; // 2
```

As you can see, our modification of the `value` silently failed. If we try in `strict mode`, we get an error:

```js
"use strict";

var myObject = {};

Object.defineProperty( myObject, "a", {
    value: 2,
    writable: false, // not writable!
    configurable: true,
    enumerable: true
} );

myObject.a = 3; // TypeError
```

The `TypeError` tells us we cannot change a non-writable property.

**Note:** We will discuss getters/setters shortly, but briefly, you can observe that `writable:false` means a value cannot be changed, which is somewhat equivalent to if you defined a no-op setter
- Actually, your no-op setter would need to throw a `TypeError` when called, to be truly conformant to `writable:false`.

#### Configurable

As long as a property is currently configurable, we can modify its descriptor definition, using the same `defineProperty(..)` utility.

```js
var myObject = {
    a: 2
};

myObject.a = 3;
myObject.a; // 3

Object.defineProperty( myObject, "a", {
    value: 4,
    writable: true,
    configurable: false, // not configurable!
    enumerable: true
} );

myObject.a; // 4
myObject.a = 5;
myObject.a; // 5

Object.defineProperty( myObject, "a", {
	value: 6,
	writable: true,
	configurable: true,
	enumerable: true
} ); // TypeError
```

- The final `defineProperty(..)` call results in a TypeError, regardless of `strict mode`, if you attempt to change the descriptor definition of a non-configurable property
    - Be careful: as you can see, changing `configurable` to `false` is a **one-way action, and cannot be undone!**

**Note:** There's a nuanced exception to be aware of: even if the property is already `configurable:false`, `writable` can always be changed from `true` to `false` without error, but not back to `true` if already `false`.

Another thing `configurable:false` prevents is the ability to use the `delete` operator to remove an existing property.

```js
var myObject = {
	a: 2
};

myObject.a;				// 2
delete myObject.a;
myObject.a;				// undefined

Object.defineProperty( myObject, "a", {
    value: 2,
    writable: true,
    configurable: false,
    enumerable: true
} );

myObject.a;				// 2
delete myObject.a;
myObject.a;				// 2
```

As you can see, the last `delete` call failed (silently) because we made the `a` property non-configurable.

- `delete` is only used to remove object properties (which can be removed) directly from the object in question
    - If an object property is the last remaining *reference* to some object/function, and you `delete` it, that removes the reference and now that unreferenced object/function can be garbage collected
    - But, it is **not** proper to think of `delete` as a tool to free up allocated memory as it does in other languages (like C/C++).
    - `delete` is just an object property removal operation -- nothing more

#### Enumerable

The final descriptor characteristic we will mention here (there are two others, which we deal with shortly when we discuss getter/setters) is `enumerable`.

- The name probably makes it obvious, but this characteristic controls if a property will show up in certain object-property enumerations, such as the `for..in` loop
-   Set to `false` to keep it from showing up in such enumerations, even though it's still completely accessible
-   Set to `true` to keep it present

All normal user-defined properties are defaulted to `enumerable`, as this is most commonly what you want
- But if you have a special property you want to hide from enumeration, set it to `enumerable:false`.

We'll demonstrate enumerability in much more detail shortly, so keep a mental bookmark on this topic.

### Immutability

It is sometimes desired to **make properties or objects that cannot be changed** (either by accident or intentionally). ES5 adds support for handling that in a variety of different nuanced ways.

It's important to note that ****all** of these approaches create shallow immutability**
    - That is, **they affect only the object and its direct property characteristics**
        - **If an object has a reference to another object** (array, object, function, etc), **the *contents* of that object are not affected, and remain mutable**

```js
myImmutableObject.foo; // [1,2,3]
myImmutableObject.foo.push( 4 );
myImmutableObject.foo; // [1,2,3,4]
```

- We assume in this snippet that `myImmutableObject` is already created and protected as immutable
- But, to also protect the contents of `myImmutableObject.foo` (which is its own object -- array), you would also need to make `foo` immutable, using one or more of the following functionalities.

**Note:** It is not terribly common to create deeply entrenched immutable objects in JS programs
- Special cases can certainly call for it, but as a general design pattern, if you find yourself wanting to *seal* or *freeze* all your objects, you may want to take a step back and reconsider your program design to be more robust to potential changes in objects' values.

#### Object Constant

By **combining `writable:false` and `configurable:false`**, you **can essentially create a *constant*** (**cannot be** *changed*, *redefined* or *deleted*) as an object property, like:

```js
var myObject = {};

Object.defineProperty( myObject, "FAVORITE_NUMBER", {
    value: 42,
    writable: false,
    configurable: false
} );
```

#### Prevent Extensions

If you want to **prevent an object from having new properties added to it**, but otherwise leave the rest of the object's properties alone, call `Object.preventExtensions(..)`:

```js
var myObject = {
  a: 2
};

Object.preventExtensions( myObject );

myObject.b = 3;
myObject.b; // undefined
```

In `non-strict mode`, the creation of `b` fails silently. In `strict mode`, it throws a `TypeError`.

#### Seal

`Object.seal(..)` creates a "sealed" object, which means it takes an existing object and essentially calls `Object.preventExtensions(..)` on it, but also marks all its existing properties as `configurable:false`.

So, not only can you not add any more properties, but you also cannot reconfigure or delete any existing properties (though you *can* still modify their values).

#### Freeze

`Object.freeze(..)` **creates a frozen object**, which means **it takes an existing object and essentially calls `Object.seal(..)` on it**, but it **also marks all "data accessor" properties as `writable:false`**, so that their values cannot be changed.

This approach is the **highest level of immutability that you can attain for an object itself**, as it *prevents any changes to the object or to any of its direct properties* (though, as mentioned above, the contents of any referenced other objects are unaffected).

You could **"deep freeze"** an object by calling `Object.freeze(..)` on the object, and then recursively iterating over all objects it references (which would have been unaffected thus far), and calling `Object.freeze(..)` on them as well. Be careful, though, as that could affect other (shared) objects you're not intending to affect.


### `[[Get]]`

There's a subtle, but important, detail about how property accesses are performed.

Consider:

```js
var myObject = {
      a: 2
};

myObject.a; // 2
```

The `myObject.a` is a property access, but it doesn't *just* look in `myObject` for a property of the name `a`, as it might seem.

According to the spec, the code above actually performs a `[[Get]]` operation (kinda like a function call: `[[Get]]()`) on the `myObject`
- The default built-in `[[Get]]` operation for an object *first* inspects the object for a property of the requested name, and if it finds it, it will return the value accordingly.

However, the `[[Get]]` algorithm defines other important behavior if it does *not* find a property of the requested name
- We will examine in Chapter 5 what happens *next* (traversal of the `[[Prototype]]` chain, if any).

But one important result of this `[[Get]]` operation is that if it cannot through any means come up with a value for the requested property, it instead returns the value `undefined`.

```js
var myObject = {
	a: 2
};

myObject.b; // undefined
```

This behavior is different from when you reference *variables* by their identifier names
- If you reference a variable that cannot be resolved within the applicable lexical scope look-up, the result is not `undefined` as it is for object properties, but instead a `ReferenceError` is thrown.

```js
var myObject = {
    a: undefined
};

myObject.a; // undefined
myObject.b; // undefined
```

From a *value* perspective, there is no difference between these two references -- they both result in `undefined`
- However, the `[[Get]]` operation underneath, though subtle at a glance, potentially performed a bit more "work" for the reference `myObject.b` than for the reference `myObject.a`.

- Inspecting only the value results, you cannot distinguish whether a property exists and holds the explicit value `undefined`, or whether the property does *not* exist and `undefined` was the default return value after `[[Get]]` failed to return something explicitly
- However, we will see shortly how you *can* distinguish these two scenarios.

### `[[Put]]`

Since there's an internally defined `[[Get]]` operation for getting a value from a property, it should be obvious there's also a default `[[Put]]` operation.

It may be tempting to think that an assignment to a property on an object would just invoke `[[Put]]` to set or create that property on the object in question
- But the situation is more nuanced than that.

When invoking `[[Put]]`, how it behaves differs based on a number of factors, including (most impactfully) whether the property is already present on the object or not.

If the property is present, the `[[Put]]` algorithm will roughly check:

1. Is the property an accessor descriptor (see "Getters & Setters" section below)? **If so, call the setter, if any.**
2. Is the property a data descriptor with `writable` of `false`? **If so, silently fail in `non-strict mode`, or throw `TypeError` in `strict mode`.**
3. Otherwise, set the value to the existing property as normal.

If the property is not yet present on the object in question, the `[[Put]]` operation is even more nuanced and complex. We will revisit this scenario in Chapter 5 when we discuss `[[Prototype]]` to give it more clarity.

### Getters & Setters

The default `[[Put]]` and `[[Get]]` operations for objects completely control how values are set to existing or new properties, or retrieved from existing properties, respectively.

**Note:** Using future/advanced capabilities of the language, it may be possible to override the default `[[Get]]` or `[[Put]]` operations for an entire object (not just per property)
- This is beyond the scope of our discussion in this book, but will be covered later in the "You Don't Know JS" series.

ES5 introduced a way to override part of these default operations, not on an object level but a per-property level, through the use of getters and setters. Getters are properties which actually call a hidden function to retrieve a value
- **Setters** are **properties which actually call a hidden function to set a value**

When you define a property to have either a getter or a setter or both, its definition becomes an "accessor descriptor" (as opposed to a "data descriptor")
- For accessor-descriptors, the `value` and `writable` characteristics of the descriptor are moot and ignored, and instead JS considers the `set` and `get` characteristics of the property (as well as `configurable` and `enumerable`).

Consider:

```js
var myObject = {
    // define a getter for `a`
    get a() {
    return 2;
    }
};

Object.defineProperty(
    myObject,	// target
    "b",		// property name
    {			// descriptor
        // define a getter for `b`
        get: function(){ return this.a * 2 },

        // make sure `b` shows up as an object property
        enumerable: true
    }
);

myObject.a; // 2
myObject.b; // 4
```

- Either through object-literal syntax with `get a() { .. }` or through explicit definition with `defineProperty(..)`, in both cases we created a property on the object that actually doesn't hold a value, but whose access automatically results in a hidden function call to the getter function, with whatever value it returns being the result of the property access

```js
var myObject = {
    // define a getter for `a`
    get a() {
        return 2;
    }
};

myObject.a = 3;
myObject.a; // 2
```

- Since we only defined a getter for `a`, if we try to set the value of `a` later, the set operation won't throw an error but will just silently throw the assignment away
    - Even if there was a valid setter, our custom getter is hard-coded to return only `2`, so the set operation would be moot.

- To make this scenario more sensible, properties should also be defined with setters, which override the default `[[Put]]` operation (aka, assignment), per-property, just as you'd expect
    - You will almost certainly want to always declare both getter and setter (having only one or the other often leads to unexpected/surprising behavior):

```js
var myObject = {
    // define a getter for `a`
    get a() {
        return this._a_;
    },

    // define a setter for `a`
    set a(val) {
        this._a_ = val * 2;
    }
};

myObject.a = 2;
myObject.a; // 4
```

**Note:** In this example, we actually store the specified value `2` of the assignment (`[[Put]]` operation) into another variable `_a_`. The `_a_` name is purely by convention for this example and implies nothing special about its behavior -- it's a normal property like any other.

### Existence

We showed earlier that a property access like `myObject.a` may result in an `undefined` value if either the explicit `undefined` is stored there or the `a` property doesn't exist at all. So, if the value is the same in both cases, how else do we distinguish them?

We can ask an object if it has a certain property *without* asking to get that property's value:

```js
var myObject = {
    a: 2
};

("a" in myObject);				// true
("b" in myObject);				// false

myObject.hasOwnProperty( "a" );	// true
myObject.hasOwnProperty( "b" );	// false
```

The `in` operator will check to see if the property is *in* the object, or if it exists at any higher level of the `[[Prototype]]` chain object traversal (see Chapter 5)
 - By contrast, `hasOwnProperty(..)` checks to see if *only* `myObject` has the property or not, and will *not* consult the `[[Prototype]]` chain
 - We'll come back to the important differences between these two operations in Chapter 5 when we explore `[[Prototype]]`s in detail

`hasOwnProperty(..)` is accessible for all normal objects via delegation to `Object.prototype` (see Chapter 5)
 - But it's possible to create an object that does not link to `Object.prototype` (via `Object.create(null)` -- see Chapter 5)
 - In this case, a method call like `myObject.hasOwnProperty(..)` would fail.

In that scenario, a more robust way of performing such a check is `Object.prototype.hasOwnProperty.call(myObject,"a")`, which borrows the base `hasOwnProperty(..)` method and uses *explicit `this` binding* (see Chapter 2) to apply it against our `myObject`.

**Note:** The `in` operator has the appearance that it will check for the existence of a *value* inside a container, but it actually checks for the existence of a property name
- This difference is important to note with respect to arrays, as the temptation to try a check like `4 in [2, 4, 6]` is strong, but this will not behave as expected.

#### Enumeration

Previously, we explained briefly the idea of "enumerability" when we looked at the `enumerable` property descriptor characteristic. Let's revisit that and examine it in more close detail.

```js
var myObject = { };

Object.defineProperty(
    myObject,
    "a",
    // make `a` enumerable, as normal
    { enumerable: true, value: 2 }
);

Object.defineProperty(
    myObject,
    "b",
    // make `b` NON-enumerable
    { enumerable: false, value: 3 }
);

myObject.b; // 3
("b" in myObject); // true
myObject.hasOwnProperty( "b" ); // true

// .......

for (var k in myObject) {
    console.log( k, myObject[k] );
}
// "a" 2
```

You'll notice that `myObject.b` in fact **exists** and has an accessible value, but it doesn't show up in a `for..in` loop (though, surprisingly, it **is** revealed by the `in` operator existence check)
- That's because "enumerable" basically means "will be included if the object's properties are iterated through"

**Note:** `for..in` loops applied to arrays can give somewhat unexpected results, in that the enumeration of an array will include not only all the numeric indices, but also any enumerable properties
- It's a good idea to use `for..in` loops *only* on objects, and traditional `for` loops with numeric index iteration for the values stored in arrays

Another way that enumerable and non-enumerable properties can be distinguished:

```js
var myObject = { };

Object.defineProperty(
    myObject,
    "a",
    // make `a` enumerable, as normal
    { enumerable: true, value: 2 }
);

Object.defineProperty(
    myObject,
    "b",
    // make `b` non-enumerable
    { enumerable: false, value: 3 }
);

myObject.propertyIsEnumerable( "a" ); // true
myObject.propertyIsEnumerable( "b" ); // false

Object.keys( myObject ); // ["a"]
Object.getOwnPropertyNames( myObject ); // ["a", "b"]
```

`propertyIsEnumerable(..)` tests whether the given property name exists *directly* on the object and is also `enumerable:true`.

`Object.keys(..)` returns an array of all enumerable properties, whereas `Object.getOwnPropertyNames(..)` returns an array of *all* properties, enumerable or not

Whereas `in` vs. `hasOwnProperty(..)` differ in whether they consult the `[[Prototype]]` chain or not, `Object.keys(..)` and `Object.getOwnPropertyNames(..)` both inspect *only* the direct object specified.

There's (currently) no built-in way to get a list of **all properties** which is equivalent to what the `in` operator test would consult (traversing all properties on the entire `[[Prototype]]` chain, as explained in Chapter 5)
- You could approximate such a utility by recursively traversing the `[[Prototype]]` chain of an object, and for each level, capturing the list from `Object.keys(..)` -- only enumerable properties.

## Iteration

The `for..in` loop iterates over the list of enumerable properties on an object (including its `[[Prototype]]` chain). But what if you instead want to iterate over the values?

With numerically-indexed arrays, iterating over the values is typically done with a standard `for` loop, like:

```js
var myArray = [1, 2, 3];

for (var i = 0; i < myArray.length; i++) {
    console.log( myArray[i] );
}
// 1 2 3
```

This isn't iterating over the values, though, but iterating over the indices, where you then use the index to reference the value, as `myArray[i]`.

ES5 also added several iteration helpers for arrays, including `forEach(..)`, `every(..)`, and `some(..)`
- Each of these helpers accepts a function callback to apply to each element in the array, differing only in how they respectively respond to a return value from the callback.

`forEach(..)` will iterate over all values in the array, and ignores any callback return values. `every(..)` keeps going until the end *or* the callback returns a `false` (or "falsy") value, whereas `some(..)` keeps going until the end *or* the callback returns a `true` (or "truthy") value.

These special return values inside `every(..)` and `some(..)` act somewhat like a `break` statement inside a normal `for` loop, in that they stop the iteration early before it reaches the end.

If you iterate on an object with a `for..in` loop, you're also only getting at the values indirectly, because it's actually iterating only over the enumerable properties of the object, leaving you to access the properties manually to get the values.

**Note:** As contrasted with iterating over an array's indices in a numerically ordered way (`for` loop or other iterators), the order of iteration over an object's properties is **not guaranteed** and may vary between different JS engines
- **Do not rely** on any observed ordering for anything that requires consistency among environments, as any observed agreement is unreliable.

But what if you want to iterate over the values directly instead of the array indices (or object properties)? Helpfully, ES6 adds a `for..of` loop syntax for iterating over arrays (and objects, if the object defines its own custom iterator):

```js
var myArray = [ 1, 2, 3 ];

for (var v of myArray) {
    console.log( v );
}
// 1
// 2
// 3
```

The `for..of` loop asks for an iterator object (from a default internal function known as `@@iterator` in spec-speak) of the *thing* to be iterated, and the loop then iterates over the successive return values from calling that iterator object's `next()` method, once for each loop iteration.

Arrays have a built-in `@@iterator`, so `for..of` works easily on them, as shown. But let's manually iterate the array, using the built-in `@@iterator`, to see how it works:

```js
var myArray = [ 1, 2, 3 ];
var it = myArray[Symbol.iterator]();

it.next(); // { value:1, done:false }
it.next(); // { value:2, done:false }
it.next(); // { value:3, done:false }
it.next(); // { done:true }
```

**Note:** We get at the `@@iterator` *internal property* of an object using an ES6 `Symbol`: `Symbol.iterator`
- We briefly mentioned `Symbol` semantics earlier in the chapter (see "Computed Property Names"), so the same reasoning applies here. You'll always want to reference such special properties by `Symbol` name reference instead of by the special value it may hold
- Also, despite the name's implications, `@@iterator` is **not the iterator object** itself, but a **function that returns** the iterator object -- a subtle but important detail!

As the above snippet reveals, the return value from an iterator's `next()` call is an object of the form `{ value: .. , done: .. }`, where `value` is the current iteration value, and `done` is a `boolean` that indicates if there's more to iterate.

Notice the value `3` was returned with a `done:false`, which seems strange at first glance
- You have to call the `next()` a fourth time (which the `for..of` loop in the previous snippet automatically does) to get `done:true` and know you're truly done iterating
- The reason for this quirk is beyond the scope of what we'll discuss here, but it comes from the semantics of ES6 generator functions

While arrays do automatically iterate in `for..of` loops, regular objects **do not have a built-in `@@iterator`**
- The reasons for this intentional omission are more complex than we will examine here, but in general it was better to not include some implementation that could prove troublesome for future types of objects

It *is* possible to define your own default `@@iterator` for any object that you care to iterate over. For example:

```js
var myObject = {
    a: 2,
    b: 3
};

Object.defineProperty( myObject, Symbol.iterator, {
    enumerable: false,
    writable: false,
    configurable: true,
    value: function() {
        var o = this;
        var idx = 0;
        var ks = Object.keys( o );
        return {
            next: function() {
                return {
                    value: o[ks[idx++]],
                    done: (idx > ks.length)
                };
            }
        };
    }
} );

// iterate `myObject` manually
var it = myObject[Symbol.iterator]();
it.next(); // { value:2, done:false }
it.next(); // { value:3, done:false }
it.next(); // { value:undefined, done:true }

// iterate `myObject` with `for..of`
for (var v of myObject) {
    console.log( v );
}
// 2
// 3
```

**Note:** We used `Object.defineProperty(..)` to define our custom `@@iterator` (mostly so we could make it non-enumerable), but using the `Symbol` as a *computed property name* (covered earlier in this chapter), we could have declared it directly, like `var myObject = { a:2, b:3, [Symbol.iterator]: function(){ /* .. */ } }`.

Each time the `for..of` loop calls `next()` on `myObject`'s iterator object, the internal pointer will advance and return back the next value from the object's properties list (see a previous note about iteration ordering on object properties/values).

The iteration we just demonstrated is a simple value-by-value iteration, but you can of course define arbitrarily complex iterations for your custom data structures, as you see fit
- Custom iterators combined with ES6's `for..of` loop are a powerful new syntactic tool for manipulating user-defined objects.

For example, a list of `Pixel` objects (with `x` and `y` coordinate values) could decide to order its iteration based on the linear distance from the `(0,0)` origin, or filter out points that are "too far away", etc.
- As long as your iterator returns the expected `{ value: .. }` return values from `next()` calls, and a `{ done: true }` after the iteration is complete, ES6's `for..of` can iterate over it.

In fact, you can even generate "infinite" iterators which never "finish" and always return a new value (such as a random number, an incremented value, a unique identifier, etc), though you probably will not use such iterators with an unbounded `for..of` loop, as it would never end and would hang your program.

```js
var randoms = {
    [Symbol.iterator]: function() {
        return {
            next: function() {
                return { value: Math.random() };
            }
        };
    }
};

var randoms_pool = [];
for (var n of randoms) {
    randoms_pool.push( n );

    // don't proceed unbounded!
    if (randoms_pool.length === 100) break;
}
```

This iterator will generate random numbers "forever", so we're careful to only pull out 100 values so our program doesn't hang.

## Review (TL;DR)

Objects in JS have both a literal form (such as `var a = { .. }`) and a constructed form (such as `var a = new Array(..)`)
    - The literal form is almost always preferred, but the constructed form offers, in some cases, more creation options.

Many people mistakenly claim "everything in JavaScript is an object", but this is incorrect
- Objects are one of the 6 (or 7, depending on your perspective) primitive types. Objects have sub-types, including `function`, and also can be behavior-specialized, like `[object Array]` as the internal label representing the array object sub-type

Objects are collections of key/value pairs
- The values can be accessed as properties, via `.propName` or `["propName"]` syntax. Whenever a property is accessed, the engine actually invokes the internal default `[[Get]]` operation (and `[[Put]]` for setting values), which not only looks for the property directly on the object, but which will traverse the `[[Prototype]]` chain (see Chapter 5) if not found

Properties have certain characteristics that can be controlled through property descriptors, such as `writable` and `configurable`
- In addition, objects can have their mutability (and that of their properties) controlled to various levels of immutability using `Object.preventExtensions(..)`, `Object.seal(..)`, and `Object.freeze(..)`

Properties don't have to contain values -- they can be "accessor properties" as well, with getters/setters
- They can also be either *enumerable* or not, which controls if they show up in `for..in` loop iterations, for instance

You can also iterate over **the values** in data structures (arrays, objects, etc) using the ES6 `for..of` syntax, which looks for either a built-in or custom `@@iterator` object consisting of a `next()` method to advance through the data values one at a time.

# Mixing (Up) "Class" Objects

Following our exploration of objects from the previous chapter, it's natural that we now turn our attention to "object oriented (OO) programming", with "classes". We'll first look at "class orientation" as a design pattern, before examining the mechanics of "classes": "instantiation", "inheritance" and "(relative) polymorphism".

We'll see that **these concepts don't really map very naturally to the object mechanism in JS**, and **the lengths** (mixins, etc.) **many JavaScript developers go to overcome such challenges**.

**Note:** This chapter spends quite a bit of time (the first half!) on heavy "objected oriented programming" theory. We eventually relate these ideas to real concrete JavaScript code in the second half, when we talk about "Mixins". But there's a lot of concept and pseudo-code to wade through first, so don't get lost -- just stick with it!

## Class Theory

"Class/Inheritance" describes a certain form of code organization and architecture -- a way of modeling real world problem domains in our software.

OO or class oriented programming stresses that data intrinsically has associated behavior (of course, different depending on the type and nature of the data!) that operates on it, so proper design is to package up (aka, encapsulate) the data and the behavior together. This is sometimes called "data structures" in formal computer science.

For example, a series of characters that represents a word or phrase is usually called a "string". The characters are the data. But you almost never just care about the data, you usually want to *do things* with the data, so the behaviors that can apply *to* that data (calculating its length, appending data, searching, etc.) are all designed as methods of a `String` class.

Any given string is just an instance of this class, which means that it's a neatly collected packaging of both the character data and the functionality we can perform on it.

Classes also imply a way of *classifying* a certain data structure. The way we do this is to think about any given structure as a specific variation of a more general base definition.

Let's explore this classification process by looking at a commonly cited example. A *car* can be described as a specific implementation of a more general "class" of thing, called a *vehicle*.

We model this relationship in software with classes by defining a `Vehicle` class and a `Car` class.

The definition of `Vehicle` might include things like propulsion (engines, etc.), the ability to carry people, etc., which would all be the behaviors. What we define in `Vehicle` is all the stuff that is common to all (or most of) the different types of vehicles (the "planes, trains, and automobiles").

It might not make sense in our software to re-define the basic essence of "ability to carry people" over and over again for each different type of vehicle. Instead, we define that capability once in `Vehicle`, and then when we define `Car`, we simply indicate that it "inherits" (or "extends") the base definition from `Vehicle`. The definition of `Car` is said to ***specialize* the general `Vehicle` definition**

While `Vehicle` and `Car` collectively define the behavior by way of methods, the data in an instance would be things like the unique VIN of a specific car, etc.

**And thus, classes, inheritance, and instantiation emerge.**

Another key concept with classes is **"polymorphism"**, which describes the idea that a **general behavior from a parent class can be overridden in a child class to give it more specifics**. In fact, **relative polymorphism lets us reference the base behavior from the overridden behavior**.

Class theory strongly suggests that a parent class and a child class share the same method name for a certain behavior, so that the child overrides the parent (differentially). As we'll see later, **doing so in your JavaScript code is opting into frustration and code brittleness**.

### "Class" Design Pattern

You may never have thought about classes as a "design pattern", since it's most common to see discussion of popular "OO Design Patterns", like "Iterator", "Observer", "Factory", "Singleton", etc. As presented this way, it's almost an assumption that OO classes are the lower-level mechanics by which we implement all (higher level) design patterns, as if OO is a given foundation for *all* (proper) code.

Depending on your level of formal education in programming, you may have heard of **"procedural programming"** as a way of describing **code which only consists of procedures** (aka, **functions**) **calling other functions, without any higher abstractions**. You may *have been taught that classes were the *proper* way to transform procedural-style "spaghetti code" into well-formed, well-organized code*.

Of course, if you have experience with **"functional programming"** (**Monads**, etc.), *you know very well that classes are just one of several common design patterns*. But *for others, this may be the first time you've asked yourself if classes really are a fundamental foundation for code, or if they are an optional abstraction on top of code*.

Some languages (like Java) don't give you the choice, so it's not very *optional* at all -- everything's a class. Other languages like **C/C++** or **PHP** *give you both procedural and class-oriented syntaxes*, and it's left more to the developer's choice which style or mixture of styles is appropriate.

### JavaScript "Classes"

Where does JavaScript fall in this regard?

JS has had *some* class-like syntactic elements (like `new` and `instanceof`) for quite awhile, and more recently in ES6, some additions, like the `class` keyword (see Appendix A).

**But does that mean JavaScript actually *has* classes? Plain and simple: **No.****

- Since classes are a design pattern, you *can*, with quite a bit of effort (as we'll see throughout the rest of this chapter), implement approximations for much of classical class functionality. JS tries to satisfy the extremely pervasive *desire* to design with classes by providing seemingly class-like syntax**.

- While we may have a syntax that looks like classes,** it's as if JavaScript mechanics are fighting against you using the *class design pattern*, because behind the curtain, the mechanisms that you build on are operating quite differently**. **Syntactic sugar and** (extremely widely used)
    - **JS "Class" libraries go a long way toward hiding this reality from you**, but **sooner or later you will face the fact that the *classes* you have in other languages are not like the "classes" you're faking in JS.

What this boils down to is that **classes are an optional pattern in software design**, and you have the choice to use them in JavaScript or not. Since many developers have a strong affinity to class oriented software design, we'll spend the rest of this chapter exploring what it takes to maintain the illusion of **classes with what JS provides**, and the **pain points** we experience.

## Class Mechanics

In many **class-oriented languages**, the "standard library" provides a **"stack"** data structure (push, pop, etc.) as a `Stack` class. This class would have an internal set of variables that stores the data, and it would have a set of publicly accessible behaviors ("methods") provided by the class, which gives your code the ability to interact with the (hidden) data (adding & removing data, etc.).

But in such languages, **you don't really operate directly on `Stack`** (unless making a **Static** class member reference, which is outside the scope of our discussion). The **`Stack` class is merely an abstract explanation of what *any* "stack" should do, but it's not itself *a* "stack"**. You must **instantiate** the `Stack` class before you have a concrete data structure *thing* to operate against.

### Building

The traditional metaphor for "class" and "instance" based thinking comes from a building construction.

An architect plans out all the characteristics of a building: how wide, how tall, how many windows and in what locations, even what type of material to use for the walls and roof. She doesn't necessarily care, at this point, *where* the building will be built, nor does she care *how many* copies of that building will be built.

She also doesn't care very much about the contents of the building -- the furniture, wall paper, ceiling fans, etc. -- only what type of structure they will be contained by.

The architectural blue-prints she produces are only *plans* for a building. They don't actually constitute a building we can walk into and sit down. We need a builder for that task. A builder will take those plans and follow them, exactly, as he *builds* the building. In a very real sense, he is *copying* the intended characteristics from the plans to the physical building.

Once complete, the building is a physical instantiation of the blue-print plans, hopefully an essentially perfect *copy*. And then the builder can move to the open lot next door and do it all over again, creating yet another *copy*.

The relationship between building and blue-print is indirect. You can examine a blue-print to understand how the building was structured, for any parts where direct inspection of the building itself was insufficient. But if you want to open a door, you have to go to the building itself -- the blue-print merely has lines drawn on a page that *represent* where the door should be.

A class is a blue-print. To actually *get* an object we can interact with, we must build (aka, "instantiate") something from the class. The end result of such "construction" is an object, typically called an "instance", which we can directly call methods on and access any public data properties from, as necessary.

**This object is a *copy*** of all the characteristics described by the class.

You likely wouldn't expect to walk into a building and find, framed and hanging on the wall, a copy of the blue-prints used to plan the building, though the blue-prints are probably on file with a public records office. Similarly, you don't generally use an object instance to directly access and manipulate its class, but it is usually possible to at least determine *which class* an object instance comes from.

It's more useful to consider the direct relationship of a class to an object instance, rather than any indirect relationship between an object instance and the class it came from. **A class is instantiated into object form by a copy operation.**

<img src="fig1.png">

As you can see, the arrows move from left to right, and from top to bottom, which indicates the copy operations that occur, both conceptually and physically.

### Constructor

Instances of classes are constructed by a special method of the class, usually of the same name as the class, called a *constructor*. This method's explicit job is to initialize any information (state) the instance will need.

For example, consider this loose pseudo-code (invented syntax) for classes:

```js
class CoolGuy {
    specialTrick = nothing

    CoolGuy( trick ) {
        specialTrick = trick
    }

    showOff() {
        output( "Here's my trick: ", specialTrick )
    }
}
```

To *make* a `CoolGuy` instance, we would call the class constructor:

```js
Joe = new CoolGuy( "jumping rope" )

Joe.showOff() // Here's my trick: jumping rope
```

Notice that the `CoolGuy` class has a constructor `CoolGuy()`, which is actually what we call when we say `new CoolGuy(..)`
- We get an object back (an instance of our class) from the constructor, and we can call the method `showOff()`, which prints out that particular `CoolGuy`s special trick

*Obviously, jumping rope makes Joe a pretty cool guy.*

The constructor of a class *belongs* to the class, almost universally with the same name as the class. Also, constructors pretty much always need to be called with `new` to let the language engine know you want to construct a *new* class instance.

## Class Inheritance

In class-oriented languages, not only can you define a class which can be instantiated itself, but you can define another class that **inherits** from the first class.

The second class is often said to be a "child class" whereas the first is the "parent class". These terms obviously come from the metaphor of parents and children, though the metaphors here are a bit stretched, as you'll see shortly.

When a parent has a biological child, the genetic characteristics of the parent are copied into the child. Obviously, in most biological reproduction systems, there are two parents who co-equally contribute genes to the mix. But for the purposes of the metaphor, we'll assume just one parent.

Once the child exists, he or she is separate from the parent. The child was heavily influenced by the inheritance from his or her parent, but is unique and distinct. If a child ends up with red hair, that doesn't mean the parent's hair *was* or automatically *becomes* red.

In a similar way, once a child class is defined, it's separate and distinct from the parent class. The child class contains an initial copy of the behavior from the parent, but can then override any inherited behavior and even define new behavior.

It's important to remember that we're talking about parent and child **classes**, which aren't physical things. This is where the metaphor of parent and child gets a little confusing, because we actually should say that a parent class is like a parent's DNA and a child class is like a child's DNA. We have to make (aka "instantiate") a person out of each set of DNA to actually have a physical person to have a conversation with.

Let's set aside biological parents and children, and look at inheritance through a slightly different lens: different types of vehicles. That's one of the most canonical (and often groan-worthy) metaphors to understand inheritance.

Let's revisit the `Vehicle` and `Car` discussion from earlier in this chapter. Consider this loose pseudo-code (invented syntax) for inherited classes:

```js
class Vehicle {
    engines = 1

    ignition() {
        output( "Turning on my engine." )
    }

    drive() {
        ignition()
        output( "Steering and moving forward!" )
    }
}

class Car inherits Vehicle {
    wheels = 4

    drive() {
        inherited:drive()
        output( "Rolling on all ", wheels, " wheels!" )
    }
}

class SpeedBoat inherits Vehicle {
    engines = 2

    ignition() {
        output( "Turning on my ", engines, " engines." )
    }

    pilot() {
        inherited:drive()
        output( "Speeding through the water with ease!" )
    }
}
```

**Note:** For clarity and brevity, constructors for these classes have been omitted.

We define the `Vehicle` class to assume an engine, a way to turn on the ignition, and a way to drive around. But you wouldn't ever manufacture just a generic "vehicle", so it's really just an abstract concept at this point.

So then we define two specific kinds of vehicle: `Car` and `SpeedBoat`
- They each inherit the general characteristics of `Vehicle`, but then they specialize the characteristics appropriately for each kind
- A car needs 4 wheels, and a speed boat needs 2 engines, which means it needs extra attention to turn on the ignition of both engines

### Polymorphism

`Car` defines its own `drive()` method, which overrides the method of the same name it inherited from `Vehicle`
- But then, `Car`s `drive()` method calls `inherited:drive()`, which indicates that `Car` can reference the original pre-overridden `drive()` it inherited
- `SpeedBoat`s `pilot()` method also makes a reference to its inherited copy of `drive()`.

This technique is called "polymorphism", or "virtual polymorphism". More specifically to our current point, we'll call it "relative polymorphism".

Polymorphism is a much broader topic than we will exhaust here, but our current "relative" semantics refers to one particular aspect: the idea that any method can reference another method (of the same or different name) at a higher level of the inheritance hierarchy
- We say "relative" because we don't absolutely define which inheritance level (aka, class) we want to access, but rather relatively reference it by essentially saying "look one level up".

In many languages, the keyword `super` is used, in place of this example's `inherited:`, which leans on the idea that a "super class" is the parent/ancestor of the current class.

Another aspect of polymorphism is that a method name can have multiple definitions at different levels of the inheritance chain, and these definitions are automatically selected as appropriate when resolving which methods are being called.

We see two occurrences of that behavior in our example above: `drive()` is defined in both `Vehicle` and `Car`, and `ignition()` is defined in both `Vehicle` and `SpeedBoat`.

**Note:** Another thing that traditional class-oriented languages give you via `super` is a direct way for the constructor of a child class to reference the constructor of its parent class
- This is largely true because with real classes, the constructor belongs to the class. However, in JS, it's the reverse -- it's actually more appropriate to think of the "class" belonging to the constructor (the `Foo.prototype...` type references)
- Since in JS the relationship between child and parent exists only between the two `.prototype` objects of the respective constructors, the constructors themselves are not directly related, and thus there's no simple way to relatively reference one from the other (see Appendix A for ES6 `class` which "solves" this with `super`).

An interesting implication of polymorphism can be seen specifically with `ignition()`. Inside `pilot()`, a relative-polymorphic reference is made to (the inherited) `Vehicle`s version of `drive()`. But that `drive()` references an `ignition()` method just by name (no relative reference).

Which version of `ignition()` will the language engine use, the one from `Vehicle` or the one from `SpeedBoat`?
- **It uses the `SpeedBoat` version of `ignition()`.** If you *were* to instantiate `Vehicle` class itself, and then call its `drive()`, the language engine would instead just use `Vehicle`s `ignition()` method definition.

Put another way, the definition for the method `ignition()` *polymorphs* (changes) depending on which class (level of inheritance) you are referencing an instance of.

This may seem like overly deep academic detail. But understanding these details is necessary to properly contrast similar (but distinct) behaviors in JavaScript's `[[Prototype]]` mechanism.

When classes are inherited, there is a way **for the classes themselves** (not the object instances created from them!) to *relatively* reference the class inherited from, and this relative reference is usually called `super`.

Remember this figure from earlier:

<img src="fig1.png">

Notice how for both instantiation (`a1`, `a2`, `b1`, and `b2`) *and* inheritance (`Bar`), the arrows indicate a copy operation.

Conceptually, it would seem a child class `Bar` can access  behavior in its parent class `Foo` using a relative polymorphic reference (aka, `super`)
- However, in reality, the child class is merely given a copy of the inherited behavior from its parent class
- If the child "overrides" a method it inherits, both the original and overridden versions of the method are actually maintained, so that they are both accessible.

Don't let polymorphism confuse you into thinking a child class is linked to its parent class
- A child class instead gets a copy of what it needs from the parent class. **Class inheritance implies copies.**

### Multiple Inheritance

Recall our earlier discussion of parent(s) and children and DNA? We said that the metaphor was a bit weird because biologically most offspring come from two parents
- If a class could inherit from two other classes, it would more closely fit the parent/child metaphor.

Some class-oriented languages allow you to specify more than one "parent" class to "inherit" from
- Multiple-inheritance means that each parent class definition is copied into the child class.

On the surface, this seems like a powerful addition to class-orientation, giving us the ability to compose more functionality together
    - However, there are certainly some complicating questions that arise. If both parent classes provide a method called `drive()`, which version would a `drive()` reference in the child resolve to? Would you always have to manually specify which parent's `drive()` you meant, thus losing some of the gracefulness of polymorphic inheritance?

There's another variation, the so called "Diamond Problem", which refers to the scenario where a child class "D" inherits from two parent classes ("B" and "C"), and each of those in turn inherits from a common "A" parent
- If "A" provides a method `drive()`, and both "B" and "C" override (polymorph) that method, when `D` references `drive()`, which version should it use (`B:drive()` or `C:drive()`)?

<img src="fig2.png">

These complications go even much deeper than this quick glance. We address them here only so we can contrast to how JavaScript's mechanisms work.

JavaScript is simpler: it does not provide a native mechanism for "multiple inheritance"
- Many see this is a good thing, because the complexity savings more than make up for the "reduced" functionality
- But this doesn't stop developers from trying to fake it in various ways, as we'll see next

## Mixins

JavaScript's object mechanism does not *automatically* perform copy behavior when you "inherit" or "instantiate"
- Plainly, there are no "classes" in JavaScript to instantiate, only objects. And objects don't get copied to other objects, they get *linked together* (more on that in Chapter 5)

Since observed class behaviors in other languages imply copies, let's examine how JS developers **fake** the *missing* copy behavior of classes in JavaScript: mixins. We'll look at two types of "mixin": **explicit** and **implicit**.

### Explicit Mixins

Let's again revisit our `Vehicle` and `Car` example from before. Since JavaScript will not automatically copy behavior from `Vehicle` to `Car`, we can instead create a utility that manually copies
- Such a utility is often called `extend(..)` by many libraries/frameworks, but we will call it `mixin(..)` here for illustrative purposes

```js
// vastly simplified `mixin(..)` example:
function mixin( sourceObj, targetObj ) {
    for (var key in sourceObj) {
        // only copy if not already present
        if (!(key in targetObj)) {
            targetObj[key] = sourceObj[key];
        }
    }

    return targetObj;
}

var Vehicle = {
    engines: 1,

    ignition: function() {
        console.log( "Turning on my engine." );
    },

    drive: function() {
        this.ignition();
        console.log( "Steering and moving forward!" );
	}
};

var Car = mixin( Vehicle, {
    wheels: 4,

    drive: function() {
        Vehicle.drive.call( this );
        console.log( "Rolling on all " + this.wheels + " wheels!" );
	}
} );
```

**Note:** Subtly but importantly, we're not dealing with classes anymore, because there are no classes in JavaScript.
- `Vehicle` and `Car` are just objects that we make copies from and to, respectively.

`Car` now has a copy of the properties and functions from `Vehicle`
- Technically, functions are not actually duplicated, but rather *references* to the functions are copied. So, `Car` now has a property called `ignition`, which is a copied reference to the `ignition()` function, as well as a property called `engines` with the copied value of `1` from `Vehicle`.

`Car` *already* had a `drive` property (function), so that property reference was not overridden (see the `if` statement in `mixin(..)` above).

#### "Polymorphism" Revisited

Let's examine this statement: `Vehicle.drive.call( this )`. This is what I call "explicit pseudo-polymorphism"
- Recall in our previous pseudo-code this line was `inherited:drive()`, which we called "relative polymorphism"

JavaScript does not have (prior to ES6; see Appendix A) a facility for relative polymorphism
- So, **because both `Car` and `Vehicle` had a function of the same name: `drive()`**, to distinguish a call to one or the other, we must make an absolute (not relative) reference. We explicitly specify the `Vehicle` object by name, and call the `drive()` function on it

But if we said `Vehicle.drive()`, the `this` binding for that function call would be the `Vehicle` object instead of the `Car` object (see Chapter 2), which is not what we want
- So, instead we use `.call( this )` (Chapter 2) to ensure that `drive()` is executed in the context of the `Car` object.

**Note:** If the function name identifier for `Car.drive()` hadn't overlapped with (aka, "shadowed"; see Chapter 5) `Vehicle.drive()`, we wouldn't have been exercising "method polymorphism"
- So, a reference to `Vehicle.drive()` would have been copied over by the `mixin(..)` call, and we could have accessed directly with `this.drive()`
- The chosen identifier overlap **shadowing** is *why* we have to use the more complex *explicit pseudo-polymorphism* approach

In class-oriented languages, which have relative polymorphism, the linkage between `Car` and `Vehicle` is established once, at the top of the class definition, which makes for only one place to maintain such relationships.

But because of JavaScript's peculiarities, explicit pseudo-polymorphism (because of shadowing!) creates brittle manual/explicit linkage **in every single function where you need such a (pseudo-)polymorphic reference**
- This can significantly increase the maintenance cost
- Moreover, while explicit pseudo-polymorphism can emulate the behavior of "multiple inheritance", it only increases the complexity and brittleness

The result of such approaches is usually more complex, harder-to-read, *and* harder-to-maintain code. **Explicit pseudo-polymorphism should be avoided wherever possible**, because the cost outweighs the benefit in most respects.

#### Mixing Copies

Recall the `mixin(..)` utility from above:

```js
// vastly simplified `mixin()` example:
function mixin( sourceObj, targetObj ) {
    for (var key in sourceObj) {
        // only copy if not already present
        if (!(key in targetObj)) {
          targetObj[key] = sourceObj[key];
        }
    }

    return targetObj;
}
```

Now, let's examine how `mixin(..)` works. It iterates over the properties of `sourceObj` (`Vehicle` in our example) and if there's no matching property of that name in `targetObj` (`Car` in our example), it makes a copy
- Since we're making the copy after the initial object exists, we are careful to not copy over a target property.

If we made the copies first, before specifying the `Car` specific contents, we could omit this check against `targetObj`, but that's a little more clunky and less efficient, so it's generally less preferred:

```js
// alternate mixin, less "safe" to overwrites
function mixin( sourceObj, targetObj ) {
    for (var key in sourceObj) {
        targetObj[key] = sourceObj[key];
    }

    return targetObj;
}

var Vehicle = {
    // ...
};

// first, create an empty object with
// Vehicle's stuff copied in
var Car = mixin( Vehicle, { } );

// now copy the intended contents into Car
mixin( {
    wheels: 4,

    drive: function() {
        // ...
    }
}, Car );
```

Either approach, we have explicitly copied the non-overlapping contents of `Vehicle` into `Car`
- The name "mixin" comes from an alternate way of explaining the task: `Car` has `Vehicle`s contents **mixed-in**, just like you mix in chocolate chips into your favorite cookie dough.

As a result of the copy operation, `Car` will operate somewhat separately from `Vehicle`
- If you add a property onto `Car`, it will not affect `Vehicle`, and vice versa.

**Note:** A few minor details have been skimmed over here. There are still some subtle ways the two objects can "affect" each other even after copying, such as if they both share a reference to a common object (such as an array).

Since the two objects also share references to their common functions, that means that **even manual copying of functions (aka, mixins) from one object to another doesn't *actually emulate* the real duplication from class to instance that occurs in class-oriented languages**.

JavaScript functions can't really be duplicated (in a standard, reliable way), so what you end up with instead is a **duplicated reference** to the same shared function object (functions are objects; see Chapter 3)
- If you modified one of the shared **function objects** (like `ignition()`) by adding properties on top of it, for instance, both `Vehicle` and `Car` would be "affected" via the shared reference

Explicit mixins are a fine mechanism in JavaScript. But they appear more powerful than they really are
- Not much benefit is *actually* derived from copying a property from one object to another, **as opposed to just defining the properties twice**, once on each object
- And that's especially true given the function-object reference nuance we just mentioned

If you explicitly mix-in two or more objects into your target object, you can **partially emulate** the behavior of "multiple inheritance", but there's no direct way to handle collisions if the same method or property is being copied from more than one source
- Some developers/libraries have come up with "late binding" techniques and other exotic work-arounds, but fundamentally these "tricks" are *usually* more effort (and lesser performance!) than the pay-off

Take care only to use explicit mixins where it actually helps make more readable code, and avoid the pattern if you find it making code that's harder to trace, or if you find it creates unnecessary or unwieldy dependencies between objects.

**If it starts to get *harder* to properly use mixins than before you used them**, you should probably stop using mixins
- In fact, if you have to use a complex library/utility to work out all these details, it might be a sign that you're going about it the harder way, perhaps unnecessarily
- In Chapter 6, we'll try to distill a simpler way that accomplishes the desired outcomes without all the fuss

#### Parasitic Inheritance

A variation on this explicit mixin pattern, which is both in some ways explicit and in other ways implicit, is called **"parasitic inheritance"**, popularized mainly by Douglas Crockford.

Here's how it can work:

```js
// "Traditional JS Class" `Vehicle`
function Vehicle() {
    this.engines = 1;
}
Vehicle.prototype.ignition = function() {
    console.log( "Turning on my engine." );
};
Vehicle.prototype.drive = function() {
    this.ignition();
    console.log( "Steering and moving forward!" );
};

// "Parasitic Class" `Car`
function Car() {
    // first, `car` is a `Vehicle`
    var car = new Vehicle();

    // now, let's modify our `car` to specialize it
    car.wheels = 4;

    // save a privileged reference to `Vehicle::drive()`
    var vehDrive = car.drive;

    // override `Vehicle::drive()`
    car.drive = function() {
        vehDrive.call( this );
        console.log( "Rolling on all " + this.wheels + " wheels!" );
    };

    return car;
}

var myCar = new Car();

myCar.drive();
// Turning on my engine.
// Steering and moving forward!
// Rolling on all 4 wheels!
```

As you can see, we initially make a copy of the definition from the `Vehicle` "parent class" (object), then mixin our "child class" (object) definition (preserving privileged parent-class references as needed), and pass off this composed object `car` as our child instance.

**Note:** when we call `new Car()`, a new object is created and referenced by `Car`s `this` reference (see Chapter 2)
- But since we don't use that object, and instead return our own `car` object, the initially created object is just discarded
- So, `Car()` could be called without the `new` keyword, and the functionality above would be identical, but without the wasted object creation/garbage-collection.

### Implicit Mixins

Implicit mixins are closely related to *explicit pseudo-polymorphism* as explained previously. As such, they come with the same caveats and warnings.

Consider this code:

```js
var Something = {
    cool: function() {
        this.greeting = "Hello World";
        this.count = this.count ? this.count + 1 : 1;
    }
};

Something.cool();
Something.greeting; // "Hello World"
Something.count; // 1

var Another = {
    cool: function() {
        // implicit mixin of `Something` to `Another`
        Something.cool.call( this );
    }
};

Another.cool();
Another.greeting; // "Hello World"
Another.count; // 1 (not shared state with `Something`)
```

With `Something.cool.call( this )`, which can happen either in a "constructor" call (most common) or in a method call (shown here), we essentially "borrow" the function `Something.cool()` and call it in the context of `Another` (via its `this` binding; see Chapter 2) instead of `Something`
- The end result is that the assignments that `Something.cool()` makes are applied against the `Another` object rather than the `Something` object

So, it is said that we "mixed in" `Something`s behavior with (or into) `Another`.

While this sort of technique seems to take useful advantage of `this` rebinding functionality, it is the brittle `Something.cool.call( this )` call, which cannot be made into a relative (and thus more flexible) reference, that you should **heed with caution**
- Generally, **avoid such constructs where possible** to keep cleaner and more maintainable code

## Review

Classes are a design pattern. Many languages provide syntax which enables natural class-oriented software design. JS also has a similar syntax, but it behaves **very differently** from what you're used to with classes in those other languages.

**Classes mean copies.**

When traditional classes are instantiated, a copy of behavior from class to instance occurs. When classes are inherited, a copy of behavior from parent to child also occurs.

Polymorphism (having different functions at multiple levels of an inheritance chain with the same name) may seem like it implies a referential relative link from child back to parent, but it's still just a result of copy behavior.

JavaScript **does not automatically** create copies (as classes imply) between objects

# References
- [You Don't Know JS: Scope & Closures](https://github.com/getify/You-Dont-Know-JS/blob/master/scope%20&%20closures/README.md#you-dont-know-js-scope--closures)
- [You Don't Know JS: this & Object Prototypes](https://github.com/getify/You-Dont-Know-JS/blob/master/this%20&%20object%20prototypes/README.md#you-dont-know-js-this--object-prototypes)