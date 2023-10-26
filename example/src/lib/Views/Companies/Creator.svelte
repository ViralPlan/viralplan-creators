<script>
    import { Label, Input, Textarea, Button } from 'flowbite-svelte';
    import { addCompany } from '..\\..\\Server\\utils\\db\\companyModel.js';

    let textareaprops = {
        id: 'form',
        name: 'form',
        label: 'Formulario de Información',
        rows: 6,
        placeholder: 'Formulario donde la compañía nos ha proporcionado toda su información (Copiar y pegar)'
    };
    export let editorSelected;
    let company = {
        "name": '',
        "tel": '',
        "email": '',
        "form": '',
        "plans": []
    }
</script>

<div>
    <div class="mb-6">
        <Label for="name" class="block mb-2">Nombre</Label>
        <Input id="name" size="lg" placeholder="Nombre de la compañía que aparece en los planes" />
    </div>
    <div class="mb-6">
        <Label for="phone" class="block mb-2">Teléfono</Label>
        <Input id="phone" size="lg" placeholder="Teléfono de contacto" />
    </div>
    <div class="mb-6">
        <Label for="email" class="block mb-2">Correo electrónico</Label>
        <Input id="email" size="lg" placeholder="Correo electrónico donde mandar los planes" />
    </div>
    
    <div class="mb-6">
        <Label>Formulario de Información</Label>
        <Textarea {...textareaprops} />
    </div>

    <Button 
        class="bg-pink-600 w-5/6 text-white text-2xl rounded-3xl my-3" 
        style="height: 5vh"
        on:click={() => {
            addCompany({company})
            editorSelected = 0
        }}>
        <strong>Guardar Información</strong>
    </Button>
</div>