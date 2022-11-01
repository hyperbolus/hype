<?php

namespace App\Http\Controllers\Dashboard;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Intervention\Image\Facades\Image;

class DashboardController extends Controller
{
    public function __invoke(Request $request): RedirectResponse
    {
        $user = $request->user();
        switch ($request->string('action')) {
            case 'update password':
                $request->validate([
                    'current_password' => 'current_password',
                    'new_password' => ['required', 'confirmed', 'min:8'],
                ]);
                $user->password = Hash::make($request->input('new_password'));
                $user->save();
                break;
            case 'update email':
                $request->validate([
                    'email' => 'required|string|email|max:255|unique:users',
                    'password' => 'current_password',
                ]);
                $user->email = $request->input('email');
                $user->save();

                break;
            case 'update avatar':
                $request->validate([
                    'content' => 'mimes:jpeg,jpg,png,webp,gif|required|max:3000'
                ]);

                $file = $request->file('content');
                $img = Image::make($file);
                $min = min($img->getWidth(), $img->getHeight());
                $img->resizeCanvas($min, $min)->resize(250, 250);

                $disk = Storage::disk('contabo');
                $path = 'avatars/'.$file->hashName();
                $disk->put($path, $img->stream()->detach(), 'public');
                $old = $user->avatar_url;
                $user->avatar_url = config('filesystems.cdn') . $path;
                $user->save();
                if (User::whereAvatarUrl($old)->count() === 0) {
                    $disk->delete(substr($old, strlen(config('filesystems.cdn'))));
                }
                break;
            case 'update banner':
                $request->validate([
                    'content' => 'mimes:jpeg,jpg,png,webp,gif|required|max:5000'
                ]);
                $disk = Storage::disk('contabo');
                $old = $user->banner_url;
                $user->banner_url = config('filesystems.cdn') . $disk->putFile('avatars/', $request->file('content'), 'public');
                $user->save();
                if (User::whereBannerUrl($old)->count() === 0) {
                    $disk->delete(substr($old, strlen(config('filesystems.cdn'))));
                }
                break;
            case 'update bio':
                $user->bio = request('content');
                $user->save();
                break;
            case 'update signature':
                $user->signature = request('content');
                $user->save();
                break;
        }

        return back();
    }

    public function home(): Response
    {
        return Inertia::render('Dashboard/Home');
    }

    public function account(): Response
    {
        /**
         * @var User $user
         */
        $user = auth()->user();
        return Inertia::render('Dashboard/Account', [
            'profile' => $user->makeVisible(['email'])
        ]);
    }

    public function profile(): Response
    {
        $user = auth()->user();
        return Inertia::render('Dashboard/Profile', [
            'profile' => $user,
        ]);
    }
}
