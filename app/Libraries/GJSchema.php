<?php

namespace App\Libraries;

class GJSchema
{
    public static array $level = [
        1 => 'id',
        2 => 'name',
        3 => 'description',
        4 => 'level_string',
        5 => 'version',
        6 => 'player_id',
        8 => 'difficulty_denominator',
        9 => 'difficulty_numerator',
        10 => 'downloads',
        11 => 'set_completes',
        12 => 'official_song',
        13 => 'game_version',
        14 => 'likes', // likes - dislikes
        15 => 'length', // 0-4 0 = tiny, 4 = XL
        16 => 'dislikes', // dislikes - likes
        17 => 'demon', // bool
        18 => 'stars',
        19 => 'feature_score',
        25 => 'auto', // if level is auto
        26 => 'record_string',
        27 => 'password', // encrypted string XOR 26364
        28 => 'upload_date',
        29 => 'update_date',
        30 => 'copied_id', // original level ID if copied
        31 => 'two_player', // bool, if dual uses separate controls
        35 => 'custom_song_id', // Newgrounds song ID
        36 => 'extra_string',
        37 => 'coins', // coin count
        38 => 'verified_coins', // if user coins are silver (instead of bronze)
        39 => 'stars_requested',
        40 => 'lowDetailMode', // includes a LDM checkbox
        41 => 'daily_number', // subtract 100k if weekly
        42 => 'epic', // integer, not bool
        43 => 'demon_difficulty', // 3 = easy, 4 = medium, 0 = hard, 5 = insane, 6 = extreme
        44 => 'isGauntlet',
        45 => 'objects', // caps at 65535
        46 => 'editor_time', // number of seconds on current copy of level
        47 => 'editor_time_copies', // cumulative seconds on previous copies
        48 => 'settings_string',
    ];

    public static array $object = [
        1 => 'id',
        2 => 'x',
        3 => 'y',
        4 => 'flipped_x',
        5 => 'flipped_y',
        6 => 'rotation',
        7 => 'red',
        8 => 'green',
        9 => 'blue',
        10 => '',
        12 => '',
        13 => '',
        14 => '',
        11 => '',
        11 => '',
        11 => '',
        11 => '',
        11 => '',
        11 => '',
        11 => '',
        11 => '',
        11 => '',
        11 => '',
        11 => '',
        11 => '',
        11 => '',
        11 => '',
        11 => '',
        11 => '',
        11 => '',
        11 => '',
        11 => '',
        11 => '',
        11 => '',
        11 => '',
        11 => '',
        11 => '',
        11 => '',
        11 => '',
        11 => '',
        11 => '',
        11 => '',
        11 => '',
        11 => '',
        11 => '',
        11 => '',
        11 => '',
        11 => '',
        11 => '',
        11 => '',
        11 => '',
        11 => '',
        11 => '',
        11 => '',
        11 => '',
        11 => '',
        11 => '',
        11 => '',
        11 => '',
        11 => '',
        11 => '',
    ];
}
