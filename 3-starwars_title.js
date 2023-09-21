#!/usr/bin/node

const request = require('request');
const id = process.argv[2];
const url = 'https://swapi-api.hbtn.io/api/films/' + id;

request(url, (error, response, body) => {
	if (error) {
		console.error(error);
		return;
	}
	const filmData = JSON.parse(body);
	console.log(filmData.title);
});
