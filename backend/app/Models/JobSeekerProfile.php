<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class JobSeekerProfile extends Model
{
    //
    use HasFactory;
    // allow mass Assignment of these values 

    protected $fillable =[
        'user_id',
        'skill',
        'location',
        'available',
        'bio',
    ];



    public function user(){
        return $this->belongsTo(User::class);
    }
   
}
