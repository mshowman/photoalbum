<script>
	import { page } from '$app/stores';
</script>

<div class="flex justify-center items-center h-screen">
	<p class="font-semibold text-5xl">{$page.error?.message}</p>
</div>
