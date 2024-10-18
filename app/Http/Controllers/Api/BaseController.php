<?php

//============================================================+
// File name   : BaseController.php
// Created     : 2022-05-23
// Last Update : 2022-05-23
//
// Description : Base Controller Application to generate JSON output and datatables.
//
// Author: Supriyadi
//
// (c) Copyright:
//               Supriyadi
//               deJavaIT.com LTD
//               www.dejavaIT.com
//               info@dejavaIT.com
//============================================================+


namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller as Controller;
use Illuminate\Support\Facades\DB;

class BaseController extends Controller
{
    /**
     * success response method.
     *
     * @return \Illuminate\Http\Response
     */
    public function sendResponse($result, $message)
    {
    	$response = [
            'success' => true,
            'data'    => $result,
            'message' => $message,
        ];
        return response()->json($response, 200);
    }

    /**
     * return error response.
     *
     * @return \Illuminate\Http\Response
     */

    public function sendError($error, $errorMessages = [], $code = 404)
    {
    	$response = [
            'success' => false,
            'message' => $error,
        ];

        if(!empty($errorMessages)){
            $response['data'] = $errorMessages;
        }

        return response()->json($response, $code);
    }

    protected $db;
    protected $table = "";
    protected $column_order = array(); //field yang ada di table user
    protected $column_search = array(); //field yang diizin untuk pencarian
    protected $order = array(); // default order
    protected $joins = array(); // Join table
    protected $select = ""; //
    protected $groups = array();

    private function _get_datatables_query()
    {
        $this->db = DB::table($this->table);
        $this->db->select(DB::raw($this->select?$this->select:$this->table.'.*'));
        foreach ($this->joins as $key=>$value){
            $this->db->leftJoin($value['table_name'], (isset($value['foreign_table'])?$value['foreign_table']:$this->table).'.'.$value['foreign_key'], '=', $value['table_name'].'.'.$value['local_key']);
        }


        if(request()->json('filtered')) // jika datatable mengirimkan pencarian dengan metode POST
        {
            $d = 0;
            foreach (request()->json('filtered') as $filter){
                if($filter["id"]==="q"){
                    if($d===0) // looping awal
                    {
                        $this->db->where(function($query) use($filter) {
                        $i = 0;
                        foreach ($this->column_search as $item) // looping awal
                        {
                            if($i===0) // looping awal
                            {
                                $query->where($item, 'LIKE', '%' . $filter["value"] . '%');
                                // $this->db->where($item, 'LIKE', '%' . request()->json('filtered.0.value') . '%');
                            }
                            else
                            {
                                $query->orWhere($item, 'LIKE', '%' .$filter["value"] . '%');
                                // $this->db->orWhere($item, 'LIKE', '%' . request()->json('filtered.0.value') . '%');
                            }
                            $i++;
                        }
                        });
                    }
                    else{
                        $this->db->where(function($query) use($filter) {
                            $i = 0;
                                foreach ($this->column_search as $item) // looping awal
                                {
                                    if($i===0) // looping awal
                                    {
                                        $query->where($item, 'LIKE', '%' . $filter["value"] . '%');
                                        // $this->db->where($item, 'LIKE', '%' . request()->json('filtered.0.value') . '%');
                                    }
                                    else
                                    {
                                        $query->orWhere($item, 'LIKE', '%' .$filter["value"] . '%');
                                        // $this->db->orWhere($item, 'LIKE', '%' . request()->json('filtered.0.value') . '%');
                                    }
                                    $i++;
                                }
                            });
                        }
                }
                else{
                    if($d===0){
                        $this->db->where($filter["id"], '=', $filter["value"]);
                    }
                    else
                    {
                        $this->db->where($filter["id"], '=', $filter["value"]);
                    }

                }
                $d++;
            } // looping awal
            // dd(request()->json('filtered'));


        }

        // if(request()->json('prior_search')){  // priority search
        //     $d = 0;
        //     foreach (request()->json('prior_search') as $key=>$value){
        //         // if($d===0){
        //         //     $this->db->where($key, '=', $value);
        //         // }
        //         // else
        //         {
        //             $this->db->andWhere($key, '=', $value);
        //         }
        //         $d++;
        //     }
        // }

        // Jika ada Groups
        // dd(isset($this->groups));
        if($this->groups){
            $this->db->groupBy(DB::raw(implode(",", $this->groups)));  // "project_gajis.employee_id","employees.nama"
        }
        // dd(request()->json('order.0.dir'));
        if(request()->json('order.0.column'))
        {
            $this->db->orderBy(request()->json('order.0.column'),request()->json('order.0.dir'));
        }
        else if(isset($this->order))
        {
            dd($this->order);
            $order = $this->order;
            $this->db->orderBy(key($order), $order[key($order)]);
        }
    }


    private function _get_datatables_query1()
    {
        $this->db = DB::table($this->table);
        $this->db->select(DB::raw($this->select));

        if(request()->json('filtered')) // jika datatable mengirimkan pencarian dengan metode POST
        {
            $d = 0;
            foreach (request()->json('filtered') as $filter){
                if($filter["id"]==="q"){
                    if($d===0) // looping awal
                    {
                        $this->db->where(function($query) use($filter) {
                        $i = 0;
                        foreach ($this->column_search as $item) // looping awal
                        {
                            if($i===0) // looping awal
                            {
                                $query->where($item, 'LIKE', '%' . $filter["value"] . '%');
                                // $this->db->where($item, 'LIKE', '%' . request()->json('filtered.0.value') . '%');
                            }
                            else
                            {
                                $query->orWhere($item, 'LIKE', '%' .$filter["value"] . '%');
                                // $this->db->orWhere($item, 'LIKE', '%' . request()->json('filtered.0.value') . '%');
                            }
                            $i++;
                        }
                        });
                    }
                    else{
                        $this->db->where(function($query) use($filter) {
                            $i = 0;
                                foreach ($this->column_search as $item) // looping awal
                                {
                                    if($i===0) // looping awal
                                    {
                                        $query->where($item, 'LIKE', '%' . $filter["value"] . '%');
                                        // $this->db->where($item, 'LIKE', '%' . request()->json('filtered.0.value') . '%');
                                    }
                                    else
                                    {
                                        $query->orWhere($item, 'LIKE', '%' .$filter["value"] . '%');
                                        // $this->db->orWhere($item, 'LIKE', '%' . request()->json('filtered.0.value') . '%');
                                    }
                                    $i++;
                                }
                            });
                        }
                }
                else{
                    if($d===0){
                        $this->db->where($filter["id"], '=', $filter["value"]);
                    }
                    else
                    {
                        $this->db->where($filter["id"], '=', $filter["value"]);
                    }

                }
                $d++;
            } // looping awal
            // dd(request()->json('filtered'));


        }
        if($this->groups){
            $this->db->groupBy(DB::raw(implode(",", $this->groups)));  // "project_gajis.employee_id","employees.nama"
        }

        if(request('order'))
        {
            $this->db->orderBy(request('order.0.column'),request('order.0.dir'));
        }
        else if(isset($this->order))
        {
            $order = $this->order;
            $this->db->orderBy(key($order), $order[key($order)]);
        }
    }


    public function get_datatables()
    {
        $this->_get_datatables_query();
        $this->db->paginate(request()->json('page')?request()->json('pagesize'):10,['*'],'page',request()->json('page')?request()->json('page'):0); //request()->json('pagesize'));
        return $this->db->get();
        // return $this->db;
    }


    public function get_sql_query()
    {
        $this->get_datatables();
        return $this->db->toSql();
    }

    function count_filtered()
    {
        $this->_get_datatables_query();
        $query = $this->db->get();
        return $query->count();
    }

    public function count_all()
    {
        $this->db = DB::table($this->table);
        return $this->db->count();
    }
}
