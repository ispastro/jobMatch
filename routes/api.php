<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\UserController;
use App\Http\Controllers\JobPostController;
use App\Http\Controllers\JobSeekerProfileController;
use App\Http\Controllers\JobProviderProfileController;



Route::post('/login', function (Request $request)){
    $request ->validate([
        'email'=>'required|email',
        'password'=>'required|string',

    ]);
    $user =User::where('email', $request->email)->first();
    if(!$user || !Hash::check($request->password, $user->password)){
        return response()->json(['message'=>'Invalid credentials'],401);
    }

    return response()->json([
        'token'=>$user->createToken('api-token')->plainTextToken,
        'user'=>$user->load(['jobSeekerProfile', 'jobProviderProfile'])
    ])
}

Route::middleware('auth:api')->group(function () {

    Route::get('/me',[UserController::class, 'me']);
    Route::put('/me', [UserController::class, 'update']);
    Route::apiResource('job-posts', JobPostController::class);

    Route::apiResource('job-seeker-profiles', JobSeekerProfileController::class);
    Route::apiResource('job-provider-profiles', JobProviderProfileController::class);
    Route::post('/login', function)

});