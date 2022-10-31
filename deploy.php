<?php
namespace Deployer;

import('recipe/laravel.php');
import('contrib/rsync.php');

// Project name
set('application', getenv('CI_PROJECT_NAME'));
set('ssh_multiplexing', true); // Speed up deployment

set('rsync_src', function () {
    return __DIR__;
});

// Hosts
host('209.145.62.20') // Name of the server
->setRemoteUser('deployer') // SSH user
->setPort(22) // web host wants this port
->setIdentityFile('~/.ssh/gitlab')
    ->setDeployPath('/var/www/dashnet') // Deploy path
    ->set('labels', ['stage' => 'production']);

// Configuring the rsync exclusions.
// You'll want to exclude anything that you don't want on the production server.
add('rsync', [
    'exclude' => [
        '.git',
        '/.env',
        '/storage/',
        '/vendor/',
        '/node_modules/',
        '.gitlab-ci.yml',
        'deploy.php',
    ],
]);

// Tasks
task('build', function () {
    run('cd {{release_path}} && build');
});

// Set up a deployer task to copy secrets to the server.
// Since our secrets are stored in Gitlab, we can access them as env vars.
task('deploy:secrets', function () {
    file_put_contents(__DIR__ . '/.env', getenv('DOT_ENV'));
    upload('.env', get('deploy_path') . '/shared');
});

task('fix:folders', function () {
    run('mkdir -p {{deploy_path}}/shared/storage/framework ' .
        '{{deploy_path}}/shared/storage/framework/cache ' .
        '{{deploy_path}}/shared/storage/framework/sessions ' .
        '{{deploy_path}}/shared/storage/framework/views ' .
        '{{deploy_path}}/shared/storage/clockwork');
});

task('artisan:update', artisan('app:update'));

// [Optional] if deploy fails automatically unlock.
after('deploy:failed', 'deploy:unlock');

// Customize the deploy tasks a bit
desc('Deploy the application');
task('launch', [
    'deploy:info',
    'deploy:setup',
    'deploy:lock',
    'deploy:release',
    //'fix:folders',
    'rsync', // Deploy code & built assets
    //'deploy:secrets', // Deploy secrets
    'deploy:shared',
    'deploy:writable',
    'deploy:vendors',
    'artisan:storage:link', // |
    'artisan:view:cache',   // |
    'artisan:config:cache', // | Laravel specific steps
    'artisan:optimize',     // |
    'artisan:migrate',      // |
    'artisan:update',       // |
    'deploy:symlink',
    'deploy:unlock',
    'deploy:cleanup',
    'deploy:success',
]);
