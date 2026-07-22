# Developer guide

## Project overview

The calculator is a Next.js client component written in TypeScript. Its interface and calculation state live in `app/page.tsx`; presentation rules live in `app/globals.css`.

The documentation is a separate MkDocs Material site under `docs/`. GitHub Actions combines the calculator and documentation into one Pages artifact.

<figure class="app-shot" markdown>
  ![Desktop calculator showing a two-column responsive layout](assets/screenshots/calculator-desktop.png)
  <figcaption>The wide layout places product guidance and the interactive calculator in balanced columns.</figcaption>
</figure>

## Local development

Install the JavaScript dependencies and start the calculator:

```powershell
npm install
npm run dev
```

Install the documentation dependencies and preview the docs:

```powershell
py -m pip install -r requirements-docs.txt
py -m mkdocs serve
```

MkDocs prints the local documentation address when it starts.

## Calculation state

The client component keeps four important pieces of state:

| State | Responsibility |
|---|---|
| `display` | Current input or formatted result |
| `storedValue` | First operand waiting for another value |
| `operator` | Selected arithmetic operation |
| `waiting` | Whether the next digit should start a new value |

The `calculate` function performs explicit arithmetic. User input is never evaluated as JavaScript code.

## Input flow

1. A number updates the display.
2. An operator stores the displayed value.
3. The next number replaces the display.
4. Equals calculates and formats the result.

Keyboard events are translated to the same input values as button clicks, so both interaction methods share the calculation behavior.

## Responsive design

The desktop layout uses two columns: introductory content and calculator. Below 820 pixels it becomes a single column. Below 430 pixels, secondary text is hidden and controls are tightened to preserve comfortable touch targets.

<figure class="app-shot" markdown>
  ![Calculator content stacked for a mobile viewport](assets/screenshots/calculator-mobile.png)
  <figcaption>At a narrow viewport, the same interface follows a vertical reading order.</figcaption>
</figure>

## Build checks

Validate the calculator’s static export:

```powershell
npx next build
```

Validate the documentation strictly:

```powershell
py -m mkdocs build --strict
```

Strict mode treats broken internal links and configuration warnings as failures.
