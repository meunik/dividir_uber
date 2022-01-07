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
Route::post('/salvar', [UberController::class, 'salvar']);
Route::get('/buscar/{data}', [UberController::class, 'buscar']);
Route::delete('/apagar', [UberController::class, 'apagar']);

Route::get('/mes/{data}', [UberController::class, 'mes']);

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
