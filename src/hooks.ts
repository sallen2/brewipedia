export async function handle({ event, resolve }) {
	const response = await resolve(event, {
		/* yeah really wanted to use this but Svelte Kit
      not playing nice with some packages :-(
    **/
		ssr: false,
	});

	return response;
}
