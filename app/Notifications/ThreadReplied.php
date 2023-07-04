<?php

namespace App\Notifications;

use App\Models\Content\Post;
use App\Models\Content\Thread;
use App\Models\System\User;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ThreadReplied extends Notification
{
    use Queueable;

    protected Thread $thread;

    protected Post $post;

    protected User $user;

    protected bool $email;

    /**
     * Create a new notification instance.
     */
    public function __construct(Thread $thread, Post $post, User $user, bool $email)
    {
        $this->thread = $thread;
        $this->post = $post;
        $this->user = $user;
        $this->email = $email;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        $array = ['database'];
        if ($this->email) {
            $array[] = 'mail';
        }
        return $array;
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('New reply to watched thread')
            ->line("{$this->user->name} replied to the thread \"{$this->thread->title}\"")
            ->action('Check it Out', route('posts.show', $this->post->id));
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'message' => "{$this->user->name} replied to watched thread",
            'link' => route('posts.show', $this->post->id),
        ];
    }
}
