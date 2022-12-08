<?php

namespace App\Http\Controllers\Auth;

use App\Models\System\User;
use App\Providers\RouteServiceProvider;
use App\Yggdrasil;
use Illuminate\Auth\Events\Registered;
use Illuminate\Contracts\Auth\StatefulGuard;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;
use function event;
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
     * @param StatefulGuard $guard
     * @return void
     */
    public function __construct(StatefulGuard $guard)
    {
        $this->guard = $guard;
    }

    /**
     * Show the registration view.
     *
     * @return Response
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Create a new registered user.
     *
     * @param Request $request
     * @return JsonResponse|RedirectResponse
     * @throws ValidationException
     */
    public function store(Request $request): JsonResponse|RedirectResponse
    {
        Validator::make($request->all(), [
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'name' => ['required', 'string', 'max:32', 'unique:users', 'regex:/^[a-zA-Z0-9_]*$/'],
            'password' => Yggdrasil::passwordRules(),
            'terms' => ['required', 'accepted'],
        ],
        [
            'name.regex' => 'Usernames must be alphanumeric (no spaces or symbols except underscores)'
        ])->validate();

        $user = User::create([
            'email' => request('email'),
            'name' => request('name'),
            'password' => Hash::make(request('password')),
        ]);

        $banned_ids = [
            42, 69, 420, 666, 777, 1312, 1488, 1337, 2865
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
