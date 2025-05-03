<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function me()
    {
        return response()->json(Auth::user()->load(['jobSeekerProfile', 'jobProviderProfile']));
    }

    public function update(Request $request)
    {
        $user = Auth::user();

        $request->validate([
            'name' => 'sometimes|string',
            'email' => 'sometimes|email|unique:users,email,' . $user->id,
        ]);

        $user->update($request->only('name', 'email'));

        return response()->json(['message' => 'User updated successfully', 'user' => $user]);
    }
}
