<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ticketController
{
    public function index()
    {
        $tickets = Ticket::all();
        return response($tickets);
    }

    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'description' => 'required',
            'status' => 'required|in:pending,completed',
            'user_id' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error to validate data',
                'errors' => $validator->errors(),
                'status' => 400,
            ], 400);
        }

        $ticket = Ticket::create([
            'title' => $request->title,
            'description' => $request->description,
            'status' => $request->status,
            'user_id' => $request->user_id,
        ]);

        return response($ticket, 201);
    }

    public function getTicketsByRole(Request $request)
    {
        $role = $request->role;
        $userId = $request->user_id;

        switch ($role) {

            case 'admin':
                $tickets = Ticket::all();
                return response([
                    'role' => 'admin',
                    'tickets' => $tickets,
                    'status' => 200
                ], 200);

            case 'client':
                $tickets = Ticket::where('user_id', $userId)->get();
                return response([
                    'role' => 'client',
                    'tickets' => $tickets,
                    'status' => 200
                ], 200);

            default:
                return response([
                    'message' => 'Invalid role',
                    'status' => 400
                ], 400);
        }
    }



    public function show($id)
    {
        $ticket = Ticket::find($id);
        $user = User::find($ticket->user_id);

        if (!$ticket || !$user) {
            return response()->json([
                'message' => 'Ticket not found',
                'status' => 404,
            ], 404);
        }

        $ticket->user = [
            'name' => $user->name,
            'email' => $user->email,
            'role' => $user->role,
        ];

        return response($ticket);
    }

    public function update(Request $request, $id)
    {
        $ticket = Ticket::find($id);

        if (!$ticket) {
            return response()->json([
                'message' => 'Ticket not found',
                'status' => 404,
            ], 404);
        }

        $ticket->update($request->all());

        return response($ticket, 200);
    }

    public function destroy($id)
    {
        $ticket = Ticket::find($id);

        if (!$ticket) {
            return response()->json([
                'message' => 'Ticket not found',
                'status' => 404,
            ], 404);
        }

        $ticket->delete();

        return response()->json([
            'message' => 'Ticket deleted',
            'status' => 200,
        ], 200);
    }
}
