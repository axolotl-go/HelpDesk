<?php

use App\Http\Controllers\ticketController;
use App\Http\Controllers\userController;
use Illuminate\Support\Facades\Route;


// Users
Route::get("/users", [userController::class, 'index']);
Route::get('user/{id}', [userController::class, 'show']);
Route::post("/user", [userController::class, 'store']);
Route::put('/user/{id}', [userController::class, 'update']);
Route::delete("/user/{id}", [userController::class, 'destroy']);

// login
Route::post("/login", [userController::class, 'login']);

// Tickets
Route::get("/tickets", [ticketController::class, 'index']);
Route::get("/ticket/{id}", [ticketController::class, 'show']);
Route::post("/getTicketsByRole", [ticketController::class, 'getTicketsByRole']);
Route::post("/ticket", [ticketController::class, 'store']);
Route::put("/ticket/{id}", [ticketController::class, 'update']);
Route::delete("/ticket/{id}", [ticketController::class, 'destroy']);

// graph
Route::get("/graph", [userController::class, 'graphTickets']);
