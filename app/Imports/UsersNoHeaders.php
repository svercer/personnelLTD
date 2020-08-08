<?php

namespace App\Imports;

use App\Employee;
use Maatwebsite\Excel\Concerns\ToModel;

class UsersNoHeaders implements ToModel
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new Employee([
            "User" => $row[0],
            "Client" => $row[1],
            "Client Type" => $row[2],
            "Date" => $row[3],
            "Duration" => $row[4],
            "Type of Call" => $row[5],
            "External Call Score" => $row[6],
        ]);
    }
}
