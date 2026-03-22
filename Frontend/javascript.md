# JavaScript Cheatsheet (React-Focused)

## Variables

```js
const name = "Alice";   // Cannot be reassigned — use by default
let count = 0;          // Can be reassigned — use when value changes
var old = "avoid";      // Function-scoped — avoid in modern JS
```

## Data Types

```js
const str = "hello";        // String
const num = 42;             // Number
const bool = true;          // Boolean
const nothing = null;       // Intentional empty value
const notDefined = undefined; // Not yet assigned
const arr = [1, 2, 3];     // Array
const obj = { name: "Alice", age: 25 }; // Object
```

## Template Literals

Used heavily in React for dynamic strings.

```js
const name = "Alice";
const greeting = `Hello, ${name}!`;         // Hello, Alice!
const math = `Total: ${price * quantity}`;   // Expressions inside ${}
const multiLine = `
  Line one
  Line two
`;
```

## Arrow Functions

The standard way to write functions in React (components, handlers, callbacks).

```js
// Arrow function (preferred in React)
const greet = (name) => {
    return `Hello, ${name}`;
};

// Implicit return — single expression, no braces needed
const greet = (name) => `Hello, ${name}`;

// Single parameter — parentheses optional
const double = n => n * 2;

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

Used constantly in React for props, state, and imports.

```js
// Object destructuring
const user = { name: "Alice", age: 25, role: "dev" };
const { name, age } = user;            // name = "Alice", age = 25
const { name: userName } = user;       // Rename: userName = "Alice"
const { name, ...rest } = user;        // rest = { age: 25, role: "dev" }

// Default values
const { name, country = "US" } = user; // country defaults to "US"

// In function parameters (React props pattern)
const Greeting = ({ name, age }) => <h1>Hello {name}</h1>;

// Array destructuring (used with useState)
const [first, second] = [10, 20];      // first = 10, second = 20
const [count, setCount] = useState(0); // React useState pattern
const [, second] = [10, 20];           // Skip first element
```

## Spread Operator (`...`)

Used in React for copying state, passing props, and merging objects.

```js
// Copy an array
const original = [1, 2, 3];
const copy = [...original];           // [1, 2, 3]
const added = [...original, 4, 5];    // [1, 2, 3, 4, 5]
const merged = [...arr1, ...arr2];

// Copy an object
const user = { name: "Alice", age: 25 };
const updated = { ...user, age: 26 };  // { name: "Alice", age: 26 }

// Spread props in React
const props = { type: "text", placeholder: "Enter name" };
<input {...props} />
```

## Array Methods

These are essential for rendering lists and transforming data in React.

```js
const nums = [1, 2, 3, 4, 5];

// .map() — transform each item, returns new array (used to render lists)
const doubled = nums.map(n => n * 2);          // [2, 4, 6, 8, 10]
// React: {items.map(item => <li key={item.id}>{item.name}</li>)}

// .filter() — keep items that pass a test, returns new array
const evens = nums.filter(n => n % 2 === 0);   // [2, 4]

// .find() — return first item that matches
const found = nums.find(n => n > 3);            // 4

// .findIndex() — return index of first match
const idx = nums.findIndex(n => n > 3);          // 3

// .some() — true if at least one passes
const hasEven = nums.some(n => n % 2 === 0);     // true

// .every() — true if all pass
const allPositive = nums.every(n => n > 0);       // true

// .includes() — true if value exists
const hasThree = nums.includes(3);                // true

// .reduce() — accumulate into a single value
const sum = nums.reduce((acc, n) => acc + n, 0);  // 15

// .forEach() — run a function on each item (no return value)
nums.forEach(n => console.log(n));

// .sort() — sort in place (mutates!)
const sorted = [...nums].sort((a, b) => a - b);   // Copy first to avoid mutation

// .slice() — extract portion (does NOT mutate)
const part = nums.slice(1, 3);                     // [2, 3]

// Chaining
const result = nums
    .filter(n => n > 2)
    .map(n => n * 10);    // [30, 40, 50]
```

## Object Methods

```js
const user = { name: "Alice", age: 25, role: "dev" };

Object.keys(user);     // ["name", "age", "role"]
Object.values(user);   // ["Alice", 25, "dev"]
Object.entries(user);  // [["name", "Alice"], ["age", 25], ["role", "dev"]]

// Computed property names
const key = "email";
const obj = { [key]: "alice@mail.com" }; // { email: "alice@mail.com" }

// Shorthand property names
const name = "Alice";
const age = 25;
const user = { name, age }; // same as { name: name, age: age }
```

## Ternary Operator

Used in React for conditional rendering.

```js
const age = 20;
const status = age >= 18 ? "adult" : "minor";

// In React JSX
{isLoggedIn ? <Dashboard /> : <Login />}
{error ? <p>{error}</p> : null}
```

## Logical Operators for Conditional Rendering

```js
// && — render only if true (short-circuit)
{isLoggedIn && <Dashboard />}
{items.length > 0 && <List items={items} />}

// || — fallback / default value
const name = user.name || "Guest";

// ?? — nullish coalescing (only null/undefined, not 0 or "")
const count = data.count ?? 0;

// ?. — optional chaining (safe access)
const city = user?.address?.city;    // undefined if any part is null/undefined
const first = arr?.[0];
const result = obj?.method?.();
```

## Promises & Async/Await

Used for API calls and data fetching in React.

```js
// Fetch API with .then()
fetch("https://api.example.com/data")
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));

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

## JSON

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

```js
try {
    const data = JSON.parse(badString);
} catch (error) {
    console.error(error.message);
} finally {
    // Runs regardless of success or failure
}

// Throwing custom errors
if (!user) {
    throw new Error("User not found");
}
```

## Useful String Methods

```js
const str = "Hello, World!";

str.length;                  // 13
str.toUpperCase();           // "HELLO, WORLD!"
str.toLowerCase();           // "hello, world!"
str.includes("World");       // true
str.startsWith("Hello");     // true
str.endsWith("!");           // true
str.trim();                  // Remove whitespace from both ends
str.split(", ");             // ["Hello", "World!"]
str.replace("World", "JS"); // "Hello, JS!"
str.slice(0, 5);             // "Hello"
```

## Comparison & Equality

```js
// Always use strict equality
5 === 5       // true  (same type and value)
5 === "5"     // false (different types)
5 !== 3       // true

// Avoid loose equality
5 == "5"      // true  (type coercion — unpredictable)

// Comparing objects/arrays — compares by reference, not value
[1, 2] === [1, 2]   // false (different references)
const a = [1, 2];
const b = a;
a === b;             // true (same reference)
```

## Useful Patterns in React

```js
// Conditional object property
const user = {
    name: "Alice",
    ...(isAdmin && { role: "admin" }),
};

// Dynamic key in setState
const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
};

// Array state updates (never mutate directly)
setItems(prev => [...prev, newItem]);                      // Add
setItems(prev => prev.filter(item => item.id !== id));     // Remove
setItems(prev => prev.map(item =>                          // Update
    item.id === id ? { ...item, done: true } : item
));
```
