<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class userController
{
    public function index()
    {
        $users = User::All();

        if ($users->isEmpty()) {
            return response()->json(
                ['message' => 'No hay usuarios'],
                200
            );
        }

        $data = $users->map(function ($user) {
            return [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
            ];
        });

        return response()->json(
            $data,
            200
        );
    }

    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email',
            'password' => 'required|string|max:255',
            'role' => 'required|in:admin,agent,client',
        ]);

        if ($validator->fails()) {
            $data = [
                'message' => 'Error to validate data',
                'error' => $validator->errors(),
                'status' => 400,
            ];
            return response($data, 400);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' =>  $request->role,
        ]);


        if (!$user) {
            $data = [
                'message' => 'Error to create user',
                'status' => 500,
            ];
            return response($data, 500);
        }

        $data = [
            'user' => $user,
            'status' => 201,
        ];

        return response($data, 201);
    }
}
