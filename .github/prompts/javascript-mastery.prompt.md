# JavaScript Mastery

> Adapted from [javascript-mastery](https://github.com/sickn33/antigravity-awesome-skills/tree/main/skills/javascript-mastery) (MIT License)

33+ essential JavaScript concepts every developer should know.

## When to Use

- Explaining JavaScript concepts
- Debugging tricky JS behavior
- Reviewing code for JS best practices
- Understanding language quirks

## 1. Fundamentals

### Primitive Types
7 primitive types: `string`, `number`, `bigint`, `boolean`, `undefined`, `null`, `symbol`
- Primitives are immutable, passed by value
- `typeof null === "object"` is a historical bug

### Type Coercion
```js
"5" + 3;  // "53" (number → string)
"5" - 3;  // 2    (string → number)
```
**Falsy values** (8): `false`, `0`, `-0`, `0n`, `""`, `null`, `undefined`, `NaN`

### Equality
- Always use `===` (strict equality) unless you have a specific reason
- `Object.is(NaN, NaN)` → `true` (handles edge cases)

## 2. Scope & Closures

### var vs let vs const
- `var`: function scoped, hoisted, can redeclare
- `let`: block scoped, hoisted (TDZ), no redeclare
- `const`: like `let`, but can't reassign (objects are still mutable)

### Closures
A closure is a function that remembers its lexical scope:
```js
function createCounter() {
  let count = 0;
  return {
    increment: () => ++count,
    getCount: () => count,
  };
}
```

## 3. Functions & Execution

### this Keyword
- Global context → `window` (browser) or `global` (Node)
- Object method → the object
- Arrow functions → lexical `this` (inherits outer)
- `call`/`apply`/`bind` → explicit binding

### Hoisting
- `function` declarations are fully hoisted
- `var` is hoisted but not initialized
- `let`/`const` are in the Temporal Dead Zone (TDZ) until declaration

## 4. Event Loop & Async

### Execution Order
1. Synchronous code (call stack)
2. Microtasks (Promise callbacks, `queueMicrotask`)
3. Macrotasks (`setTimeout`, `setInterval`, I/O)

```js
console.log("1");
setTimeout(() => console.log("2"), 0);
Promise.resolve().then(() => console.log("3"));
console.log("4");
// Output: 1, 4, 3, 2
```

### Promises & async/await
```ts
// Parallel execution
const [users, posts] = await Promise.all([
  fetch('/api/users'),
  fetch('/api/posts'),
]);
```

**Promise combinators:**
- `Promise.all()` — All must succeed
- `Promise.allSettled()` — Wait for all, get status
- `Promise.race()` — First to settle
- `Promise.any()` — First to succeed

## 5. Functional Programming

### Pure Functions
Same input → same output, no side effects.

### map, filter, reduce
```ts
const result = users
  .filter((u) => u.age >= 30)
  .map((u) => u.name)
  .join(', ');
```

### Composition
```ts
const pipe = (...fns: Function[]) => (x: unknown) =>
  fns.reduce((acc, fn) => fn(acc), x);
```

## 6. Modern JavaScript (ES6+)

### Destructuring
```ts
const { name, age, city = 'Unknown' } = user;
const [first, ...rest] = items;
```

### Optional Chaining & Nullish Coalescing
```ts
const city = user?.address?.city;     // undefined if missing
const value = data ?? 'default';       // only null/undefined trigger default
```

### Modules
```ts
// Named exports
export const PI = 3.14159;
export function square(x: number): number { return x * x; }

// Dynamic import
const module = await import('./dynamic.js');
```

## Quick Reference

| Concept | Key Point |
|---|---|
| `==` vs `===` | Always use `===` |
| `var` vs `let` | Prefer `let`/`const` |
| Closures | Function + lexical scope |
| `this` | Depends on how function is called |
| Event loop | Microtasks before macrotasks |
| Pure functions | Same input → same output |
| `??` vs `\|\|` | `??` only checks null/undefined |

## Limitations

- This is a reference skill — use it when debugging JS behavior or reviewing code.
- Not a substitute for reading the MDN documentation.
