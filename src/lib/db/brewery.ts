import { Entity, Schema } from 'redis-om';

class Brewery extends Entity {}

const brewerySchema = new Schema(
	Brewery,
	{
		name: { type: 'string' },
		brewery_type: { type: 'string' },
		street: { type: 'string' },
		city: { type: 'string' },
		state: { type: 'string' },
		postal_code: { type: 'string' },
		country: { type: 'string' },
		longitude: { type: 'string' },
		latitude: { type: 'string' },
		phone: { type: 'string' },
		website_url: { type: 'string' },
	},
	{
		dataStructure: 'JSON',
	}
);

export { Brewery, brewerySchema };
