<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\histemployee;
use App\Models\Employee;
use Illuminate\Support\Facades\DB;

class histEmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        /*
            Mostrar todos los registros
        */
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
        /*
            Crear un nuevo registro
        */
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

    /* funcion para verificar el historial del usuario
       por medio de su id y fecha del dia
    */
    public function historialUsuario($id_user,$date)
    {   
        $historial_emp = histemployee::where('id_user',$id_user)->where('date',$date)->get();
        
        return response()->json($historial_emp, 200);
    }

    public function validarEntrada(Request $request, $id_user){

        // validamos el id del usuario y recuperamos su entrada
        $entrada_user = histemployee::where('id_user',$id_user)->first()->entrada;

        // obtenemos hora actual del sistema
        $departureTime = date("H:i:s A");
        
        /*
            Entrada de usuario = 0
            actualizamos entrada = 1
            actualizamos hora de salida = hora de marcaje
        */
        if($entrada_user == 0){ // entrada = 0 ----- > tipo_entrada = 1
            
            $updateUsuario = DB::table('hist_employees')
              ->where('id_user',$id_user)
              ->update(['entrada' => 1, 'departureTime' => $departureTime]);

            return response()->json([
                'message' => "empleado updated successfully!",
                'empleado' => $updateUsuario
            ], 200);
        } 

        /*
            Entrada del usuario = 1 
            actualizamos la hora de salida 
        */
        if($entrada_user == 1){

            $updateUsuario = DB::table('hist_employees')
              ->where('id_user',$id_user)
              ->update(['departureTime' => $departureTime]);

            // obtenemos los datos del empleado
            $Employee = Employee::where('id_user',$id_user)->get(['id_employee','full_name']);

            return response()->json([
                'message' => "Salida de empleado Actualizada!",
                'empleado' => $Employee
            ], 200);
        }
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
