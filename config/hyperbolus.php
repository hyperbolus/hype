<?php

return [
    'morph_map' => [
        1 => \App\Models\System\User::class,
        11 => \App\Models\Content\Tag::class,
        21 => \App\Models\Content\Post::class,
        22 => \App\Models\Content\Thread::class,

        40 => \App\Models\Game\Level::class,
        41 => \App\Models\Game\LevelReplay::class,
    ],
    'named_morph_map' => [
        'user' => 1,
        'tag' => 11,
        'post' => 21,
        'thread' => 22,

        'level' => 40,
        'replay' => 41,
    ],

    'patreon_token' => env('PATREON_TOKEN'),

    'report_reasons' => [
        0 => [
            'title' => 'Other (Please Explain)',
            'description' => '',
            'category' => 'legal',
            'priority' => 0
        ],
        // Legal
        10 => [
            'title' => 'Other Illegal Content',
            'description' => 'Any illegal content that does not fall in the following categories. Please be specific about how the content is harmful.',
            'category' => 'legal',
            'priority' => 0
        ],
        11 => [
            'title' => 'Child Sexual Abuse Material',
            'description' => 'Illegal, abusive, or sexual content involving minors.',
            'category' => 'legal',
            'priority' => 0
        ],
        13 => [
            'title' => 'Copyrighted Content / DMCA Takedown Notice',
            'description' => 'Report copyrighted content',
            'category' => 'legal',
            'priority' => 0
        ],
        14 => [
            'title' => 'Doxxing / Information Disclosure',
            'description' => 'The content releases real life private information about an individual or group such as a name, ip, address or location without that person\'s permission.',
            'category' => 'legal',
            'priority' => 0
        ],
        15 => [
            'title' => 'Threats',
            'description' => 'The content makes real threats against someone',
            'category' => 'legal',
            'priority' => 0
        ],
        // Incorrect Content
        20 => [
            'title' => 'Other Incorrect Content',
            'description' => 'If the content you are reporting does not belong',
            'category' => 'incorrect',
            'priority' => 0
        ],
        21 => [
            'title' => 'Incorrect Metadata',
            'description' => 'Associated data such as tags are incorrect. If this is crowd-sourced content you can simply vote against it. Do not report it.',
            'category' => 'incorrect',
            'priority' => 0
        ],
        22 => [
            'title' => 'Wrong Section',
            'description' => 'The content you are reporting belongs somewhere, just not here.',
            'category' => 'incorrect',
            'priority' => 0
        ],
        22 => [
            'title' => 'Duplicate',
            'description' => 'This content is an exact duplicate of another',
            'category' => 'incorrect',
            'priority' => 0
        ],
        // Behavior
        30 => [
            'title' => 'Toxic Language or Behavior',
            'description' => 'Racism, transphobia, sexism, inappropriate content, or other harmful speech.',
            'category' => 'behavior',
            'priority' => 0
        ],
        31 => [
            'title' => 'Violent or Graphic Content',
            'description' => 'NSFL or otherwise very unpleasant content. Only applies to media such as images and video.',
            'category' => 'behavior',
            'priority' => 0
        ],
        32 => [
            'title' => 'Spam',
            'description' => 'Useless content that serves no purpose, is disruptive, or repetitive',
            'category' => 'behavior',
            'priority' => 0
        ],
        33 => [
            'title' => 'Advertising',
            'description' => 'This content promotes something and is not naturally integrated into the post. (It\'s out of nowhere)',
            'category' => 'behavior',
            'priority' => 0
        ],
        34 => [
            'title' => 'Malicious Content (Scam/Phishing/Malware)',
            'description' => 'The content promotes a scam, or malicious software.',
            'category' => 'behavior',
            'priority' => 0
        ],
        35 => [
            'title' => 'Misleading or False Information',
            'description' => 'Someone spreading misinformation knowing that it is incorrect or unreliable.',
            'category' => 'behavior',
            'priority' => 0
        ],
        36 => [
            'title' => 'Impersonation/Fake Account',
            'description' => 'If someone is intentionally misrepresenting their identity. You must provide examples on-site of misrepresentation and a link to who they are impersonating',
            'category' => 'behavior',
            'priority' => 0
        ]
    ]
];
