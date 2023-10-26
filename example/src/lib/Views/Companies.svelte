<script>
    import { Button, Dropdown, DropdownItem } from 'flowbite-svelte';
    import { ChevronDownSolid } from 'flowbite-svelte-icons';
    import Creator from './Companies/Creator.svelte';

    let editorSelected = 0;
    let companySelected = '';
    let buttonVisible = false;
</script>


<div id="main" class="grid grid-cols-3">
    <div class="col-span-2">
        <h1>Compañías</h1>
        {#if editorSelected == 0}
            <p>Dentro de este apartado de la aplicación, 
                podrá llevar acabo el dar de alta, baja, 
                y editar las compañías clientes de ViralPlan.
                Comience seleccionando una compañía, a no ser que quiera crear una.
            </p>
            <Button>Dropdown button<ChevronDownSolid class="w-3 h-3 ml-2 text-white dark:text-white" /></Button>
            <Dropdown>
              <DropdownItem href="/">Home</DropdownItem>
              <DropdownItem href="/docs/components/dropdown">Dropdown</DropdownItem>
              <DropdownItem href="/docs/components/accordion">Accordion</DropdownItem>
              <DropdownItem href="/docs/components/alert">Alert</DropdownItem>
            </Dropdown>

        {:else if editorSelected == 1}
            <Creator editorSelected={editorSelected} />
        {:else if editorSelected == 2 && companySelected != ''}
            <p>Hey</p>
        {:else if editorSelected == 3 && companySelected != ''}
            <p>Heyx2</p>
        {/if}
    </div>
    <div class="col-span-1 justify-between items-center">
        <Button 
            class="bg-pink-600 w-5/6 text-white text-2xl rounded-3xl my-3" 
            style="height: 5vh"
            on:click={() => {
                editorSelected = 1;
                buttonVisible = true;
            }}>
            <strong>Crear Compañía</strong>
        </Button>
        <Button 
            class="bg-pink-600 w-5/6 text-white text-2xl rounded-3xl my-3" 
            style="height: 5vh">
            <strong>Editar Compañía</strong>
        </Button>
        <Button 
            class="bg-pink-600 w-5/6 text-white text-2xl rounded-3xl my-3" 
            style="height: 5vh">
            <strong>Eliminar Compañía</strong>
        </Button>
        <Button 
            class="bg-pink-600 w-5/6 text-white text-2xl rounded-3xl my-3" 
            style="height: 5vh"
            disabled={buttonVisible}>
            <strong>Cancelar</strong>
        </Button>
    </div>
</div>