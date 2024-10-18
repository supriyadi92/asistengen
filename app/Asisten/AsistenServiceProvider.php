<?php

namespace Asisten\Generator;

use Illuminate\Support\ServiceProvider;
use Asisten\Generator\Commands\AsistenGeneratorCommand;
use Asisten\Generator\Commands\AsistenCrudGenerator;

class AsistenServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        $this->registerCommands();
    }

    private function registerCommands()
    {
        if (!$this->app->runningInConsole()) {
            return;
        }

        $this->commands([
            AsistenGeneratorCommand::class,
            AsistenCrudGenerator::class,
        ]);
    }
}
