<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\HasApiTokens;



class AuthController extends Controller
{
    /**  use
     * LOGIN METHOD
     */

     
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (!Auth::attempt($credentials)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $user = Auth::user();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'token' => $token,
            'user' => $user
        ]);
    }

    /**
     * REGISTER METHOD
     */
    public function register(Request $request)
    {
       try{ $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users,email',
            'password' => 'required|string|min:6|confirmed',
            'role' => 'required|in:job_seeker,job_provider'
        ]);

    }  catch(validationException $e){

        return response()->json(['errors'=>$e->errors()],422);
    }
        // Automatically hashed due to 'password' => 'hashed' in User model
        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => $validated['role'],
        ]);
    
        // Create empty profile
        if ($user->isJobSeeker()) {
            $user->jobSeekerProfile()->create();
        } elseif ($user->isJobProvider()) {
            $user->jobProviderProfile()->create();
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'token' => $token,
            'user' => $user->load(['jobSeekerProfile', 'jobProviderProfile']),
        ], 201);
    }
}

