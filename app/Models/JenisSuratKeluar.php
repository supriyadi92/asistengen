<?php
// This file was automatically created by DejavaGen 1.00e

//============================================================+
// File name   : JenisSuratKeluar.php
// Created     : Kamis, 17 Okt 2024
// Last Update : Kamis, 17 Okt 2024
//
// Description : Model JenisSuratKeluar.
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
 * Class JenisSuratKeluar
 *
 * @property $id
 * @property $kode
 * @property $nama
 * @property $format
 * @property $posisi
 *
 * @package App
 * @mixin \Illuminate\Database\Eloquent\Builder
 */
class JenisSuratKeluar extends Authenticatable 
{
    use HasApiTokens, Notifiable, HasRoles;
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
	protected $table = 'surat_masuks';
    protected $fillable = ['kode', 'nama', 'format', 'posisi'];

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