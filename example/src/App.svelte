<script>
	import Navbar from '.\\lib\\Misc\\Navbar.svelte'
	import Sidebar from '.\\lib\\Misc\\Sidebar.svelte'
	import Home from '.\\lib\\Views\\Home.svelte'
	import Companies from '.\\lib\\Views\\Companies.svelte';
	import { Router, Route } from "svelte-routing";
  
	let open = false;
	export let url = "";
</script>
  
<Router {url}>
	<Sidebar bind:open/>
	<Navbar bind:sidebar={open}/>

	<div class="" style="margin-left: 25%">
		<div class="flex flex-col col-start-2 col-span-3 p-2">
		<Route path="/"><Home /></Route>
		<Route path="/companies"><Companies /></Route>
		<Route path="/plans"></Route>
		</div>
	</div>
</Router>

<style>
	@import ".\\app.css";
</style>