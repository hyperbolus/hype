<?php

namespace App\Http\Controllers\Dashboard;

use App\Models\System\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;
use Intervention\Image\Facades\Image;

class DashboardController extends Controller
{
    private array $flags = [
        ["DZ", "AO", "BJ", "BW", "BF", "BI", "CM", "CV", "CF", "TD", "CD", "DJ", "EG", "GQ", "ER", "ET", "GA", "GM", "GH", "GN", "GW", "CI", "KE", "LS", "LR", "LY", "MG", "MW", "ML", "MR", "MU", "YT", "MA", "MZ", "NA", "NE", "NG", "CG", "RE", "RW", "SH", "ST", "SN", "SC", "SL", "SO", "ZA", "SS", "SD", "SR", "SZ", "TG", "TN", "UG", "TZ", "EH", "YE", "ZM", "ZW"],
        ["AI", "AG", "AR", "AW", "BS", "BB", "BQ", "BZ", "BM", "BO", "VG", "BR", "CA", "KY", "CL", "CO", "KM", "CR", "CU", "CW", "DM", "DO", "EC", "SV", "FK", "GF", "GL", "GD", "GP", "GT", "GY", "HT", "HN", "JM", "MQ", "MX", "MS", "NI", "PA", "PY", "PE", "PR", "BL", "KN", "LC", "PM", "VC", "SX", "TT", "TC", "US", "VI", "UY", "VE"],
        ["AB", "AF", "AZ", "BD", "BT", "BN", "KH", "CN", "GE", "HK", "IN", "ID", "JP", "KZ", "LA", "MO", "MY", "MV", "MN", "MM", "NP", "KP", "MP", "PW", "PG", "PH", "SG", "KR", "LK", "TW", "TJ", "TH", "TL", "TM", "VN"],
        ["AX", "AL", "AD", "AM", "AT", "BY", "BE", "BA", "BG", "HR", "CY", "CZ", "DK", "EE", "FO", "FI", "FR", "DE", "GI", "GR", "GG", "HU", "IS", "IE", "IM", "IT", "JE", "XK", "LV", "LI", "LT", "LU", "MT", "MD", "MC", "ME", "NL", "MK", "NO", "PL", "PT", "RO", "RU", "SM", "RS", "SK", "SI", "ES", "SE", "CH", "TR", "UA", "GB", "VA"],
        ["BH", "IR", "IQ", "IL", "KW", "JO", "KG", "LB", "OM", "PK", "PS", "QA", "SA", "SY", "AE", "UZ"],
        ["AS", "AU", "CX", "CC", "CK", "FJ", "PF", "GU", "KI", "MH", "FM", "NC", "NZ", "NR", "NU", "NF", "WS", "SB", "TK", "TO", "TV", "VU", "WF"],
        ["EU", "JR"]
    ];

    public function __invoke(Request $request): RedirectResponse
    {
        /**
         * @type User $user
         */
        $user = auth()->user();
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
                $user->email_verified_at = null;
                $user->save();

                $user->sendEmailVerificationNotification();

                return redirect()->route('auth::verification.notice');

                break;
            case 'update avatar':
                $request->validate([
                    'content' => 'mimes:jpeg,jpg,png,webp,gif|required|max:3000',
                ]);

                $file = $request->file('content');
                $img = Image::make($file);
                $min = min($img->getWidth(), $img->getHeight());
                $img->resizeCanvas($min, $min)->resize(250, 250);

                $disk = Storage::disk('contabo');
                $path = 'avatars/'.$file->hashName();
                $disk->put($path, $img->stream()->detach(), 'public');
                $old = $user->avatar_url;
                $user->avatar_url = config('app.storage_url').$path;
                $user->save();
                if (User::whereAvatarUrl($old)->count() === 0) {
                    $disk->delete(substr($old, strlen(config('app.storage_url'))));
                }
                break;
            case 'update banner':
                $request->validate([
                    'content' => 'mimes:jpeg,jpg,png,webp,gif|required|max:5000',
                ]);
                $disk = Storage::disk('contabo');
                $old = $user->banner_url;
                $user->banner_url = config('app.storage_url').$disk->putFile('banners', $request->file('content'), 'public');
                $user->save();
                if (User::whereBannerUrl($old)->count() === 0) {
                    $disk->delete(substr($old, strlen(config('app.storage_url'))));
                }
                break;
            case 'update postbit':
                if (!$user->hasRole('admin')) break;
                $request->validate([
                    'content' => 'mimes:jpeg,jpg,png,webp,gif|required|max:5000',
                ]);
                $disk = Storage::disk('contabo');
                $old = $user->postbit_url;
                $user->postbit_url = config('app.storage_url').$disk->putFile('postbits', $request->file('content'), 'public');
                $user->save();
                if (User::wherePostbitUrl($old)->count() === 0) {
                    $disk->delete(substr($old, strlen(config('app.storage_url'))));
                }
                break;
            case 'update bio':
                $user->bio = request('content');
                $user->save();
                break;
            case 'update signature':
                $user->signature = request('content');
                $user->signature_visibility = $request->boolean('default_visibility');
                $user->save();
                break;
            case 'update flag':
                $request->validate([
                    // TODO: better way?
                   'content' => Rule::in([
                       ...$this->flags[0],
                       ...$this->flags[1],
                       ...$this->flags[2],
                       ...$this->flags[3],
                       ...$this->flags[4],
                       ...$this->flags[5],
                       ...$this->flags[6]
                   ])
                ]);
                $user->flag = $request->string('content');
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
            'profile' => $user->makeVisible(['email']),
        ]);
    }

    public function profile(): Response
    {
        $user = auth()->user();

        return Inertia::render('Dashboard/Profile', [
            'profile' => $user,
            'flags' => $this->flags,
        ]);
    }
}
