<?php

use App\Http\Controllers\userController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


// Users
Route::get("/users", [userController::class, 'index']);

Route::Get('user/{id}', [userController::class, 'show']);

Route::post("/user", [userController::class, 'store']);

// login
Route::post("/login", [userController::class, 'login']);