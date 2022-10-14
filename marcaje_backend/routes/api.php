<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\histEmployeeController;
use App\Http\Controllers\EmployeeController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/user-profile', [AuthController::class, 'userProfile']);
});

Route::group([
    'middleware' => ['before' => 'jwt.auth']
], function ($router) {
    Route::get('histEmployee/{id_user},{date}', [histEmployeeController::class, 'historialUsuario']);
    Route::post('histEmployee', [histEmployeeController::class, 'store']);
    Route::get('histEmployee', [histEmployeeController::class, 'index']);
    Route::get('histEmployee/{id_user}', [histEmployeeController::class, 'validarEntrada']);
    Route::apiResource('Employee', EmployeeController::class);
    //Route::apiResource('histEmployee', histEmployeeController::class);
});