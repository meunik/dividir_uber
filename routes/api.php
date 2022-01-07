<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::get('/', function () {
    return view('welcome');
});
Route::get('/', [UberController::class, 'index']);
Route::post('/uber/salvar', [UberController::class, 'salvar']);
Route::get('/uber/buscar/{data}', [UberController::class, 'buscar']);
Route::delete('/uber/apagar', [UberController::class, 'apagar']);

Route::get('/uber/mes/{data}', [UberController::class, 'mes']);

