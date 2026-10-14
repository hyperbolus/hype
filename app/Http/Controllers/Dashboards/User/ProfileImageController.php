<?php

namespace App\Http\Controllers\Dashboards\User;

use App\Models\System\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Intervention\Image\ImageManager;

class ProfileImageController extends Controller
{
    protected array $types = ['avatar', 'banner'];

    public function store(Request $request): RedirectResponse
    {
        /**
         * @type User $user
         */
        $user = $request->user();
        $disk = Storage::disk('contabo');
        $key = $request->string('kind') . '_url';
        $url = $user->getAttribute($key);

        $types = $this->types;
        if ($user->isPremium()) $types[] = 'postbit';

        $request->validate([
            'kind' => ['required', Rule::in($types)],
            'coordinates' => ['required'],
            'coordinates.height' => ['required', 'numeric', 'min:1'],
            'coordinates.width' => ['required', 'numeric', 'min:1'],
            'coordinates.top' => ['required', 'numeric', 'min:0'],
            'coordinates.left' => ['required', 'numeric', 'min:0'],
            'image' => ['required', 'mimes:jpeg,jpg,png,webp,gif', 'max:3000'],
        ]);

        $file = $request->file('image');
        $path = 'avatars/'.$file->hashName();

        [$w, $h] = getimagesize($file->getRealPath()) ?: [0, 0];
        if ($w < 1 || $h < 1) invalid('image', 'Image is invalid');
        if ($w * $h > 3000 * 3000) invalid('image', 'Image is too big');

        $img = ImageManager::imagick()->read($file);

        if ($img->isAnimated()) {
            // memory safeguard
            if (count($img) > 350) invalid('image', 'Image has too many frames (max 350)');
        }

        // server-side cropping and re-encoding
        // get full image size
        $w = $img->width();
        $h = $img->height();

        // Round, then clamp the box inside the image
        $x = min($request->integer('coordinates.left'), $w - 1);
        $y = min($request->integer('coordinates.top'),  $h - 1);

        // get cropped size, clamp max bc max x & y raise the lower bound/reduce remaining size
        $w = clamp($request->integer('coordinates.width'), 1, $w - $x);
        $h = clamp($request->integer('coordinates.height'), 1, $h - $y);

        if ($request->string('kind') == 'avatar') {
            // force square
            $size = min($w, $h);
            $img->crop($size, $size, $x, $y)->resize(250, 250);
        } else {
            $img->crop($w, $h, $x, $y);
        }

        if ($img->isAnimated() && $user->isPremium()) {
            $img = $img->toGif();
        } else {
            $img = $img->toJpeg(80);
        }

        // Save new image to disk
        $disk->put($path, $img, 'public');

        // Delete old image if no other occurrences
        if (User::query()->where($key, $url)->count() === 0) $disk->delete(parse_url($url, PHP_URL_PATH));

        // Update url in database
        $user->setAttribute($key, config('app.storage_url') . $path);
        $user->save();

        return redirect()->route('settings.profile');
    }

    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            // you can always delete
            'kind' => ['required', Rule::in(['postbit', ...$this->types])],
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

        return redirect()->route('settings.profile');
    }
}
