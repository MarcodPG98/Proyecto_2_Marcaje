<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    protected $table = 'employees';
    protected $primaryKey = 'id_employee';
    public $timestamps = false;

    use HasFactory;
    
    /*
    use HasFactory;
    protected $fillable = [
        'full_name', 
        'phone',
        'dpi'
    ];

    public function user()
    {
        return $this->belongsToMany(user::class, 'users', 'id_employee','id');
    }
    */
}
