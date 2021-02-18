<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CardController extends Controller
{
    public function viewCards(){
        return view('index');
    }

    public function getCards(Request $request){

    }
}
