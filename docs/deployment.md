# Deployment

The calculator and documentation are published together with GitHub Actions.

## Published locations

- Calculator: [techwriterp.github.io/calculator](https://techwriterp.github.io/calculator/)
- Documentation: [techwriterp.github.io/calculator/docs](https://techwriterp.github.io/calculator/docs/)
- Source: [github.com/TechWriterP/calculator](https://github.com/TechWriterP/calculator)

## Deployment flow

```text
Push to main
    ↓
Install Node and Python dependencies
    ↓
Build the static Next.js calculator
    ↓
Build MkDocs into out/docs
    ↓
Upload one GitHub Pages artifact
    ↓
Publish calculator and documentation
```

The workflow file is `.github/workflows/deploy-pages.yml`.

## Automatic deployment

Every push to `main` starts the workflow. It can also be started manually from the repository’s **Actions** tab using **Run workflow**.

## Why both builds share one artifact

GitHub Pages publishes one site per repository. Next.js produces the root calculator in `out/`; MkDocs adds the documentation in `out/docs/`. Uploading the combined directory preserves both URLs.

## Check a deployment

1. Open the repository on GitHub.
2. Select **Actions**.
3. Open **Deploy calculator and docs to GitHub Pages**.
4. Confirm that both the `build` and `deploy` jobs are green.

If deployment fails, inspect the first failed step and see [Troubleshooting](troubleshooting.md).
