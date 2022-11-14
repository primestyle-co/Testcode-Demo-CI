<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Feedback;

class FeedbackController extends Controller
{
    public function create()
    {   
        return view('create');
    }
    public function store(Request $request){
        $path = $request->file('feedback')->store('feedback', 's3');
        return view('quicksight');
    }
    public function show(){

    }
}
