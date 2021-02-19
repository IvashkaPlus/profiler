<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;


class CardController extends Controller
{
    public function viewCards(){
        return view('index');
    }

    public function getCards(Request $request){
        $path = storage_path() . "\data.json";
        $json = json_decode(file_get_contents($path), true);
        $current_page = LengthAwarePaginator::resolveCurrentPage();
//        dd($json);
        $per_page = 4;
        $data_collection = new Collection($json);
        $page_data = array_slice($json, ($current_page - 1) * $per_page, $per_page);
//        $page_data = $data_collection->slice(($current_page - 1) * $per_page, $per_page)->all();

        $info = new LengthAwarePaginator($page_data, count($data_collection), $per_page);

//        if ($info->currentPage() > 1){
//            $data_array = get_object_vars($info->items());
//            $data_array = $info ->items();
//            dd(gettype($data_array));
//        } else {
//            $data_array = $info ->items();
//        }
//        dd($info->items());

        return $info;
    }


}
