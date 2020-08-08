<?php

namespace App\Imports;

use App\Employee;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithStartRow;

class UsersImport implements ToModel, WithStartRow
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function startRow(): int
    {
        return 2;
    }
    public function model(array $row) {

        return new Employee([
            "User" => $row[0],
            "Client" => $row[1],
            "Client_type" => $row[2],
            "Date" => $row[3],
            "Duration" => $row[4],
            "Type_of_call" => $row[5],
            "External_call_score" => $row[6],
        ]);
    }
}
