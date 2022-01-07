<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Uber;
use Illuminate\Http\Request;

class UberController extends Controller
{
    public $uberPassValeria = 0;
    public $uberPassMarcos = 24.99;

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

    public function mes(Request $request)
    {
        $uber = Uber::where('data', 'LIKE', $request->data.'%');

        if (!$uber->exists()) {
            return [
                'dias' => 0,
                'total' => 0,
                'mediaTotal' => 0,
                'porcentagemValeria' => 0,
                'porcentagemMarcos' => 0,
                'somaValeria' => 0,
                'somaMarcos' => 0,
                'mediaValeria' => 0,
                'mediaMarcos' => 0
            ];
        }

        $uber = $uber->get();

        $somaValeria = $this->uberPassValeria;
        $somaMarcos = $this->uberPassMarcos;

        foreach ($uber as $item) {
            $somaValeria += $item->valeria_valor;
            $somaMarcos += $item->marcos_valor;
        }

        $somaValeria = round($somaValeria, 2);
        $somaMarcos = round($somaMarcos, 2);

        $total = round($somaValeria + $somaMarcos, 2);
        $porcentagemValeria = round(($somaValeria/$total)*100, 0);
        $porcentagemMarcos = round(($somaMarcos/$total)*100, 0);

        $dias = count($uber);
        $mediaTotal = round($total/$dias, 2);
        $mediaValeria = round($somaValeria/$dias, 2);
        $mediaMarcos = round($somaMarcos/$dias, 2);

        $result = [
            'dias' => $dias,
            'total' => $total,
            'mediaTotal' => $mediaTotal,
            'porcentagemValeria' => $porcentagemValeria,
            'porcentagemMarcos' => $porcentagemMarcos,
            'somaValeria' => $somaValeria,
            'somaMarcos' => $somaMarcos,
            'mediaValeria' => $mediaValeria,
            'mediaMarcos' => $mediaMarcos
        ];

        return $result;
		// return DataTables::of($datas)->make(true);
    }
}
