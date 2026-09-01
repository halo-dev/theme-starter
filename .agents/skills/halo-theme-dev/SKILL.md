---
name: halo-theme-dev
description: >
  Create or modify Halo CMS themes, including Thymeleaf templates, theme.yaml and
  settings.yaml, Finder APIs, static assets, Vite integration, theme UI providers,
  page-layout integration, annotations, i18n, and error pages. Use for Halo site
  theme implementation, migration, debugging, or packaging; do not use for
  unrelated Thymeleaf applications or plugin-only changes.
---

# Halo Theme Development

Work from the target theme and fetch current Halo documentation only when the
task needs a Halo-specific contract. Do not rely on Finder signatures, template
variables, or configuration fields recalled from training data.

## Establish the Target

- Inspect `theme.yaml`, `settings.yaml`, the package manifest and build config,
  and representative templates before editing.
- Determine `theme.yaml` `spec.requires` and the actual Halo version. Do not
  silently raise the requirement or replace the theme's build system.
- Identify whether runtime templates are authored directly in `templates/` or
  generated from a source directory such as `src/`.

## Fetch Documentation on Demand

1. Start with the [theme documentation index](https://docs.halo.run/developer-guide/theme/index.md)
   when the task involves Halo theme configuration, templates, Finder APIs,
   global variables, assets, annotations, i18n, packaging, or plugin integration.
2. Use the complete [Halo documentation index](https://docs.halo.run/llms.txt)
   only when the route is unclear or the task crosses documentation sections.
3. Fetch only the Markdown pages relevant to the current task. Do not load
   `llms-full.txt` by default.
4. For version-sensitive work, also read the [theme API changelog](https://docs.halo.run/developer-guide/theme/api-changelog.md),
   then verify exact fields and signatures against the target version or existing
   templates. The target version wins over current-site docs.

If online docs are unavailable, continue from the target checkout and installed
dependencies when possible, and disclose what could not be verified instead of
guessing.

## Halo-Specific Boundaries

- Keep the theme directory name aligned with `theme.yaml` `metadata.name`.
- In a build-tool theme, edit source templates and assets, then run the existing
  build; do not hand-edit generated `templates/` output or hashed assets.
- Read the current [Thymeleaf guide](https://docs.halo.run/developer-guide/theme/thymeleaf.md)
  before writing expressions. Halo 2.26 uses Thymeleaf 3.1, where `#request`,
  `#response`, `#session`, and `#servletContext` are unavailable. Do not guess
  expression methods or derive page URLs from request objects; use documented
  template variables and permalinks.
- Treat site identity and global injection as Halo-owned by default. Use
  `site.logo`, system SEO settings, Halo's head processing, and `<halo:footer />`;
  add a theme setting only for a theme-specific override with a system fallback.
  Check the current [settings guide](https://docs.halo.run/developer-guide/theme/settings.md)
  before adding fields to `settings.yaml`.
- Do not duplicate Halo-injected description or keywords. Canonical, Open Graph,
  Twitter Card, and structured data are optional theme/plugin capabilities and
  must follow the current [SEO guide](https://docs.halo.run/developer-guide/theme/seo.md)
  with conflict-avoidance switches.
- Preserve the project's established Thymeleaf layout and asset conventions.
  Check the relevant docs before using a Finder method, template variable, Halo
  utility, custom tag, or page-layout contract. When integrating official frontend
  widgets, follow the shared color-scheme contract in the current
  [plugin integration guide](https://docs.halo.run/developer-guide/theme/plugin-integration.md).
- Use the starter assets below only when creating a new theme. Never replace an
  existing theme with a starter.

## Starter Templates

The `assets/` directory provides two ready-to-use theme templates:

- **`assets/theme-minimal/`** — Zero-build-tool minimal theme with the standard route templates; ideal for quick prototyping or simple themes
- **`assets/theme-vite/`** — Vite project template with `vite-plugin-halo-theme` (**recommended for new themes**); includes partial layout reuse and CSS toolchain

Usage: copy the directory into `themes/` in your Halo working directory, ensure the folder name matches `metadata.name` in `theme.yaml`, then install and activate in Console.

## Verify

Run the theme's existing build and package checks when applicable. Test every
changed template type or integration path on a compatible Halo instance; at
minimum cover the affected route plus one shared-layout consumer. Check rendered
HTML, asset loading, pagination or empty states when relevant, and browser console
errors.
