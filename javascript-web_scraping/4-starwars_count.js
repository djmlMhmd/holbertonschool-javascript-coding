#!/usr/bin/node

const request = require('request');
const filmsUrl = process.argv[2];
let counter = 0;

request(filmsUrl, (error, response, body) => {
	if (error) {
		console.error(error);
		return;
	}
	const allMovies = JSON.parse(body);
	for (const result of allMovies.results) {
		for (const character of result.characters) {
			if (character.includes('18')) {
				counter += 1;
			}
		}
	}
	console.log(counter);
});
