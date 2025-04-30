<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role', // 👈 Added role so it's fillable!
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Relationship: Job Seeker Profile
     */
    public function jobSeekerProfile()
    {
        return $this->hasOne(JobSeekerProfile::class);
    }

    /**
     * Relationship: Job Provider Profile
     */
    public function jobProviderProfile()
    {
        return $this->hasOne(JobProviderProfile::class);
    }

    /**
     * Quick check for role
     */
    public function isJobSeeker(): bool
    {
        return $this->role === 'job_seeker';
    }

    public function isJobProvider(): bool
    {
        return $this->role === 'job_provider';
    }
}
