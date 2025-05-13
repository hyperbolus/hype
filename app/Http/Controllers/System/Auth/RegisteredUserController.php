<?php

namespace App\Http\Controllers\System\Auth;

use App\Models\IP;
use App\Models\System\User;
use App\Providers\RouteServiceProvider;
use App\Rules\AllowedUserNamespace;
use App\Yggdrasil;
use Illuminate\Contracts\Support\Responsable;
use Illuminate\Support\Facades\Cookie;
use function event;
use Illuminate\Auth\Events\Registered;
use Illuminate\Contracts\Auth\StatefulGuard;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use function redirect;
use function request;

class RegisteredUserController extends Controller
{
    /**
     * The guard implementation.
     *
     * @var StatefulGuard
     */
    protected StatefulGuard $guard;

    /**
     * Create a new controller instance.
     *
     * @param  StatefulGuard  $guard
     * @return void
     */
    public function __construct(StatefulGuard $guard)
    {
        $this->guard = $guard;
    }

    /**
     * Show the registration view.
     *
     * @return Responsable
     */
    public function create(): Responsable
    {
        $invite = '';
        $user = null;
        if (request()->has('invite')) {
            $user = User::find(request()->integer('invite'));
            if ($user !== null) {
                $invite = "\n\nYou've been invited by " . $user->name;
            }
        }

        return page('Auth/Register', [
            'invite' => request('invite'),
            'referrer' => $user
        ])->meta('Sign Up', 'Sign up for Hyperbolus, your source for everything Geometry Dash!' . $invite);
    }

    /**
     * Create a new registered user.
     *
     * @param  Request  $request
     * @return JsonResponse|RedirectResponse
     *
     * @throws ValidationException
     */
    public function store(Request $request): JsonResponse|RedirectResponse
    {
        Validator::make($request->all(), [
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users', 'indisposable'],
            'name' => ['required', 'string', 'min:3', 'max:24', 'unique:users', 'regex:/^[a-zA-Z0-9_]*$/', new AllowedUserNamespace],
            'password' => Yggdrasil::passwordRules(),
            'terms' => ['required', 'accepted'],
            'agecheck' => ['required', 'accepted'],
        ],
            [
                'name.regex' => 'Usernames must be alphanumeric (no spaces or symbols except underscores)',
            ])->validate();

        $ips = IP::query()->whereIn('address', $request->ips())->get();

        if (\Str::contains('wkgames', request('email')) || \Str::contains('wkgames', request('name'))) throw ValidationException::withMessages(['name' => 'Fuck off.']);

        if ($ips->count() > 0) throw ValidationException::withMessages(['name' => 'Making alt accounts is prohibited. If you think this is an error open a ticket on the Discord.']);

        // TODO: which takes priority? first visit or explicit registration invite?
        $referrer_id = request('invite');
        if (Cookie::has('referrer_id')) {
            $referrer_id = Cookie::get('referrer_id');
        }

        $user = User::create([
            'email' => request('email'),
            'name' => request('name'),
            'password' => Hash::make(request('password')),
            'referrer_id' => $referrer_id,
        ]);

        $banned_ids = [
            42, 44, 50, 69, 314, 420, 666, 777, 1312, 1488, 1337, 2865,
        ];

        while (in_array($user->id, $banned_ids, false)) {
            $user->id++;
            $user->save();
        }

        event(new Registered($user));

        $this->guard->login($user);

        return $request->wantsJson()
            ? new JsonResponse('', 201)
            : redirect()->intended(RouteServiceProvider::HOME);
    }
}
