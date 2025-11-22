<?php

use App\Http\Controllers\userController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get("/GASW", [userController::class, 'index']);

Route::post("/user", [userController::class, 'store']);
