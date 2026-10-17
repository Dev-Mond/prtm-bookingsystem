# Booking system implementation plan and project memory

## Approved outcome

Initialize Laravel 12 with Inertia and React using JavaScript, Vite, and SCSS.
Deploy as one PHP application: PHP owns routes and React supplies the view layer.
Node is needed to build assets, not to run production. Authentication, database
setup, and booking features are outside this initialization.

## Working method

Use this file as maintained project memory, not a claim that the model trains
itself. Before continuing a substantial task, read the relevant status and
decisions. After meaningful work, record verified facts, checks, unresolved issues,
and the next action. Replace stale facts; keep lessons short and evidence based.
Never record credentials, customer data, or speculative conclusions as facts.
The user's prompt-optimizer approval workflow remains active.

## Initialization tasks

- [x] Import the official Laravel 12 skeleton, preserving project guidance, skill
  source, and editor configuration. Remove the abandoned framework's staging files
  and recovery archive after the user's explicit approval.
- [x] Install compatible Composer dependencies and preserve both lockfiles.
- [x] Connect the official Laravel Inertia adapter, a Blade root view, and Vite
  asset loading. Add React welcome and about pages with Inertia links
  so server-driven navigation can be checked. Compile SCSS through Vite.
- [x] Verify HTML entry responses, Inertia JSON responses, asset version behavior,
  and production assets. Keep focused integration tests. Browser interaction remains
  unverified because no connected browser is available.
- [x] Document setup and single-host deployment; replace placeholder project facts
  in AGENTS.md with actual paths and verified commands.

## File responsibilities

- `routes/web.php`: named PHP page endpoints.
- `app/Http/Middleware/HandleInertiaRequests.php`: shared props and asset versioning.
- `bootstrap/app.php`: middleware registration and application bootstrap.
- `resources/views/app.blade.php`: initial Inertia HTML document and Vite tags.
- `resources/js/`: JavaScript React entry point and page components.
- `resources/scss/`: authored styles; `public/build/` holds generated assets.
- `vite.config.js`, `package.json`: development server and production build.
- `tests/`: focused backend integration tests; no live database access.
- `README.md`: local commands, requirements, and deployment instructions.

## Completion checks

Composer metadata/platform checks pass, the frontend production build passes,
Laravel starts, initial requests return HTML, and Inertia requests return the
expected component and props. Verify navigation and a missing route. Check that
production pages use built assets without a Node server. Report any unavailable
check explicitly. Deployment remains outside scope; committing and pushing to the
repository below were subsequently approved by the user.

## Decisions and evidence

- 2026-10-18: Laravel is the selected backend. At the user's explicit request,
  permanently removed the abandoned framework's scaffold, adapter staging clone,
  and dependency/recovery archive. No local recovery copy remains.
- Work in the requested workspace and preserve unrelated user changes. The
  initial scaffold had no commits; publication was subsequently authorized.
- PHP CLI is 8.2.12; Node is 22.16.0; npm is 10.9.2; Composer is 2.8.12.
- Laravel 12 supports installed PHP 8.2.12. Use the official Laravel Inertia
  adapter. Do not ignore platform checks or change global PHP settings.
- File sessions/cache and synchronous queues allow the initial pages to run
  without a database or worker. No database migrations run during initialization.
- Tests use Laravel's test environment with in-memory SQLite and array
  session/cache drivers; no production database access is needed.
- Composer archive downloads have timed out; Git source fallback works. Continue
  independent work while dependencies install rather than repeating queries.
- Browser discovery returned no connected browsers. Do not represent HTTP checks
  as proof of rendered UI, keyboard behavior, or responsive layout.
- Inertia navigation tests must send the initial page's asset version. Omitting
  it works before a build but correctly produces HTTP 409 once a manifest exists.
- Use `php artisan route:list` without `--except-vendor`: Inertia's route macro
  registers a vendor controller, so that filter hides the application's pages.
- Initial-only key generation is documented explicitly. Omit the skeleton's
  `composer setup` shortcut so rerunning it cannot silently rotate an existing key.
- Planning/execution skill mechanics are adapted to the approved in-place task:
  keep this one ledger and continue within the approved scope. The later explicit
  publication approval supersedes the original initialization-only commit boundary.
- Repository publication approved: `https://github.com/Dev-Mond/prtm-bookingsystem.git`,
  branch `main`, remote `origin`. Remote inspection found no existing history.
  Publish without force; Git history and upstream status are the authoritative
  records of commit IDs and synchronization.

## Current state / next action

Laravel/Inertia/React initialization is implemented. Backend tests, production
build, HTTP smoke checks, dependency checks, and PHP formatting pass. Local PHP
server started on http://127.0.0.1:8000. Final focused read-only review found no
blocking integration issues. Its caution about repeated key generation was
addressed by removing the optional `composer setup` shortcut.
Next product work needs a new user-approved instruction; database, authentication,
and booking business rules are not implemented. Browser UI verification remains open.

## Verified commands and results

- `php artisan test --compact`: 6 passed, 27 assertions. New page tests failed
  before the Inertia integration, then passed after it. A subsequent build exposed
  the missing-version test request; it now models a browser's actual version header.
- `npm run build`: passed; Vite 8 compiled React JavaScript and SCSS into hashed
  JS/CSS plus `public/build/manifest.json`.
- `node tools/check-http.mjs`: passed against the local PHP server with no Vite
  server. Checks initial HTML/payload, built asset HTTP delivery, Inertia JSON,
  stale-version 409, unknown-route 404, and private `/.env` path 404.
- `composer validate --strict`: passed. `composer check-platform-reqs`: passed.
- `php vendor/laravel/pint/builds/pint --test`: passed. Changed PHP syntax checks
  passed. npm installation reported zero vulnerabilities.
- `.env` and generated assets are ignored by Git.
- After approved archive removal: all three abandoned framework directories are
  absent, active source/manifests/lockfiles contain no old framework references,
  and `php artisan test --compact` still passes (6 tests, 27 assertions).
- After user approval, removed the remaining temporary Laravel initialization
  staging directory and its obsolete documentation, ignore, and Vite watcher
  references. Laravel's required `bootstrap/app.php` remained unchanged.
