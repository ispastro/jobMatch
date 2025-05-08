<?php

namespace App\Http\Controllers;

use App\Models\JobSeekerProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;



class JobSeekerProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()


    {
               
$profile =JobSeekerProfile::where('user_id', Auth::id())->first();
    

        if(!$profile){
            return response()->json(['message'=>'not found'],404);
          
        }

        return response()->json($profile);

        //
  
    }

  

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)

    {
        //
            $request ->validate([
            'skill'=>'required|string',
            'location'=>'required|string',
            'available'=>'boolean',
            'bio'=>'nullable|string',
        ]);


           $data['user_id']=Auth::id();

        $profile=JobSeekerProfile::create($data);
        return response()->json($profile);
            
    }

    /**
     * Display the specified resource.
     */
    public function show(JobSeekerProfile $jobSeekerProfile)
    {
        //

        return response()->json($jobSeekerProfile->load('user'));
    }

    
     // Update the specified resource in storage.
     
    public function update(Request $request, JobSeekerProfile $jobSeekerProfile)
    {
        //enusre the authenticated user is the owner of the profile
        if($jobSeekerProfile->user_id!==Auth::id()){
            return response()->json((['message'=>'Unauthorized']),403);

        }

        $data =$request->validate([
            'skill'=>'sometimes|required|string',
            'location'=>'sometimes|required|string',
            'bio'=>'nullable|string',

         

        ]);

        $jobSeekerProfile->update($data);
        return response()->json($jobSeekerProfile);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(JobSeekerProfile $jobSeekerProfile)
    {
        //

        if($jobSeekerProfile->user_id!==Auth::id()){
            return response()->json((['message'=>'Unauthorized']),403);

        }
        $jobSeekerProfile->delete();
        return response()->json(['message'=>'Profile deleted successfully']);
    }
}
