<?php

namespace App\Scripts;

use App\Actions\CalculateRatings;
use App\Actions\CalculateReputation;
use App\Actions\MacroMetadata;
use App\Attributes\Script;
use App\Models\System\User;
use App\Notifications\Announcement;
use Illuminate\Support\Facades\Notification;

#[Script]
class AssortedScripts
{
    #[Script(
        title: 'Mass Notify',
        description: 'WARNING: Sends a notification to EVERY USER!',
        permissions: ['role:admin'],
    )]
    public static function announce(
        #[Script(title: 'Message')]
        string $message,
        #[Script(title: 'Link', description: 'URL when notification is clicked')]
        ?string $link
    ): void
    {
        Notification::send(User::all(), new Announcement($message, $link));
    }

    #[Script(
        title: 'Recalculate Ratings',
        description: 'Runs the level rating calculation for all levels site-wide',
        permissions: ['role:admin'],
    )]
    public static function ratings(): void
    {
        CalculateRatings::all();
        CalculateRatings::rankings(true);
    }

    #[Script(
        title: 'Recalculate Reputations',
        description: 'Recount reputation scores for all users',
        permissions: ['role:admin'],
    )]
    public static function reputations(): void
    {
        CalculateReputation::all();
    }

    #[Script(
        title: 'Update Macros',
        description: 'imma be real i forgot what this one does...',
        permissions: ['role:admin'],
    )]
    public static function macros(): void
    {
        MacroMetadata::all();
    }
}
