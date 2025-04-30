<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobSeeker extends Model
{
protected $fillable =[
    'full_name',
    'phone',
    'email',
    'skill',
    'location',
    'available',
    'bio',];
  
}
