<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class histemployee extends Model
{
    protected $table = 'hist_employees';
    protected $primaryKey = 'id_history';
    public $timestamps = false;

    use HasFactory;
    
    use HasFactory;
    protected $fillable = [
        'date', 
        'hour',
        'id_user'
    ];

    public function user()
    {
        return $this->belongsToMany(user::class, 'users', 'id_history','id');
    }
}