# Contributing

Contributions that make the calculator easier to understand, use, or maintain are welcome.

## Before you begin

1. Check the repository’s existing issues and pull requests.
2. Open an issue for a substantial behavior or design change.
3. Keep the calculator focused on approachable everyday arithmetic.

## Make a change

1. Fork or clone the repository.
2. Create a focused branch.
3. Make the smallest complete change.
4. Validate the calculator and documentation.
5. Open a pull request that explains the user impact.

## Documentation style

- Write for a reader who may be using a web calculator for the first time.
- Prefer short sentences and concrete examples.
- Introduce one concept at a time.
- Use the exact labels shown in the interface.
- Explain unfamiliar technical terms when they are necessary.
- Add links instead of repeating long explanations.

## Required checks

```powershell
npx next build
py -m mkdocs build --strict
```

Both builds should complete before a change is merged.

## Pull request checklist

- [ ] The change has a clear purpose.
- [ ] Calculator behavior is covered by a practical example when relevant.
- [ ] Internal documentation links work.
- [ ] Keyboard and small-screen behavior were considered.
- [ ] No secrets, generated build folders, or personal data are committed.
