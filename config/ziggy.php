<?php

return [
    'except' => ['ignition.*'],
    'groups' => [
        'debug' => ['ignition.*'],
        'oauth2' => ['oauth2::*'],
        'admin' => ['admin::*'],
    ],
];
