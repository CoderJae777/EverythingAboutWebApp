# JavaScript Cheatsheet (React-Focused)

---

## Table of Contents

**JavaScript (React)**

- [Destructuring](#destructuring)
- [Spread & Rest](#spread--rest)
  - [Spread — expand one thing into many](#spread--expand-one-thing-into-many)
  - [Rest — collect remaining values into one](#rest--collect-remaining-values-into-one)
  - [Spread vs Rest — same symbol, opposite direction](#spread-vs-rest--same-symbol-opposite-direction)
- [Promises & Async/Await](#promises--asyncawait)
- [Modules (Import / Export)](#modules-import--export)
- [DOM Selection](#dom-selection)
- [Events & Event Handling](#events--event-handling)
- [Timers](#timers)
- [Useful Patterns in React](#useful-patterns-in-react)

**JavaScript (General)**

- [Variables](#variables)
  - [`const` — cannot be reassigned](#const--cannot-be-reassigned-but-objectsarrays-can-still-be-mutated)
  - [`const` does NOT copy — it creates a reference](#const-does-not-copy--it-creates-a-reference)
  - [`let` — can be reassigned](#let--can-be-reassigned)
  - [Block scoping](#block-scoping)
  - [Temporal Dead Zone — `let`/`const` cannot be accessed before declaration](#temporal-dead-zone--letconst-cannot-be-accessed-before-declaration)
  - [Comparison](#comparison)
  - [When to use which](#when-to-use-which)
- [Data Types](#data-types)
  - [`null` vs `undefined`](#null-vs-undefined)
- [Strings & Template Literals](#strings--template-literals)
  - [Quotes vs backticks](#quotes-vs-backticks)
  - [Template literals vs string concatenation](#template-literals-vs-string-concatenation)
  - [Expressions inside `${}`](#expressions-inside-)
  - [Multi-line strings](#multi-line-strings)
  - [When to use which](#when-to-use-which-1)
  - [String methods](#string-methods)
- [Console Log](#console-log)
- [Operators & Equality](#operators--equality)
  - [Arithmetic operators](#arithmetic-operators)
  - [`=` vs `==` vs `===`](#-vs--vs-)
  - [Comparison operators](#comparison-operators)
- [Control Flow](#control-flow)
  - [if / else](#if--else)
  - [switch](#switch)
  - [Ternary operator](#ternary-operator)
  - [Logical operators](#logical-operators)
- [Loops](#loops)
  - [Looping through an object's properties with `for...in`](#looping-through-an-objects-properties-with-forin)
  - [for...of — loop over values of any iterable (arrays, strings, Maps, Sets)](#forof--loop-over-values-of-any-iterable-arrays-strings-maps-sets)
  - [`for...of` vs `for...in`](#forof-vs-forin)
- [Functions](#functions)
  - [Key concepts](#key-concepts)
- [Functional Programming](#functional-programming)
  - [Core concepts](#core-concepts)
- [Arrays](#arrays)
  - [Creating & accessing](#creating--accessing)
  - [Adding & removing (mutate the original)](#adding--removing-mutate-the-original)
  - [Non-mutating alternatives (return new array)](#non-mutating-alternatives-return-new-array)
  - [Array methods](#array-methods)
  - [Sorting](#sorting)
  - [Arrays of objects](#arrays-of-objects)
- [Set](#set)
- [Objects](#objects)
  - [Creating & accessing](#creating--accessing-1)
  - [Adding, updating & deleting](#adding-updating--deleting)
  - [Checking existence & nested access](#checking-existence--nested-access)
  - [Looping & copying](#looping--copying)
  - [Object methods](#object-methods)
  - [Object literal vs Constructor/Class vs Object.create](#object-literal-vs-constructorclass-vs-objectcreate)
- [Classes](#classes)
  - [Basic class](#basic-class)
  - [Constructor — what `new` does step by step](#constructor--what-new-does-step-by-step)
  - [Default parameters in constructors](#default-parameters-in-constructors)
  - [Inheritance — `extends` and `super`](#inheritance--extends-and-super)
  - [Private fields and methods](#private-fields-and-methods)
  - [Getters and setters](#getters-and-setters)
  - [Constructor functions (older style, pre-class syntax)](#constructor-functions-older-style-pre-class-syntax)
- [Math Object](#math-object)
- [JSON](#json)
- [Error Handling](#error-handling)
  - [Error types](#error-types)
  - [Catching specific error types](#catching-specific-error-types)
  - [Async/await error handling](#asyncawait-error-handling)
- [Testing with Jest](#testing-with-jest)
  - [Setup](#setup)
  - [Test file naming — Jest looks for](#test-file-naming--jest-looks-for)
  - [Basic structure](#basic-structure)
  - [Common matchers](#common-matchers)
  - [Exporting for tests](#exporting-for-tests)
  - [Example — testing the Character class](#example--testing-the-character-class)

---

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
const [firstItem, , thirdItem] = [10, 20, 30]; // Skip middle: firstItem=10, thirdItem=30

// Nested object destructuring
const user2 = { name: "Alice", address: { city: "NY", zip: "10001" } };
const {
  address: { city },
} = user2; // city = "NY"

// Destructuring in a for...of loop
const users = [{ name: "Alice" }, { name: "Bob" }];
for (const { name } of users) {
  console.log(name); // "Alice", "Bob"
}

// Missing values become undefined
const { name, country } = { name: "Alice" };
country; // undefined — key didn't exist in the object

// Nested array destructuring (array of arrays)
const products = [
  ["Laptop", 1000],
  ["Phone", 500],
  ["Tablet", 700],
];
const [
  [firstProductName, firstProductPrice],
  [secondProductName, secondProductPrice],
  [thirdProductName, thirdProductPrice],
] = products;
console.log(`Second product: ${secondProductName}`); // "Second product: Phone"
console.log(`Second product price: ${secondProductPrice}`); // "Second product price: 500"

// Useful when iterating — e.g. Object.entries()
const scores = { alice: 90, bob: 85 };
for (const [name, score] of Object.entries(scores)) {
  console.log(`${name}: ${score}`); // "alice: 90", "bob: 85"
}

// Also works with Map
const map = new Map([
  ["x", 10],
  ["y", 20],
]);
for (const [key, value] of map) {
  console.log(key, value); // "x" 10, "y" 20
}
```

---

## Spread & Rest

[Back to top](#table-of-contents)

Both use `...` but do opposite things — spread **expands**, rest **collects**.

#### Spread — expand one thing into many

[Back to top](#table-of-contents)

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

// destructuring with spread
const items = ["apple", "banana", "cherry", "date", "elderberry", "fig"];
const [firstItem, , thirdItem, ...remainingItems] = items;
console.log(remainingItems); //["date", "elderberry", "fig"]
```

#### Rest — collect remaining values into one

[Back to top](#table-of-contents)

```js
// Object rest — collect leftover properties after destructuring
const user = { name: "Alice", age: 25, role: "dev" };
const { name, ...rest } = user;
// name → "Alice"
// rest → { age: 25, role: "dev" }

// Array rest — collect remaining elements
const [first, second, ...others] = [1, 2, 3, 4, 5];
// first  → 1
// second → 2
// others → [3, 4, 5]

// Function rest parameters — collect extra arguments into an array
function sum(...nums) {
  return nums.reduce((acc, n) => acc + n, 0);
}
sum(1, 2, 3, 4); // 10

// Common in React — pass known props, forward the rest
const Button = ({ label, onClick, ...rest }) => {
  return (
    <button onClick={onClick} {...rest}>
      {label}
    </button>
  );
  // ...rest forwards any extra props (e.g. className, disabled) to the element
};
```

#### Spread vs Rest — same symbol, opposite direction

[Back to top](#table-of-contents)

|            | Direction                     | Example                      |
| ---------- | ----------------------------- | ---------------------------- |
| **Spread** | Expands one thing into many   | `[...arr]`, `{...obj}`       |
| **Rest**   | Collects many things into one | `const { a, ...rest } = obj` |

---

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

---

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

---

## DOM Selection

[Back to top](#table-of-contents)

Used to grab elements from the page before reading or manipulating them.

```js
// getElementById — select by id (no # prefix), returns single element or null
const title = document.getElementById("title");

// getElementsByClassName — returns a live HTMLCollection (not NodeList)
const cards = document.getElementsByClassName("card");

// getElementsByTagName — all elements of a given tag
const buttons = document.getElementsByTagName("button");

// Note: HTMLCollection (from getElements*) vs NodeList (from querySelectorAll)
// — HTMLCollection: live (auto-updates if DOM changes), no .forEach()
// — NodeList: static snapshot, has .forEach()
// Convert either to an array to use all array methods:
const cardsArray = Array.from(cards);

// querySelector — returns the FIRST matching element (or null)
const btn = document.querySelector("button");          // by tag
const header = document.querySelector("#title");       // by id
const card = document.querySelector(".card");          // by class
const input = document.querySelector("form input");    // by CSS selector

// querySelectorAll — returns ALL matching elements as a NodeList
const items = document.querySelectorAll(".list-item");

// Iterating over a NodeList
items.forEach(item => console.log(item.textContent));
// or
for (const item of items) {
    console.log(item.textContent);
}

// Reading & writing content
title.textContent;           // get text
title.textContent = "Hello"; // set text
card.innerHTML = "<p>Hi</p>"; // set HTML (be careful with user input — XSS risk)

// Reading & writing attributes
input.getAttribute("placeholder");       // get
input.setAttribute("placeholder", "..."); // set

// Adding & removing classes
card.classList.add("active");
card.classList.remove("active");
card.classList.toggle("active");  // add if missing, remove if present
card.classList.contains("active"); // true / false

// Changing styles
btn.style.backgroundColor = "blue";
btn.style.display = "none"; // hide element
```

---

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

### Event Bubbling

[Back to top](#table-of-contents)

After an element handles an event, it **bubbles up** the DOM tree — every ancestor with a matching listener will also fire, unless stopped.

```js
document.body.addEventListener("click", function handleBodyClick() {
    console.log("clicked the body");
});

function handleTitleClick() {
    console.log("clicked the title");
}
// <h1 onclick="handleTitleClick()">Welcome</h1>

// User clicks the <h1>:
// 1. "clicked the title"  — h1's own handler fires first
// 2. "clicked the body"   — click bubbles up to body, firing handleBodyClick

// handleBodyClick is never called directly — the browser calls it automatically
// when the event reaches <body>. addEventListener listens for any click on that
// element OR anything that bubbles up to it.

// To prevent bubbling:
function handleTitleClick(e) {
    console.log("clicked the title");
    e.stopPropagation(); // stops here — body listener won't fire
}
```

---

## Timers

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

---

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
  prev.map((item) => (item.id === id ? { ...item, done: true } : item)),
); // Update
```

---

## Variables

[Back to top](#table-of-contents)

`const` and `let` are block-scoped — they only exist within the `{}` block they're declared in. Prefer `const` by default; use `let` only when you need to reassign.

```js
const name = "Alice"; // Cannot be reassigned — use by default
let count = 0; // Can be reassigned — use when value changes
var old = "avoid"; // Function-scoped — avoid in modern JS
```

#### `const` — cannot be reassigned (but objects/arrays can still be mutated)

[Back to top](#table-of-contents)

```js
const name = "Alice";
name = "Bob"; // TypeError: Assignment to constant variable

const user = { name: "Alice" };
user.name = "Bob"; // OK — mutating the object, not reassigning the variable
user = {}; // TypeError — reassigning the variable itself is not allowed

const nums = [1, 2, 3];
nums.push(4); // OK — mutating the array is fine
nums = []; // TypeError
```

#### `const` does NOT copy — it creates a reference

[Back to top](#table-of-contents)

```js
const a = [1, 2, 3];
const b = a; // b points to the SAME array as a
b.push(4);
console.log(a); // [1, 2, 3, 4] — a was also changed!

// To make an independent copy, use spread:
const c = [...a]; // new array, separate from a
c.push(99);
console.log(a); // [1, 2, 3, 4] — a is unaffected
```

#### `let` — can be reassigned

[Back to top](#table-of-contents)

```js
let count = 0;
count = 1; // OK
count++; // OK
```

#### Block scoping

[Back to top](#table-of-contents)

```js
if (true) {
  const x = 10;
  let y = 20;
  console.log(x, y); // 10 20
}
console.log(x); // ReferenceError: x is not defined
console.log(y); // ReferenceError: y is not defined

// var leaks out of blocks (avoid)
if (true) {
  var z = 30;
}
console.log(z); // 30 — leaks out of the if block
```

#### Temporal Dead Zone — `let`/`const` cannot be accessed before declaration

[Back to top](#table-of-contents)

```js
console.log(a); // ReferenceError (TDZ)
let a = 5;

console.log(b); // undefined (var is hoisted and initialized to undefined)
var b = 5;
```

#### Comparison

[Back to top](#table-of-contents)

|           | `var`    | `let` | `const` |
| --------- | -------- | ----- | ------- |
| Reassign  | yes      | yes   | no      |
| Redeclare | yes      | no    | no      |
| Scope     | function | block | block   |

#### When to use which

[Back to top](#table-of-contents)

- `const` — default choice for everything
- `let` — only when the variable needs to be reassigned (loop counters, accumulators)
- `var` — never in modern JS

---

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
typeof "hello"; // "string"
typeof 42; // "number"
typeof true; // "boolean"
typeof undefined; // "undefined"
typeof null; // "object" ← known JS quirk, null is NOT an object
typeof [1, 2, 3]; // "object" ← arrays are objects too
typeof {}; // "object"
typeof function () {}; // "function"

// Practical use — guard before using a value
if (typeof value === "string") {
  console.log(value.toUpperCase());
}
```

#### `null` vs `undefined`

[Back to top](#table-of-contents)

- `undefined` — JS saying "this was never given a value" (happens automatically)
- `null` — you intentionally set it to "empty"

```js
let x; // undefined — JS did this, you forgot to assign
let y = null; // null — YOU did this intentionally
```

---

## Strings & Template Literals

[Back to top](#table-of-contents)

#### Quotes vs backticks

[Back to top](#table-of-contents)

```js
const a = "hello"; // single quotes
const b = "hello"; // double quotes — both do the same thing
const c = `hello`; // backtick (template literal) — supports expressions
```

#### Template literals vs string concatenation

[Back to top](#table-of-contents)

```js
const name = "Alice";
const age = 25;

// Old way — string concatenation with +
const msg1 = "Hello, " + name + "! You are " + age + " years old.";

// Template literal — cleaner, no + needed
const msg2 = `Hello, ${name}! You are ${age} years old.`;
```

#### Expressions inside `${}`

[Back to top](#table-of-contents)

```js
const price = 10;
const qty = 3;

const total = `Total: ${price * qty}`; // "Total: 30"
const label = `${age >= 18 ? "Adult" : "Minor"}`; // ternary inside ${}
```

#### Multi-line strings

[Back to top](#table-of-contents)

```js
// Regular string — need \n for newlines
const old = "Line one\nLine two\nLine three";

// Template literal — just press Enter
const modern = `
  Line one
  Line two
  Line three
`;
```

#### When to use which

[Back to top](#table-of-contents)

```js
const a = "hello"; // simple string, no variables — quotes are fine
const b = `Hello, ${name}!`; // variables or expressions — use template literal
const c = `
  multi
  line
`; // multi-line — use template literal
```

#### String methods

[Back to top](#table-of-contents)

```js
const str = "Hello, World!";

str.length; // 13
str.toUpperCase(); // "HELLO, WORLD!"
str.toLowerCase(); // "hello, world!"
str.includes("World"); // true
str.startsWith("Hello"); // true
str.endsWith("!"); // true
str.trim(); // remove whitespace from both ends
str.slice(0, 5); // "Hello"
str.replace("World", "JS"); // "Hello, JS!"
str.split(", "); // ["Hello", "World!"]

// Concatenation methods
"Hello".concat(" ", "World", "!"); // "Hello World!"
"ha".repeat(3); // "hahaha"

// Padding (useful for formatting)
"5".padStart(3, "0"); // "005" — pad left to length 3
"5".padEnd(3, "0"); // "500" — pad right to length 3

// Replace
"aabbaa".replace("a", "x"); // "xabbaa"  — only first match
"aabbaa".replaceAll("a", "x"); // "xxbbxx"  — all matches

// Split & Join
const csv = "apple,banana,cherry";
const arr = csv.split(","); // ["apple", "banana", "cherry"]
arr.join(" - "); // "apple - banana - cherry"

// Accessing characters
const word = "hello";
word[0]; // "h"
word.charAt(1); // "e"
word.at(-1); // "o" — last character

// Finding position
"hello".indexOf("l"); // 2 (first match)
"hello".lastIndexOf("l"); // 3 (last match)
"hello".indexOf("z"); // -1 (not found)
```

---

## Console Log

[Back to top](#table-of-contents)

```js
console.log("Hello"); // prints: Hello
console.log(name); // prints the value of name
console.log("Name:", name); // prints: Name: Alice

// IMPORTANT: use backticks (`) not quotes (" or ') for template literals
console.log(`Age is ${age}`); // prints: Age is 25
console.log(name, age, count); // prints multiple values separated by spaces
```

---

## Operators & Equality

[Back to top](#table-of-contents)

#### Arithmetic operators

[Back to top](#table-of-contents)

```js
const a = 10;
const b = 3;

a + b; // 13   (addition)
a - b; // 7    (subtraction)
a * b; // 30   (multiplication)
a / b; // 3.33 (division)
a % b; // 1    (modulus — remainder)
a ** b; // 1000 (exponentiation — 10 to the power of 3)

// Shorthand assignment
let x = 10;
x += 5; // x = x + 5  → 15
x -= 3; // x = x - 3  → 12
x *= 2; // x = x * 2  → 24
x /= 4; // x = x / 4  → 6

// Increment / Decrement
x++; // x = x + 1
x--; // x = x - 1
```

#### `=` vs `==` vs `===`

[Back to top](#table-of-contents)

```js
// = is assignment (sets a value)
let x = 5;

// == is loose equality (compares value, ignores type — avoid)
5 == "5"; // true  — "5" gets converted to 5
0 == false; // true  — both become 0

// === is strict equality (compares value AND type — always use this)
5 === "5"; // false — number vs string
0 === false; // false — number vs boolean
5 === 5; // true  — same type, same value
```

Always use `===`. Using `==` leads to unexpected bugs because of type coercion.

#### Comparison operators

[Back to top](#table-of-contents)

```js
5 === 5; // true  (same type and value)
5 === "5"; // false (different types)
5 !== 3; // true

// Comparing objects/arrays — compares by reference, not value
[1, 2] === [1, 2]; // false — different objects in memory
const a = [1, 2];
const b = a;
a === b; // true — same reference
```

---

## Control Flow

[Back to top](#table-of-contents)

#### if / else

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

#### switch

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

Use `switch` when comparing one value against many options. Don't forget `break` — without it, execution falls through to the next case.

#### Ternary operator

[Back to top](#table-of-contents)

```js
const status = age >= 18 ? "adult" : "minor";

// In React JSX
{
  isLoggedIn ? <Dashboard /> : <Login />;
}
{
  error ? <p>{error}</p> : null;
}
```

React example — dynamic inline style with ternary:

```jsx
const CharCounter = () => {
  const [text, setText] = useState("");

  return (
    <div>
      <textarea value={text} onChange={(e) => setText(e.target.value)} />
      <p style={{ color: text.length > 100 ? "red" : "black" }}>
        Characters: {text.length}
      </p>
    </div>
  );
};
```

#### Logical operators

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

// ?. — optional chaining (safe access on nested objects)
const city = user?.address?.city; // undefined if any part is null/undefined
const first = arr?.[0];
const result = obj?.method?.();
```

---

## Loops

[Back to top](#table-of-contents)

```js
// for — when you know exactly how many times to loop
for (let i = 0; i < 5; i++) {
  console.log(i); // 0, 1, 2, 3, 4
}

// while — when you loop until a condition is false
let count = 0;
while (count < 3) {
  console.log(count); // 0, 1, 2
  count++;
}

// do...while — always runs at least once before checking the condition
let x = 0;
do {
  console.log(x); // 0, 1, 2
  x++;
} while (x < 3);

// for...of — loop over values of an array
const fruits = ["apple", "banana", "cherry"];
for (const fruit of fruits) {
  console.log(fruit); // apple, banana, cherry
}

// for...in — loop over keys of an object
const user = { name: "Alice", age: 25 };
for (const key in user) {
  console.log(`${key}: ${user[key]}`); // name: Alice, age: 25
}
```

In React, you'll rarely use loops directly — `.map()` and `.filter()` are preferred for rendering lists.

#### Looping through an object's properties with `for...in`

[Back to top](#table-of-contents)

```js
const animal = {
  canJump: true, // lives on the prototype — inherited by bird
};

const bird = Object.create(animal); // bird's prototype is animal
bird.canFly = true; // own property
bird.hasFeathers = true; // own property
```

**Own properties only — use `for...of` with `Object.keys()`:**

`Object.keys()` returns only the object's own properties, not inherited ones.

```js
function birdCan() {
  for (const key of Object.keys(bird)) {
    console.log(`${key}: ${bird[key]}`);
  }
}

birdCan();
// canFly: true
// hasFeathers: true        ← canJump is NOT logged (it's inherited, not own)
```

**All properties including inherited — use `for...in`:**

`for...in` walks the entire prototype chain and includes inherited enumerable properties.

```js
function animalCan() {
  for (const key in bird) {
    console.log(`${key}: ${bird[key]}`);
  }
}

animalCan();
// canFly: true
// hasFeathers: true
// canJump: true            ← included because for...in follows the prototype chain
```

|                                | Own properties | Inherited properties |
| ------------------------------ | -------------- | -------------------- |
| `for...of Object.keys(obj)`    | yes            | no                   |
| `for...of Object.values(obj)`  | yes            | no                   |
| `for...of Object.entries(obj)` | yes            | no                   |
| `for...in obj`                 | yes            | yes                  |

> Use `for...in` only for plain objects. For arrays, use `for...of` — `for...in` on arrays gives you the index as a string, not the value.

#### for...of — loop over values of any iterable (arrays, strings, Maps, Sets)

[Back to top](#table-of-contents)

```js
// Looping through an array inside a function
const dairy = [
  "cheese",
  "sour cream",
  "milk",
  "yogurt",
  "ice cream",
  "milkshake",
];

function logDairy() {
  for (const item of dairy) {
    console.log(item);
  }
}

logDairy();
// cheese
// sour cream
// milk
// yogurt
// ice cream
// milkshake

// Loop over a string — each character is an iteration
for (const char of "hello") {
  console.log(char); // h, e, l, l, o
}

// With index — use .entries()
const fruits = ["apple", "banana", "cherry"];
for (const [index, fruit] of fruits.entries()) {
  console.log(index, fruit); // 0 apple, 1 banana, 2 cherry
}

// Destructuring objects in an array
const users = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
];
for (const { name, age } of users) {
  console.log(name, age); // Alice 25, Bob 30
}

// Loop over a Set (no duplicates)
const unique = new Set([1, 2, 3, 2, 1]);
for (const val of unique) {
  console.log(val); // 1, 2, 3
}

// Loop over a Map
const map = new Map([
  ["a", 1],
  ["b", 2],
]);
for (const [key, value] of map) {
  console.log(key, value); // a 1, b 2
}
```

#### `for...of` vs `for...in`

[Back to top](#table-of-contents)

```js
// On an array — for...of gives values, for...in gives indexes (as strings)
const arr = ["a", "b", "c"];
for (const val of arr) console.log(val); // "a", "b", "c"
for (const key in arr) console.log(key); // "0", "1", "2" — not what you usually want

// On an object — for...in gives keys, for...of does NOT work (objects aren't iterable)
const obj = { x: 1, y: 2 };
for (const key in obj) console.log(key); // "x", "y"
for (const key of Object.keys(obj)) console.log(key); // "x", "y" — same result, safer
// for (const val of obj) ...                     // TypeError: obj is not iterable
```

|                                | Use on                      | Gives you                | Includes inherited?   |
| ------------------------------ | --------------------------- | ------------------------ | --------------------- |
| `for...of`                     | arrays, strings, Sets, Maps | values                   | n/a                   |
| `for...of Object.keys(obj)`    | objects                     | own keys only            | no                    |
| `for...of Object.entries(obj)` | objects                     | own `[key, value]` pairs | no                    |
| `for...in`                     | objects                     | all keys                 | yes (prototype chain) |

Use `for...of` for arrays and iterables. Use `for...in` for objects when you want inherited properties too — otherwise use `Object.keys()`.

---

## Functions

[Back to top](#table-of-contents)

```js
// Function declaration — hoisted (can call before definition)
function greet(name) {
  return `Hello, ${name}!`;
}

// Function expression — not hoisted
const greet = function (name) {
  return `Hello, ${name}!`;
};

// Arrow function — shortest syntax, preferred in React
const greet = (name) => `Hello, ${name}!`;

// Single parameter — parentheses optional
const double = (n) => n * 2;

// No parameters
const sayHi = () => "Hi!";

// Returning an object — wrap in parentheses
const makeUser = (name) => ({ name: name, active: true });

// Default parameters — used if argument is undefined or not passed
function greet(name = "stranger") {
  return `Hello, ${name}!`;
}
greet(); // "Hello, stranger!"
greet("Alice"); // "Hello, Alice!"

// Rest parameters — collect extra arguments into an array
function sum(...nums) {
  return nums.reduce((acc, n) => acc + n, 0);
}
sum(1, 2, 3); // 6
sum(1, 2, 3, 4); // 10

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

#### Key concepts

[Back to top](#table-of-contents)

- `return` exits the function and sends back a value. Without it, the function returns `undefined`.
- Variables declared inside a function are **local** — not accessible outside.
- Functions can call themselves (**recursion**), but always include a base case to stop.

---

## Functional Programming

[Back to top](#table-of-contents)

Functional programming (FP) is a style of writing code where you avoid changing data and instead build programs by composing small, predictable functions.

#### Core concepts

[Back to top](#table-of-contents)

```js
// ── Pure Functions ─────────────────────────────────────────────
// Always returns the same output for the same input.
// No side effects (doesn't modify anything outside itself).

// Impure — modifies external state
let total = 0;
function addToTotal(n) {
  total += n;
} // side effect!

// Pure — same input always gives same output
function add(a, b) {
  return a + b;
}

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

const slugify = (str) => removeSpaces(toLowerCase(trim(str)));
slugify("  Hello World  "); // "hello-world"

// ── Avoid Shared State ────────────────────────────────────────
// Instead of mutating shared variables, pass state through functions.

// Bad
let count = 0;
function increment() {
  count++;
}

// Good
function increment(count) {
  return count + 1;
}
const newCount = increment(0); // 1
```

> In React, functional programming principles are everywhere — pure components, immutable state updates, and `.map()`/`.filter()` for rendering lists all follow FP ideas.

---

## Arrays

[Back to top](#table-of-contents)

#### Creating & accessing

[Back to top](#table-of-contents)

```js
const empty = [];
const nums = [1, 2, 3];
const mixed = [1, "hello", true, null];
const filled = new Array(3).fill(0); // [0, 0, 0]
const range = Array.from({ length: 5 }, (_, i) => i); // [0, 1, 2, 3, 4]

nums[0]; // 1 (first element)
nums[nums.length - 1]; // 3 (last element)
nums.at(-1); // 3 (last element — cleaner)
nums[0] = 10; // mutates: [10, 2, 3]
```

#### Adding & removing (mutate the original)

[Back to top](#table-of-contents)

```js
const fruits = ["apple", "banana"];

// push — add to END, returns new length
fruits.push("cherry"); // ["apple", "banana", "cherry"]
fruits.push("date", "elderberry"); // push multiple at once

// pop — remove from END, returns removed item
const last = fruits.pop(); // last = "elderberry"

// unshift — add to START
fruits.unshift("avocado");

// shift — remove from START, returns removed item
const first = fruits.shift(); // first = "avocado"

// splice — remove/insert at any index
nums.splice(1, 1); // remove 1 item at index 1
nums.splice(1, 0, 99); // insert 99 at index 1 (no removal)
```

> `push`/`pop` are fast (end of array). `unshift`/`shift` are slower (re-indexes everything).

#### Non-mutating alternatives (return new array)

[Back to top](#table-of-contents)

```js
const withExtra = [...nums, 4]; // add to end
const withoutLast = nums.slice(0, -1); // remove last
const withoutFirst = nums.slice(1); // remove first
```

#### Array methods

[Back to top](#table-of-contents)

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

// .reduce() with an object accumulator
const groupByParity = (array) => {
  return array.reduce(
    (acc, n) => {
      if (n % 2 === 0) acc.evens.push(n);
      else acc.odds.push(n);
      return acc;
    },
    { evens: [], odds: [] },
  );
};
groupByParity([1, 2, 3, 4, 5, 6]); // → { evens: [2, 4, 6], odds: [1, 3, 5] }

// .forEach() — run a function on each item (no return value)
nums.forEach((n) => console.log(n));

// .slice() — extract portion (does NOT mutate)
const part = nums.slice(1, 3); // [2, 3]

// Chaining
const result = nums.filter((n) => n > 2).map((n) => n * 10); // [30, 40, 50]
```

#### Sorting

[Back to top](#table-of-contents)

`.sort()` takes a comparison function `(a, b)`. The return value decides the order:

| Return value | Result               |
| ------------ | -------------------- |
| Negative     | `a` comes before `b` |
| Positive     | `b` comes before `a` |
| `0`          | order stays the same |

```js
const nums = [10, 1, 21, 3];
const words = ["banana", "apple", "cherry"];

// Default .sort() — converts to strings, often wrong for numbers
nums.sort(); // [1, 10, 21, 3] ← WRONG for numbers

// Numeric sort ascending (a - b)
nums.sort((a, b) => a - b); // [1, 3, 10, 21]

// Numeric sort descending (b - a)
nums.sort((a, b) => b - a); // [21, 10, 3, 1]

// String sort (alphabetical A–Z)
words.sort((a, b) => a.localeCompare(b));

// String sort Z–A
words.sort((a, b) => b.localeCompare(a));

// Sort objects by a property
const users = [
  { name: "Charlie", age: 30 },
  { name: "Alice", age: 25 },
];
users.sort((a, b) => a.age - b.age); // by age ascending
users.sort((a, b) => a.name.localeCompare(b.name)); // by name A–Z

// .sort() mutates — copy first to keep original
const sorted = [...nums].sort((a, b) => a - b);
```

> `.sort()` mutates the original array. Always spread (`[...arr]`) before sorting if you need to keep the original.

#### Arrays of objects

[Back to top](#table-of-contents)

```js
const users = [
  { id: 1, name: "Alice", age: 25 },
  { id: 2, name: "Bob", age: 30 },
  { id: 3, name: "Charlie", age: 28 },
];

users[0].name; // "Alice"

// Add
users.push({ id: 4, name: "Diana", age: 22 });

// Find
const user = users.find((u) => u.id === 2);

// Filter
const over27 = users.filter((u) => u.age > 27);

// Update without mutating
const updated = users.map((u) => (u.id === 2 ? { ...u, age: 31 } : u));

// Remove by id
const removed = users.filter((u) => u.id !== 2);

// Check if any match
users.some((u) => u.name === "Alice"); // true
```

---

## Set

[Back to top](#table-of-contents)

A `Set` stores **unique values** — duplicates are automatically ignored. Values can be any type.

```js
// Creating a Set
const fruits = new Set(["apple", "banana", "apple", "cherry"]);
// {"apple", "banana", "cherry"} — duplicate "apple" removed

// Adding & removing
fruits.add("date");       // {"apple", "banana", "cherry", "date"}
fruits.delete("banana");  // {"apple", "cherry", "date"}

// Checking membership
fruits.has("apple");  // true
fruits.has("grape");  // false

// Size (not .length)
fruits.size; // 3

// Iterating
for (const fruit of fruits) {
    console.log(fruit);
}

// Common use case — remove duplicates from an array
const nums = [1, 2, 2, 3, 4, 4, 5];
const unique = [...new Set(nums)]; // [1, 2, 3, 4, 5]

// Convert Set back to array
Array.from(fruits); // ["apple", "cherry", "date"]

// Clear all values
fruits.clear(); // {}
```

---

## Objects

[Back to top](#table-of-contents)

#### Creating & accessing

[Back to top](#table-of-contents)

```js
const user = { name: "Alice", age: 25, active: true };

user.name; // "Alice"  — dot notation
user["name"]; // "Alice"  — bracket notation (useful for dynamic keys)

const key = "age";
user[key]; // 25
```

#### Adding, updating & deleting

[Back to top](#table-of-contents)

```js
user.email = "alice@mail.com"; // add new property
user.age = 26; // update existing
delete user.active; // delete a property
```

#### Checking existence & nested access

[Back to top](#table-of-contents)

```js
"name" in user; // true
user.hasOwnProperty("age"); // true

const person = { address: { city: "NYC", zip: "10001" } };
person.address.city; // "NYC"
person?.address?.city; // "NYC" — safe, won't throw if address is undefined
```

#### Looping & copying

[Back to top](#table-of-contents)

```js
for (const key in user) {
  console.log(key, user[key]);
}

const copy = { ...user };
const copy2 = Object.assign({}, user);
```

#### Object methods

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
const user2 = { name, age }; // same as { name: name, age: age }

// Object.assign — merge objects
const target = { a: 1 };
Object.assign(target, { b: 2 }, { c: 3 }); // { a: 1, b: 2, c: 3 }

// Object.freeze — prevent any changes
const config = Object.freeze({ api: "https://example.com", timeout: 3000 });
config.timeout = 5000; // silently fails (or throws in strict mode)

// Object.create — create with a specified prototype
const animal = {
  speak() {
    return `${this.name} makes a sound`;
  },
};
const dog = Object.create(animal);
dog.name = "Rex";
dog.speak(); // "Rex makes a sound"
```

#### Object literal vs Constructor/Class vs Object.create

[Back to top](#table-of-contents)

|                | Object Literal `{}`   | Constructor / Class        | `Object.create()`           |
| -------------- | --------------------- | -------------------------- | --------------------------- |
| Syntax         | `{ key: value }`      | `new ClassName()`          | `Object.create(proto)`      |
| Use case       | Single one-off object | Many objects of same shape | Inherit from another object |
| Shared methods | No                    | Yes, via prototype         | Yes, via prototype          |
| How common     | Very common           | Common                     | Rare — mostly in libraries  |

---

## Classes

[Back to top](#table-of-contents)

Classes are a blueprint for creating objects. They bundle data (fields) and behaviour (methods) together.

#### Basic class

[Back to top](#table-of-contents)

```js
class Animal {
  constructor(name, sound) {
    this.name = name;
    this.sound = sound;
  }

  speak() {
    return `${this.name} says ${this.sound}`;
  }
}

const dog = new Animal("Dog", "woof");
dog.speak(); // "Dog says woof"
```

#### Constructor — what `new` does step by step

[Back to top](#table-of-contents)

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
// 1. Creates a new empty object {}
// 2. Sets "this" to that new object inside the constructor
// 3. Runs the constructor body (assigns name, age)
// 4. Returns the new object automatically
```

#### Default parameters in constructors

[Back to top](#table-of-contents)

```js
class Person {
  constructor(name = "stranger", age = 0, energy = 100) {
    this.name = name; // uses default only if no value is passed
    this.age = age;
    this.energy = energy;
  }
}

new Person(); // name = "stranger"
new Person("Alice"); // name = "Alice"
```

#### Inheritance — `extends` and `super`

[Back to top](#table-of-contents)

`super` calls the parent class's constructor or methods. You must call `super()` before using `this` in a subclass.

Two-step mental model:

1. `super(...)` — "hey parent, set up your part first"
2. `this.x = x` — "now I'll add my own properties on top"

```js
class Dog extends Animal {
  constructor(name) {
    super(name, "woof"); // calls Animal's constructor
    // this.name and this.sound are now set
  }

  fetch() {
    return `${this.name} fetches the ball!`;
  }

  describe() {
    return super.speak() + " and fetches!"; // super.method() calls parent method
  }
}

const rex = new Dog("Rex");
rex.speak(); // "Rex says woof"  — inherited from Animal
rex.fetch(); // "Rex fetches the ball!"
rex.describe(); // "Rex says woof and fetches!"
```

The child constructor must list ALL params (parent + its own), then pass the parent ones to `super()`:

```js
class Person {
  constructor(name, age, energy) {
    this.name = name;
    this.age = age;
    this.energy = energy;
  }
}

class Worker extends Person {
  constructor(name, age, energy, xp, hourlyWage) {
    super(name, age, energy); // pass parent params up first
    this.xp = xp; // then set Worker-only properties
    this.hourlyWage = hourlyWage;
  }
}

const w = new Worker("Alice", 30, 100, 50, 20);
w.name; // "Alice" — from Person via super
w.xp; // 50 — set by Worker
```

Hardcoded `super` — use when the value should never change:

```js
class Dog extends Animal {
  constructor(name) {
    super(4); // dogs always have 4 legs
  }
}
```

`super` must come before `this` — otherwise JS throws a `ReferenceError`:

```js
constructor(name) {
  this.name = name; // ReferenceError — can't use this before super()
  super(4);
}
```

#### Private fields and methods

[Back to top](#table-of-contents)

Private fields and methods use the `#` prefix. They are only accessible inside the class — not from outside, not from subclasses.

```js
class BankAccount {
  #balance; // must be declared at the top before use

  static bank = "MyBank"; // static — belongs to the class, not instances

  constructor(owner, balance) {
    this.owner = owner; // public
    this.#balance = balance; // private
  }

  // Private method — internal logic, not exposed
  #validate(amount) {
    if (amount <= 0) throw new Error("Amount must be positive");
    if (amount > this.#balance) throw new Error("Insufficient funds");
  }

  // Public method — calls private method internally
  withdraw(amount) {
    this.#validate(amount);
    this.#balance -= amount;
    return this.#balance;
  }

  get balance() {
    return this.#balance; // getter — access like a property
  }
}

const acc = new BankAccount("Alice", 1000);
acc.withdraw(200); // 800
acc.balance; // 800 — via getter
acc.#balance; // SyntaxError — truly private
BankAccount.bank; // "MyBank" — accessed on the class
```

Private fields are NOT accessible in subclasses:

```js
class Animal {
  #secret = "hidden";
  getSecret() {
    return this.#secret;
  } // OK
}

class Dog extends Animal {
  revealSecret() {
    return this.#secret; // SyntaxError — subclass cannot access parent's private fields
  }
}

const d = new Dog();
d.getSecret(); // "hidden" — inherited public method still works
```

|                          | Public               | Private (`#`)     |
| ------------------------ | -------------------- | ----------------- |
| Accessible outside class | yes                  | no                |
| Accessible in subclass   | yes                  | no                |
| Enforced by JS engine    | no (convention only) | yes (SyntaxError) |

#### Getters and setters

[Back to top](#table-of-contents)

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
c.area; // 78.53... — called like a property, not c.area()
c.diameter = 20; // setter — updates radius to 10
```

#### Constructor functions (older style, pre-class syntax)

[Back to top](#table-of-contents)

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

> This older pattern still works and you'll see it in legacy code. Classes are just cleaner syntax on top of the same prototype-based system. In React, you'll mostly use plain objects and functions rather than classes — but you'll encounter them in older React code (class components) and in libraries like error boundaries.

---

## Math Object

[Back to top](#table-of-contents)

```js
// Constants
Math.PI; // 3.14159...
Math.E; // 2.71828... (Euler's number)

// Rounding
Math.round(4.6); // 5  — rounds to nearest integer
Math.round(4.4); // 4
Math.floor(4.9); // 4  — always rounds DOWN
Math.ceil(4.1); // 5  — always rounds UP
Math.trunc(4.9); // 4  — removes decimal, no rounding

// Min & Max
Math.max(1, 5, 3); // 5
Math.min(1, 5, 3); // 1
Math.max(...[1, 5, 3]); // 5 — spread array in

// Powers & Roots
Math.pow(2, 10); // 1024 — same as 2 ** 10
Math.sqrt(25); // 5
Math.cbrt(27); // 3 — cube root

// Absolute value
Math.abs(-7); // 7

// Random number between 0 (inclusive) and 1 (exclusive)
Math.random(); // e.g. 0.472...

// Random integer between 0 and n-1
Math.floor(Math.random() * 6); // 0–5 (like a die roll)

// Random integer between min and max (inclusive)
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
randomInt(1, 10); // random number from 1 to 10
```

---

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

---

## Error Handling

[Back to top](#table-of-contents)

```js
// Basic try/catch
try {
  const data = JSON.parse("bad json");
} catch (error) {
  console.error(error.message);
}

// try / catch / finally
try {
  const data = JSON.parse(badString);
} catch (error) {
  console.error(error.message);
} finally {
  // Always runs — whether it succeeded or failed
  console.log("Done");
}

// The error object
try {
  null.name; // throws TypeError
} catch (error) {
  error.name; // "TypeError"
  error.message; // "Cannot read properties of null"
  error.stack; // full stack trace (useful for debugging)
}

// Throwing your own errors
function divide(a, b) {
  if (b === 0) throw new Error("Cannot divide by zero");
  return a / b;
}
```

#### Error types

[Back to top](#table-of-contents)

```js
// Error — generic base error
throw new Error("Something went wrong");

// TypeError — wrong type, or method called on wrong type
null.name; // TypeError: Cannot read properties of null
(42).toUpperCase(); // TypeError: not a function

// ReferenceError — variable used before declared or doesn't exist
console.log(foo); // ReferenceError: foo is not defined

// SyntaxError — invalid JS syntax (usually caught before runtime)
JSON.parse("bad { json"); // SyntaxError: Unexpected token

// RangeError — value outside an allowed range
new Array(-1); // RangeError: Invalid array length

// URIError — malformed URI
decodeURIComponent("%"); // URIError: URI malformed
```

#### Catching specific error types

[Back to top](#table-of-contents)

```js
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
```

#### Async/await error handling

[Back to top](#table-of-contents)

```js
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

---

## Testing with Jest

[Back to top](#table-of-contents)

Jest is a JavaScript testing framework. It lets you write tests that verify your code behaves correctly.

#### Setup

[Back to top](#table-of-contents)

```bash
# 1. Initialise a package.json if you don't have one
npm init -y

# 2. Install Jest
npm install --save-dev jest

# 3. Add a test script to package.json
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

#### Test file naming — Jest looks for

[Back to top](#table-of-contents)

- Files ending in `.test.js` (e.g. `Character.test.js`)
- Files ending in `.spec.js`
- Files inside a `__tests__` folder

---

#### Basic structure

[Back to top](#table-of-contents)

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

  it("is alive when hp > 0", () => {
    // it() is the same as test()
    const goblin = new Character("Goblin", 50, 50, 10);
    expect(goblin.isAlive()).toBe(true);
  });
});
```

---

#### Common matchers

[Back to top](#table-of-contents)

```js
expect(value).toBe(50); // strict equality ===
expect(value).toEqual({ hp: 50 }); // deep equality — use for objects/arrays
expect(value).toBeTruthy(); // true, 1, "text", []
expect(value).toBeFalsy(); // false, 0, "", null, undefined
expect(value).toBeNull(); // strictly null
expect(value).toBeUndefined(); // strictly undefined
expect(value).toBeGreaterThan(0); // > 0
expect(value).toBeLessThan(100); // < 100
expect(array).toContain("Rex"); // array includes value
expect(string).toMatch(/pattern/); // regex match
expect(string).toContain("hello"); // string includes substring

// Testing that a function throws an error
expect(() => warrior.powerAttack(target)).toThrow("not enough rage");
```

---

#### Exporting for tests

[Back to top](#table-of-contents)

```js
// Character.js
module.exports = { Character, Warrior, Mage };
```

```js
// Character.test.js
const { Character, Warrior, Mage } = require("./Character");
```

---

#### Example — testing the Character class

[Back to top](#table-of-contents)

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
    target = new Character("Dummy", 200, 200, 0);
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
