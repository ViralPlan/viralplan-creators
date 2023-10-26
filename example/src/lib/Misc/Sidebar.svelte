<script>
	import { Link } from "svelte-routing";

	export let open = false
</script>

<aside class="absolute w-1/4 h-full bg-black border-r-2 shadow-lg text-white" class:open>
	<nav class="p-12 text-3xl">
		<Link to="/">Inicio</Link><br>
		<Link to="/companies">Compañías</Link><br>
		<Link to="/plans">Planes</Link>
	</nav>
</aside>

<style>
	aside {
		left: -100%;
		transition: left 0.3s ease-in-out
	}
	
	.open {
		left: 0
	}
</style>