<?php

namespace Deployer;

import('recipe/laravel.php');
import('contrib/rsync.php');

set('application', getenv('CI_PROJECT_NAME'));
set('ssh_multiplexing', true);

set('rsync_src', function () {
    return __DIR__;
});

host('209.145.62.20')
->setRemoteUser('deployer')
->setPort(22)
    ->setDeployPath('/var/www/dashnet')
    ->set('labels', ['stage' => 'production']);

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

// Tasks
task('build', function () {
    run('cd {{release_path}} && build');
});

task('deploy:secrets', function () {
    file_put_contents(__DIR__.'/.env', getenv('DOT_ENV'));
    upload('.env', get('deploy_path').'/shared');
});

task('fix:folders', function () {
    run('mkdir -p {{deploy_path}}/shared/storage/framework '.
        '{{deploy_path}}/shared/storage/framework/cache '.
        '{{deploy_path}}/shared/storage/framework/sessions '.
        '{{deploy_path}}/shared/storage/framework/views '.
        '{{deploy_path}}/shared/storage/clockwork');
});
set('writable_dirs', ['{{deploy_path}}/shared/storage/framework', '{{deploy_path}}/shared/storage/clockwork']); // ??????
task('artisan:update', artisan('app:update'));

after('deploy:failed', 'deploy:unlock');

desc('Runs the database migrations for tenants');
task('artisan:tenants:migrate', artisan('tenants:migrate --force', ['skipIfNoEnv']));

desc('Deploy the application');
task('launch', [
    'deploy:info',
    'deploy:setup',
    'deploy:lock',
    'deploy:release',
    //'fix:folders',
    'rsync', // Deploy code & built assets
    'deploy:secrets', // Deploy secrets
    'deploy:shared',
    'deploy:writable',
    'deploy:vendors',
    'artisan:storage:link',     // |
    'artisan:view:cache',       // |
    'artisan:config:cache',     // |
    'artisan:optimize',         // | Laravel specific steps
    'artisan:migrate',          // |
    'artisan:tenants:migrate',  // |
    //'artisan:update',         // |
    'deploy:symlink',
    'deploy:unlock',
    'deploy:cleanup',
    'deploy:success',
]);
