<?php

namespace App;

use Illuminate\Support\Facades\Http;

class DiscoHookBuilder {
    public string $content;
    public string $title;
    public string $description;

    public function __construct(string $content, string $title, string $description, array $fields) {
        $this->content = $content;
        $this->title = $title;
        $this->description = $description;
    }

    // TODO: errors and warning logs for emergencies, with throttling function
    public function send(): void
    {
        Http::post(config('hyperbolus.staff_webhook_url'), [
            'content' => $this->content,
            'embeds' => [
                [
                    'title' => $this->title,
                    'description' => $this->description,
                    'color' => 12648430,
                    'author' => [
                        'name' => 'System'
                    ],
                    'fields' => [],
                    'footer' => [
                        'text' => config('app.env'),
                    ],
                    'timestamp' => now()
                ]
            ],
            'components' => []
        ]);
    }
}
