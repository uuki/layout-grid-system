# Concepts

This document explains the design philosophy and core concepts of **Layout Grid System**.

Rather than treating CSS Grid as a collection of layout utilities, Layout Grid System models layout as a reusable coordinate system that can be shared across an application.

---

# Table of Contents

* Design Goals
* Coordinate System
* Layout Context
* Grid Containers
* Layout Modes
* Placement
* Tokens
* Utilities
* Best Practices

---

# Design Goals

Layout Grid System is designed around the following principles.

* A layout should be described once.
* Components should remain independent.
* Layout values should be centralized.
* Every component should be able to participate in the same layout.
* Layout APIs should remain predictable.

---

# Relationship to Traditional Grid Layouts

The basic usage of Layout Grid System — defining a grid container and placing children within it — is structurally the same as traditional approaches.

```scss
// This pattern is the same as any CSS Grid-based framework
.page {
    @include grid.container(global);
}

.hero {
    @include grid.place((column: (1, 10)));
}

.sidebar {
    @include grid.place((column: (11, 16)));
}
```

In most frameworks, layout responsibility flows from parent to child. The container defines the grid; components occupy a portion of it. This is also true in Layout Grid System.

The single differentiator is `context()`.

When a component is placed inside a grid cell and its own children need to align to the original page grid, traditional approaches require either restructuring the DOM or threading `subgrid` through every intermediate ancestor. Layout Grid System provides `context(global)` as a self-contained alternative.

```scss
.hero {
    @include grid.place((column: (1, 10)));
    @include grid.context(global);  // children align to page grid from here
}
```

This is the only capability that distinguishes Layout Grid System from standard CSS Grid usage.

---

# Coordinate System

Traditional CSS Grid layouts are scoped to their nearest grid container.

```text
Grid Container

┌──────────────────────────────┐

1  2  3  4

└──────────────────────────────┘
```

Descendants cannot reference an ancestor grid unless every intermediate element participates using `subgrid`.

Layout Grid System instead introduces an explicit coordinate system.

```text
Viewport

Global Layout Grid

1  2  3  4  5  6  7  8
9 10 11 12 13 14 15 16
```

Any component may recreate this coordinate system when required.

---

# Layout Context

A layout context defines which coordinate system descendants use.

```scss
.hero {

    @include grid.context(global);

}
```

Children are now positioned relative to the Global Layout Grid.

```text
Page

Global Grid

↓

Hero

↓

Context(Global)

↓

Title
Image
Actions
```

Without a context, descendants only know about their nearest grid container.

---

# Grid Containers

A grid container creates a layout context for its direct children.

```scss
@include grid.container();
```

This behaves like a standard CSS Grid container.

```text
Container

1 2 3 4
│ │ │ │
```

Children are positioned within this grid.

---

# Layout Modes

Layout Grid System provides three container modes.

---

## Local

The grid uses the available width of the current element.

```scss
@include grid.container();
```

```text
Card

┌────────────┐

1 2 3 4

└────────────┘
```

Use this mode for component internals.

---

## Global

The grid uses the viewport as its reference.

```scss
@include grid.container(global);
```

Column widths are calculated from

* viewport width (`100svw`)
* gutter
* column count
* column gap

rather than from the parent element. This means every `global` container — at any nesting depth — produces the same column width, and is therefore independent of document structure.

```text
Viewport

□□□□□□□□□□□□□□□□□□□□□□□□
```

Use this mode for page layouts and as the target of `context(global)`.

**Constraint:** Because column width is based on `100svw`, placing a global container inside an element with a constrained width (e.g. `max-width`, `padding`) will cause the grid to overflow its parent. This mode is intended as an alternative to subgrid drilling — use it on elements that are not additionally width-constrained.

---

## Global Fluid

Fluid mode uses the same column width as the Global Grid while remaining constrained by the available parent width.

```scss
@include grid.container(fluid);
```

```text
Viewport

□□□□□□□□□□□□□□□□□□□□□□□□

↓

Parent

──────────────

↓

Fluid Grid

□□□□□□
```

This allows reusable components to align visually with the page without overflowing their containers.

---

# Placement

Placement positions an element inside the current layout context.

```scss
@include grid.place((
    column: (1, 4),
));
```

↓

```css
grid-column: 1 / 5;
```

---

## Placement Syntax

### Range

```scss
column: (1, 4)
```

---

### Start

```scss
column: (
    start: 5,
)
```

---

### End

```scss
column: (
    end: 12,
)
```

---

### Span

```scss
column: (
    span: 4,
)
```

---

### Start + Span

```scss
column: (
    start: 5,
    span: 6,
)
```

---

### Named Grid Lines

```scss
column: (
    start-line: content-start,
    end-line: content-end,
)
```

---

### Named Areas

```scss
@include grid.place((
    area: hero,
));
```

---

# Tokens

All layout values are centralized.

```css
:root {

    --lgs-grid-columns: 16;

    --lgs-grid-rows: 1;

    --lgs-grid-column-gap: 2rem;

    --lgs-grid-row-gap: 3rem;

    --lgs-grid-gutter: 2rem;

}
```

Every generated grid references these values.

Changing a token updates the entire layout system.

---

# Utilities

Every Sass API has an equivalent utility.

| Sass                | Utility               |
| ------------------- | --------------------- |
| `container()`       | `u-grid`              |
| `container(global)` | `u-grid-global`       |
| `container(fluid)`  | `u-grid-global-fluid` |
| `place(column)`     | `u-grid-col-*`        |
| `place(row)`        | `u-grid-row-*`        |

This allows projects to freely combine Mixins and utility classes.

---

# Global Layout Flow

The following diagram summarizes how the system works.

```text
Viewport

        │

        ▼

Global Layout Grid

        │

        ▼

container(global)

        │

        ▼

place()

        │

        ▼

context(global)

        │

        ▼

place()

        │

        ▼

context(global)

        │

        ▼

place()
```

Every context recreates the same coordinate system.

Components therefore remain independent while sharing the same layout language.

---

# Local vs Global

```text
Local Grid

Card

1 2 3 4


Global Grid

Viewport

1 2 3 4 5 6 7 8
9 10 11 12 13 14 15 16
```

Use Local Grid for component structure.

Use Global Grid for page alignment.

---

# When Should Context Be Used?

Recommended

* Hero sections
* Cards containing complex layouts
* Feature sections
* Marketing pages
* Editorial layouts

Usually unnecessary

* Buttons
* Icons
* Form controls
* Small reusable UI components

Context should be introduced only when descendants need access to a larger layout coordinate system.

---

# Best Practices

## Prefer tokens

Avoid

```scss
gap: 32px;
```

Prefer

```scss
column-gap: var(--lgs-grid-column-gap);
```

---

## Prefer place()

Avoid

```scss
grid-column: 3 / span 4;
```

Prefer

```scss
@include grid.place((
    column: (
        start: 3,
        span: 4,
    ),
));
```

---

## Separate page layout from component layout

```scss
.page {
    @include grid.container(global);
}

.card {
    @include grid.container();
}
```

---

## Recreate contexts intentionally

```scss
.hero {

    @include grid.place((
        column: (1, 10),
    ));

    @include grid.context(global);

}
```

Do not recreate contexts unless descendants actually need access to the Global Layout Grid.

---

# Summary

Layout Grid System is built around five concepts.

1. Containers create grids.
2. Contexts define coordinate systems.
3. Placement positions elements.
4. Tokens centralize layout values.
5. Components remain independent while sharing the same layout model.

The fundamental usage pattern — container defines the grid, children occupy it — is the same as any CSS Grid-based approach. The single capability that distinguishes Layout Grid System is `context(global)`: a nested component can opt into the page-level coordinate system without requiring every ancestor to participate via `subgrid`.

These concepts together enable scalable, reusable, and predictable layout architecture for modern applications.
