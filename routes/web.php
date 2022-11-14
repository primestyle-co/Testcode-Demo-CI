<?php

declare(strict_types=1);

use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

require __DIR__ . '/auth.php';

Route::prefix('api')->middleware('auth')->group(function () {
    Route::get('posts', [PostController::class, 'index'])
        ->name('posts.list');
    Route::post('posts/create', [PostController::class, 'create']);

    Route::post('posts/{id}', [PostController::class, 'store'])
        ->name('login');
    Route::get('posts/{id}', [PostController::class, 'detail']);
    Route::post('posts/delete/{id}', [PostController::class, 'delete']);
});

// Route::get('/', function () {
//     return view('welcome');
// });
Route::get('/dashboard', function () {
    return view('dashboard');
});
Route::get('/testdash', function () {
    return view('test10');
})->middleware(['auth'])->name('testdash');

Route::get('/uploadfile', 'App\Http\Controllers\FeedbackController@create');
Route::post('/storefile','App\Http\Controllers\FeedbackController@store');

Route::get('{any}', function () {
    return view('welcome');
})->where('any', '.*');

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth'])->name('dashboard');
// Route::get('/uploadfile', function () {
//     return view('create');
// })->middleware(['auth'])->name('uploadfile');
// Route::post('/storefile', function(){dd('testsss');});

// Route::prefix('uploadfile')->group(function () {
//     Route::get('/', 'FeedbackController@create');
       
//     Route::post('/', 'FeedbackController@store');

//     Route::get('/{feedback}', 'FeedbackController@show');
// });
