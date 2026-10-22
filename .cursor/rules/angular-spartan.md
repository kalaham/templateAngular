---
description: Architecture and coding rules for Angular 22, Spartan UI, and pnpm
globs: **/*.{ts,html,css}
alwaysApply: true
---

# Development Rules: Angular 22 + Spartan UI (WrapPixel Style Template)

## Package Manager & CLI
- ALWAYS use `pnpm` (never use `npm` or `npx`).
- Run Angular CLI commands with `pnpm ng <command>`.
- Add Spartan UI primitives with `pnpm ng g @spartan-ng/cli:ui <component>`.

## Modern Angular 22 Best Practices
- All components are standalone by default (do not add explicit `standalone: true` and never use `NgModule`).
- Use `ChangeDetectionStrategy.OnPush` in all components.
- Use Angular Signals for reactive state: `signal()`, `computed()`, `effect()`, `input()`, `input.required()`, and `output()`.
- Use the `inject()` function instead of constructor injection.
- Use built-in template control flow: `@if`, `@for (item of items(); track item.id)`, `@switch`. Never use `*ngIf` or `*ngFor`.

## Styling & Spartan UI
- Import Spartan UI components using the `@spartan-ng/helm/*` alias (e.g., `@spartan-ng/helm/button`, `@spartan-ng/helm/card`).
- Use semantic Tailwind/Spartan color tokens (`bg-background`, `text-foreground`, `bg-card`, `border-border`, `text-muted-foreground`, `bg-primary`) to guarantee automatic Dark Mode support.
- Use `@ng-icons/core` and `@ng-icons/lucide` for all icons.