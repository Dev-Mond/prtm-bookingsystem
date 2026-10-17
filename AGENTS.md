# Web project working agreements

## Project context

This is a Laravel 12 + Inertia 3 + React 19 application using JavaScript, SCSS/CSS,
and HTML/Blade. PHP ^8.2 is required; Node ^20.19 or >=22.12 is used for Vite 8.
Production runs as a single PHP application serving built assets; SSR is disabled.
Sessions/cache use files and queues run synchronously. No database setup or
authentication flow has been implemented. Keep framework conventions and lockfiles.

For substantial tasks, read the relevant state in `plan.md`. After meaningful work,
update its progress, decisions, verified results, lessons, and next action. Keep it
factual and concise; project memory does not train the model or authorize new work.

Source map: `routes/web.php` defines pages; `app/Http/Middleware/HandleInertiaRequests.php`
shares props; `bootstrap/app.php` registers middleware; `resources/views/app.blade.php`
is the HTML shell; `resources/js/pages/` contains React pages; `resources/scss/`
contains authored styles. `public/build/` is generated. Laravel's `bootstrap/`
directory is required application infrastructure; preserve it.

Verified checks: `php artisan test --compact`, `npm run build`,
`composer validate --strict`, `composer check-platform-reqs`, and
`php vendor/laravel/pint/builds/pint --test <changed PHP paths>`.
For live HTTP checks, start `php artisan serve` and run `npm run check:http` after a
build with Vite stopped. See README.md for development and deployment commands.

## Efficient workflow

- Complete the requested change and relevant verification. Make routine reversible
  implementation decisions independently; ask only for missing decisions that
  materially change scope or behavior.
- Locate files with `rg --files`, then search specific directories/symbols with
  `rg -n`. Read relevant sections and callers, not the entire repository.
- Exclude vendor, node_modules, caches, generated assets, logs, database dumps,
  and lockfile contents from routine context. Read lockfile metadata only when
  dependency compatibility is relevant. Never expose secrets or customer data.
- Batch independent reads; keep edits and dependent checks sequential. Bound
  command output. Reuse findings rather than repeating exploration.
- Prefer native PHP/browser/framework features and existing libraries. Keep patches
  focused; avoid speculative abstractions, unrelated cleanup, and dependencies
  without a concrete need. Use a short plan only for substantial changes.
- Use one agent by default; delegate only when explicitly requested or required by
  applicable instructions. Keep persistent guidance short and avoid duplicate
  instruction files.
- Preserve existing user changes. Use `apply_patch` for file edits. Do not commit,
  push, deploy, or mutate production data unless requested.

## Skill selection and approval

- For every task, consider the available skill names and descriptions. Use skills
  relevant to the requested outcome, not merely matching keywords. Explicitly
  requested available skills must be used; report unavailable ones and use a
  suitable fallback without claiming they ran.
- Select the smallest set that covers the task and any required prerequisites.
  Read each selected `SKILL.md` before applying it, and load supporting references
  only as needed. Reuse instructions already read in the current conversation.
  Briefly announce the selected skills and their purpose.
- While prompt-optimizer mode is enabled, propose the concise instruction and wait
  for explicit approval before starting task execution. Consider execution skills
  from their descriptions before approval; load and apply them after approval.
  Approval replies and routine steps within approved scope need no new proposal.
- Follow the user's approved scope and preferences when applying skills. A skill
  does not authorize unrelated actions or bypass tool permissions. If a skill blocks
  approved work, cite its exact instruction and explain the blocker.

## PHP implementation

- Establish the PHP version from Composer constraints and deployment information;
  local `php -v` alone does not establish production compatibility.
- Follow existing framework and style conventions. For new standalone PHP, use
  PSR-12 formatting, PSR-4 autoloading, namespaces, explicit types, and
  `declare(strict_types=1);` where compatible. Avoid adding strict types to legacy
  code without checking callers and coercion behavior.
- Keep HTTP handling, domain rules, and persistence clearly separated when useful;
  introduce layers only when the feature needs them. Inject external collaborators
  where this improves testing. Use clear names and actionable exceptions.
- Validate input at boundaries, authorize every protected operation and resource,
  use bound SQL parameters, and escape output for its HTML/JS/URL context. Apply
  CSRF protection to cookie-authenticated mutations. Use PHP password hashing APIs.
- Keep credentials in environment configuration; provide only dummy examples.
  Avoid sensitive logs and exposing stack traces to users. Treat uploaded files as
  untrusted: validate size/type and keep executable content outside the web root.
- Protect booking capacity and overlapping reservations atomically with transactions
  and appropriate database constraints/locking. An availability check followed by
  an unprotected insert is unsafe under concurrent requests.
- Use explicit time zones and test booking boundaries. Represent money as integer
  minor units or exact decimals, never binary floats. Make retryable payment or
  booking mutations idempotent when required. Avoid N+1 queries and unbounded lists.
- Use reversible migrations for schema changes. Confirm the target environment
  before any database command; never assume local credentials target disposable data.

## JavaScript, SCSS/CSS, and HTML

- Follow existing module, naming, formatting, and browser compatibility conventions.
  Prefer native browser APIs and small modules; do not introduce a framework or
  build pipeline without a demonstrated need.
- Keep client validation for usability; enforce permissions, validation, booking
  capacity, and prices on the server. Never ship credentials or trust client state
  as authority. Use safe DOM APIs such as `textContent` for untrusted text; avoid
  unsanitized HTML insertion and executable string construction.
- Handle asynchronous failures and loading states explicitly. Prevent accidental
  duplicate submissions without relying on UI controls for server idempotency.
  Keep PHP/JS contracts consistent for field names, errors, money, and time zones.
- Use semantic HTML, correctly labeled forms, appropriate button types, and native
  controls. Support keyboard access, visible focus, understandable validation
  feedback, meaningful alternative text, and sufficient contrast; use ARIA only
  when native semantics are insufficient.
- Reuse styles and established design tokens. Prefer responsive layouts, scoped
  class selectors, shallow SCSS nesting, and low specificity. Respect reduced
  motion and avoid overriding focus indicators or using `!important` as a default.
- Edit SCSS sources and regenerate CSS with the existing compiler when CSS is a
  generated artifact. Confirm ownership before editing compiled/minified assets.

## Verification and code review

- Run `php -l path/to/changed.php` for changed PHP files. Run focused behavioral
  tests for affected rules, including meaningful failure and authorization cases.
- Discover existing Composer scripts and PHPUnit/Pest, PHPStan/Psalm, and formatter
  configuration before selecting commands. Do not claim tools or tests exist.
  Use the installed configuration; avoid mass formatting and new blanket baselines.
- Check dependency metadata with `composer validate --strict` when a manifest
  exists. Preserve lockfiles; use `composer install` for reproducible setup rather
  than broad dependency updates.
- Discover package scripts, lockfiles, and ESLint, Stylelint, formatter, HTML
  validation, and Sass configuration before choosing frontend commands. Reuse
  configured tools; do not auto-download a tool merely to run a check.
- For frontend changes, run relevant configured lint/tests and the affected build
  when present. For UI changes, verify the affected flow at relevant viewport sizes,
  keyboard interactions, and console/network errors when a runnable app is available.
  A PHP syntax check does not validate embedded HTML, CSS, or JavaScript.
- Preserve the established JS package manager and lockfile. Use its reproducible
  install command when setup is needed (for npm with a lockfile, `npm ci`).
- Review the final diff for correctness, security, compatibility, race conditions,
  and accidental files. Use `git diff --check` when Git is available. Report what
  changed, verification results, and any checks that could not run. Stop once the
  requested outcome is verified; do not invent successful test results.

Current limitations: no ESLint, Stylelint, browser test suite, or static analyzer is
configured. Use the production build for frontend compilation checks; backend tests
and HTTP smoke checks do not replace visual, keyboard, and browser verification.
