# React.js Cheatsheet

_This markdown contains content from the [Meta React Native Specialization](https://www.coursera.org/specializations/meta-react-native) on Coursera._
_Course: [React Basics](https://www.coursera.org/learn/react-basics)_

---

## Table of Contents

**General Knowledge**

- [Create a New Project](#create-a-new-project)
- [Clean Project Setup](#clean-project-setup)
- [Project Structure (Vite)](#project-structure-vite)
- [Useful Commands](#useful-commands)
- [What is the DOM?](#what-is-the-dom)
- [Virtual DOM (React)](#virtual-dom-react)
- [File / Component Organization](#file--component-organization)
- [Common Patterns](#common-patterns)

**JSX & JavaScript**

- [Arrow Functions in React](#arrow-functions-in-react)
- [JS vs JSX (Javascript XML)](#js-vs-jsx-javascript-xml)
- [JSX Rules](#jsx-rules)
- [Conditional Rendering](#conditional-rendering)
- [Rendering Lists](#rendering-lists)
- [Event Handling](#event-handling)

**React**

- [Functional Components](#functional-components)
- [Stateful vs Stateless Components](#stateful-vs-stateless-components)
- [Props](#props)
  - [Full Example (start to end)](#full-example-start-to-end)
  - [Destructuring Props (cleaner syntax)](#destructuring-props-cleaner-syntax)
  - [Default Prop Values](#default-prop-values)
  - [Children Props](#children-props)
  - [Passing Functions as Props](#passing-functions-as-props)
  - [Passing JS Data as props](#passing-js-data-as-props)
- [Fetching Data](#fetching-data)
- [Forms — Controlled Components](#forms--controlled-components)
- [Lifting State Up](#lifting-state-up)
- [React Router (v6)](#react-router-v6)
- [Styling in React](#styling-in-react)
- [Video and Audio Components](#video-and-audio-components)

**React Hooks**

- [useState](#usestate)
  - [Passing useStates as props](#passing-usestates-as-props)
- [useEffect](#useeffect)
- [useRef](#useref)
- [useContext](#usecontext)
- [useReducer](#usereducer)
- [useMemo](#usememo)
- [useCallback](#usecallback)
- [Custom Hooks](#custom-hooks)

---

## General Knowledge

[Back to top](#table-of-contents)

---

### Create a New Project

[Back to top](#table-of-contents)

```bash
# Using Vite (recommended — fast, modern)
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev

# Using Create React App (older, heavier)
npx create-react-app my-app
cd my-app
npm start
```

### Clean Project Setup

[Back to top](#table-of-contents)

Vite comes with demo content (logos, counter, links). To start with a blank slate:

**Step 1 —** Delete the following files from `src/`:

- `App.css`
- `index.css`
- `assets/` folder

**Step 2 —** Replace `src/App.jsx` with:

```jsx
const App = () => {
  return (
    <div>
      <h1>Hello, World!</h1>
    </div>
  );
};

export default App;
```

**Step 3 —** Replace `src/main.jsx` with:

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

This gives you a blank white page with just "Hello, World!" — no logos, no counter, no demo styles.

---

### Project Structure (Vite)

[Back to top](#table-of-contents)

```text
my-app/
├── public/            # Static files
├── src/
│   ├── App.jsx        # Main component
│   ├── App.css        # App styles
│   ├── main.jsx       # Entry point (renders App)
│   └── index.css      # Global styles
├── index.html         # HTML template
├── package.json       # Dependencies & scripts
└── vite.config.js     # Vite configuration
```

---

### Useful Commands

[Back to top](#table-of-contents)

```bash
npm run dev       # Start dev server
npm run build     # Build for production
npm run preview   # Preview production build
npm install axios # Install a package (example)
```

---

### What is the DOM?

[Back to top](#table-of-contents)

The **DOM (Document Object Model)** is the browser's live representation of your HTML page as a tree of objects.

When the browser loads HTML, it parses it and builds a tree structure where every element (`<div>`, `<p>`, `<h1>`, etc.) becomes a **node/object** that JavaScript can read and manipulate.

```text
document
 └── <html>
      ├── <head>
      │    └── <title>
      └── <body>
           ├── <h1>
           └── <p>
```

- **HTML** is your source code (static text)
- **DOM** is the live object tree the browser builds from that HTML
- JavaScript uses the DOM to change what's on screen — adding elements, changing text, toggling classes, etc.

```js
// Vanilla JS DOM manipulation
document.getElementById("title").textContent = "New Title";
document.querySelector(".btn").style.color = "red";
```

---

### Virtual DOM (React)

[Back to top](#table-of-contents)

In React, you rarely touch the DOM directly. React maintains a **Virtual DOM** — a lightweight copy of the real DOM. When state changes, React compares the virtual DOM to the real DOM and only updates what actually changed. This is why React is fast.

---

### File / Component Organization

[Back to top](#table-of-contents)

```text
src/
├── components/         # Reusable UI components
│   ├── Button.jsx
│   ├── Navbar.jsx
│   └── Card.jsx
├── pages/              # Page-level components (one per route)
│   ├── Home.jsx
│   ├── About.jsx
│   └── Profile.jsx
├── hooks/              # Custom hooks
│   └── useFetch.js
├── context/            # Context providers
│   └── AuthContext.jsx
├── App.jsx
└── main.jsx
```

---

### Common Patterns

[Back to top](#table-of-contents)

```jsx
// Loading / error / data pattern
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

// Toggle boolean
const [isOpen, setIsOpen] = useState(false);
<button onClick={() => setIsOpen(prev => !prev)}>Toggle</button>

// Controlled select dropdown
const [selected, setSelected] = useState("option1");
<select value={selected} onChange={(e) => setSelected(e.target.value)}>
    <option value="option1">Option 1</option>
    <option value="option2">Option 2</option>
</select>

// Controlled checkbox
const [checked, setChecked] = useState(false);
<input type="checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)} />

// Prevent re-renders with key reset
<Form key={selectedUserId} />  {/* Remounts when key changes */}
```

---

## JSX & JavaScript

[Back to top](#table-of-contents)

---

### Arrow Functions in React

[Back to top](#table-of-contents)

Arrow functions are the standard way to write functions in React.

```jsx
// Traditional function
function greet(name) {
  return "Hello, " + name;
}

// Arrow function (same thing)
const greet = (name) => {
  return "Hello, " + name;
};

// Arrow function with implicit return (one-liner, no braces)
const greet = (name) => "Hello, " + name;

// No parameters — parentheses required
const sayHi = () => "Hi!";

// One parameter — parentheses optional
const double = (n) => n * 2;
```

In React, arrow functions are used for **components**, **event handlers**, and **callbacks**:

```jsx
// Component
const Greeting = () => <h1>Hello</h1>;

// Event handler
<button onClick={() => console.log("Clicked!")}>Click</button>;

// Callback in .map()
{
  items.map((item) => <li key={item.id}>{item.name}</li>);
}
```

---

### JS vs JSX (Javascript XML)

[Back to top](#table-of-contents)

|                  | `.js`                          | `.jsx`                              |
| ---------------- | ------------------------------ | ----------------------------------- |
| **Contains**     | Plain JavaScript               | JavaScript + HTML-like syntax (JSX) |
| **Used for**     | Utilities, logic, helpers      | React components with UI            |
| **Can use JSX?** | Yes (if bundler is configured) | Yes (intended for it)               |

- **JSX** is not a separate language — it's a syntax extension that gets compiled to regular `React.createElement()` calls
- `.jsx` file extension makes it clear the file contains UI/markup
- Both `.js` and `.jsx` work in React projects — `.jsx` is a naming convention, not a requirement
- Vite **requires** `.jsx` for files containing JSX syntax; Create React App allows either

```jsx
// This JSX:
const element = <h1 className="title">Hello</h1>;

// Gets compiled to this JS:
const element = React.createElement("h1", { className: "title" }, "Hello");
```

**Rule of thumb:** Use `.jsx` for files that return UI (components), use `.js` for files with pure logic (utils, hooks, constants).

---

### JSX Rules

[Back to top](#table-of-contents)

JSX lets you write HTML-like syntax in JavaScript.

```jsx
// 1. Must return a single parent element
// Bad:
return <h1>Title</h1><p>Text</p>;
// Good:
return (
    <div>
        <h1>Title</h1>
        <p>Text</p>
    </div>
);

// 2. Use fragments to avoid extra divs
return (
    <>
        <h1>Title</h1>
        <p>Text</p>
    </>
);

// 3. className instead of class
<div className="container">...</div>

// 4. htmlFor instead of for
<label htmlFor="name">Name</label>

// 5. Self-closing tags
<img src="pic.jpg" alt="photo" />
<input type="text" />
<br />

// 6. JavaScript expressions in curly braces
<h1>{userName}</h1>
<p>{2 + 2}</p>
<p>{isLoggedIn ? "Welcome" : "Please log in"}</p>

// 7. Inline styles use objects with camelCase
<div style={{ backgroundColor: "blue", fontSize: "16px" }}>Styled</div>
```

---

### Conditional Rendering

[Back to top](#table-of-contents)

```jsx
// Traditional if/else — must be used OUTSIDE of JSX return
const Greeting = ({ isLoggedIn }) => {
  if (isLoggedIn) {
    return <Dashboard />;
  } else {
    return <Login />;
  }
};

// Ternary — can be used INSIDE JSX (replaces if/else in one line)
{
  isLoggedIn ? <Dashboard /> : <Login />;
}

// && — render only if true (no else needed)
{
  isAdmin && <AdminPanel />;
}
{
  items.length > 0 && <ItemList items={items} />;
}

// Early return — skip rendering entirely
const Profile = ({ user }) => {
  if (!user) return <p>Please log in</p>;
  return <h1>{user.name}</h1>;
};

// Multiple conditions
const StatusBadge = ({ status }) => {
  if (status === "active") return <span className="green">Active</span>;
  if (status === "pending") return <span className="yellow">Pending</span>;
  return <span className="red">Inactive</span>;
};
```

You can't use `if/else` inside JSX `{}` because it's a statement, not an expression. That's why ternary (`? :`) and `&&` exist — they produce a value.

---

### Rendering Lists

[Back to top](#table-of-contents)

```jsx
const TodoList = ({ items }) => {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.text}</li>
      ))}
    </ul>
  );
};

// key must be unique and stable — use id, not index
// Bad:  key={index}  (causes bugs with reordering)
// Good: key={item.id}
```

---

### Event Handling

[Back to top](#table-of-contents)

```jsx
// Click
<button onClick={() => console.log("Clicked!")}>Click</button>

// Click with handler function
const handleClick = (e) => {
    e.preventDefault();
    console.log("Button clicked");
};
<button onClick={handleClick}>Click</button>

// Passing arguments to handlers
<button onClick={() => handleDelete(item.id)}>Delete</button>

// Form submit
const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    console.log(form);
};
<form onSubmit={handleSubmit}>...</form>

// Input change
const [name, setName] = useState("");
<input value={name} onChange={(e) => setName(e.target.value)} />

// The Event Object (e)
// When an event fires, React passes a SyntheticEvent object to your handler.
// It's a temporary snapshot of that single event — not a tracker or counter.
// A new object is created for each event and discarded after the handler runs.

const handleClick = (e) => {
    e.target;              // The DOM element that triggered the event
    e.type;                // Event type string, e.g. "click"
    e.preventDefault();    // Stop default browser behavior (e.g. form reload)
    e.stopPropagation();   // Stop event from bubbling up to parent elements
    e.clientX, e.clientY;  // Mouse coordinates at time of click
    e.target.value;        // Value of an input element (used with onChange)
    e.target.id;           // ID of the element (useful when sharing one handler)
    e.nativeEvent;         // The underlying native browser event
};

// You don't have to use it — only accept e when you need event info.
// If you just want to run some logic on click, you can skip it entirely:
const handleClick = () => console.log("clicked");

// Common events
<input onChange={handleChange} />       // Input changes
<input onFocus={handleFocus} />         // Input focused
<input onBlur={handleBlur} />           // Input lost focus
<input onKeyDown={handleKeyDown} />     // Key pressed
<div onMouseEnter={handleHover} />      // Mouse enters
<form onSubmit={handleSubmit} />        // Form submitted
```

---

## React

[Back to top](#table-of-contents)

---

### Functional Components

[Back to top](#table-of-contents)

The building blocks of React. Every piece of UI is a component.

```jsx
// Function component (the standard way)
const Greeting = () => {
  return <h1>Hello, World!</h1>;
};

// With implicit return
const Greeting = () => <h1>Hello, World!</h1>;

// Using the component
<Greeting />;
```

---

### Stateful vs Stateless Components

[Back to top](#table-of-contents)

- **Stateful** — has its own state using `useState`. It manages and updates data internally.
- **Stateless** — has no state. It just receives props and renders UI.

```jsx
// Stateful — owns and manages data
const Counter = () => {
  const [count, setCount] = useState(0);
  return <Display count={count} />;
};

// Stateless — just receives props and displays them
const Display = ({ count }) => {
  return <p>Count: {count}</p>;
};
```

Most components in a React app are stateless. Only the components that need to manage data should hold state.

---

### Props

[Back to top](#table-of-contents)

How you pass data from a parent component to a child component. Props is an object that holds all the attributes you pass to a component.

### Full Example (start to end)

[Back to top](#table-of-contents)

```jsx
// ---- Step 1: Create the child component that accepts props ----

// Greeting.jsx
const Greeting = (props) => {
    return (
        <div>
            <h1>Hello, {props.name}</h1>
            <p>Age: {props.age}</p>
        </div>
    );
};

export default Greeting;


// ---- Step 2: Import and use it in the parent component ----

// App.jsx
import Greeting from "./Greeting";

const App = () => {
    return (
        <div>
            {/* Step 3: Pass data as attributes — THIS is where props are created */}
            {/* React takes these attributes and bundles them into an object: */}
            {/* props = { name: "Alice", age: 25 } */}
            <Greeting name="Alice" age={25} />
        </div>
    );
};

export default App;
```

**What happens behind the scenes:**

```text
1. App renders and hits <Greeting name="Alice" age={25} />
2. React creates an object:  props = { name: "Alice", age: 25 }
3. React calls Greeting(props)
4. Inside Greeting, props.name is "Alice" and props.age is 25
5. Greeting returns <div><h1>Hello, Alice</h1><p>Age: 25</p></div>
```

You never manually create the props object — React builds it from the attributes on the tag.

### Destructuring Props (cleaner syntax)

[Back to top](#table-of-contents)

Instead of writing `props.name`, `props.age` every time, you can destructure:

```jsx
// Same thing, but pull out the values directly
const Greeting = ({ name, age }) => {
  return (
    <div>
      <h1>Hello, {name}</h1>
      <p>Age: {age}</p>
    </div>
  );
};

// Both are identical — destructuring is just shorthand
```

### Default Prop Values

[Back to top](#table-of-contents)

```jsx
const Button = ({ label = "Click me", color = "blue" }) => {
    return <button style={{ backgroundColor: color }}>{label}</button>;
};

<Button />                    // uses defaults: "Click me" + blue
<Button label="Submit" />     // "Submit" + blue
```

### Children Props

[Back to top](#table-of-contents)

`props.children` is the content the parent puts inside the component's opening and closing tags. The child doesn't need to know what's inside — it just renders it.

```jsx
// Anything between opening and closing tags becomes props.children
<Card>
  <h2>Title</h2>
  <p>Some content</p>
</Card>;

const Card = (props) => {
  return <div className="card">{props.children}</div>;
};

// Or destructured
const Card = ({ children }) => {
  return <div className="card">{children}</div>;
};
```

### Passing Functions as Props

[Back to top](#table-of-contents)

```jsx
<Button onClick={() => alert("Clicked!")} />;

const Button = ({ onClick }) => {
  return <button onClick={onClick}>Click me</button>;
};
```

### Passing JS Data as props

_For what?_ So that moving forward everytime you need to edit whatever gets passed to the child, you can just edit directly in the data constant, and dont need to find the parent specifically and edit what you want to pass to the child!

[Back to top](#table-of-contents)

```jsx
const data = {
    heading: " 99% Discount!",
    subtitle: "Buy now before its gone!"
}

// Child
function PromoHeading (props){
    return(
        <div>
            <h1>{props.heading}</h1>
            <h2>{props.subtitle}</h2>
        </div>
    )
}

// Parent - pass the predefined data's heading and subtitle into PromoHeading child
function Promo() {
    return (
        <div>
            <PromoHeading heading={data.heading}, subtitle={data.subtitle} />
        </div>
    )
}


```

---

## React Hooks

[Back to top](#table-of-contents)

Built-in functions that let you "hook into" React features like state and side effects from functional components. All hooks start with `use`.

---

### useState

[Back to top](#table-of-contents)

Lets a component remember values that change over time.

```jsx
import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0); // [currentValue, setterFunction]

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    setCount((prev) => prev - 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleIncrement}>+1</button>
      <button onClick={handleDecrement}>-1</button>
    </div>
  );
};

// Using previous state — light switch toggle
const LightSwitch = () => {
  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => {
    setIsOn((prevIsOn) => !prevIsOn); // flip the previous value
  };

  return (
    <div>
      <p>The light is {isOn ? "ON" : "OFF"}</p>
      <button onClick={handleToggle}>Toggle</button>
    </div>
  );
};

// Why use (prev) => ... instead of setIsOn(!isOn)?
// React batches state updates, so "isOn" might be stale.
// Using the callback form guarantees you're working with the latest value.

// ⚠️ Stale State — see the dedicated section below for a full explanation.

// Different data types
const [name, setName] = useState(""); // String
const [items, setItems] = useState([]); // Array
const [user, setUser] = useState(null); // Null (will hold object later)
const [form, setForm] = useState({ name: "", email: "" }); // Object

// Updating objects — always spread to create a new copy
setUser({ ...user, name: "Alice" });
setForm((prev) => ({ ...prev, email: "a@b.com" }));

// Updating arrays — never mutate directly
setItems([...items, newItem]); // Add
setItems(items.filter((item) => item.id !== id)); // Remove
setItems(
  items.map(
    (
      item, // Update one
    ) => (item.id === id ? { ...item, done: true } : item),
  ),
);
```

---

### Passing useStates as props

```jsx
function App() {
  const [fruits] = React.useState([
    { fruitName: "apple", id: 1 },
    { fruitName: "apple", id: 2 },
    { fruitName: "plum", id: 3 },
  ]);

  return (
    <div className="App">
      <Fruits fruits={fruits} />
      <FruitsCounter fruits={fruits} />
    </div>
  );
}

export default App;
```

```jsx
function Fruits(props) {
  return (
    <div>
      {props.fruits.map((f) => (
        <p key={f.id}>{f.fruitName}</p>
      ))}
    </div>
  );
}

export default Fruits;
```

```jsx
function FruitsCounter(props) {
  return <h2>Total fruits: {props.fruits.length}</h2>;
}

export default FruitsCounter;
```

---

### Stale State

[Back to top](#table-of-contents)

**Stale state** happens when a function captures an old snapshot of a state value and uses it even after the state has changed. It's most common inside `setInterval`, `setTimeout`, and event listeners.

```jsx
// Bug — stale state
const Counter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count + 1); // count is always 0 here — captured at mount
    }, 1000);
    return () => clearInterval(interval);
  }, []); // empty array means count never updates in this closure

  return <p>{count}</p>; // stays at 1 forever
};
```

```jsx
// Fix — use the callback form of the setter
const Counter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => prev + 1); // always works from latest value
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return <p>{count}</p>; // counts up correctly
};
```

**Rule of thumb:** Any time you set state based on its current value inside a timer, async function, or event listener — always use the `prev =>` callback form.

```jsx
// Also applies to rapid clicks
const handleClick = () => {
  setCount(count + 1); // ✗ all three calls read the same stale count
  setCount(count + 1);
  setCount(count + 1); // result: only increments by 1

  setCount(prev => prev + 1); // ✓ each call gets the latest value
  setCount(prev => prev + 1);
  setCount(prev => prev + 1); // result: increments by 3
};
```

---

### useEffect

[Back to top](#table-of-contents)

Run side effects: fetch data, set up subscriptions, update the document title, etc.

```jsx
import { useEffect } from "react";

// Runs after every render
useEffect(() => {
  console.log("Component rendered");
});

// Runs only once on mount (empty dependency array)
useEffect(() => {
  console.log("Component mounted");
}, []);

// Runs when specific values change
useEffect(() => {
  console.log(`Count changed to ${count}`);
}, [count]);

// Cleanup function — runs before re-run and on unmount
useEffect(() => {
  const timer = setInterval(() => console.log("tick"), 1000);
  return () => clearInterval(timer); // Cleanup
}, []);
```

---

### Fetching Data

[Back to top](#table-of-contents)

```jsx
import { useState, useEffect } from "react";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://api.example.com/users");
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};
```

---

### Forms — Controlled Components

[Back to top](#table-of-contents)

React controls the input value via state.

```jsx
const SignupForm = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
      />
      <button type="submit">Sign Up</button>
    </form>
  );
};
```

---

### useRef

[Back to top](#table-of-contents)

Access DOM elements directly or persist values across renders without causing re-renders.

```jsx
import { useRef } from "react";

// Focus an input
const SearchBar = () => {
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.focus();
  };

  return (
    <>
      <input ref={inputRef} placeholder="Search..." />
      <button onClick={handleClick}>Focus Input</button>
    </>
  );
};

// Store a value that doesn't trigger re-renders
const timerRef = useRef(null);
timerRef.current = setInterval(() => {}, 1000);
clearInterval(timerRef.current);
```

---

### useRef vs useState

[Back to top](#table-of-contents)

Both can store values across renders, but they behave very differently:

| | `useState` | `useRef` |
| --- | --- | --- |
| **Triggers re-render?** | Yes — changing state re-renders the component | No — changing `.current` never re-renders |
| **Access value** | Directly: `count` | Via `.current`: `ref.current` |
| **Use for** | Values the UI needs to display | Values the UI doesn't need to know about |

```jsx
// useState — use when the UI should reflect the value
const [count, setCount] = useState(0);
<p>Count: {count}</p> // re-renders every time count changes

// useRef — use when you need to store something silently
const timerRef = useRef(null);
timerRef.current = setInterval(...); // storing a timer ID — no re-render needed

// useRef — access a DOM element directly
const inputRef = useRef(null);
<input ref={inputRef} />
inputRef.current.focus(); // directly focus the input
```

**Interview one-liner:** Use `useState` when the value needs to show on screen. Use `useRef` when you need to remember something without the UI caring about it.

---

### useContext

[Back to top](#table-of-contents)

Share data across components without passing props through every level.

```jsx
import { createContext, useContext, useState } from "react";

// 1. Create the context
const ThemeContext = createContext();

// 2. Wrap your app with a Provider
const App = () => {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Navbar />
      <MainContent />
    </ThemeContext.Provider>
  );
};

// 3. Use the context in any child component
const Navbar = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <nav className={theme}>
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Toggle Theme
      </button>
    </nav>
  );
};

// Context.Provider — the wrapper that makes data available to all children inside it (step 2 above)

// Older alternative: Context.Consumer (you may see this in older codebases)
// useContext(ThemeContext) replaced this — does the same thing but cleaner
<ThemeContext.Consumer>
  {({ theme }) => <p>Current theme: {theme}</p>}
</ThemeContext.Consumer>;
```

---

### useReducer

[Back to top](#table-of-contents)

An alternative to `useState` for managing complex state logic. Instead of setting state directly, you dispatch **actions** that a **reducer function** handles.

```jsx
import { useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return { count: 0 };
    default:
      return state;
  }
};

const Counter = () => {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
    </div>
  );
};

// useState vs useReducer
// useState    — simple, independent values
// useReducer  — complex objects, multiple related updates, logic lives in one place
```

---

### useMemo

[Back to top](#table-of-contents)

Caches (memoizes) the **result of a calculation** so it doesn't re-run on every render — only when its dependencies change.

```jsx
import { useMemo } from "react";

const ProductList = ({ products, filterText }) => {
  // Without useMemo: this filter runs on EVERY render, even unrelated ones
  // With useMemo: only recalculates when products or filterText changes
  const filtered = useMemo(() => {
    return products.filter((p) =>
      p.name.toLowerCase().includes(filterText.toLowerCase())
    );
  }, [products, filterText]);

  return (
    <ul>
      {filtered.map((p) => (
        <li key={p.id}>{p.name}</li>
      ))}
    </ul>
  );
};

// Use when: a calculation is expensive and its inputs rarely change
// Don't use for everything — memoization itself has a small cost
```

---

### useCallback

[Back to top](#table-of-contents)

Caches (memoizes) a **function** so it isn't recreated on every render — only when its dependencies change. Useful when passing callbacks to child components.

```jsx
import { useState, useCallback } from "react";

const Parent = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  // Without useCallback: handleClick is a brand new function on every render,
  // causing child components that receive it as a prop to unnecessarily re-render
  const handleClick = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []); // no dependencies — function never needs to change

  return (
    <>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <ChildButton onClick={handleClick} />
      <p>Count: {count}</p>
    </>
  );
};

// useMemo vs useCallback
// useMemo     — caches a computed VALUE    → useMemo(() => compute(), [deps])
// useCallback — caches a FUNCTION itself  → useCallback(() => fn(), [deps])
```

---

### Lifting State Up

[Back to top](#table-of-contents)

When two sibling components need to share state, move it to their parent.

```jsx
const Parent = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <Display count={count} />
      <Controls setCount={setCount} />
    </>
  );
};

const Display = ({ count }) => <p>Count: {count}</p>;

const Controls = ({ setCount }) => (
  <button onClick={() => setCount((prev) => prev + 1)}>+1</button>
);
```

---

### Custom Hooks

[Back to top](#table-of-contents)

Extract reusable logic into your own hooks.

```jsx
// Custom hook for fetching data
const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
};

// Using the custom hook
const UserList = () => {
  const { data: users, loading, error } = useFetch("/api/users");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};
```

---

### React Router (v6)

[Back to top](#table-of-contents)

Handle navigation between pages.

```bash
npm install react-router-dom
```

```jsx
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
} from "react-router-dom";

// Setup routes
const App = () => {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/users/42">User 42</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/users/:id" element={<UserProfile />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

// Access URL parameters
const UserProfile = () => {
  const { id } = useParams();
  return <h1>User ID: {id}</h1>;
};

// Navigate programmatically
const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // ... login logic
    navigate("/dashboard");
  };

  return <button onClick={handleLogin}>Log In</button>;
};
```

---

### Styling in React

[Back to top](#table-of-contents)

```jsx
// 1. CSS file import
import "./App.css";
<div className="container">...</div>

// 2. Inline styles (object with camelCase)
<div style={{ backgroundColor: "blue", padding: "10px" }}>Styled</div>

// 3. Dynamic classes
<div className={`btn ${isActive ? "active" : ""}`}>Button</div>

// 4. CSS Modules (scoped styles — no class name conflicts)
// Button.module.css:  .primary { background: blue; }
import styles from "./Button.module.css";
<button className={styles.primary}>Click</button>
```

---

### Video and Audio Components

[Back to top](#table-of-contents)

```bash
npm install react-player
```

```jsx
import ReactPlayer from "react-player";

// Video with common props
const MyVideo = () => {
    return (
        <ReactPlayer
            url="/video.mp4"
            controls={true}       // show play/pause/volume controls
            playing={false}       // don't auto-play on render
            muted={false}         // start unmuted
            volume={0.8}          // volume from 0 to 1 (80%)
            loop={false}          // don't repeat when finished
            width="640px"
            height="360px"
        />
    );
};

// Audio
const MyAudio = () => {
    return <ReactPlayer url="/audio.mp3" controls={true} height="50px" />;
};
```

ReactPlayer supports local files, YouTube, Vimeo, SoundCloud, and more — just pass the URL.
