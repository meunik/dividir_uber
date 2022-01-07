<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Uber extends Model
{
    protected $table = "uber";
    protected $fillable = ['data', 'valeria_valor', 'marcos_valor'];
}
