<?php

namespace App\Http\Controllers\API;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Event as Event;


class EventController extends Controller
{
    public function GetEvents(Request $request) {
        $data = Event::orderBy('date','asc')->get();
        return response()->json(['events' => $data], 200);
    } 

    public function AddEvents(Request $request) {
        Event::truncate();
        $req = $request->all();
        $events = Event::insert($req);
        $data = ['Message' => "Success", "Events" => $events];

        return response()->json(["Msg" => "Success"], 200);
    } 

}
