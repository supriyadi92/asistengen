<?php
// This file was automatically created by DejavaGen 1.00e

//============================================================+
// File name   : JenisBuku.php
// Created     : Kamis, 24 Okt 2024
// Last Update : Kamis, 24 Okt 2024
//
// Description : Model JenisBuku.
//
// Author: Supriyadi
//
// (c) Copyright:
//               Supriyadi
//               deJavaIT.com LTD
//               www.dejavaIT.com
//               info@dejavaIT.com
//============================================================+


namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Support\Facades\DB;

/**
 * Class JenisBuku
 *
 * @property $id
 * @property $kode
 * @property $nama
 *
 * @package App
 * @mixin \Illuminate\Database\Eloquent\Builder
 */
class JenisBuku extends Authenticatable 
{
    use HasApiTokens, Notifiable, HasRoles;
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
	protected $table = 'jenis_bukus';
    protected $fillable = ['kode', 'nama'];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    
}