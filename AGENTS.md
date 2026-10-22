<!--VITE PLUS START-->

# Using Vite+, the Unified Toolchain for the Web

This project is using Vite+, a unified toolchain built on top of Vite, Rolldown, Vitest, tsdown, Oxlint, Oxfmt, and Vite Task. Vite+ wraps runtime management, package management, and frontend tooling in a single global CLI called `vp`. Vite+ is distinct from Vite, and it invokes Vite through `vp dev` and `vp build`. Run `vp help` to print a list of commands and `vp <command> --help` for information about a specific command.

Docs are local at `node_modules/vite-plus/docs` or online at https://viteplus.dev/guide/.

## Built-in Commands vs Scripts

`vp <name>` runs a built-in command. `vp run <name>` runs a `package.json` script or a `vite.config.ts` task. Scripts cannot overwrite built-ins, so `vp dev` and `vp run dev` may do different things. Check `package.json` and `vite.config.ts` first, and run `vp run <name>` when the project defines a script or task with that name.

## Tool Versions

Run `vp toolchain` to show versions and relationships in the active Vite+
release. Add a tool name to select part of the graph. For example, run
`vp toolchain vite`. Use `--global` to ignore the local `vite-plus` package. Use
`vp why <package>` to show the package-manager dependency graph.

## Review Checklist

- [ ] Run `vp install` after pulling remote changes and before getting started.
- [ ] Run `vp check` and `vp test` to format, lint, type check and test changes.
- [ ] Check if there are `vite.config.ts` tasks or `package.json` scripts necessary for validation, run via `vp run <script>`.
- [ ] If setup, runtime, or package-manager behavior looks wrong, run `vp env doctor` and include its output when asking for help.

<!--VITE PLUS END-->

## Project Notes

React 19 SPA: Ant Design 6 + Pro Components, TanStack Router/Query, Jotai, Tailwind CSS 4.

### Validation

- `pnpm run check` — format, `tsc -b tsconfig.app.json`, then lint. Run this before handing work back.
- There is no test suite yet; `vp test` exists via Vite+ but finds no files.

### Conventions

- pnpm only (`preinstall` enforces it).
- Import shared code via `#comm` and `#components` (package.json `imports`), not deep relative paths.
- Never edit generated files: `src/routeTree.gen.ts` and `src/comm/openapi/schema.d.ts`. Regenerate the latter with `pnpm run gc-open-api`.
- Routes live in `src/routes` (TanStack file-based routing). `_need-auth` is the auth layout, `*.lazy.tsx` holds split route code, and files/directories prefixed with `-` are not routes.
- Commit messages must match `^(feat|fix|docs|style|refactor|perf|test|chore|revert|ci)(\([a-z0-9-]+\))?: .+`; `.husky/commit-msg` rejects the rest and pre-commit runs lint-staged.
