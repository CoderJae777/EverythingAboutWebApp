# CSS Cheatsheet

## How to Add CSS

```html
<!-- External (recommended) -->
<link rel="stylesheet" href="styles.css">

<!-- Internal -->
<style>
    p { color: red; }
</style>

<!-- Inline -->
<p style="color: red;">Text</p>
```

## Selectors

Used to target HTML elements for styling.

```css
/* Element selector — targets all <p> tags */
p { color: blue; }

/* Class selector — targets elements with class="intro" */
.intro { font-size: 18px; }

/* ID selector — targets the element with id="header" */
#header { background: black; }

/* Universal selector — targets everything */
* { margin: 0; padding: 0; }

/* Descendant — <p> inside .container */
.container p { color: gray; }

/* Direct child — only immediate children */
.container > p { color: gray; }

/* Multiple selectors */
h1, h2, h3 { font-family: Arial; }

/* Pseudo-classes */
a:hover { color: red; }          /* on mouse hover */
a:active { color: darkred; }     /* while being clicked */
input:focus { border-color: blue; } /* when focused */
li:first-child { font-weight: bold; }
li:nth-child(2) { color: green; }

/* Pseudo-elements */
p::first-line { font-weight: bold; }
p::before { content: "→ "; }
p::after { content: " ←"; }
```

## Colors

```css
color: red;                    /* Named color */
color: #ff5733;                /* Hex */
color: rgb(255, 87, 51);      /* RGB */
color: rgba(255, 87, 51, 0.5); /* RGB with opacity */
```

## Text & Fonts

```css
font-family: Arial, sans-serif;  /* Font face */
font-size: 16px;                 /* Size */
font-weight: bold;               /* bold, normal, 100–900 */
font-style: italic;              /* italic, normal */
text-align: center;              /* left, right, center, justify */
text-decoration: underline;      /* none, underline, line-through */
text-transform: uppercase;       /* lowercase, capitalize */
line-height: 1.5;                /* Spacing between lines */
letter-spacing: 2px;             /* Spacing between letters */
```

## Box Model

Every element is a box: **content → padding → border → margin**.

```css
width: 300px;
height: 200px;
padding: 10px;                /* Space inside the border */
padding: 10px 20px;           /* top/bottom  left/right */
padding: 10px 20px 15px 5px;  /* top right bottom left */
margin: 20px;                 /* Space outside the border */
margin: 0 auto;               /* Center a block element horizontally */
border: 2px solid black;      /* width style color */
border-radius: 8px;           /* Rounded corners */
box-sizing: border-box;       /* Width/height include padding + border */
```

## Display

Controls how an element behaves in layout.

```css
display: block;        /* Full width, new line (div, p, h1) */
display: inline;       /* Flows with text, no width/height (span, a) */
display: inline-block; /* Inline but respects width/height */
display: none;         /* Hides element completely */
```

## Flexbox

Used to lay out items in a row or column.

```css
.container {
    display: flex;
    flex-direction: row;           /* row (default), column */
    justify-content: center;       /* Main axis: flex-start, flex-end, center, space-between, space-around, space-evenly */
    align-items: center;           /* Cross axis: flex-start, flex-end, center, stretch */
    flex-wrap: wrap;               /* Allow items to wrap to next line */
    gap: 10px;                     /* Space between items */
}

.item {
    flex: 1;            /* Grow to fill available space */
    flex-grow: 1;       /* How much the item should grow */
    flex-shrink: 0;     /* Prevent shrinking */
    flex-basis: 200px;  /* Starting size before growing/shrinking */
    align-self: flex-end; /* Override align-items for this item */
}
```

## Grid

Used to create two-dimensional layouts (rows and columns).

```css
.container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;   /* 3 equal columns */
    grid-template-columns: 200px 1fr 1fr;  /* Fixed + flexible */
    grid-template-rows: auto 1fr;
    gap: 10px;                             /* Space between cells */
}

.item {
    grid-column: 1 / 3;   /* Span from column 1 to 3 */
    grid-row: 1 / 2;      /* Span from row 1 to 2 */
}
```

## Positioning

```css
position: static;     /* Default — normal flow */
position: relative;   /* Offset from its normal position */
position: absolute;   /* Positioned relative to nearest positioned ancestor */
position: fixed;      /* Stays in place when scrolling */
position: sticky;     /* Sticks when you scroll past it */

top: 10px;
right: 20px;
bottom: 10px;
left: 20px;
z-index: 10;          /* Stacking order — higher = on top */
```

## Backgrounds

```css
background-color: #f0f0f0;
background-image: url("bg.jpg");
background-size: cover;          /* cover, contain, or specific size */
background-position: center;
background-repeat: no-repeat;
/* Shorthand */
background: #f0f0f0 url("bg.jpg") no-repeat center/cover;
```

## Shadows

```css
/* Box shadow: offset-x  offset-y  blur  spread  color */
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

/* Text shadow: offset-x  offset-y  blur  color */
text-shadow: 2px 2px 4px gray;
```

## Transitions & Animations

```css
/* Smooth property changes */
transition: all 0.3s ease;
transition: background-color 0.3s ease, transform 0.2s ease;

/* Transform — move, scale, rotate */
transform: translateX(50px);
transform: scale(1.2);
transform: rotate(45deg);

/* Keyframe animation */
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}
.element {
    animation: fadeIn 1s ease-in;
}
```

## Responsive Design

```css
/* Media queries — apply styles at different screen sizes */
@media (max-width: 768px) {
    .container {
        flex-direction: column;
    }
}

@media (min-width: 1024px) {
    .container {
        max-width: 960px;
    }
}
```

## Common Units

| Unit  | Description                        | Example          |
|-------|------------------------------------|------------------|
| `px`  | Pixels (fixed)                     | `font-size: 16px` |
| `%`   | Relative to parent                 | `width: 50%`     |
| `em`  | Relative to parent font-size       | `padding: 1.5em` |
| `rem` | Relative to root (`<html>`) font-size | `font-size: 1rem` |
| `vw`  | % of viewport width                | `width: 100vw`   |
| `vh`  | % of viewport height               | `height: 100vh`  |
| `fr`  | Fraction of available space (grid) | `1fr 2fr`        |

## Useful Resets

```css
/* Basic reset */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* Center anything */
.center {
    display: flex;
    justify-content: center;
    align-items: center;
}
```
