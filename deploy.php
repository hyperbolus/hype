<?php

namespace Deployer;

import('recipe/laravel.php');
import('contrib/rsync.php');
import('contrib/crontab.php');

set('application', getenv('CI_PROJECT_NAME'));
set('ssh_multiplexing', true);

set('rsync_src', fn () => __DIR__);

host('production')
    ->setHostname(getenv('CI_SSH_HOST'))
    ->setRemoteUser('deployer')
    ->setPort(getenv('CI_SSH_PORT'))
    ->setDeployPath('/var/www/hype')
    ->set('branch', 'main')
    ->setLabels(['environment' => 'production']);

host('staging')
    ->setHostname(getenv('CI_SSH_HOST'))
    ->setRemoteUser('deployer')
    ->setPort(getenv('CI_SSH_PORT'))
    ->setDeployPath('/var/www/hype-staging')
    ->set('branch', 'develop')
    ->setLabels(['environment' => 'staging']);

add('rsync', [
    'exclude' => [
        '.git',
        '/.env',
        '/storage/',
        '/vendor/',
        '/node_modules/',
        '.github',
        'deploy.php',
    ],
]);

task('deploy:secrets', function () {
    file_put_contents(__DIR__.'/.env', getenv('DOT_ENV'));
    upload('.env', get('deploy_path').'/shared');
});

set('writable_dirs', ['{{deploy_path}}/shared/storage/']);

desc('Update disposable email list');
task('artisan:disposable:update', artisan('disposable:update'));

desc('Update Cloudflare IP list');
task('artisan:cloudflare:reload', artisan('cloudflare:reload'));

after('deploy:failed', 'deploy:unlock');

desc('Runs the database migrations for tenants');
task('artisan:tenants:migrate', artisan('tenants:migrate --force', ['skipIfNoEnv']));

desc('Deploy the application');
task('deploy', [
    'deploy:info',
    'deploy:setup',
    'deploy:lock',
    'deploy:release',
    'rsync',
    'deploy:secrets',
    'deploy:shared',
    'deploy:writable',
    'deploy:vendors',

    'artisan:storage:link',
    'artisan:view:cache',
    'artisan:config:cache',
    'artisan:route:cache',
    'artisan:optimize',
    'artisan:migrate',
    'artisan:tenants:migrate',
    'artisan:disposable:update',
    'artisan:cloudflare:reload',

    'deploy:symlink',
    'deploy:unlock',
    'deploy:cleanup',
    'deploy:success',

    'cron',
]);

desc('Set cron jobs');
task('cron', function () {
    add('crontab:jobs', [
        '* * * * * cd {{deploy_path}} && {{bin/php}} artisan schedule:run >> /dev/null 2>&1',
    ]);
    set('crontab:identifier', 'are-'.get('labels')['env']);
});

after('cron', 'crontab:sync');

