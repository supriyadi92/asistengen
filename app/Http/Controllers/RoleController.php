<?php 
// This file was automatically created by DejavaGen 1.00e

//============================================================+
// File name   : RoleController.php
// Created     : Senin, 21 Okt 2024
// Last Update : Senin, 21 Okt 2024
//
// Description : Data Role.
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
use App\Models\Role;

use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\View;
use Illuminate\Support\Collection; // at the top
use Illuminate\Support\Facades\Auth;

class RoleController extends BaseController
{
    protected $column_order = array(null, 'name', 'guard_name','id'); //field yang ada di table user
    protected $column_search = array('name', 'guard_name'); //field yang diizin untuk pencarian 
    protected $order = array('id' => 'desc'); // default order 

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    function __construct()
    {
        $table = new Role;
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
        return $this->sendResponse($json_data, 'Role retrieved successfully.');
    }
    
    public function getAll(Request $request)
    {
        $role = Role::where('is_aktif', '1')->get(['id','name', 'guard_name']);
        return $this->sendResponse($role, 'Role List retrieved successfully.');
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
            
			'name' => 'required|string',
			'guard_name' => 'required|string',
        ]);
        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());   
        } 
        $request->request->add([
            'created_by' => auth()->user()->id
        ]);
        $input = $request->all();
        $role = Role::create($input);
        return $this->sendResponse($role, 'Role created successfully.');
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
        $role = Role::find($id); 
        if (is_null($role)) {
            return $this->sendError('Role not found.');
        }
        return $this->sendResponse($role, 'Role retrieved successfully.');
    }

    // edit post
    public function edit($id)
    {
        $role = Role::find($id); 
        if (is_null($role)) {
            return $this->sendError('Role not found.');
        }
        return $this->sendResponse($role, 'Role retrieved successfully.');
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
        $role = Role::find($id); 
		if (!$role) {
			return $this->sendError('Role with id ' . $id . ' cannot be found.');
		}        
		$validator = Validator::make($request->all(), [
            
			'name' => 'required|string',
			'guard_name' => 'required|string',
		]);
		if($validator->fails()){
			return $this->sendError('Validation Error.', $validator->errors());   
		}       
        
        $request->request->add([
            'updated_by' => auth()->user()->id
        ]);
		$updated = $role->fill($request->all())->save();
		if ($updated) {
			return $this->sendResponse($updated, 'Role updated successfully.');
		} else {
			return $this->sendError('Role with id ' . $id . ' could not be updated.'); 
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
        $role = Role::find($id); 
        if (!$role) {
            return $this->sendError('Role with id ' . $id . ' cannot be found.');
        }         
        if ($role->delete()) {
            return $this->sendResponse($role, 'Role deleted successfully.');
        } else {
            return $this->sendError('Role with id ' . $id . ' could not be deleted.');  
        }
        
        
    }

}