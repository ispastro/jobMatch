<?php

namespace App\Http\Controllers;

use App\Models\JobSeeker;
use Illuminate\Http\Request;

class JobSeekerController extends Controller
{
    public function index()
    {
        $seekers = JobSeeker::all();
        return response()->json($seekers, 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'full_name' => 'required|max:255',
            'phone' => 'required|string|max:12',
            'email' => 'nullable|email',
            'skill' => 'required|string',
            'location' => 'required|string',
            'available' => 'boolean',
            'bio' => 'nullable|string',
        ]);

        $seeker = JobSeeker::create($validated);

        return response()->json([
            'message' => 'Job seeker registered',
            'data' => $seeker
        ], 201);
    }

    public function show(JobSeeker $jobSeeker)
    {
        return response()->json($jobSeeker);
    }

    public function update(Request $request, JobSeeker $jobSeeker)
    {
        $validated = $request->validate([
            'full_name' => 'sometimes|max:255',
            'phone' => 'sometimes|string|max:12',
            'email' => 'nullable|email',
            'skill' => 'sometimes|string',
            'location' => 'sometimes|string',
            'available' => 'boolean',
            'bio' => 'nullable|string',
        ]);

        $jobSeeker->update($validated);

        return response()->json([
            'message' => 'Seeker updated',
            'data' => $jobSeeker
        ]);
    }

    public function destroy(JobSeeker $jobSeeker)
    {
        $jobSeeker->delete();

        return response()->json(['message' => 'Seeker deleted']);
    }
}
