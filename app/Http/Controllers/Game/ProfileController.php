<?php

namespace App\Http\Controllers\Game;

use App\Actions\Hydrate;
use App\Http\Controllers\Controller;
use App\Models\Game\Profile;
use Illuminate\Contracts\Support\Responsable;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function index(): Responsable
    {
        return page('Profiles/Index', [
            'profiles' => Profile::query()->whereNotNull('id')->paginate(),
        ])->meta('Profiles', 'Explore in-game user profiles');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Inertia\Response
     */
    public function create(): \Inertia\Response
    {
        return Inertia::render('Profiles/Create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  Request  $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        $res = explode(':', Http::asForm()->withHeaders([
            'User-Agent' => '',
        ])->post('http://www.boomlings.com/database/getGJUsers20.php', [
            'secret' => 'Wmfd2893gb7',
            'str' => request('username'),
        ]));

        if ($res[0] == '-1') {
            return response()->json(['status' => 'failed', 'reason' => 'GD account not found!']);
        }

        $user_id = $res[3];
        if ($profile = Profile::where('owner_id', '=', $user_id)->first()) {
            if ($profile->owner_id) {
                return response()->json(['status' => 'failed', 'reason' => 'Account already linked!']);
            }
        }

        $res = Http::asForm()->withHeaders([
            'User-Agent' => '',
        ])->post('http://www.boomlings.com/database/accounts/loginGJAccount.php', [
            'udid' => $user_id,
            'userName' => request('username'),
            'password' => request('password'),
            'secret' => 'Wmfv3899gc9',
        ]);

        if ($res == '-1') {
            return response()->json(['status' => 'failed', 'reason' => 'Incorrect credentials!']);
        } else {
            $profile = new Profile();
            $profile->name = request('username');
            $profile->account_id = explode(',', $res)[0];
            $profile->user_id = explode(',', $res)[1];
            $profile->owner_id = request('user');
            $profile->save();

            return response()->json(['status' => 'success']);
        }
    }

    public function show(string $name): Responsable
    {
        $profile = Hydrate::profile($name);

        return page('Profiles/Show', [
            'profile' => $profile
        ])->meta($profile->username, 'View ' . $profile->username . '\'s profile')
            ->breadcrumbs([
                crumb('Profiles', route('profiles.index'))
            ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  Profile  $profile
     * @return \Inertia\Response
     */
    public function edit(Profile $profile): \Inertia\Response
    {
        return Inertia::render('Beta/Settings/Profile', [
            'profile' => $profile,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Request  $request
     * @param  Profile  $profile
     */
    public function update(Request $request)
    {
        //$profile = Profile::whereName($request->input('profile_name'));
        $profile = $request->user()->accounts[0];
        $profile->update($request->except(['plus_avatar', 'plus_background', 'profile_name']));
        //$profile->fill($request->all());

        return $request->wantsJson()
            ? new JsonResponse('', 200)
            : back()->with('status', 'gd_profile-updated');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  Profile  $profile
     * @return RedirectResponse
     */
    public function destroy(Profile $profile): RedirectResponse
    {
        $profile->delete();

        return redirect()->route('proxy::profile.index');
    }
}
