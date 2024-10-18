<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class AsistenGenerator extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'asisten:controller {name: nama table}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command untuk generate Controller';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        //
    }
}
