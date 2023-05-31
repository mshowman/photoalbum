<script lang="ts">
	import {
		NavBrand,
		Navbar,
		Input,
		NavHamburger,
		Button,
		NavUl,
		NavLi,
		Label
	} from 'flowbite-svelte';
	import '../app.postcss';
	import logo from '$lib/assets/logo.jpg';
	import { goto } from '$app/navigation';

	let photoId: number | null = null;

	function viewPhotoById() {
		const href = !!photoId ? `/photos/${photoId}` : '#';
		photoId = null;

		if (href !== '#') goto(href);
	}
</script>

<div class="relative">
	<Navbar
		let:toggle
		let:hidden
		class="px-2 sm:px-4 py-2.5 absolute w-full z-20 top-0 left-0 border-b-black border-b-2"
	>
		<NavBrand href="/">
			<img src={logo} alt="" width="80" class="rounded-full px-2" />
			<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
				Photo Album
			</span>
		</NavBrand>

		<NavHamburger on:click={toggle} />
		<NavUl {hidden}>
			<NavLi nonActiveClass="flex flex-col sm:flex-row sm:gap-4 sm:items-baseline">
				<Label class="space-y-2">
					<Input
						id="mobile-search-navbar"
						class="pl-10 mb-4"
						placeholder="Search by Photo ID"
						bind:value={photoId}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-6 h-6 dark:text-white"
							slot="left"
							aria-hidden="true"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
							/>
						</svg>
					</Input>
				</Label>
				<Button on:click={viewPhotoById}>Search</Button>
			</NavLi>
		</NavUl>
	</Navbar>

	<slot />
</div>
