<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UberController;

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

Route::get('/', function () {
    return view('welcome');
});

Route::get('/teste', [TesteController::class, 'index']);
Route::get('/uber', [UberController::class, 'index']);
Route::post('/uber/salvar', [UberController::class, 'salvar']);
Route::get('/uber/buscar/{data}', [UberController::class, 'buscar']);
Route::delete('/uber/apagar', [UberController::class, 'apagar']);

Route::get('/uber/mes/{data}', [UberController::class, 'mes']);
