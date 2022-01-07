<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Uber;
use Illuminate\Http\Request;

class UberController extends Controller
{
    public function index(Request $request)
    {
        return view('uber');
    }

    public function buscar(Request $request)
    {
        return Uber::where('data', $request->data)->first();
    }

    public function salvar(Request $request)
    {
        $uber = Uber::where('data', $request->data);

        if ($uber->exists()) {
            $uber = $uber->first();
            $uber->valeria_valor = $request->valeria_valor;
            $uber->marcos_valor = $request->marcos_valor;
            $uber->save();
            return Uber::find($uber->id);
        } else {
            return Uber::create($request->all());
        }
    }

    public function apagar(Request $request)
    {
        return Uber::where('data', $request->data)->delete();
    }
}
