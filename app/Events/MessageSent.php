<?php

namespace App\Events;

use App\Models\System\Message;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MessageSent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public array $message;

    /**
     * Create a new event instance.
     */
    public function __construct(public int $user_id, Message $message)
    {
        $this->message = [
            'id' => $message->id,
            'body' => $message->body,
            // read_at only if public enabled
            'sender_id' => $message->sender_id,
            'recipient_id' => $message->recipient_id,
            'updated_at' => $message->updated_at,
            'created_at' => $message->created_at,
        ];
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('conversations.' . $this->user_id),
        ];
    }
}
