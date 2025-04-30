<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\support\Facades\Auth;

class userController extends Controller
{
    //

    public function me(){
        return response()->json(Auth::user()->load(['jobSeekerProfile', 'jobProviderProfile']));
    }

    public function update(){
        $user =Auth::user();  // this gets currently authenticated users and assigns it to the user varaible 

        $request =validate([
            'name'='sometimes|string',
            'email'='sometimes|email|unique:users,email '.$user->id,
        ]);

        $user->update($request->only('name','email'));

        return response->json(['message'=>'User updated successfully', 'user'=>$user]);
    }
}
