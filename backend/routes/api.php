<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\JobPostController;
use App\Http\Controllers\JobSeekerController;

Route::middleware('api')->group(function () {
    Route::apiResource('job-posts', JobPostController::class);
    Route::apiResource('job-seekers', JobSeekerController::class);
});
