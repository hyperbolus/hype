<?php

namespace App\Http\Controllers\Dashboard;

use App\Models\System\User;
use App\Hype;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Validation\Rule;

class ProfileInformationController extends Controller
{
    public function update(Request $request): RedirectResponse
    {
        /**
         * @type User $user
         */
        $user = $request->user();

        $user->update($request->validate([
            'pronouns' => ['string', 'max:32'],
            'pronouns_visibility' => ['integer', Rule::in([0, 1])],

            'flag' => [Rule::in(array_merge(...Hype::$flags))],

            'location' => ['string', 'max:32'],
            'location_visibility' => ['integer', Rule::in([0, 1])],

            'birthday' => ['date'],
            'birthday_visibility' => ['integer', Rule::in([0, 1])],

            'bio' => ['string', 'max:2000'],

            'signature' => ['string', 'max:200'],
            'signature_visibility' => ['integer', Rule::in([0, 1])],
        ]));

        $user->pronouns = $request->string('pronouns');
        $user->pronouns_visibility = $request->boolean('pronouns_visibility');

        $user->flag = $request->string('flag');

        $user->location = $request->string('location');
        $user->location_visibility = $request->boolean('location_visibility');

        $user->birthday = $request->string('birthday');
        $user->birthday_visibility = $request->boolean('birthday_visibility');

        $user->bio = $request->string('bio');

        $user->signature = $request->string('signature');
        $user->signature_visibility = $request->boolean('signature_visibility');

        return back();
    }
}
