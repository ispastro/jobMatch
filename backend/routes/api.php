<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\JobPostController;

Route::middleware('api')->group(function () {
    Route::apiResource('job-posts', JobPostController::class);
});
