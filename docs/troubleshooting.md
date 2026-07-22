# Troubleshooting

## The calculator does not react to my keyboard

Select anywhere inside the calculator’s browser tab, then try again. Confirm that you are using one of the [supported keys](keyboard-controls.md).

## I entered the wrong number

Press ++backspace++ to remove the last character or select **Clear** to restart the calculation.

## I see “Cannot divide by zero”

The second value in a division was zero. Select **Clear** and enter a non-zero divisor. See [Division by zero](errors-and-limitations.md#division-by-zero).

## The result uses `e`

The value is too large or too small for a compact ordinary display, so the calculator uses scientific notation. See [Large and small numbers](errors-and-limitations.md#large-and-small-numbers).

## `mkdocs` is not recognized

Run MkDocs through Python so it does not depend on a command-line PATH entry:

```powershell
py -m mkdocs serve
```

If the module is missing, install the documentation dependencies:

```powershell
py -m pip install -r requirements-docs.txt
```

## GitHub Pages shows an old version

Open the repository’s **Actions** tab and confirm the latest deployment completed. Refresh the page without using the browser cache after the deployment turns green.

## The documentation build reports a link error

Use a path relative to the current Markdown page for internal links. Run `py -m mkdocs build --strict` and correct every reported file and anchor before publishing.
