<?php

namespace App\Http\Controllers;

use App\Models\Media;
use Hashids\Hashids;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Storage;

class DownloadController extends Controller
{
    public function __invoke(string $id)//: Response|RedirectResponse
    {
        $hashids = new Hashids(bin2hex(Crypt::getKey()), 8);
        $result = $hashids->decode($id);

        if (!$result) abort(400);

        $media = Media::query()->findOrFail($result[0]);

        dispatch(function () use ($media) {
            $media->downloads++;
            $media->timestamps = false;
            $media->save();
        })->afterResponse();

        $object_url = Storage::disk('contabo')->temporaryUrl($media->path, now()->addMinutes(5), [
            'ResponseContentDisposition' => 'attachment;filename=' . $media->filename
        ]);

        if (request()->string('__PROXY')->toString() === 'THIS_IS_A_TEMPORARY_SOLUTION') {
            return response(Storage::disk('contabo')->get($media->path), 200, $headers = [
                'Content-type'        => 'application/octet-stream',
                'Content-Disposition' => 'attachment; filename="' . $media->filename . '"',
            ]);
        }

        return redirect($object_url);
    }
}
