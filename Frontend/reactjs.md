# React.js Cheatsheet

_This markdown contains content from the Meta React Basics course._

---

## General Knowledge

---

### Create a New Project

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

```bash
npm run dev       # Start dev server
npm run build     # Build for production
npm run preview   # Preview production build
npm install axios # Install a package (example)
```

---

### What is the DOM?

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

In React, you rarely touch the DOM directly. React maintains a **Virtual DOM** — a lightweight copy of the real DOM. When state changes, React compares the virtual DOM to the real DOM and only updates what actually changed. This is why React is fast.

---

### File / Component Organization

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

---

### Arrow Functions in React

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
const double = n => n * 2;
```

In React, arrow functions are used for **components**, **event handlers**, and **callbacks**:

```jsx
// Component
const Greeting = () => <h1>Hello</h1>;

// Event handler
<button onClick={() => console.log("Clicked!")}>Click</button>

// Callback in .map()
{items.map(item => <li key={item.id}>{item.name}</li>)}
```

---

### JS vs JSX (Javascript XML)

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
{isLoggedIn ? <Dashboard /> : <Login />}

// && — render only if true (no else needed)
{isAdmin && <AdminPanel />}
{items.length > 0 && <ItemList items={items} />}

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

---

### Functional Components

The building blocks of React. Every piece of UI is a component.

```jsx
// Function component (the standard way)
const Greeting = () => {
    return <h1>Hello, World!</h1>;
};

// With implicit return
const Greeting = () => <h1>Hello, World!</h1>;

// Using the component
<Greeting />
```

---

### Props

How you pass data from a parent component to a child component. Props is an object that holds all the attributes you pass to a component.

### Full Example (start to end)

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

```jsx
const Button = ({ label = "Click me", color = "blue" }) => {
    return <button style={{ backgroundColor: color }}>{label}</button>;
};

<Button />                    // uses defaults: "Click me" + blue
<Button label="Submit" />     // "Submit" + blue
```

### Children Props

`props.children` is the content the parent puts inside the component's opening and closing tags. The child doesn't need to know what's inside — it just renders it.

```jsx
// Anything between opening and closing tags becomes props.children
<Card>
    <h2>Title</h2>
    <p>Some content</p>
</Card>

const Card = (props) => {
    return <div className="card">{props.children}</div>;
};

// Or destructured
const Card = ({ children }) => {
    return <div className="card">{children}</div>;
};
```

### Passing Functions as Props

```jsx
<Button onClick={() => alert("Clicked!")} />

const Button = ({ onClick }) => {
    return <button onClick={onClick}>Click me</button>;
};
```

---

### useState

Lets a component remember values that change over time.

```jsx
import { useState } from "react";

const Counter = () => {
    const [count, setCount] = useState(0); // [currentValue, setterFunction]

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>+1</button>
            <button onClick={() => setCount(prev => prev - 1)}>-1</button>
        </div>
    );
};

// Different data types
const [name, setName] = useState("");            // String
const [items, setItems] = useState([]);           // Array
const [user, setUser] = useState(null);           // Null (will hold object later)
const [form, setForm] = useState({ name: "", email: "" }); // Object

// Updating objects — always spread to create a new copy
setUser({ ...user, name: "Alice" });
setForm(prev => ({ ...prev, email: "a@b.com" }));

// Updating arrays — never mutate directly
setItems([...items, newItem]);                          // Add
setItems(items.filter(item => item.id !== id));         // Remove
setItems(items.map(item =>                              // Update one
    item.id === id ? { ...item, done: true } : item
));
```

---

### useEffect

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
            {users.map(user => (
                <li key={user.id}>{user.name}</li>
            ))}
        </ul>
    );
};
```

---

### Forms — Controlled Components

React controls the input value via state.

```jsx
const SignupForm = () => {
    const [form, setForm] = useState({ name: "", email: "", password: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitted:", form);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
            <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
            <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" />
            <button type="submit">Sign Up</button>
        </form>
    );
};
```

---

### useRef

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

### useContext

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
```

---

### Lifting State Up

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
    <button onClick={() => setCount(prev => prev + 1)}>+1</button>
);
```

---

### Custom Hooks

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
            {users.map(user => <li key={user.id}>{user.name}</li>)}
        </ul>
    );
};
```

---

### React Router (v6)

Handle navigation between pages.

```bash
npm install react-router-dom
```

```jsx
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate } from "react-router-dom";

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
