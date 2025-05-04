<?php
namespace App\Http\Controllers;
use App\Models\JobPost;
use Illuminate\Http\Request;



class JobPostController extends Controller
{
    // List all job posts
    public function index( Request $request)
    {

        $query=JobPost::query();

        // filter by status
        if($request->has('status')){
            $query->where('status', $request->status);
            
        }
        if($request->has('location')){
            $query->where('location', 'like', '%' . $request->location . '%');
        }
       
     // filter by search term

     if($request->has('search')){
        $search =$request->search;
        $query->where(function($q) use($search){
            $q->where('title','like', '%'.$search.'%')
            ->orWhere('description','like','%'.$search.'%');    
        });
    }
        //sortiing by created_at and title
        if($request->has('sort')){
            $sortBy =$request->sort; // corrected variable name
            $order =$request->get('order', 'asc'); // default to 'asc  if not provided
            $order=in_array(strtolower($order),['asc','desc']) ? $order : 'asc'; // check if the order is valid

            // addding the allowable field here 

            $allowedSorts =[
                'created_at',
                'title',
                'location',
                'status'
            ];

            if(in_array($sortBy, $allowedSorts)){
                
                $query->orderBy($sortBy,$order);
            }
         }

     



       
        return response()->json($query->get()); // returns everything found 
    }

    // Store a new job post
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'location' => 'required|string',
            'status' => 'in:open,in_progress,completed'
        ]);

        $job = JobPost::create($validated);
        return response()->json($job, 201);
    }

    // Show one job post
    public function show($id)
    {
        return JobPost::findOrFail($id);
    }

    // Update a job post
    public function update(Request $request, $id)
    {
        $job = JobPost::findOrFail($id);
        $job->update($request->only(['title', 'description', 'location', 'status']));
        return response()->json($job);
    }

    // Delete a job post
    public function destroy($id)
    {
        $job = JobPost::findOrFail($id);
        $job->delete();
        return response()->json(['message' => 'Job deleted']);
    }
}
