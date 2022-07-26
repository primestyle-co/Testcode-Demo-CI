<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use App\Models\Post;

class PostController extends Controller
{
    /**
     * Show the confirm password view.
     *
     * @return \Illuminate\View\View
     */
    public function index(Request $request)
    {
        $posts = Post::with('user');
        if ($request->title) {
            $posts->where('title', 'like', '%' . $request->title . '%');
        }
        if ($request->author) {
            $posts->whereHas('user', function ( $query) use ($request) {
                $query->where('name', 'like', '%' . $request->author .'%');
            });
        }
        if ($request->sort_field) {
            $posts->orderBy($request->sort_field, $request->sort_direction);
        }
        $posts->orderBy('id', 'desc');
        return response()->json([
            'posts' => $posts->paginate(10),
        ]);
    }

    /**
     * Confirm the user's password.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return mixed
     */
    public function create(Request $request)
    {
        $request->validate([
            'title' => ['required'],
            'content' => ['required']
        ]);
        $post = new Post;
        $post->title = $request->title;
        $post->content = $request->content;
        $post->created_by = Auth::user()->id;
        $post->save();

        return response()->json([
            'status' => 'ok',
            'post' => $post,
        ]);
    }

    /**
     * Confirm the user's password.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return mixed
     */
    public function store(Request $request, $id)
    {
        $request->validate([
            'title' => ['required'],
            'content' => ['required']
        ]);
        $post = Post::where(['id' => $id, 'created_by' => Auth::user()->id])->firstOrFail();
        $post->title = $request->title;
        $post->content = $request->content;
        $post->save();

        return response()->json([
            'status' => 'ok',
            'post' => $post,
        ]);
    }

    /**
     * Confirm the user's password.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return mixed
     */
    public function detail(Request $request, $id)
    {
        return response()->json([
            'status' => 'ok',
            'post' => Post::findOrFail($id),
        ]);
    }

    public function delete(Request $request, $id)
    {
        $post =  Post::where(['id' => $id, 'created_by' => Auth::user()->id])->firstOrFail();
        $post->title = $request->title;
        $post->content = $request->content;
        $post->delete();

        return response()->json([
            'status' => 'ok'
        ]);
    }

}
