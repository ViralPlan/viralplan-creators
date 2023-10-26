<script>
	import Hamburger from './Hamburger.svelte'
	
	export let sidebar = false
</script>

<header class="bg-black p-2 text-white-600 border-b-2">
    <div class="grid-cols-5">
        <div class="cols-span-1" style="width: 20%;"></div>
        <div class="cols-span-3 flex" style="margin-left: 25%;">
            <Hamburger bind:open={sidebar}/>
            <img src="C:\Users\pmpls\Desktop\codebase\ViralPlan\viralplan-creators\ViralPlan Creators\src\assets\logo.png" alt="company logo"/>
        </div>
        <div class="cols-span-1" style="width: 20%"></div>
    </div>
</header>