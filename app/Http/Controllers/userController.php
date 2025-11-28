<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
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
                404
            );
        }

        $data = $users->map(function ($user) {
            return [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'phone' => $user->phone,
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
            'phone' => 'required|string|max:15',
            'password' => 'required|string|max:255',
            'role' => 'in:admin,agent,client',
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
            'phone' => $request->phone,
            'password' => Hash::make($request->password),
            'role' => $request->role,
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

    public function show($id)
    {
        $user = User::find($id);

        if (!$user) {
            $data = [
                'message' => 'User not found',
                'status' => 404,
            ];
            return response($data, 404);
        }

        $data = [
            'user' => $user,
            'status' => 200,
        ];

        return response($data, 200);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error to validate data',
                'errors' => $validator->errors(),
                'status' => 400,
            ], 400);
        }

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json([
                'message' => 'User not found',
                'status' => 404,
            ], 404);
        }

        if (!Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Invalid password',
                'status' => 401,
            ], 401);
        }

        return response()->json([
            'message' => 'Login success',
            'user' => $user,
            'status' => 200,
        ], 200);
    }

    public function destroy($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response([
                'message' => 'User not found',
                'status' => 404,
            ], 404);
        }

        Ticket::where('user_id', $id)->delete();
        $user->delete();

        return response([
            'message' => 'User deleted',
            'status' => 200,
        ], 200);
    }


}
