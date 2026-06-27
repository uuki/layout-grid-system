# Migration Guide

This guide explains how to migrate from legacy grid utility systems to **Layout Grid System**.

It assumes an existing system based on fixed grid utilities such as `u-grid-col-*`, `u-grid`, and breakpoint-prefixed classes.

---

# Table of Contents

* Overview
* Key Differences
* Token Migration
* Container Migration
* Placement Migration
* Utility Migration
* Responsive Migration
* Common Patterns
* Breaking Changes
* Best Practices

---

# Overview

Legacy grid systems typically rely on:

* Static utility classes
* Fixed 12-column assumptions
* Container-scoped grids
* Limited reuse across components
* Tight coupling to breakpoints

Layout Grid System introduces:

* Token-driven grid definition
* Global + local coordinate systems
* Reusable layout contexts
* Explicit placement API
* Unified utility + mixin model

---

# Key Differences

| Legacy System              | Layout Grid System             |
| -------------------------- | ------------------------------ |
| `u-grid`                   | `container()`                  |
| `u-grid-col-1:4`           | `place(column: (1, 4))`        |
| container-scoped grid only | global + local + fluid grids   |
| implicit inheritance       | explicit context (`context()`) |
| breakpoint classes only    | token + responsive system      |

---

# Token Migration

## Legacy

```css id="xq9k2h"
:root {
  --columns: 12;
  --gap: 16px;
}
```

## New System

```css id="r9k2pp"
:root {

  --lgs-grid-columns: 16;

  --lgs-grid-rows: 1;

  --lgs-grid-column-gap: 2rem;

  --lgs-grid-row-gap: 3rem;

  --lgs-grid-gutter: 2rem;

}
```

---

# Container Migration

## Before

```scss id="kq9d2w"
.u-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
}
```

## After

```scss id="m1v8ab"
.page {
  @include grid.container(global);
}
```

---

## Legacy breakpoint grid

```scss id="j9d3nf"
.mobile\:u-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}
```

## New system

```scss id="h2l9qe"
@media (--sm) {
  :root {
    --lgs-grid-columns: 4;
  }
}
```

---

# Placement Migration

## Range

### Before

```html id="u1d8aa"
<div class="u-grid-col-1:4"></div>
```

### After

```scss id="c8m3pp"
@include grid.place((
  column: (1, 4),
));
```

---

## Span

### Before

```html id="b7k3xz"
<div class="u-grid-col-span-4"></div>
```

### After

```scss id="v3m9ad"
@include grid.place((
  column: (
    span: 4,
  ),
));
```

---

## Start-based positioning

### Before

```html id="x8q1dd"
<div class="u-grid-col-start-5"></div>
```

### After

```scss id="t9v2aa"
@include grid.place((
  column: (
    start: 5,
  ),
));
```

---

# Utility Migration

## Before

```html id="g1q2ff"
<section class="u-grid">
  <div class="u-grid-col-1:8"></div>
</section>
```

## After

```html id="z9k1xx"
<section class="u-grid-global">
  <div class="u-grid-col-1:8"></div>
</section>
```

---

## Mixed usage (recommended during migration)

```html id="p8q2ll"
<section class="u-grid-global">
  <article class="md:u-grid-col-1:12"></article>
</section>
```

---

# Responsive Migration

## Before

```html id="m9x3bb"
<div class="sm:u-grid-col-1:4 md:u-grid-col-1:12"></div>
```

## After

```scss id="c1n8dd"
@media (--sm) {
  :root {
    --lgs-grid-columns: 4;
  }
}

@media (--md) {
  :root {
    --lgs-grid-columns: 16;
  }
}
```

---

# Context Migration

## Problem in legacy systems

Deeply nested components cannot reference the original grid.

---

## Before

```text id="k2v9aa"
Page Grid
 └── Container
      └── Card
           └── Title (cannot access page grid)
```

---

## After

```scss id="q8m1zz"
.card {
  @include grid.context(global);
}
```

Now descendants can reuse the same coordinate system.

```text id="p9c2qq"
Page Grid
 └── Card
      └── Context(Global)
           └── Title (can use page grid again)
```

---

# Common Patterns

## Page layout

```scss id="a8v1kk"
.page {
  @include grid.container(global);
}
```

---

## Sidebar layout

```scss id="m7q9dd"
.main {
  @include grid.place((
    column: (1, 12),
  ));
}

.sidebar {
  @include grid.place((
    column: (13, 16),
  ));
}
```

---

## Nested context usage

```scss id="h9k2aa"
.section {
  @include grid.place((
    column: (1, 10),
  ));

  @include grid.context(global);
}
```

---

# Breaking Changes

## 1. Implicit grid inheritance removed

Old systems assumed parent grid inheritance.

New system requires explicit:

```scss
@include grid.context(global);
```

---

## 2. Fixed 12-column assumption removed

All column counts are token-driven:

```css
--lgs-grid-columns: 16;
```

---

## 3. Utility-only layouts discouraged

While still supported, full control requires mixins or tokens.

---

## 4. grid-column direct usage is discouraged

Instead of:

```css
grid-column: 1 / 5;
```

use:

```scss
@include grid.place(...)
```

---

# Best Practices

## Prefer global container at page level

```scss
.page {
  @include grid.container(global);
}
```

---

## Avoid unnecessary contexts

Only use when descendants require global alignment.

---

## Prefer tokens over hardcoded values

```css
--lgs-grid-column-gap: 2rem;
```

---

## Use place() for all layout positioning

Keeps layout consistent and portable.

---

# Summary

Migration to Layout Grid System introduces:

* Explicit layout contexts
* Token-driven grid structure
* Unified placement API
* Flexible global/local grid modes
* Reduced dependency on ancestor layout structure

The result is a more predictable and scalable layout architecture.
