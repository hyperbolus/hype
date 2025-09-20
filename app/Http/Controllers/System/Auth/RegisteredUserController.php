<?php

namespace App\Http\Controllers\System\Auth;

use App\Models\IP;
use App\Models\System\User;
use App\Providers\RouteServiceProvider;
use App\Rules\AllowedUserNamespace;
use App\Security;
use App\Hype;
use Illuminate\Contracts\Support\Responsable;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Str;
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
        if (IP::query()->where('address', $request->ip())->get()->count() > 0) throw ValidationException::withMessages(['name' => 'Account registration is temporarily disabled']);
        if (Security::isProxy($request->ip())) throw ValidationException::withMessages(['name' => 'Account registration is temporarily disabled']);

        Validator::make($request->all(), [
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users', 'indisposable'],
            'name' => ['required', 'string', 'min:3', 'max:24', 'unique:users', 'regex:/^[a-zA-Z0-9_]*$/', new AllowedUserNamespace],
            'password' => Hype::passwordRules(),
            'terms' => ['required', 'accepted'],
            'agecheck' => ['required', 'accepted'],
        ], [
            'name.regex' => 'Usernames must be alphanumeric (no spaces or symbols except underscores)',
        ])->validate();

        if (Cookie::has('referrer_id')) $referrer_id = Cookie::get('referrer_id');
        if ($request->has('referrer_id')) $referrer_id = $request->integer('referrer_id');
        // TODO: check referrer exists

        $user = User::create([
            'email' => request('email'),
            'name' => request('name'),
            'password' => Hash::make(request('password')),
            'referrer_id' => $referrer_id ?? null,
        ]);

        $banned_ids = [42, 44, 50, 69, 314, 420, 666, 777, 1312, 1488, 1337, 2865];

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
