<?php
// This file was automatically created by DejavaGen 1.00e

//============================================================+
// File name   : Akun.php
// Created     : Jumat, 25 Okt 2024
// Last Update : Jumat, 25 Okt 2024
//
// Description : Model Akun.
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
 * Class Akun
 *
 * @property $id
 * @property $kode
 * @property $nama
 * @property $pos_akun
 * @property $pos_laporan
 * @property $saldo_awal_debet
 * @property $saldo_awal_kredit
 * @property $created_by
 * @property $created_at
 * @property $updated_by
 * @property $updated_at
 *
 * @package App
 * @mixin \Illuminate\Database\Eloquent\Builder
 */
class Akun extends Authenticatable 
{
    use HasApiTokens, Notifiable, HasRoles;
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
	protected $table = 'akuns';
    protected $fillable = ['kode', 'nama', 'pos_akun', 'pos_laporan', 'saldo_awal_debet', 'saldo_awal_kredit'];

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