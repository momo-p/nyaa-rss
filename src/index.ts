import { getQuery, withQuery } from "ufo";
import Fastify from 'fastify'

const fastify = Fastify({
	logger: true,
});

fastify.get('/', async (request, reply) => {
	const query = getQuery(request.url);
	query.page = 'rss';
	const feedURL = withQuery('https://nyaa.si/', query);
	const response = await fetch(feedURL, {
		headers: {
			'user-agent': 'Mozilla/5.0 (compatible; +https://github.com/momo-p/nyaa-rss)',
		},
	});

	reply.statusCode = response.status;
	reply.header('content-type', response.headers.get('content-type'));
	reply.send(await response.text());
});

fastify.listen({ host: '0.0.0.0', port: 3000 }, (err) => {
	if (err) throw err;
});
