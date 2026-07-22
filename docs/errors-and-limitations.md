# Errors and limitations

## Division by zero

Dividing any number by zero is undefined. Instead of displaying `Infinity` or `NaN`, the calculator shows:

> Cannot divide by zero

Select **Clear** or enter a new number to continue.

## Decimal precision

Web browsers represent most decimal values using binary floating-point numbers. Some calculations can create long, unexpected decimal strings internally. The calculator rounds displayed results to 12 significant digits to keep answers readable.

For example, `0.1 + 0.2` is displayed as `0.3`.

!!! warning
    This calculator is intended for everyday arithmetic. Do not use it where regulated financial, scientific, medical, or engineering precision is required.

## Large and small numbers

Very large numbers and very small non-zero numbers use scientific notation. For example:

```text
1.2e+15
```

This means `1.2 × 10¹⁵`.

## Current scope

The calculator does not currently include:

- memory buttons
- parentheses or operation precedence
- scientific functions
- a persistent calculation history
- currency or unit conversion

Calculations are evaluated step by step in the order you enter them.
