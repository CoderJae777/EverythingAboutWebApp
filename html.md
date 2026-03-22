# HTML Cheatsheet

## Document Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Title</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <!-- Content goes here -->
    <script src="app.js"></script>
</body>
</html>
```

## Headings

Used to define titles and section headers. `<h1>` is the largest, `<h6>` the smallest.

```html
<h1>Main Title</h1>
<h2>Section Title</h2>
<h3>Subsection</h3>
<h4>Sub-subsection</h4>
<h5>Minor heading</h5>
<h6>Smallest heading</h6>
```

## Text Content

```html
<p>A paragraph of text.</p>
<span>Inline text container — no line break.</span>
<strong>Bold / important text.</strong>
<em>Italic / emphasized text.</em>
<br> <!-- Line break -->
<hr> <!-- Horizontal rule / divider -->
```

## Links

Used to navigate to other pages or external URLs.

```html
<a href="https://example.com">Click here</a>
<a href="/about.html">Internal link</a>
<a href="#section-id">Jump to section</a>
<a href="https://example.com" target="_blank">Open in new tab</a>
```

## Images

Used to embed images. Always include `alt` for accessibility.

```html
<img src="photo.jpg" alt="Description of image">
<img src="photo.jpg" alt="Description" width="300" height="200">
```

## Lists

```html
<!-- Unordered list (bullets) -->
<ul>
    <li>Item one</li>
    <li>Item two</li>
</ul>

<!-- Ordered list (numbered) -->
<ol>
    <li>First step</li>
    <li>Second step</li>
</ol>
```

## Div and Semantic Layout

`<div>` is a generic container. Semantic tags give meaning to sections.

```html
<div class="container">Generic container</div>

<header>Top of page — logo, nav</header>
<nav>Navigation links</nav>
<main>Primary content</main>
<section>Thematic group of content</section>
<article>Self-contained content (blog post, card)</article>
<aside>Sidebar or related content</aside>
<footer>Bottom of page — copyright, links</footer>
```

## Forms and Inputs

Used to collect user input.

```html
<form action="/submit" method="POST">
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" placeholder="Enter name">

    <label for="email">Email:</label>
    <input type="email" id="email" name="email">

    <label for="password">Password:</label>
    <input type="password" id="password" name="password">

    <label for="age">Age:</label>
    <input type="number" id="age" name="age">

    <input type="checkbox" id="agree" name="agree">
    <label for="agree">I agree</label>

    <input type="radio" name="color" value="red"> Red
    <input type="radio" name="color" value="blue"> Blue

    <select name="country">
        <option value="us">United States</option>
        <option value="ca">Canada</option>
    </select>

    <textarea name="message" rows="4" cols="30"></textarea>

    <button type="submit">Submit</button>
</form>
```

## Tables

Used to display tabular data.

```html
<table>
    <thead>
        <tr>
            <th>Name</th>
            <th>Age</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Alice</td>
            <td>25</td>
        </tr>
        <tr>
            <td>Bob</td>
            <td>30</td>
        </tr>
    </tbody>
</table>
```

## Media

```html
<video src="video.mp4" controls width="400"></video>
<audio src="audio.mp3" controls></audio>
```

## Common Attributes

| Attribute     | Purpose                              | Example                              |
|---------------|--------------------------------------|--------------------------------------|
| `id`          | Unique identifier for an element     | `<div id="main">`                    |
| `class`       | Assign CSS class(es)                 | `<p class="intro bold">`             |
| `style`       | Inline CSS                           | `<p style="color: red;">`            |
| `src`         | Source URL (images, scripts, media)  | `<img src="pic.jpg">`                |
| `href`        | Link destination                     | `<a href="/about">`                  |
| `alt`         | Alt text for images (accessibility)  | `<img alt="A cat">`                  |
| `placeholder` | Hint text in inputs                  | `<input placeholder="Type here">`    |
| `required`    | Makes a form field mandatory         | `<input required>`                   |
| `disabled`    | Disables an element                  | `<button disabled>`                  |
