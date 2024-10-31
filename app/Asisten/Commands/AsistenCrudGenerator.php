<?php

namespace Asisten\Generator\Commands;

use Exception;
use Illuminate\Contracts\Filesystem\FileNotFoundException;
use Illuminate\Support\Str;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use function Laravel\Prompts\select;

/**
 * Class CrudGenerator.
 *
 * @author  Awais <asargodha@gmail.com>
 */
class AsistenCrudGenerator extends GeneratorCommand
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'asisten:crud
                            {name : Table name}
                            {stack : The development stack that should be installed (bootstrap,tailwind,livewire,api)}
                            {--route= : Custom route name}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create Laravel CRUD operations';

    /**
     * Execute the console command.
     *
     * @throws FileNotFoundException
     */
    public function handle()
    {
        $this->info('Running Asisten Crud Generator ...');

        $this->table = $this->getNameInput();

        // If table not exist in DB return
        if (! $this->tableExists()) {
            $this->error("`$this->table` table not exist");

            return false;
        }

        // Build the class name from table name
        $this->name = $this->_buildClassName();

        // Generate the crud
        $this->buildOptions()
            ->buildController()
            ->buildModel()
            // ->buildVue();
            ->buildReactComponents()
            // ->buildViews();
            ->buildReactViews();
            // ->writeRoute();

        $this->info('Created Successfully.');

        return true;
    }

    protected function promptForMissingArgumentsUsing(): array
    {
        return [
            'stack' => fn() => select(
                label: 'Which stack would you like to install?',
                options: [
                    'bootstrap' => 'Blade with Bootstrap css',
                    'tailwind' => 'Blade with Tailwind css',
                    'livewire' => 'Livewire with Tailwind css',
                    'api' => 'API only',
                ],
                scroll: 4,
            ),
        ];
    }

    protected function afterPromptingForMissingArguments(InputInterface $input, OutputInterface $output): void
    {
        $this->options['stack'] = match ($input->getArgument('stack')) {
            'tailwind' => 'tailwind',
            'livewire' => 'livewire',
            'react' => 'react',
            'vue' => 'vue',
            default => 'bootstrap',
        };
    }

    protected function writeRoute(): static
    {
        $replacements = $this->buildReplacements();

        $this->info('Please add route below: i:e; web.php or api.php');

        $this->info('');

        $lines = match ($this->options['stack']) {
            'livewire' => [
                "Route::get('/{$this->_getRoute()}', \\$this->livewireNamespace\\{$replacements['{{modelNamePluralUpperCase}}']}\Index::class)->name('{$this->_getRoute()}.index');",
                "Route::get('/{$this->_getRoute()}/create', \\$this->livewireNamespace\\{$replacements['{{modelNamePluralUpperCase}}']}\Create::class)->name('{$this->_getRoute()}.create');",
                "Route::get('/{$this->_getRoute()}/show/{{$replacements['{{modelNameLowerCase}}']}}', \\$this->livewireNamespace\\{$replacements['{{modelNamePluralUpperCase}}']}\Show::class)->name('{$this->_getRoute()}.show');",
                "Route::get('/{$this->_getRoute()}/update/{{$replacements['{{modelNameLowerCase}}']}}', \\$this->livewireNamespace\\{$replacements['{{modelNamePluralUpperCase}}']}\Edit::class)->name('{$this->_getRoute()}.edit');",
            ],
            'api' => [
                "Route::apiResource('".$this->_getRoute()."', {$this->name}Controller::class);",
            ],
            default => [
                "Route::resource('".$this->_getRoute()."', {$this->name}Controller::class);",
            ]
        };

        foreach ($lines as $line) {
            $this->info('<bg=blue;fg=white>'.$line.'</>');
        }

        $this->info('');

        return $this;
    }

    /**
     * Build the Controller Class and save in app/Http/Controllers.
     *
     * @return $this
     * @throws FileNotFoundException
     */
    protected function buildController(): static
    {
        if ($this->options['stack'] == 'livewire') {
            $this->buildLivewire();

            return $this;
        }

        $controllerPath = $this->options['stack'] == 'api'
            ? $this->_getApiControllerPath($this->name)
            : $this->_getControllerPath($this->name);

        if ($this->files->exists($controllerPath) && $this->ask('Already exist Controller. Do you want overwrite (y/n)?', 'y') == 'n') {
            return $this;
        }

        $this->info('Creating Controller ...');

        $replace = array_merge($this->buildReplacements(), $this->modelReplacements()); //$this->buildReplacements();

        $stubFolder = match ($this->options['stack']) {
            'api' => 'api/',
            default => ''
        };

        $controllerTemplate = str_replace(
            array_keys($replace), array_values($replace), $this->getStub($stubFolder.'Controller')
        );

        $this->write($controllerPath, $controllerTemplate);

        if ($this->options['stack'] == 'api') {
            $resourcePath = $this->_getResourcePath($this->name);

            $resourceTemplate = str_replace(
                array_keys($replace), array_values($replace), $this->getStub($stubFolder.'Resource')
            );

            $this->write($resourcePath, $resourceTemplate);
        }

        return $this;
    }

    protected function buildLivewire(): void
    {
        $this->info('Creating Livewire Component ...');

        $folder = ucfirst(Str::plural($this->name));
        $replace = array_merge($this->buildReplacements(), $this->modelReplacements());

        foreach (['Index', 'Show', 'Edit', 'Create'] as $component) {
            $componentPath = $this->_getLivewirePath($folder.'/'.$component);

            $componentTemplate = str_replace(
                array_keys($replace), array_values($replace), $this->getStub('livewire/'.$component)
            );

            $this->write($componentPath, $componentTemplate);
        }

        // Form
        $formPath = $this->_getLivewirePath('Forms/'.$this->name.'Form');

        $componentTemplate = str_replace(
            array_keys($replace), array_values($replace), $this->getStub('livewire/Form')
        );

        $this->write($formPath, $componentTemplate);
    }

    protected function buildVue(): void
    {
        $this->info('Creating Vue Component ...');

        $folder = ucfirst(Str::plural($this->name));
        $replace = array_merge($this->buildReplacements(), $this->modelReplacements());

        // var_dump($this->getStub("views/vue/Index"));
        foreach (['Index', 'Create', 'Edit'] as $view) {
            $viewTemplate = str_replace(
                array_keys($replace), array_values($replace), $this->getStub("views/vue/$view")
            );

            $this->write($this->_getViewPath($view), $viewTemplate);
        }

        // foreach (['Index', 'Show', 'Edit', 'Create'] as $component) {
        //     $componentPath = $this->_getVueJsPath($folder.'/'.$component);

        //     $componentTemplate = str_replace(
        //         array_keys($replace), array_values($replace), $this->getStub('livewire/'.$component)
        //     );

        //     $this->write($componentPath, $componentTemplate);
        // }

        // // Form
        // $formPath = $this->_getLivewirePath('Forms/'.$this->name.'Form');

        // $componentTemplate = str_replace(
        //     array_keys($replace), array_values($replace), $this->getStub('livewire/Form')
        // );

        // $this->write($formPath, $componentTemplate);
    }

    protected function buildReactComponents(): static
    {
        $this->info('Creating React Component ...');

        $folder = ucfirst(Str::plural($this->name));
        $replace = array_merge($this->buildReplacements(), $this->modelReplacements());

        $tableTitleHeader = "\n";
        foreach ($this->getFilteredColumns() as $column) {
            $title = Str::title(str_replace('_', ' ', $column));
            $tableTitleHeader .= $this->getField($title, $column, 'table-header').",\n";
        }
        $replace = array_merge($replace, [
            '{{tableTitleHeader}}' => $tableTitleHeader,
        ]);

        foreach (['Index', 'Create', 'Edit'] as $view) {
            $viewTemplate = str_replace(
                array_keys($replace), array_values($replace), $this->getStub("views/react/$view")
            );

            $this->write($this->_getViewPath($view), $viewTemplate);
        }

        // React Component Elstar
        foreach (['Table','TableSearch','TableTools','DeleteConfirmation'] as $view) {  // , 'TableTools','DeleteConfirmation'
            $viewTemplate = str_replace(
                array_keys($replace), array_values($replace), $this->getStub("views/react/$view")
            );

            $this->write($this->_getReactJsPath($view), $viewTemplate);
        }

        // React Store Elstar
        foreach (['index', 'Slice'] as $view) {  // , 'TableTools','DeleteConfirmation'
            $viewTemplate = str_replace(
                array_keys($replace), array_values($replace), $this->getStub("react/stores/$view")
            );

            $this->write($this->_getReactJsStorePath($view), $viewTemplate);
        }

        // React Services
        foreach (['Service'] as $view) {  // , 'TableTools','DeleteConfirmation'
            $viewTemplate = str_replace(
                array_keys($replace), array_values($replace), $this->getStub("react/services/$view")
            );

            $this->write($this->_getReactJsServicesPath($view), $viewTemplate);
        }

        // React Routes
        foreach (['react-route'] as $view) {  // , 'TableTools','DeleteConfirmation'
            $viewTemplate = str_replace(
                array_keys($replace), array_values($replace), $this->getStub("views/react/$view")
            );

            $this->write($this->_getReactJsRoutesPath($view), $viewTemplate);
        }

        // foreach (['Index', 'Show', 'Edit', 'Create'] as $component) {
        //     $componentPath = $this->_getVueJsPath($folder.'/'.$component);

        //     $componentTemplate = str_replace(
        //         array_keys($replace), array_values($replace), $this->getStub('livewire/'.$component)
        //     );

        //     $this->write($componentPath, $componentTemplate);
        // }

        // // Form
        // $formPath = $this->_getLivewirePath('Forms/'.$this->name.'Form');

        // $componentTemplate = str_replace(
        //     array_keys($replace), array_values($replace), $this->getStub('livewire/Form')
        // );

        // $this->write($formPath, $componentTemplate);
        return $this;
    }

    /**
     * @return $this
     * @throws FileNotFoundException
     *
     */
    protected function buildModel(): static
    {
        $modelPath = $this->_getModelPath($this->name);

        if ($this->files->exists($modelPath) && $this->ask('Already exist Model. Do you want overwrite (y/n)?', 'y') == 'n') {
            return $this;
        }

        $this->info('Creating Model ...');

        // Make the models attributes and replacement
        $replace = array_merge($this->buildReplacements(), $this->modelReplacements());

        $modelTemplate = str_replace(
            array_keys($replace), array_values($replace), $this->getStub('Model')
        );

        $this->write($modelPath, $modelTemplate);

        // // Make Request Class
        // $requestPath = $this->_getRequestPath($this->name);

        // $this->info('Creating Request Class ...');

        // $requestTemplate = str_replace(
        //     array_keys($replace), array_values($replace), $this->getStub('Request')
        // );

        // $this->write($requestPath, $requestTemplate);

        return $this;
    }

    /**
     * @return $this
     * @throws FileNotFoundException
     *
     * @throws Exception
     */
    protected function buildViews(): static
    {
        if ($this->options['stack'] == 'api') {
            return $this;
        }

        $this->info('Creating Views ...');

        $tableHead = "\n";
        $tableBody = "\n";
        $viewRows = "\n";
        $form = "\n";

        foreach ($this->getFilteredColumns() as $column) {
            $title = Str::title(str_replace('_', ' ', $column));

            $tableHead .= $this->getHead($title);
            $tableBody .= $this->getBody($column);
            $viewRows .= $this->getField($title, $column, 'view-field');
            $form .= $this->getField($title, $column);
        }

        $replace = array_merge($this->buildReplacements(), [
            '{{tableHeader}}' => $tableHead,
            '{{tableBody}}' => $tableBody,
            '{{viewRows}}' => $viewRows,
            '{{form}}' => $form,
        ]);

        // $this->buildLayout();

        foreach (['index', 'create', 'edit', 'form', 'show'] as $view) {
            $viewTemplate = str_replace(
                array_keys($replace), array_values($replace), $this->getStub("views/{$this->options['stack']}/$view")
            );

            $this->write($this->_getViewPath($view), $viewTemplate);
        }

        return $this;
    }

    /**
     * @return $this
     * @throws FileNotFoundException
     *
     * @throws Exception
     */
    protected function buildReactViews(): static
    {
        if ($this->options['stack'] !== 'reactjs') {
            return $this;
        }

        $this->info('Creating React Views ...');

        $tableHead = "\n";
        $tableBody = "\n";
        $viewRows = "\n";
        $tableTitleHeader = "\n";
        $form = "\n";
        $i=0;
        $length = count($this->getFilteredColumns());
        foreach ($this->getFilteredColumns() as $column) {
            $title = Str::title(str_replace('_', ' ', $column));

            $tableHead .= $this->getHead($title);
            $tableBody .= $this->getBody($column);
            $viewRows .= $this->getField($title, $column, 'view-field');
            $tableTitleHeader .= $this->getField($title, $column, 'table-header').",\n";
            $form .= (($i % 2 == 0)?$this->_getBodyStart($this->options['stack']):'') 
                    .  $this->getField($title, $column)
                    . ((($i % 2 == 1) || ($length-1===$i))?$this->_getBodyEnd($this->options['stack']):'');
            $i++;
        }
        // dd($tableTitleHeader);
        $replace = array_merge($this->buildReplacements(), $this->modelReplacements());
        $replace = array_merge($replace, [
            '{{tableHeader}}' => $tableHead,
            '{{tableTitleHeader}}' => $tableTitleHeader,
            '{{tableBody}}' => $tableBody,
            '{{viewRows}}' => $viewRows,
            '{{form}}' => $form,
        ]);
        // $this->buildLayout();
        // print("CEKIDOT");

        foreach (['Index', 'Create', 'Edit'] as $view) {  //, 'form', 'show'
            $viewTemplate = str_replace(
                array_keys($replace), array_values($replace), $this->getStub("views/react/$view")
            );

            $this->write($this->_getViewPath($view), $viewTemplate);
        }

        return $this;
    }

    /**
     * Make the class name from table name.
     *
     * @return string
     */
    private function _buildClassName(): string
    {
        return Str::studly(Str::singular($this->table));
    }
}
