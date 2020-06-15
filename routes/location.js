const express = require('express');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const router = express.Router();

const url =
	'mongodb+srv://Matimisg:Mati3044@placelocation-sje8y.mongodb.net/locations?retryWrites=true&w=majority';

const client = new MongoClient(url);

router.post('/add-location', (req, res, next) => {
	client.connect(async function (err, client) {
		const db = await client.db('locations');
		// Insert a single document
		db.collection('user-locations').insertOne(
			{
				address: req.body.address,
				coords: { lat: req.body.lat, lng: req.body.lng },
			},
			function (err, r) {
				res.json({ message: 'Stored Location!', locId: r.insertedId });
			},
		);
	});
});

router.get('/location/:lid', (req, res, next) => {
	const locationId = req.params.lid;
	client.connect(async function (err, client) {
		const db = await client.db('locations');
		db.collection('user-locations').findOne(
			{
				_id: new mongodb.ObjectID(locationId),
			},
			function (err, doc) {
				if (!doc) {
					return res.status(404).json({ message: 'NOT FOUND!' });
				}
				res.json({
					address: doc.address,
					coordinates: doc.coords,
				});
			},
		);
	});
});

module.exports = router;
