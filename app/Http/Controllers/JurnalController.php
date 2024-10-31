<?php 
// This file was automatically created by DejavaGen 1.00e

//============================================================+
// File name   : JurnalController.php
// Created     : Senin, 28 Okt 2024
// Last Update : Senin, 28 Okt 2024
//
// Description : Data Jurnal.
//
// Author: Supriyadi
//
// (c) Copyright:
//               Supriyadi
//               deJavaIT.com LTD
//               www.dejavaIT.com
//               info@dejavaIT.com
//============================================================+



namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Api\BaseController;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
// use DB;
use Illuminate\Support\Facades\DB;
use App\Models\Jurnal;

use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\View;
use Illuminate\Support\Collection; // at the top
use Illuminate\Support\Facades\Auth;

class JurnalController extends BaseController
{
    protected $column_order = array(null, 'tanggal', 'nomor_bukti', 'kode_pembantu', 'uraian', 'kategori_jurnal_id', 'akun_debet_id', 'akun_kredit_id', 'jumlah_debet', 'jumlah_kredit', 'keterangan', 'posting_id','id'); //field yang ada di table user
    protected $column_search = array('tanggal', 'nomor_bukti', 'kode_pembantu', 'uraian', 'kategori_jurnal_id', 'akun_debet_id', 'akun_kredit_id', 'jumlah_debet', 'jumlah_kredit', 'keterangan', 'posting_id'); //field yang diizin untuk pencarian 
    protected $order = array('id' => 'desc'); // default order 

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    function __construct()
    {
        $table = new Jurnal;
        $this->table = $table->getTable();
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = $this->get_datatables();
        $json_data = array(
            "draw"            => intval(request()->json('page')), 
            "recordsTotal"    => intval($this->count_filtered()),  
            "recordsFiltered" => intval($this->count_all()), 
            "data"            => $data,  
            );            
        return $this->sendResponse($json_data, 'Jurnal retrieved successfully.');
    }
    
    public function getAll(Request $request)
    {
        $jurnal = Jurnal::where('is_aktif', '1')->get(['id','tanggal', 'nomor_bukti', 'kode_pembantu', 'uraian', 'kategori_jurnal_id', 'akun_debet_id', 'akun_kredit_id', 'jumlah_debet', 'jumlah_kredit', 'keterangan', 'posting_id']);
        return $this->sendResponse($jurnal, 'Jurnal List retrieved successfully.');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $validator = Validator::make($request->all(), [
            
			'tanggal' => 'string',
			'nomor_bukti' => 'string',
			'kode_pembantu' => 'string',
			'uraian' => 'string',
			'kategori_jurnal_id' => 'number',
			'akun_debet_id' => 'number',
			'akun_kredit_id' => 'number',
			'jumlah_debet' => 'number',
			'jumlah_kredit' => 'number',
			'keterangan' => 'string',
			'posting_id' => 'number',
        ]);
        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());   
        } 
        $request->request->add([
            'created_by' => auth()->user()->id
        ]);
        $input = $request->all();
        $jurnal = Jurnal::create($input);
        return $this->sendResponse($jurnal, 'Jurnal created successfully.');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //\
        $jurnal = Jurnal::find($id); 
        if (is_null($jurnal)) {
            return $this->sendError('Jurnal not found.');
        }
        return $this->sendResponse($jurnal, 'Jurnal retrieved successfully.');
    }

    // edit post
    public function edit($id)
    {
        $jurnal = Jurnal::find($id); 
        if (is_null($jurnal)) {
            return $this->sendError('Jurnal not found.');
        }
        return $this->sendResponse($jurnal, 'Jurnal retrieved successfully.');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        $jurnal = Jurnal::find($id); 
		if (!$jurnal) {
			return $this->sendError('Jurnal with id ' . $id . ' cannot be found.');
		}        
		$validator = Validator::make($request->all(), [
            
			'tanggal' => 'string',
			'nomor_bukti' => 'string',
			'kode_pembantu' => 'string',
			'uraian' => 'string',
			'kategori_jurnal_id' => 'number',
			'akun_debet_id' => 'number',
			'akun_kredit_id' => 'number',
			'jumlah_debet' => 'number',
			'jumlah_kredit' => 'number',
			'keterangan' => 'string',
			'posting_id' => 'number',
		]);
		if($validator->fails()){
			return $this->sendError('Validation Error.', $validator->errors());   
		}       
        
        $request->request->add([
            'updated_by' => auth()->user()->id
        ]);
		$updated = $jurnal->fill($request->all())->save();
		if ($updated) {
			return $this->sendResponse($updated, 'Jurnal updated successfully.');
		} else {
			return $this->sendError('Jurnal with id ' . $id . ' could not be updated.'); 
		}    
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // get current logged in user
        $jurnal = Jurnal::find($id); 
        if (!$jurnal) {
            return $this->sendError('Jurnal with id ' . $id . ' cannot be found.');
        }         
        if ($jurnal->delete()) {
            return $this->sendResponse($jurnal, 'Jurnal deleted successfully.');
        } else {
            return $this->sendError('Jurnal with id ' . $id . ' could not be deleted.');  
        }
        
        
    }

}