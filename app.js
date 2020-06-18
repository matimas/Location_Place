const express = require('express');
const bodyParser = require('body-parser');
const locationRoutes = require('./routes/location');
const app = express();
const path = require('path');
// app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname,'./client/dist')));
app.use(bodyParser.json());

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

app.use(locationRoutes);

app.listen(process.env.PORT || 3000);

// app.set('view engine','ejs');
// app.set('views','views');
// app.use((req, res, next) => {
// 	res.setHeader('Content-Type', 'text/html');
// 	next();
// });
// app.use((req, res, next) => {
// 	const username = req.body.username || 'UnKnown user';
// 	res.render('index',{
// 		username: username
// 	});
// });
// app.listen(5000);
// PURE-NODEJS
// const http = require('http');

// const server = http.createServer((request, response) => {
// 	let body = [];
// 	request.on('data', (chunk) => {
// 		body.push(chunk);
// 	});
// 	request.on('end', () => {
// 		body = Buffer.concat(body).toString();
// 		let userName = 'Unknown user';
// 		if (body) {
// 			username = body.split('=')[1];
// 		}
// 		response.setHeader('Content-Type', 'text/html');
// 		response.write(
// 			`<h1>${username}</h1><form method="POST" action="/"><input name="username" type="text"><button type="submit">Send</button></form>`,
// 		);
// 		response.end();
// 	});
// });

// server.listen(5000);
