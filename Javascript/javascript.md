# JavaScript Cheatsheet (React-Focused)

---

## Table of Contents

**JavaScript (React)**
- [Arrow Functions](#arrow-functions)
- [Destructuring](#destructuring)
- [Spread Operator (`...`)](#spread-operator-)
- [Template Literals](#template-literals)
- [Array Methods](#array-methods)
- [Ternary Operator](#ternary-operator)
- [Logical Operators for Conditional Rendering](#logical-operators-for-conditional-rendering)
- [Promises & Async/Await](#promises--asyncawait)
- [Modules (Import / Export)](#modules-import--export)
- [Events & Event Handling](#events--event-handling)
- [Useful Patterns in React](#useful-patterns-in-react)

**JavaScript (General)**
- [Variables](#variables)
- [let and const](#let-and-const)
- [Strings: Quotes vs Backticks](#strings-quotes-vs-backticks)
- [Console Log](#console-log)
- [Data Types](#data-types)
- [If / Else](#if--else)
- [Switch Case](#switch-case)
- [Loops](#loops)
- [Functions](#functions)
- [Functional Programming](#functional-programming)
- [Arrays & Sorting](#arrays--sorting)
- [Push, Pop & Arrays of Objects](#push-pop--arrays-of-objects)
- [Math Object](#math-object)
- [Arithmetic Operators](#arithmetic-operators)
- [`=` vs `==` vs `===`](#-vs--vs-)
- [Comparison & Equality](#comparison--equality)
- [Classes](#classes)
- [Private Fields & Methods](#private-fields--methods)
- [Constructors](#constructors)
- [Objects](#objects)
- [Object Methods](#object-methods)
- [Strings](#strings)
- [Useful String Methods](#useful-string-methods)
- [JSON](#json)
- [Error Handling](#error-handling)
- [setTimeout & setInterval](#settimeout--setinterval)
- [Testing with Jest](#testing-with-jest)

---

## Variables

[Back to top](#table-of-contents)

```js
const name = "Alice"; // Cannot be reassigned — use by default
let count = 0; // Can be reassigned — use when value changes
var old = "avoid"; // Function-scoped — avoid in modern JS
```

## let and const

[Back to top](#table-of-contents)

`const` and `let` are block-scoped — they only exist within the `{}` block they're declared in. Prefer `const` by default; use `let` only when you need to reassign.

```js
// const — cannot be reassigned (but objects/arrays can still be mutated)
const name = "Alice";
name = "Bob"; // TypeError: Assignment to constant variable

const user = { name: "Alice" };
user.name = "Bob";   // OK — you're mutating the object, not reassigning the variable
user = {};           // TypeError — reassigning the variable itself is not allowed

const nums = [1, 2, 3];
nums.push(4);        // OK — mutating the array is fine
nums = [];           // TypeError

// let — can be reassigned
let count = 0;
count = 1;           // OK
count++;             // OK

// Block scoping — both let and const are limited to their block
if (true) {
  const x = 10;
  let y = 20;
  console.log(x, y); // 10 20
}
console.log(x); // ReferenceError: x is not defined
console.log(y); // ReferenceError: y is not defined

// var is function-scoped — leaks out of blocks (avoid)
if (true) {
  var z = 30;
}
console.log(z); // 30 — leaks out of the if block

// Temporal Dead Zone — let/const cannot be accessed before declaration
console.log(a); // ReferenceError (TDZ)
let a = 5;

console.log(b); // undefined (var is hoisted and initialized to undefined)
var b = 5;
```

**Comparison:**

| | `var` | `let` | `const` |
| --- | --- | --- | --- |
| Reassign | yes | yes | no |
| Redeclare | yes | no | no |
| Scope | function | block | block |

**When to use which:**

- `const` — default choice for everything
- `let` — only when the variable needs to be reassigned (loop counters, accumulators)
- `var` — never in modern JS

## Strings: Quotes vs Backticks

[Back to top](#table-of-contents)

```js
// Single and double quotes — both do the same thing, pick one and be consistent
const a = 'hello';
const b = "hello";

// Backticks (template literals) — allow variables and expressions inside ${}
const name = "Alice";
const c = `hello ${name}`;   // "hello Alice"

// With quotes, you'd have to concatenate manually
const d = "hello " + name;   // "hello Alice" (same result, uglier)
```

## Console Log

[Back to top](#table-of-contents)

```js
console.log("Hello"); // prints: Hello
console.log(name); // prints the value of name
console.log("Name:", name); // prints: Name: Alice

// IMPORTANT: use backticks (`) not quotes (" or ') for template literals
console.log(`Age is ${age}`); // prints: Age is 25 (using template literal)
console.log(name, age, count); // prints multiple values separated by spaces
```

## Data Types

[Back to top](#table-of-contents)

```js
const str = "hello"; // String
const num = 42; // Number
const bool = true; // Boolean
const nothing = null; // Intentional empty value
const notDefined = undefined; // Not yet assigned
const arr = [1, 2, 3]; // Array
const obj = { name: "Alice", age: 25 }; // Object

// typeof — check the type of a value at runtime
typeof "hello";     // "string"
typeof 42;          // "number"
typeof true;        // "boolean"
typeof undefined;   // "undefined"
typeof null;        // "object" ← known JS quirk, null is NOT an object
typeof [1, 2, 3];   // "object" ← arrays are objects too
typeof {};          // "object"
typeof function(){}; // "function"

// Practical use — guard before using a value
if (typeof value === "string") {
  console.log(value.toUpperCase());
}
```

## Template Literals

[Back to top](#table-of-contents)

Used heavily in React for dynamic strings.

```js
const name = "Alice";
const greeting = `Hello, ${name}!`; // Hello, Alice!
const math = `Total: ${price * quantity}`; // Expressions inside ${}
const multiLine = `
  Line one
  Line two
`;
```

## Arrow Functions

[Back to top](#table-of-contents)

The standard way to write functions in React (components, handlers, callbacks).

```js
// Arrow function (preferred in React)
const greet = (name) => {
  return `Hello, ${name}`;
};

// Implicit return — single expression, no braces needed
const greet = (name) => `Hello, ${name}`;

// Single parameter — parentheses optional
const double = (n) => n * 2;

// No parameters
const sayHi = () => "Hi!";

// Returning an object — wrap in parentheses
const makeUser = (name) => ({ name: name, active: true });

// Traditional function (still valid)
function add(a, b) {
  return a + b;
}
```

## Destructuring

[Back to top](#table-of-contents)

Used constantly in React for props, state, and imports.

```js
// Object destructuring
const user = { name: "Alice", age: 25, role: "dev" };
const { name, age } = user; // name = "Alice", age = 25
const { name: userName } = user; // Rename: userName = "Alice"
const { name, ...rest } = user; // rest = { age: 25, role: "dev" }

// Default values
const { name, country = "US" } = user; // country defaults to "US"

// In function parameters (React props pattern)
const Greeting = ({ name, age }) => <h1>Hello {name}</h1>;

// Array destructuring (used with useState)
const [first, second] = [10, 20]; // first = 10, second = 20
const [count, setCount] = useState(0); // React useState pattern
const [, second] = [10, 20]; // Skip first element
```

## Spread Operator (`...`)

[Back to top](#table-of-contents)

Used in React for copying state, passing props, and merging objects.

```js
// Copy an array
const original = [1, 2, 3];
const copy = [...original]; // [1, 2, 3]
const added = [...original, 4, 5]; // [1, 2, 3, 4, 5]
const merged = [...arr1, ...arr2];

// Copy an object
const user = { name: "Alice", age: 25 };
const updated = { ...user, age: 26 }; // { name: "Alice", age: 26 }

// Spread props in React
const props = { type: "text", placeholder: "Enter name" };
<input {...props} />;
```

## Array Methods

[Back to top](#table-of-contents)

These are essential for rendering lists and transforming data in React.

```js
const nums = [1, 2, 3, 4, 5];

// .map() — transform each item, returns new array (used to render lists)
const doubled = nums.map((n) => n * 2); // [2, 4, 6, 8, 10]
// React: {items.map(item => <li key={item.id}>{item.name}</li>)}

// .filter() — keep items that pass a test, returns new array
const evens = nums.filter((n) => n % 2 === 0); // [2, 4]

// .find() — return first item that matches
const found = nums.find((n) => n > 3); // 4

// .findIndex() — return index of first match
const idx = nums.findIndex((n) => n > 3); // 3

// .some() — true if at least one passes
const hasEven = nums.some((n) => n % 2 === 0); // true

// .every() — true if all pass
const allPositive = nums.every((n) => n > 0); // true

// .includes() — true if value exists
const hasThree = nums.includes(3); // true

// .reduce() — accumulate into a single value
const sum = nums.reduce((acc, n) => acc + n, 0); // 15

// .forEach() — run a function on each item (no return value)
nums.forEach((n) => console.log(n));

// .sort() — sort in place (mutates!)
const sorted = [...nums].sort((a, b) => a - b); // Copy first to avoid mutation

// .slice() — extract portion (does NOT mutate)
const part = nums.slice(1, 3); // [2, 3]

// Chaining
const result = nums.filter((n) => n > 2).map((n) => n * 10); // [30, 40, 50]
```

## Functional Programming

[Back to top](#table-of-contents)

Functional programming (FP) is a style of writing code where you avoid changing data and instead build programs by composing small, predictable functions.

**Core concepts:**

```js
// ── Pure Functions ─────────────────────────────────────────────
// Always returns the same output for the same input.
// No side effects (doesn't modify anything outside itself).

// Impure — modifies external state
let total = 0;
function addToTotal(n) { total += n; } // side effect!

// Pure — same input always gives same output
function add(a, b) { return a + b; }

// ── Immutability ───────────────────────────────────────────────
// Don't modify existing data — create new copies instead.

const nums = [1, 2, 3];

// Bad — mutates original
nums.push(4);

// Good — returns new array
const newNums = [...nums, 4];

// Bad — mutates object
const user = { name: "Alice", age: 25 };
user.age = 26;

// Good — returns new object
const updatedUser = { ...user, age: 26 };

// ── First-Class Functions ──────────────────────────────────────
// Functions can be stored in variables, passed as arguments, returned.

const double = (n) => n * 2;
const square = (n) => n * n;

// Pass a function as an argument
[1, 2, 3].map(double); // [2, 4, 6]
[1, 2, 3].map(square); // [1, 4, 9]

// ── Higher-Order Functions ─────────────────────────────────────
// Functions that take or return other functions.

function applyTwice(fn, value) {
  return fn(fn(value));
}
applyTwice(double, 3); // 12

// ── Function Composition ──────────────────────────────────────
// Combine small functions to build more complex behaviour.

const trim = (str) => str.trim();
const toLowerCase = (str) => str.toLowerCase();
const removeSpaces = (str) => str.replace(/\s+/g, "-");

// Chain them manually
const slugify = (str) => removeSpaces(toLowerCase(trim(str)));
slugify("  Hello World  "); // "hello-world"

// ── Avoid Shared State ────────────────────────────────────────
// Instead of mutating shared variables, pass state through functions.

// Bad
let count = 0;
function increment() { count++; }

// Good
function increment(count) { return count + 1; }
const newCount = increment(0); // 1
```

> In React, functional programming principles are everywhere — pure components, immutable state updates, and `.map()`/`.filter()` for rendering lists all follow FP ideas.

## Arrays & Sorting

[Back to top](#table-of-contents)

```js
// Creating arrays
const empty = [];
const nums = [1, 2, 3];
const mixed = [1, "hello", true, null];
const filled = new Array(3).fill(0);        // [0, 0, 0]
const range = Array.from({ length: 5 }, (_, i) => i); // [0, 1, 2, 3, 4]

// Accessing & updating
nums[0];              // 1 (first element)
nums[nums.length - 1]; // 3 (last element)
nums.at(-1);          // 3 (last element — cleaner)
nums[0] = 10;         // mutates: [10, 2, 3]

// Adding & removing (mutate the original array)
nums.push(4);         // add to end    → [1, 2, 3, 4]
nums.pop();           // remove from end → returns 4
nums.unshift(0);      // add to start  → [0, 1, 2, 3]
nums.shift();         // remove from start → returns 0
nums.splice(1, 1);    // remove 1 item at index 1
nums.splice(1, 0, 99); // insert 99 at index 1 (no removal)

// Non-mutating alternatives (return new array)
const withExtra = [...nums, 4];           // add to end
const withoutLast = nums.slice(0, -1);    // remove last
const withoutFirst = nums.slice(1);       // remove first
```

**Sorting:**

`.sort()` takes a comparison function `(a, b)`. The return value decides the order:

| Return value | Result |
| --- | --- |
| Negative | `a` comes before `b` |
| Positive | `b` comes before `a` |
| `0` | order stays the same |

```js
// a - b → ascending (small first)
// if a=1, b=10 → 1 - 10 = -9 (negative) → a first ✅
// if a=10, b=1 → 10 - 1 = 9  (positive) → b first ✅

// b - a → descending (large first)
// if a=1, b=10 → 10 - 1 = 9  (positive) → b first ✅
// if a=10, b=1 → 1 - 10 = -9 (negative) → a first ✅

const nums = [10, 1, 21, 3];
const words = ["banana", "apple", "cherry"];

// Default .sort() — converts to strings, often wrong for numbers
nums.sort();            // [1, 10, 21, 3] ← WRONG for numbers

// Numeric sort ascending
nums.sort((a, b) => a - b);   // [1, 3, 10, 21]

// Numeric sort descending
nums.sort((a, b) => b - a);   // [21, 10, 3, 1]

// String sort (alphabetical A–Z)
words.sort();                         // ["apple", "banana", "cherry"]
words.sort((a, b) => a.localeCompare(b)); // safer, handles accents/case

// String sort Z–A
words.sort((a, b) => b.localeCompare(a));

// Sort objects by a property
const users = [
  { name: "Charlie", age: 30 },
  { name: "Alice", age: 25 },
  { name: "Bob", age: 28 },
];
users.sort((a, b) => a.age - b.age);              // by age ascending
users.sort((a, b) => a.name.localeCompare(b.name)); // by name A–Z

// .sort() mutates — copy first to keep original
const sorted = [...nums].sort((a, b) => a - b);
```

> `.sort()` mutates the original array. Always spread (`[...arr]`) before sorting if you need to keep the original.

## Push, Pop & Arrays of Objects

[Back to top](#table-of-contents)

**push & pop:**

```js
const fruits = ["apple", "banana"];

// push — add one or more items to the END, returns new length
fruits.push("cherry");          // ["apple", "banana", "cherry"]
fruits.push("date", "elderberry"); // can push multiple at once

// pop — remove the LAST item, returns the removed item
const last = fruits.pop();      // last = "elderberry"
                                // fruits = ["apple", "banana", "cherry", "date"]

// unshift — add to the START (like push but front)
fruits.unshift("avocado");      // ["avocado", "apple", ...]

// shift — remove from the START (like pop but front)
const first = fruits.shift();   // first = "avocado"
```

> `push`/`pop` are fast (end of array). `unshift`/`shift` are slower (re-indexes everything).

**Arrays of objects:**

```js
const users = [
  { id: 1, name: "Alice", age: 25 },
  { id: 2, name: "Bob",   age: 30 },
  { id: 3, name: "Charlie", age: 28 },
];

// Access
users[0];           // { id: 1, name: "Alice", age: 25 }
users[0].name;      // "Alice"

// Add a new object
users.push({ id: 4, name: "Diana", age: 22 });

// Remove the last object
users.pop();

// Find an object by property
const user = users.find((u) => u.id === 2);       // { id: 2, name: "Bob", age: 30 }

// Filter objects
const over27 = users.filter((u) => u.age > 27);   // [Bob, Charlie]

// Update a specific object (without mutating original)
const updated = users.map((u) =>
  u.id === 2 ? { ...u, age: 31 } : u
);

// Remove a specific object by id
const removed = users.filter((u) => u.id !== 2);

// Check if any object matches
users.some((u) => u.name === "Alice");  // true

// Sort by property
users.sort((a, b) => a.age - b.age);   // youngest to oldest
```

## Classes

[Back to top](#table-of-contents)

Classes are a blueprint for creating objects. They bundle data (fields) and behaviour (methods) together.

```js
// Basic class
class Animal {
  // constructor — runs when you do new Animal(...)
  constructor(name, sound) {
    this.name = name;   // public field
    this.sound = sound;
  }

  // Method
  speak() {
    return `${this.name} says ${this.sound}`;
  }
}

const dog = new Animal("Dog", "woof");
dog.speak(); // "Dog says woof"
dog.name;    // "Dog"
```

**Inheritance — `extends` and `super`:**

`super` refers to the **parent class**. It has two uses:

- `super(...)` in the constructor — calls the parent's constructor to set up inherited properties
- `super.method()` anywhere — calls a method from the parent class

If you write a constructor in a subclass, you **must** call `super()` before using `this`, otherwise JS throws a `ReferenceError`.

```js
class Dog extends Animal {
  constructor(name) {
    super(name, "woof"); // runs Animal's constructor with name="Rex", sound="woof"
    // this.name and this.sound are now set — safe to use this after this line
  }

  fetch() {
    return `${this.name} fetches the ball!`;
  }

  // super.method() — call a parent method explicitly
  describe() {
    return super.speak() + " and fetches!"; // calls Animal's speak()
  }
}

const rex = new Dog("Rex");
rex.speak();    // "Rex says woof"  — inherited from Animal
rex.fetch();    // "Rex fetches the ball!"
rex.describe(); // "Rex says woof and fetches!"
```

**Constructor parameters are not enforced — missing ones become `undefined`:**

```js
const unknown = new Dog(); // no error thrown
unknown.name;   // undefined
unknown.speak(); // "undefined says woof" — no crash, just unexpected output
```

JS does not enforce required parameters. If you need to guard against this, do it manually:

```js
constructor(name) {
  if (!name) throw new Error("name is required");
  super(name, "woof");
}
```

**Private fields (`#`) and static members:**

```js
class BankAccount {
  #balance; // private — only accessible inside the class

  static bank = "MyBank"; // static — belongs to the class, not instances

  constructor(owner, balance) {
    this.owner = owner;
    this.#balance = balance;
  }

  deposit(amount) {
    this.#balance += amount;
  }

  get balance() {
    return this.#balance; // getter — access like a property
  }
}

const acc = new BankAccount("Alice", 1000);
acc.deposit(500);
acc.balance;          // 1500 — via getter
acc.#balance;         // SyntaxError — truly private
BankAccount.bank;     // "MyBank" — accessed on the class, not instance
```

**Getters and setters:**

```js
class Circle {
  constructor(radius) {
    this.radius = radius;
  }

  get area() {
    return Math.PI * this.radius ** 2;
  }

  set diameter(d) {
    this.radius = d / 2;
  }
}

const c = new Circle(5);
c.area;        // 78.53... — called like a property, not c.area()
c.diameter = 20; // setter — updates radius to 10
```

> In React, you'll mostly use plain objects and functions rather than classes. But you'll encounter classes in older React code (class components) and in libraries like error boundaries.

## Private Fields & Methods

[Back to top](#table-of-contents)

Private fields and methods use the `#` prefix. They are only accessible inside the class — not from outside, not from subclasses.

**Private fields:**

```js
class BankAccount {
  #balance; // must be declared at the top before use

  constructor(owner, balance) {
    this.owner = owner;  // public
    this.#balance = balance; // private
  }

  getBalance() {
    return this.#balance; // OK — inside the class
  }
}

const acc = new BankAccount("Alice", 1000);
acc.owner;      // "Alice" — public, accessible
acc.#balance;   // SyntaxError — private, blocked at language level
acc.getBalance(); // 1000 — accessed via public method
```

**Private methods:**

```js
class BankAccount {
  #balance;

  constructor(balance) {
    this.#balance = balance;
  }

  // Private method — internal logic, not exposed
  #validate(amount) {
    if (amount <= 0) throw new Error("Amount must be positive");
    if (amount > this.#balance) throw new Error("Insufficient funds");
  }

  // Public method — calls private method internally
  withdraw(amount) {
    this.#validate(amount); // OK — same class
    this.#balance -= amount;
    return this.#balance;
  }
}

const acc = new BankAccount(1000);
acc.withdraw(200);  // 800 — works via public method
acc.#validate(200); // SyntaxError — private method blocked
```

**Private fields are NOT inherited by subclasses:**

```js
class Animal {
  #secret = "hidden";

  getSecret() {
    return this.#secret; // OK
  }
}

class Dog extends Animal {
  revealSecret() {
    return this.#secret; // SyntaxError — subclass cannot access parent's private fields
  }
}

const d = new Dog();
d.getSecret(); // "hidden" — OK, inherited public method still works
```

**Private vs public — summary:**

| | Public | Private (`#`) |
| --- | --- | --- |
| Accessible outside class | yes | no |
| Accessible in subclass | yes | no |
| Enforced by JS engine | no (convention only) | yes (SyntaxError) |
| Prefix | none | `#` |

> Before `#` existed, developers used `_name` as a convention to signal "don't touch this". It was never enforced — `_balance` could still be read and changed from anywhere. `#` makes it truly private.

## Constructors

[Back to top](#table-of-contents)

A constructor is a special function that runs when you create a new object with `new`. Inside a class, it's the `constructor()` method. Outside of classes, regular functions can also act as constructors.

**Constructor inside a class (modern, preferred):**

```js
class Person {
  constructor(name, age) {
    this.name = name; // "this" refers to the new object being created
    this.age = age;
  }

  greet() {
    return `Hi, I'm ${this.name}`;
  }
}

const alice = new Person("Alice", 25);
alice.name;    // "Alice"
alice.greet(); // "Hi, I'm Alice"
```

**What `new` does step by step:**

```js
const alice = new Person("Alice", 25);
// 1. Creates a new empty object {}
// 2. Sets "this" to that new object inside the constructor
// 3. Runs the constructor body (assigns name, age)
// 4. Returns the new object automatically
```

**Constructor functions (older style, pre-class syntax):**

```js
// Convention: capitalise the function name to signal it's a constructor
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.greet = function () {
  return `Hi, I'm ${this.name}`;
};

const alice = new Person("Alice", 25);
alice.greet(); // "Hi, I'm Alice"
```

> This older pattern still works and you'll see it in legacy code. Classes are just cleaner syntax on top of the same prototype-based system.

**Forgetting `new`:**

```js
const alice = Person("Alice", 25); // forgot new — this is now window/undefined
console.log(alice); // undefined
```

Always use `new` with constructor functions and classes, or you'll get unexpected behaviour.

## Objects

[Back to top](#table-of-contents)

```js
// Creating an object
const user = { name: "Alice", age: 25, active: true };

// Accessing properties
user.name;          // "Alice"  — dot notation
user["name"];       // "Alice"  — bracket notation (useful for dynamic keys)

const key = "age";
user[key];          // 25

// Adding & updating properties
user.email = "alice@mail.com";  // add new
user.age = 26;                  // update existing

// Deleting a property
delete user.active;

// Checking if a property exists
"name" in user;             // true
user.hasOwnProperty("age"); // true

// Nested objects
const person = {
  name: "Alice",
  address: {
    city: "NYC",
    zip: "10001",
  },
};
person.address.city;        // "NYC"
person["address"]["zip"];   // "10001"

// Optional chaining — safe access on nested objects
person?.address?.city;      // "NYC" (won't throw if address is undefined)

// Looping over an object
for (const key in user) {
  console.log(key, user[key]);
}

// Copying an object (shallow)
const copy = { ...user };
const copy2 = Object.assign({}, user);
```

## Object Methods

[Back to top](#table-of-contents)

```js
const user = { name: "Alice", age: 25, role: "dev" };

Object.keys(user); // ["name", "age", "role"]
Object.values(user); // ["Alice", 25, "dev"]
Object.entries(user); // [["name", "Alice"], ["age", 25], ["role", "dev"]]

// Computed property names
const key = "email";
const obj = { [key]: "alice@mail.com" }; // { email: "alice@mail.com" }

// Shorthand property names
const name = "Alice";
const age = 25;
const user = { name, age }; // same as { name: name, age: age }

// Object.assign — merge objects into a target
const target = { a: 1 };
Object.assign(target, { b: 2 }, { c: 3 }); // { a: 1, b: 2, c: 3 }

// Object.freeze — prevent any changes to an object
const config = Object.freeze({ api: "https://example.com", timeout: 3000 });
config.timeout = 5000; // silently fails (or throws in strict mode)

// Object.create — create a new object with a specified prototype
const animal = {
  speak() {
    return `${this.name} makes a sound`;
  },
};

const dog = Object.create(animal); // dog's prototype is animal
dog.name = "Rex";
dog.speak(); // "Rex makes a sound" — inherited from animal

// Object.create(null) — object with no prototype (no toString, no hasOwnProperty, etc.)
const pure = Object.create(null);
pure.key = "value"; // safe dictionary, no inherited keys
```

**Object literal vs Constructor/Class vs Object.create:**

| | Object Literal `{}` | Constructor / Class | `Object.create()` |
| --- | --- | --- | --- |
| Syntax | `{ key: value }` | `new ClassName()` | `Object.create(proto)` |
| Use case | Single one-off object | Many objects of same shape | Inherit from another object |
| Shared methods | No | Yes, via prototype | Yes, via prototype |
| Inheritance | No | Via `extends` | Directly from any object |
| `this` in methods | N/A | Set automatically by `new` | Must assign properties manually |
| How common | Very common | Common | Rare — mostly in libraries |

## If / Else

[Back to top](#table-of-contents)

```js
const age = 20;

if (age >= 18) {
    console.log("Adult");
} else if (age >= 13) {
    console.log("Teenager");
} else {
    console.log("Child");
}
```

## Switch Case

[Back to top](#table-of-contents)

```js
const day = "Monday";

switch (day) {
    case "Monday":
        console.log("Start of the week");
        break;
    case "Friday":
        console.log("Almost weekend");
        break;
    default:
        console.log("Regular day");
}
```

Use `switch` when you're comparing one value against many options. Don't forget `break` — without it, execution falls through to the next case.

## Loops

[Back to top](#table-of-contents)

```js
// for — when you know how many times to loop
for (let i = 0; i < 5; i++) {
    console.log(i); // 0, 1, 2, 3, 4
}

// while — when you don't know how many times
let count = 0;
while (count < 3) {
    console.log(count); // 0, 1, 2
    count++;
}

// for...of — loop over array values
const fruits = ["apple", "banana", "cherry"];
for (const fruit of fruits) {
    console.log(fruit); // apple, banana, cherry
}

// for...in — loop over object keys
const user = { name: "Alice", age: 25 };
for (const key in user) {
    console.log(key, user[key]); // name Alice, age 25
}
```

In React, you'll rarely use loops directly — `.map()` and `.filter()` are preferred for rendering lists.

## Functions

[Back to top](#table-of-contents)

```js
// Function declaration — hoisted (can call before definition)
function greet(name) {
  return `Hello, ${name}!`;
}

// Function expression — not hoisted
const greet = function(name) {
  return `Hello, ${name}!`;
};

// Arrow function — shortest syntax (see also: Arrow Functions section)
const greet = (name) => `Hello, ${name}!`;

// Default parameters — used if argument is undefined or not passed
function greet(name = "stranger") {
  return `Hello, ${name}!`;
}
greet();          // "Hello, stranger!"
greet("Alice");   // "Hello, Alice!"

// Rest parameters — collect extra arguments into an array
function sum(...nums) {
  return nums.reduce((acc, n) => acc + n, 0);
}
sum(1, 2, 3);     // 6
sum(1, 2, 3, 4);  // 10

// Multiple return values — via destructuring
function getUser() {
  return { name: "Alice", age: 25 };
}
const { name, age } = getUser();

// Functions are values — can be passed around
const apply = (fn, value) => fn(value);
apply(Math.sqrt, 16); // 4

// Immediately Invoked Function Expression (IIFE)
(function () {
  console.log("Runs immediately");
})();
```

**Key concepts:**

- `return` exits the function and sends back a value. Without it, the function returns `undefined`.
- Variables declared inside a function are **local** — not accessible outside.
- Functions can call themselves (**recursion**), but always include a base case to stop.

## Ternary Operator

[Back to top](#table-of-contents)

Used in React for conditional rendering.

```js
const age = 20;
const status = age >= 18 ? "adult" : "minor";

// In React JSX
{
  isLoggedIn ? <Dashboard /> : <Login />;
}
{
  error ? <p>{error}</p> : null;
}
```

## Logical Operators for Conditional Rendering

[Back to top](#table-of-contents)

```js
// && — render only if true (short-circuit)
{
  isLoggedIn && <Dashboard />;
}
{
  items.length > 0 && <List items={items} />;
}

// || — fallback / default value
const name = user.name || "Guest";

// ?? — nullish coalescing (only null/undefined, not 0 or "")
const count = data.count ?? 0;

// ?. — optional chaining (safe access)
const city = user?.address?.city; // undefined if any part is null/undefined
const first = arr?.[0];
const result = obj?.method?.();
```

## Promises & Async/Await

[Back to top](#table-of-contents)

Used for API calls and data fetching in React.

```js
// Fetch API with .then()
fetch("https://api.example.com/data")
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error(error));

// Async/await (cleaner syntax)
const fetchData = async () => {
  try {
    const response = await fetch("https://api.example.com/data");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};
```

## Modules (Import / Export)

[Back to top](#table-of-contents)

React uses ES modules for everything.

```js
// Named export (can have many per file)
export const add = (a, b) => a + b;
export const PI = 3.14;

// Named import — names must match
import { add, PI } from "./math.js";

// Rename on import
import { add as sum } from "./math.js";

// Default export (one per file — common for React components)
const App = () => <h1>Hello</h1>;
export default App;

// Default import — name can be anything
import App from "./App";
import MyApp from "./App"; // also works

// Import both
import App, { add, PI } from "./module.js";
```

## Events & Event Handling

[Back to top](#table-of-contents)

React uses camelCase event names and passes functions, not strings.

```js
// Vanilla JS
button.addEventListener("click", (e) => {
    console.log(e.target);
});

// React pattern
const handleClick = (e) => {
    e.preventDefault();      // Prevent default behavior (form submit, link nav)
    e.stopPropagation();     // Stop event from bubbling up
    console.log(e.target);   // The DOM element that triggered the event
};

<button onClick={handleClick}>Click me</button>
<form onSubmit={handleSubmit}>...</form>
<input onChange={handleChange} />
```

## setTimeout & setInterval

[Back to top](#table-of-contents)

```js
// Run once after delay
setTimeout(() => {
  console.log("Runs after 2 seconds");
}, 2000);

// Run repeatedly
const id = setInterval(() => {
  console.log("Every second");
}, 1000);
clearInterval(id); // Stop it

// In React — always clean up in useEffect
useEffect(() => {
  const timer = setTimeout(() => setReady(true), 1000);
  return () => clearTimeout(timer); // Cleanup
}, []);
```

## Testing with Jest

[Back to top](#table-of-contents)

Jest is a JavaScript testing framework. It lets you write tests that verify your code behaves correctly.

**Setup:**

```bash
# 1. Initialise a package.json if you don't have one
npm init -y

# 2. Install Jest
npm install --save-dev jest

# 3. Add a test script to package.json
# In package.json, find "scripts" and add:
#   "test": "jest"
```

Your `package.json` should look like this:

```json
{
  "scripts": {
    "test": "jest"
  },
  "devDependencies": {
    "jest": "^29.0.0"
  }
}
```

Run your tests with:

```bash
npm test
```

---

**Test file naming — Jest looks for:**

- Files ending in `.test.js` (e.g. `Character.test.js`)
- Files ending in `.spec.js`
- Files inside a `__tests__` folder

---

**Basic structure:**

```js
// describe — groups related tests together
describe("Character", () => {

  // test (or it) — a single test case
  test("starts with correct hp", () => {
    const goblin = new Character("Goblin", 50, 50, 10);

    // expect — what you're checking
    // toBe — strict equality (===)
    expect(goblin.hp).toBe(50);
  });

  it("is alive when hp > 0", () => {    // it() is the same as test()
    const goblin = new Character("Goblin", 50, 50, 10);
    expect(goblin.isAlive()).toBe(true);
  });

});
```

---

**Common matchers:**

```js
expect(value).toBe(50);              // strict equality ===
expect(value).toEqual({ hp: 50 });   // deep equality — use for objects/arrays
expect(value).toBeTruthy();          // true, 1, "text", []
expect(value).toBeFalsy();           // false, 0, "", null, undefined
expect(value).toBeNull();            // strictly null
expect(value).toBeUndefined();       // strictly undefined
expect(value).toBeGreaterThan(0);    // > 0
expect(value).toBeLessThan(100);     // < 100
expect(array).toContain("Rex");      // array includes value
expect(string).toMatch(/pattern/);   // regex match
expect(string).toContain("hello");   // string includes substring

// Testing that a function throws an error
expect(() => warrior.powerAttack(target)).toThrow("not enough rage");
```

---

**Exporting for tests:**

At the bottom of the file you want to test, add:

```js
// Character.js
module.exports = { Character, Warrior, Mage };
```

Then import them at the top of your test file:

```js
// Character.test.js
const { Character, Warrior, Mage } = require("./Character");
```

---

**Example — testing the Character class:**

```js
// Character.test.js
const { Character, Warrior, Mage } = require("./Character");

describe("Character", () => {
  let goblin;

  // beforeEach — runs before every test, keeps tests independent
  beforeEach(() => {
    goblin = new Character("Goblin", 50, 50, 10);
  });

  test("takeDamage reduces hp", () => {
    goblin.takeDamage(20);
    expect(goblin.hp).toBe(30);
  });

  test("hp never goes below 0", () => {
    goblin.takeDamage(999);
    expect(goblin.hp).toBe(0);
  });

  test("isAlive returns false when hp reaches 0", () => {
    goblin.takeDamage(999);
    expect(goblin.isAlive()).toBe(false);
  });

  test("heal restores hp", () => {
    goblin.takeDamage(20);
    goblin.heal(10);
    expect(goblin.hp).toBe(40);
  });

  test("heal cannot exceed maxHp", () => {
    goblin.heal(999);
    expect(goblin.hp).toBe(goblin.maxHp);
  });
});

describe("Warrior", () => {
  let warrior;
  let target;

  beforeEach(() => {
    warrior = new Warrior("Rex", 100, 100, 25);
    target  = new Character("Dummy", 200, 200, 0);
  });

  test("attack deals damage and gains rage", () => {
    warrior.attack(target);
    expect(target.hp).toBe(175);
    expect(warrior.rage).toBe(10);
  });

  test("powerAttack throws if not enough rage", () => {
    expect(() => warrior.powerAttack(target)).toThrow("not enough rage");
  });

  test("powerAttack deals 2.5x damage and costs 30 rage", () => {
    warrior.rage = 30;
    warrior.powerAttack(target);
    expect(target.hp).toBe(137.5); // 200 - (25 * 2.5)
    expect(warrior.rage).toBe(0);
  });
});
```

> `beforeEach` creates a fresh character before every test so one test can't affect another.

## JSON

[Back to top](#table-of-contents)

```js
// Object → JSON string
const json = JSON.stringify({ name: "Alice", age: 25 });

// JSON string → Object
const obj = JSON.parse('{"name":"Alice","age":25}');

// Common with localStorage
localStorage.setItem("user", JSON.stringify(user));
const saved = JSON.parse(localStorage.getItem("user"));
```

## Error Handling

[Back to top](#table-of-contents)

```js
// Basic try/catch
try {
  // Code that might throw an error
  const data = JSON.parse("bad json");
} catch (error) {
  // Runs only if an error was thrown
  console.error(error.message);
}

// try / catch / finally
try {
  const data = JSON.parse(badString);
} catch (error) {
  console.error(error.message); // handle the error
} finally {
  // Always runs — whether it succeeded or failed
  // Good for cleanup (closing connections, hiding loaders, etc.)
  console.log("Done");
}

// The error object
try {
  null.name; // throws TypeError
} catch (error) {
  error.name;     // "TypeError"
  error.message;  // "Cannot read properties of null"
  error.stack;    // full stack trace (useful for debugging)
}

// Throwing your own errors
function divide(a, b) {
  if (b === 0) throw new Error("Cannot divide by zero");
  return a / b;
}

try {
  divide(10, 0);
} catch (error) {
  console.error(error.message); // "Cannot divide by zero"
}

// ── Error Types ───────────────────────────────────────────────

// Error — generic base error, use when no specific type fits
throw new Error("Something went wrong");

// TypeError — wrong type used, or method called on wrong type
null.name;                    // TypeError: Cannot read properties of null
undefined.toUpperCase();      // TypeError: undefined is not a function
(42).toUpperCase();           // TypeError: not a function

// ReferenceError — variable used before it's declared or doesn't exist
console.log(foo);             // ReferenceError: foo is not defined

// SyntaxError — invalid JS syntax (usually caught before runtime)
JSON.parse("bad { json");     // SyntaxError: Unexpected token

// RangeError — value is outside an allowed range
new Array(-1);                // RangeError: Invalid array length
(1.234).toFixed(200);         // RangeError: toFixed() digits out of range

// URIError — malformed URI passed to encodeURI / decodeURI
decodeURIComponent("%");      // URIError: URI malformed

// Catching a specific error type
try {
  null.name;
} catch (error) {
  if (error instanceof TypeError) {
    console.error("Type problem:", error.message);
  } else if (error instanceof ReferenceError) {
    console.error("Reference problem:", error.message);
  } else {
    throw error; // re-throw if you don't handle it
  }
}

// try/catch with async/await
const fetchData = async () => {
  try {
    const res = await fetch("https://api.example.com/data");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Fetch failed:", error.message);
  }
};
```

## Strings

[Back to top](#table-of-contents)

```js
// Creating strings
const single = 'hello';
const double = "hello";
const template = `hello`;   // backtick — supports expressions

// Concatenation
const first = "Hello";
const second = "World";

first + " " + second;           // "Hello World" — + operator
first.concat(" ", second);      // "Hello World" — concat method
`${first} ${second}`;           // "Hello World" — template literal (preferred)

// concat() accepts multiple arguments
"Hello".concat(" ", "World", "!"); // "Hello World!"

// Repeat
"ha".repeat(3);         // "hahaha"

// Padding (useful for formatting)
"5".padStart(3, "0");   // "005" — pad left to length 3
"5".padEnd(3, "0");     // "500" — pad right to length 3

// Replace all occurrences
"aabbaa".replace("a", "x");     // "xabbaa"  — only first match
"aabbaa".replaceAll("a", "x");  // "xxbbxx"  — all matches

// Split & Join
const str = "apple,banana,cherry";
const arr = str.split(",");         // ["apple", "banana", "cherry"]
arr.join(" - ");                    // "apple - banana - cherry"

// Accessing characters
const word = "hello";
word[0];            // "h"
word.charAt(1);     // "e"
word.at(-1);        // "o" — last character

// indexOf — find position of a substring (-1 if not found)
"hello".indexOf("l");       // 2 (first match)
"hello".lastIndexOf("l");   // 3 (last match)
"hello".indexOf("z");       // -1
```

## Useful String Methods

[Back to top](#table-of-contents)

```js
const str = "Hello, World!";

str.length; // 13
str.toUpperCase(); // "HELLO, WORLD!"
str.toLowerCase(); // "hello, world!"
str.includes("World"); // true
str.startsWith("Hello"); // true
str.endsWith("!"); // true
str.trim(); // Remove whitespace from both ends
str.split(", "); // ["Hello", "World!"]
str.replace("World", "JS"); // "Hello, JS!"
str.slice(0, 5); // "Hello"
```

## Math Object

[Back to top](#table-of-contents)

```js
// Constants
Math.PI;        // 3.14159...
Math.E;         // 2.71828... (Euler's number)

// Rounding
Math.round(4.6);  // 5  — rounds to nearest integer
Math.round(4.4);  // 4
Math.floor(4.9);  // 4  — always rounds DOWN
Math.ceil(4.1);   // 5  — always rounds UP
Math.trunc(4.9);  // 4  — removes decimal, no rounding

// Min & Max
Math.max(1, 5, 3);   // 5
Math.min(1, 5, 3);   // 1
Math.max(...[1, 5, 3]); // 5 — spread array in

// Powers & Roots
Math.pow(2, 10);   // 1024 — same as 2 ** 10
Math.sqrt(25);     // 5
Math.cbrt(27);     // 3 — cube root

// Absolute value
Math.abs(-7);      // 7

// Random number between 0 (inclusive) and 1 (exclusive)
Math.random();              // e.g. 0.472...

// Random integer between 0 and n-1
Math.floor(Math.random() * 6);      // 0–5 (like a die roll)

// Random integer between min and max (inclusive)
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
randomInt(1, 10); // random number from 1 to 10
```

## Arithmetic Operators

[Back to top](#table-of-contents)

```js
const a = 10;
const b = 3;

a + b;    // 13   (addition)
a - b;    // 7    (subtraction)
a * b;    // 30   (multiplication)
a / b;    // 3.33 (division)
a % b;    // 1    (modulus — remainder)
a ** b;   // 1000 (exponentiation — 10 to the power of 3)

// Shorthand assignment
let x = 10;
x += 5;   // x = x + 5  → 15
x -= 3;   // x = x - 3  → 12
x *= 2;   // x = x * 2  → 24
x /= 4;   // x = x / 4  → 6

// Increment / Decrement
x++;      // x = x + 1
x--;      // x = x - 1
```

## `=` vs `==` vs `===`

[Back to top](#table-of-contents)

```js
// = is assignment (sets a value)
let x = 5;             // x is now 5

// == is loose equality (compares value, ignores type)
5 == "5";              // true  — "5" gets converted to 5
0 == false;            // true  — both become 0

// === is strict equality (compares value AND type)
5 === "5";             // false — number vs string
0 === false;           // false — number vs boolean
5 === 5;               // true  — same type, same value
```

Always use `===`. Using `==` leads to unexpected bugs because of type coercion.

## Comparison & Equality

[Back to top](#table-of-contents)

```js
// Always use strict equality
5 === 5; // true  (same type and value)
5 === "5"; // false (different types)
5 !== 3; // true

// Avoid loose equality
(5 ==
  "5"[ // true  (type coercion — unpredictable)
    // Comparing objects/arrays — compares by reference, not value
    (1, 2)
  ]) ===
  [1, 2]; // false (different references)
const a = [1, 2];
const b = a;
a === b; // true (same reference)
```

## Useful Patterns in React

[Back to top](#table-of-contents)

```js
// Conditional object property
const user = {
  name: "Alice",
  ...(isAdmin && { role: "admin" }),
};

// Dynamic key in setState
const handleChange = (e) => {
  const { name, value } = e.target;
  setForm((prev) => ({ ...prev, [name]: value }));
};

// Array state updates (never mutate directly)
setItems((prev) => [...prev, newItem]); // Add
setItems((prev) => prev.filter((item) => item.id !== id)); // Remove
setItems((prev) =>
  prev.map(
    (
      item, // Update
    ) => (item.id === id ? { ...item, done: true } : item),
  ),
);
```
