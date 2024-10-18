<?php

namespace App\Http\Controllers;

use App\Http\Requests\JenisSuratKeluarRequest;
use App\JenisSuratKeluar;

class JenisSuratKeluarController extends Controller
{
    public function index()
    {
        $jenisSuratKeluars = JenisSuratKeluar::latest()->get();

        return response()->json($jenisSuratKeluars);
    }

    public function store(JenisSuratKeluarRequest $request)
    {
        ${{modelNameSingularLowerCase}} = JenisSuratKeluar::create($request->all());

        return response()->json(${{modelNameSingularLowerCase}}, 201);
    }

    public function show($id)
    {
        ${{modelNameSingularLowerCase}} = JenisSuratKeluar::findOrFail($id);

        return response()->json(${{modelNameSingularLowerCase}});
    }

    public function update(JenisSuratKeluarRequest $request, $id)
    {
        ${{modelNameSingularLowerCase}} = JenisSuratKeluar::findOrFail($id);
        ${{modelNameSingularLowerCase}}->update($request->all());

        return response()->json(${{modelNameSingularLowerCase}}, 200);
    }

    public function destroy($id)
    {
        JenisSuratKeluar::destroy($id);

        return response()->json(null, 204);
    }
}