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
        $per_page = 4;
        $data_collection = new Collection($json);
        $page_data = array_slice($json, ($current_page - 1) * $per_page, $per_page);
        $info = new LengthAwarePaginator($page_data, count($data_collection), $per_page);


        return $info;
    }

    public function getCard(string $id){
        $path = storage_path() . "\data.json";
        $json = json_decode(file_get_contents($path), true);
        for($i = 0; $i < count($json); $i++){
            if($json[$i]['ObjectID']['$oid'] == $id){
                return view('card', ['card' => $json[$i]]);
            }
        }
        return abort(404);
    }


}
