<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;


class SPAController extends Controller
{
    public function index(Request $request) {
      $data['env'] = config('app.env');
      return response()
            ->view('index', $data);
    } 
}
