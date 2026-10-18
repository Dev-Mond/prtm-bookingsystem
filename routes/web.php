<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'Welcome')->name('home');
Route::inertia('/about', 'About')->name('about');

// Public frontend previews only: no authentication or persisted account data.
Route::inertia('/dashboard/profile', 'Dashboard/Profile')->name('dashboard.profile');
Route::inertia('/dashboard/add-listing', 'Dashboard/AddListing')->name('dashboard.add-listing');
Route::inertia('/dashboard/bookings', 'Dashboard/Bookings')->name('dashboard.bookings');
Route::inertia('/dashboard/reviews', 'Dashboard/Reviews')->name('dashboard.reviews');
