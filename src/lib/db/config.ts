import { Client } from 'redis-om';

let client = new Client();

(async function connect() {
	if (!client.isOpen()) {
		try {
			await client.open(
				// redis-om not excepting env var
				'redis://default:ET6ThMOHNvA1MmG1NdsZ7shV5RFnXy5b@redis-18111.c263.us-east-1-2.ec2.cloud.redislabs.com:18111'
			);
		} catch (error) {
			console.log(error);
		}
	}
})();

export default client;
