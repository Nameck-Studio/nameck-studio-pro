# Accessibility (WCAG Compliance)

> Adapted from [accessibility-compliance-accessibility-audit](https://github.com/sickn33/antigravity-awesome-skills/tree/main/skills/accessibility-compliance-accessibility-audit) (MIT License)

Build accessible interfaces that work for everyone. Target WCAG 2.1 AA compliance.

## When to Use

- Building or reviewing UI components
- Designing forms, navigation, modals
- Adding interactive elements
- Reviewing color contrast and typography

## Core Principles (POUR)

### 1. Perceivable
- All images have meaningful `alt` text (or `alt=""` for decorative)
- Color is not the only way to convey information
- Text contrast ratio ≥ 4.5:1 (normal text), ≥ 3:1 (large text)
- Provide captions/transcripts for media

### 2. Operable
- All functionality available via keyboard
- Focus order is logical (matches visual order)
- Focus indicators are visible
- No keyboard traps
- Skip navigation links provided

### 3. Understandable
- Page language is set (`<html lang="en">`)
- Labels are associated with form controls
- Error messages are clear and specific
- Consistent navigation across pages

### 4. Robust
- Valid, semantic HTML
- ARIA attributes used correctly
- Works across browsers and assistive technologies

## Component Accessibility Checklist

### Buttons
```tsx
// ✅ Good
<button onClick={handleSave} aria-label="Save document">
  <SaveIcon />
</button>

// ❌ Bad — div is not a button
<div onClick={handleSave}>Save</div>
```

### Forms
```tsx
// ✅ Good
<label htmlFor="email">Email address</label>
<input
  id="email"
  type="email"
  aria-required="true"
  aria-describedby="email-error"
/>
{error && <p id="email-error" role="alert">{error}</p>}
```

### Images
```tsx
// Informative image
<img src="chart.png" alt="Sales increased 25% in Q3 2024" />

// Decorative image
<img src="divider.svg" alt="" aria-hidden="true" />
```

### Modals / Dialogs
- Focus trapped inside modal when open
- Focus returns to trigger element on close
- `Escape` key closes modal
- Use `role="dialog"` and `aria-modal="true"`
- Provide `aria-labelledby` pointing to modal title

### Navigation
- Use `<nav>` with `aria-label` for multiple navs
- Current page indicated with `aria-current="page"`
- Skip-to-content link as first focusable element

### Lists
- Use `<ul>`/`<ol>` for lists, not `<div>` sequences
- Use `<table>` with proper `<th>` for tabular data

## Color Contrast (Cyber-Luxe Dark Theme)

| Element | Foreground | Background | Ratio |
|---|---|---|---|
| Body text | #e5e5e5 | #0a0a0a | ≥ 15:1 ✅ |
| Muted text | #a3a3a3 | #0a0a0a | ≥ 7:1 ✅ |
| Accent (lime) | #a3e635 | #0a0a0a | ≥ 9:1 ✅ |
| Accent on dark card | #a3e635 | #1a1a1a | Verify ≥ 4.5:1 |

## Keyboard Interaction Patterns

| Component | Keyboard |
|---|---|
| Button | `Enter` or `Space` activates |
| Link | `Enter` activates |
| Checkbox | `Space` toggles |
| Tab panel | `Arrow` keys switch tabs, `Tab` enters panel |
| Menu | `Arrow` keys navigate, `Enter` selects, `Escape` closes |
| Modal | `Tab` cycles within, `Escape` closes |

## ARIA Rules

1. **Don't use ARIA if HTML can do it** — `<button>` over `<div role="button">`
2. **Don't change native semantics** — Don't put `role="heading"` on a `<button>`
3. **Interactive elements must be keyboard accessible**
4. **Don't use `role="presentation"` or `aria-hidden="true"` on focusable elements**
5. **All interactive elements must have accessible names**

## Testing Accessibility

### Automated
- Use `eslint-plugin-jsx-a11y` for static analysis
- Use axe-core or Lighthouse for runtime checks

### Manual
- Tab through the entire page — logical order?
- Use screen reader (VoiceOver on macOS)
- Verify with keyboard only (no mouse)
- Check focus visibility
- Zoom to 200% — still usable?

## Limitations

- Automated tools catch ~30% of accessibility issues.
- Manual testing with assistive technology is required for full compliance.
- WCAG conformance requires expert review for complex interactions.
