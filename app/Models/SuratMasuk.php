<?php
// This file was automatically created by DejavaGen 1.00e

//============================================================+
// File name   : SuratMasuk.php
// Created     : Rabu, 16 Okt 2024
// Last Update : Rabu, 16 Okt 2024
//
// Description : Model SuratMasuk.
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
 * Class SuratMasuk
 *
 * @property $id
 * @property $nomor_agenda
 * @property $nomor_surat
 * @property $tanggal_surat
 * @property $tanggal_terima
 * @property $nama_pengirim
 * @property $perihal
 * @property $jenis_surat_masuk_id
 * @property $nama_peserta
 * @property $nrp_peserta
 * @property $kpa_peserta
 * @property $nopens_peserta
 * @property $pangkat_peserta
 * @property $nama_pemohon
 * @property $alamat_pemohon
 * @property $hp_pemohon
 * @property $keterangan
 * @property $created_by
 * @property $created_at
 * @property $updated_by
 * @property $updated_at
 *
 * @package App
 * @mixin \Illuminate\Database\Eloquent\Builder
 */
class SuratMasuk extends Authenticatable 
{
    use HasApiTokens, Notifiable, HasRoles;
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
	protected $table = 'surat_masuks';
    protected $fillable = ['nomor_agenda', 'nomor_surat', 'tanggal_surat', 'tanggal_terima', 'nama_pengirim', 'perihal', 'jenis_surat_masuk_id', 'nama_peserta', 'nrp_peserta', 'kpa_peserta', 'nopens_peserta', 'pangkat_peserta', 'nama_pemohon', 'alamat_pemohon', 'hp_pemohon', 'keterangan', 'created_by', 'updated_by'];

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