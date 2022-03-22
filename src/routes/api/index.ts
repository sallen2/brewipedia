import client from '$lib/db/config';
import { brewerySchema } from '$lib/db/brewery';

export async function get(request: Request) {
	try {
		let breweryRepo = client.fetchRepository(brewerySchema);
		const data = await breweryRepo.search().returnAll();

		const breweries = data.map((item) => {
			return item.entityData;
		});

		return {
			status: 200,
			body: {
				data: breweries,
			},
		};
	} catch (error) {
		console.error(error);
		return {
			status: 404,
			body: {
				error,
			},
		};
	}
}
