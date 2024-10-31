<?php 
// This file was automatically created by DejavaGen 1.00e

//============================================================+
// File name   : KategoriJurnalController.php
// Created     : Jumat, 25 Okt 2024
// Last Update : Jumat, 25 Okt 2024
//
// Description : Data KategoriJurnal.
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
use App\Models\KategoriJurnal;

use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\View;
use Illuminate\Support\Collection; // at the top
use Illuminate\Support\Facades\Auth;

class KategoriJurnalController extends BaseController
{
    protected $column_order = array(null, 'kode', 'nama','id'); //field yang ada di table user
    protected $column_search = array('kode', 'nama'); //field yang diizin untuk pencarian 
    protected $order = array('id' => 'desc'); // default order 

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    function __construct()
    {
        $table = new KategoriJurnal;
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
        return $this->sendResponse($json_data, 'KategoriJurnal retrieved successfully.');
    }
    
    public function getAll(Request $request)
    {
        $kategoriJurnal = KategoriJurnal::where('is_aktif', '1')->get(['id','kode', 'nama']);
        return $this->sendResponse($kategoriJurnal, 'KategoriJurnal List retrieved successfully.');
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
            
			'kode' => 'string',
			'nama' => 'string',
        ]);
        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());   
        } 
        $request->request->add([
            'created_by' => auth()->user()->id
        ]);
        $input = $request->all();
        $kategoriJurnal = KategoriJurnal::create($input);
        return $this->sendResponse($kategoriJurnal, 'KategoriJurnal created successfully.');
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
        $kategoriJurnal = KategoriJurnal::find($id); 
        if (is_null($kategoriJurnal)) {
            return $this->sendError('KategoriJurnal not found.');
        }
        return $this->sendResponse($kategoriJurnal, 'KategoriJurnal retrieved successfully.');
    }

    // edit post
    public function edit($id)
    {
        $kategoriJurnal = KategoriJurnal::find($id); 
        if (is_null($kategoriJurnal)) {
            return $this->sendError('KategoriJurnal not found.');
        }
        return $this->sendResponse($kategoriJurnal, 'KategoriJurnal retrieved successfully.');
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
        $kategoriJurnal = KategoriJurnal::find($id); 
		if (!$kategoriJurnal) {
			return $this->sendError('KategoriJurnal with id ' . $id . ' cannot be found.');
		}        
		$validator = Validator::make($request->all(), [
            
			'kode' => 'string',
			'nama' => 'string',
		]);
		if($validator->fails()){
			return $this->sendError('Validation Error.', $validator->errors());   
		}       
        
        $request->request->add([
            'updated_by' => auth()->user()->id
        ]);
		$updated = $kategoriJurnal->fill($request->all())->save();
		if ($updated) {
			return $this->sendResponse($updated, 'KategoriJurnal updated successfully.');
		} else {
			return $this->sendError('KategoriJurnal with id ' . $id . ' could not be updated.'); 
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
        $kategoriJurnal = KategoriJurnal::find($id); 
        if (!$kategoriJurnal) {
            return $this->sendError('KategoriJurnal with id ' . $id . ' cannot be found.');
        }         
        if ($kategoriJurnal->delete()) {
            return $this->sendResponse($kategoriJurnal, 'KategoriJurnal deleted successfully.');
        } else {
            return $this->sendError('KategoriJurnal with id ' . $id . ' could not be deleted.');  
        }
        
        
    }

}