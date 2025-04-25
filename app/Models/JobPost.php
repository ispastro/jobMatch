<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobPost extends Model
{
    use HasFactory;

    // Table name is 'job_posts' by default, so no need to define it unless it's different

    // Allow mass assignment for these fields
    protected $fillable = [
        'user_id',
        'title',
        'description',
        'location',
        'status',
    ];

    // Optionally: define relationship to User
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
