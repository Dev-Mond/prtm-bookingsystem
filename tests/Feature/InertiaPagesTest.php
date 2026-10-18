<?php

namespace Tests\Feature;

use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class InertiaPagesTest extends TestCase
{
    public function test_dashboard_previews_are_available_without_authentication(): void
    {
        $this->withoutVite();

        foreach (['profile' => 'Profile', 'add-listing' => 'AddListing', 'bookings' => 'Bookings', 'reviews' => 'Reviews'] as $path => $component) {
            $this->get('/dashboard/'.$path)
                ->assertOk()
                ->assertInertia(fn (Assert $page) => $page->component('Dashboard/'.$component));
        }
    }

    public function test_preview_pages_do_not_accept_persistent_mutations(): void
    {
        foreach (['profile', 'add-listing', 'bookings', 'reviews'] as $path) {
            $this->post('/dashboard/'.$path)->assertStatus(405);
        }
    }

    public function test_welcome_page_bootstraps_react_with_server_props(): void
    {
        $this->withoutVite();

        $this->get('/')
            ->assertOk()
            ->assertSee('id="app"', false)
            ->assertInertia(fn (Assert $page) => $page
                ->component('Welcome')
                ->where('appName', 'Booking System')
                ->where('links.home', '/')
                ->where('links.about', '/about')
            );
    }

    public function test_inertia_navigation_returns_the_requested_page_as_json(): void
    {
        $this->withoutVite();
        $initialPage = $this->get('/')->viewData('page');

        $this->withHeaders([
            'X-Inertia' => 'true',
            'X-Inertia-Version' => $initialPage['version'] ?? '',
        ])
            ->get('/about')
            ->assertOk()
            ->assertHeader('X-Inertia', 'true')
            ->assertJsonPath('component', 'About')
            ->assertJsonPath('props.appName', 'Booking System')
            ->assertJsonPath('url', '/about');
    }

    public function test_unknown_routes_return_not_found(): void
    {
        $this->get('/does-not-exist')->assertNotFound();
    }

    public function test_stale_assets_trigger_a_full_page_reload(): void
    {
        config(['app.asset_url' => 'https://assets.example.test']);

        $this->withHeaders([
            'X-Inertia' => 'true',
            'X-Inertia-Version' => 'outdated-assets',
        ])->get('/about')
            ->assertStatus(409)
            ->assertHeader('X-Inertia-Location', url('/about'));
    }
}
