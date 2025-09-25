<?php

namespace App\Http\Controllers\Dashboard;

use App\Models\System\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Intervention\Image\Facades\Image;

class ProfileImageController extends Controller
{
    protected array $types = ['avatar', 'banner', 'postbit'];

    public function store(Request $request): RedirectResponse
    {
        /**
         * @type User $user
         */
        $user = $request->user();
        $disk = Storage::disk('contabo');
        $key = $request->string('kind') . '_url';
        $url = $user->getAttribute($key);

        $request->validate([
            'kind' => ['required', Rule::in($this->types)],
            'image' => ['required', 'mimes:jpeg,jpg,png,webp,gif', 'max:3000'],
        ]);

        $file = $request->file('image');
        $img = Image::make($file);

        // Server-side cropping and re-encoding
        if ($request->string('kind') == 'avatar') {
            $min = min($img->getWidth(), $img->getHeight());
            $img->resizeCanvas($min, $min)->resize(250, 250);
        }

        // Save new image to disk
        $path = 'avatars/'.$file->hashName();
        $disk->put($path, $img->stream()->detach(), 'public');

        // Delete old image if no other occurrences
        if (User::query()->where($key, $url)->count() === 0) $disk->delete(parse_url($url, PHP_URL_PATH));

        // Update url in database
        $user->setAttribute($key, config('app.storage_url') . $path);
        $user->save();

        return back();
    }

    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'kind' => ['required', Rule::in($this->types)],
        ]);

        /**
         * @type User $user
         */
        $user = $request->user();
        $key = $request->string('kind') . '_url';
        $url = $user->getAttribute($key);

        if (User::query()->where($key, $url)->count() === 0) Storage::disk('contabo')->delete(parse_url($url, PHP_URL_PATH));

        $user->setAttribute($key, null);
        $user->save();

        return back();
    }
}
