<?php 
// This file was automatically created by DejavaGen 1.00e

//============================================================+
// File name   : JenisBukuController.php
// Created     : Kamis, 24 Okt 2024
// Last Update : Kamis, 24 Okt 2024
//
// Description : Data JenisBuku.
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
use App\Models\JenisBuku;

use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\View;
use Illuminate\Support\Collection; // at the top
use Illuminate\Support\Facades\Auth;

class JenisBukuController extends BaseController
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
        $table = new JenisBuku;
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
        return $this->sendResponse($json_data, 'JenisBuku retrieved successfully.');
    }
    
    public function getAll(Request $request)
    {
        $jenisBuku = JenisBuku::where('is_aktif', '1')->get(['id','kode', 'nama']);
        return $this->sendResponse($jenisBuku, 'JenisBuku List retrieved successfully.');
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
            
			'nama' => 'string',
        ]);
        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());   
        } 
        $request->request->add([
            'created_by' => auth()->user()->id
        ]);
        $input = $request->all();
        $jenisBuku = JenisBuku::create($input);
        return $this->sendResponse($jenisBuku, 'JenisBuku created successfully.');
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
        $jenisBuku = JenisBuku::find($id); 
        if (is_null($jenisBuku)) {
            return $this->sendError('JenisBuku not found.');
        }
        return $this->sendResponse($jenisBuku, 'JenisBuku retrieved successfully.');
    }

    // edit post
    public function edit($id)
    {
        $jenisBuku = JenisBuku::find($id); 
        if (is_null($jenisBuku)) {
            return $this->sendError('JenisBuku not found.');
        }
        return $this->sendResponse($jenisBuku, 'JenisBuku retrieved successfully.');
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
        $jenisBuku = JenisBuku::find($id); 
		if (!$jenisBuku) {
			return $this->sendError('JenisBuku with id ' . $id . ' cannot be found.');
		}        
		$validator = Validator::make($request->all(), [
            
			'nama' => 'string',
		]);
		if($validator->fails()){
			return $this->sendError('Validation Error.', $validator->errors());   
		}       
        
        $request->request->add([
            'updated_by' => auth()->user()->id
        ]);
		$updated = $jenisBuku->fill($request->all())->save();
		if ($updated) {
			return $this->sendResponse($updated, 'JenisBuku updated successfully.');
		} else {
			return $this->sendError('JenisBuku with id ' . $id . ' could not be updated.'); 
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
        $jenisBuku = JenisBuku::find($id); 
        if (!$jenisBuku) {
            return $this->sendError('JenisBuku with id ' . $id . ' cannot be found.');
        }         
        if ($jenisBuku->delete()) {
            return $this->sendResponse($jenisBuku, 'JenisBuku deleted successfully.');
        } else {
            return $this->sendError('JenisBuku with id ' . $id . ' could not be deleted.');  
        }
        
        
    }

}