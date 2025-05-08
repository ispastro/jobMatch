<?php

namespace App\Http\Controllers;

use App\Models\JobProviderProfile;
use Illuminate\Http\Request;

class JobProviderProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
       $profile =JobProviderProfile::where('user_id',Auth::id())->first();
        if(!$profile){
            return response()->json(['message'=>'not found'],404);
        }

        return response()->json($profile);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function store( Request $request)
    {
        //

        $data = $request->validate([
            'location' => 'required|string',
            'description' => 'required|string',

        ]);

        $data['user_id']=Auth::id();
        $profile = JobProviderProfile::create($data);
        return response()->json($profile);
        
    }

    /**
 
    
     * Display the specified resource.
     */
    public function show(JobProviderProfile $jobProviderProfile)
    {
        return response()->json($jobProviderProfile)->load('user');
    }

    /**
     * Show the form for editing the specified resource.
     */
    
    public function update(Request $request, JobProviderProfile $jobProviderProfile)
    {
        //
        if($jobProviderProfile->user_id!==Auth::id()){
            return response()->json(['message'=>'unauthorized access'],403);
        }

        $data =$request->validate([
            'location'=>'sometimes|string|max:255',
            'description'=>'sometimes|string|max:255',
        ]);
        $jobProviderProfile->update($data);
        return response()->json($jobProviderProfile);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(JobProviderProfile $jobProviderProfile)
    {
        //
        if($jobProviderProfile->user_id!==Auth::id()){
            return response()->json(['message'=>'unauthorized access'],403);
        }
        $jobProviderProfile->delete();
        return response()->json(['message'=>'profile deleted successfully']);
    }
}
