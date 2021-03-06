<?php

namespace App\Http\Controllers;

use App\Employee;
use App\Http\Controllers\Controller;
use App\Imports\UsersImport;
use App\Imports\UsersNoHeaders;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $employees = Employee::paginate(50);

        if ($employees->count() > 0) {
            return response()->json([
                'success' => 200,
                'employees' => $employees
            ]);
        } else {
            return response()->json([
                'error' => 400,
                'message' => "No Employees, pleas upload a file"
            ]);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = \Validator::make($request->all(), [
            'csv' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => 'validation',
                'message' => $validator->messages()->toArray()
            ]);
        }

        $path = $request->csv->getRealPath();
        if ($request->fileHeader) {
            Excel::import(new UsersImport, $path);
        } else {
            Excel::import(new UsersNoHeaders, $path);
        }
        return response()->json([
            'success' => 200,
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id, $range)
    {
        $employee = Employee::find($id);
        $lastFive = Employee::where('User', $employee->User)->orderBy('Date', "desc")->limit(5)->get();
        $averageScore = Employee::where('User', $employee->User)->avg('Duration');

        $period = '';
        if ($range == 1) {
            $period = 30;
            // echo $period;
            $start_date = Carbon::now()->startOfMonth()->subMonth();
            $end_date = Carbon::now()->endOfMonth()->subMonth();
        } else {
            $start_date = Carbon::now()->subWeek()->startOfWeek();
            $end_date = Carbon::now()->subWeek()->endOfWeek();
        }


        $averageScoreByRange = Employee::where('User', $employee->User)
                ->where('Date', '>', $start_date)
                ->where('Date', '<', $end_date)
                ->avg('Duration');

        $totalCallDurationByRange = Employee::where('User', $employee->User)
            ->where('Date', '>', $start_date)
            ->where('Date', '<', $end_date)
            ->sum('Duration');

        return response()->json([
            'success' => 200,
            'employee' => $employee->User,
            'lastFive' => $lastFive,
            'averagescore' => $averageScore,
            'range' => $range,
            'averageScoreByRange' => $averageScoreByRange,
            'totalCallDurationByRange' => $totalCallDurationByRange,
        ]);
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
