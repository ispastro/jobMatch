<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class JobProviderProfile extends Model
{
    //

    use HasFactory;

    // fiels that can be mass assigned 

    protected $fillable=[
        'use_id',
        'location',
        'description',

    ];

    public function user(){
        return $this->belongsTo(User::class);

    };
}
