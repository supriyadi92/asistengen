<?php 
// This file was automatically created by DejavaGen 1.00e

//============================================================+
// File name   : AkunController.php
// Created     : Jumat, 25 Okt 2024
// Last Update : Jumat, 25 Okt 2024
//
// Description : Data Akun.
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
use App\Models\Akun;

use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\View;
use Illuminate\Support\Collection; // at the top
use Illuminate\Support\Facades\Auth;

class AkunController extends BaseController
{
    protected $column_order = array(null, 'kode', 'nama', 'pos_akun', 'pos_laporan', 'saldo_awal_debet', 'saldo_awal_kredit','id'); //field yang ada di table user
    protected $column_search = array('kode', 'nama', 'pos_akun', 'pos_laporan', 'saldo_awal_debet', 'saldo_awal_kredit'); //field yang diizin untuk pencarian 
    protected $order = array('id' => 'desc'); // default order 

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    function __construct()
    {
        $table = new Akun;
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
        return $this->sendResponse($json_data, 'Akun retrieved successfully.');
    }
    
    public function getAll(Request $request)
    {
        $akun = Akun::where('is_aktif', '1')->get(['id','kode', 'nama', 'pos_akun', 'pos_laporan', 'saldo_awal_debet', 'saldo_awal_kredit']);
        return $this->sendResponse($akun, 'Akun List retrieved successfully.');
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
            
			'kode' => 'required|string',
			'nama' => 'string',
			'pos_akun' => 'string',
			'pos_laporan' => 'string',
			'saldo_awal_debet' => 'number',
			'saldo_awal_kredit' => 'number',
        ]);
        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());   
        } 
        $request->request->add([
            'created_by' => auth()->user()->id
        ]);
        $input = $request->all();
        $akun = Akun::create($input);
        return $this->sendResponse($akun, 'Akun created successfully.');
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
        $akun = Akun::find($id); 
        if (is_null($akun)) {
            return $this->sendError('Akun not found.');
        }
        return $this->sendResponse($akun, 'Akun retrieved successfully.');
    }

    // edit post
    public function edit($id)
    {
        $akun = Akun::find($id); 
        if (is_null($akun)) {
            return $this->sendError('Akun not found.');
        }
        return $this->sendResponse($akun, 'Akun retrieved successfully.');
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
        $akun = Akun::find($id); 
		if (!$akun) {
			return $this->sendError('Akun with id ' . $id . ' cannot be found.');
		}        
		$validator = Validator::make($request->all(), [
            
			'kode' => 'required|string',
			'nama' => 'string',
			'pos_akun' => 'string',
			'pos_laporan' => 'string',
			'saldo_awal_debet' => 'number',
			'saldo_awal_kredit' => 'number',
		]);
		if($validator->fails()){
			return $this->sendError('Validation Error.', $validator->errors());   
		}       
        
        $request->request->add([
            'updated_by' => auth()->user()->id
        ]);
		$updated = $akun->fill($request->all())->save();
		if ($updated) {
			return $this->sendResponse($updated, 'Akun updated successfully.');
		} else {
			return $this->sendError('Akun with id ' . $id . ' could not be updated.'); 
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
        $akun = Akun::find($id); 
        if (!$akun) {
            return $this->sendError('Akun with id ' . $id . ' cannot be found.');
        }         
        if ($akun->delete()) {
            return $this->sendResponse($akun, 'Akun deleted successfully.');
        } else {
            return $this->sendError('Akun with id ' . $id . ' could not be deleted.');  
        }
        
        
    }

}