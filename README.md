# Booking System

Laravel 12, Inertia 3, React 19, JavaScript, and SCSS with Vite 8. Laravel owns the
routes and sends props to React pages. This deploys to one PHP host and domain;
production serves compiled assets without a Node server. SSR is disabled.

## Requirements and first setup

PHP 8.2+ with Laravel's required extensions, Composer 2, and Node 20.19+ or 22.12+
(use a supported Node LTS release). Local verification used PHP 8.2.12 and Node
22.16.0. The lockfiles select the actual dependency versions.

```powershell
composer install
# Only when .env does not already exist:
Copy-Item .env.example .env
php artisan key:generate
npm ci
npm run build
```

Generate the application key only for a new environment; preserve existing keys.
On this machine, ZIP is disabled in PHP configuration. If Composer cannot extract
archives, use `php -d extension=zip C:/ProgramData/ComposerSetup/bin/composer.phar install`.
No global PHP configuration change is required.

The initialized workspace already has a local `.env` and generated key. File
sessions/cache and synchronous queues allow the starter pages to run without
migrations, a database, or a worker. Default Laravel migrations/models are present
but have not been run; configure a database deliberately before adding features.
Authentication and booking functionality are not implemented.

## Development

Run these in separate terminals:

```powershell
php artisan serve
```

```powershell
npm run dev
```

Open <http://localhost:8000>. Vite serves development modules and hot reload on
port 5173. The Home and About links demonstrate Inertia navigation. Alternatively,
stop Vite and run `npm run build` to use built assets from the PHP server alone.
An abandoned `public/hot` file makes Laravel look for Vite; remove that local file
if a crashed development server left it behind.

## Verification

```powershell
php artisan test --compact
npm run build
composer validate --strict
composer check-platform-reqs
php vendor/laravel/pint/builds/pint --test
```

With the PHP server running and Vite stopped:

```powershell
npm run check:http
# Optional alternate local URL:
npm run check:http -- http://127.0.0.1:8001
```

Feature tests cover the initial HTML payload, Inertia JSON navigation, stale asset
reloads, and missing routes. HTTP smoke checks also verify built JS/CSS delivery
and that `/.env` is inaccessible. Tests use an in-memory database configuration
and array session/cache drivers, with no production database access.
Visual, keyboard, and responsive browser checks remain separate from these checks.

## Single-host deployment

1. Run `npm ci` and `npm run build` locally or in CI.
2. Deploy the Laravel application and `public/build/`; install production PHP
   dependencies with `composer install --no-dev --optimize-autoloader` on the
   target or a compatible build machine. Exclude `.git/`, tests,
   `tools/`, `node_modules/`, and `public/hot` from the deployment artifact.
3. Point the domain document root at `public/`, with requests routed to
   `public/index.php`. Keep application source and `.env` outside the public web
   root; never expose the repository root or move the front controller into it.
4. Set a private production `.env`: `APP_ENV=production`, `APP_DEBUG=false`,
   `APP_URL=https://yourdomain.com`, and a unique, persistent `APP_KEY`.
   Configure any database and mail services when those features are introduced.
5. Allow the PHP process to write to `storage/` and `bootstrap/cache/`. After
   configuration is in place, run `php artisan optimize` and verify the deployed
   page and asset URLs. Enable HTTPS and secure session cookies on the host.

Shared hosting must support Laravel's PHP/extensions, URL rewrites, writable
runtime directories, and a secure `public/` document root layout. Node runs at
build time only. No deployment has been performed by this initialization.

## Project guidance and memory

`AGENTS.md` holds coding and skill-selection guidance. `plan.md` tracks decisions,
progress, verified results, and lessons for future sessions; it does not train the
model. `tools/skills/prompt-optimizer/` preserves the custom skill's source.

- [Laravel deployment requirements](https://laravel.com/docs/12.x/deployment)
- [Inertia server setup](https://inertiajs.com/docs/v3/installation/server-side-setup)
- [Codex project instructions](https://learn.chatgpt.com/docs/agent-configuration/agents-md)
