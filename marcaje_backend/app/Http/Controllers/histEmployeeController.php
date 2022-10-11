<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\histemployee;

class histEmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $histEmployees = histemployee::all();
        return response()->json($histEmployees);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $histEmployee = histemployee::create($request->all());
        return response()->json([
            'message' => "history Employee saved successfully!",
            'HistEmployee' => $histEmployee
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    public function historialUsuario($id_user,$date)
    {   
        // array para guardar los valores del foreach
        //$historialEMP = [];

        $historial_emp = histemployee::where('id_user',$id_user)->where('date',$date)->get();

        /* recorremos los datos recuperados
        foreach($historial_emp as $historial){
            
            $usuario = usuario::where('id_usuario',$id_usuario)->get('id_empleado');

            $empleado = empleado::where('id_empleado', $id_usuario)->get(['id_empleado','nombres','apellidos']);

            $historial->id_usuario = $empleado;

            // almaceno los datos al array
            $historialEMP[] = $historial;
        };
        */
        return response()->json($historial_emp, 200);
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
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
