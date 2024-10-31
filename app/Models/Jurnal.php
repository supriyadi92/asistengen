<?php
// This file was automatically created by DejavaGen 1.00e

//============================================================+
// File name   : Jurnal.php
// Created     : Senin, 28 Okt 2024
// Last Update : Senin, 28 Okt 2024
//
// Description : Model Jurnal.
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
 * Class Jurnal
 *
 * @property $id
 * @property $tanggal
 * @property $nomor_bukti
 * @property $kode_pembantu
 * @property $uraian
 * @property $kategori_jurnal_id
 * @property $akun_debet_id
 * @property $akun_kredit_id
 * @property $jumlah_debet
 * @property $jumlah_kredit
 * @property $keterangan
 * @property $posting_id
 * @property $created_by
 * @property $created_at
 * @property $updated_by
 * @property $updated_at
 *
 * @package App
 * @mixin \Illuminate\Database\Eloquent\Builder
 */
class Jurnal extends Authenticatable 
{
    use HasApiTokens, Notifiable, HasRoles;
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
	protected $table = 'jurnals';
    protected $fillable = ['tanggal', 'nomor_bukti', 'kode_pembantu', 'uraian', 'kategori_jurnal_id', 'akun_debet_id', 'akun_kredit_id', 'jumlah_debet', 'jumlah_kredit', 'keterangan', 'posting_id'];

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