<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\JobPostController;
use App\Http\Controllers\JobSeekerProfileController;
use App\Http\Controllers\JobProviderProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;

//  Public Routes (no auth needed)
Route::prefix('auth')->group(function (){
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
});


//  Protected Routes (require auth token)
Route::middleware('auth:sanctum')->group(function () {

    Route::get('/me', [UserController::class, 'me']);
    Route::put('/me', [UserController::class, 'update']);

    Route::apiResource('/job-posts', JobPostController::class);
    Route::apiResource('/job-seekers', JobSeekerProfileController::class);
    Route::apiResource('/job-providers', JobProviderProfileController::class);
});
