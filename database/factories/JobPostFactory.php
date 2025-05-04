<?php

namespace Database\Factories;
use App\Models\JobPost;
use App\Models\User;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\JobPost>
 */
class JobPostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     * 
     * 
     */

    protected $model = JobPost::class;
    public function definition(): array
    {
        return [

            
                'user_id' => User::inRandomOrder()->first()->id??User::factory(),
                'title' => $this->faker->jobTitle,
                'description' => $this->faker->paragraph,
                'location' => $this->faker->city,
                'status' => $this->faker->randomElement(['open', 'in_progress', 'completed']),
            //
        ];
    }
}
