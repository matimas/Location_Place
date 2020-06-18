const GLOBAL_API_KEY = 'AIzaSyAAIzTOLmmKjlWEp_hEDgQg_tkczp1_C-A';

export async function getAddressFromCoords(coords) {
	const response = await fetch(
		`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lng}&key=${GLOBAL_API_KEY}`,
	);
	if (!response.ok) {
		throw new Error('Faild to fetch addrass. please try again!');
		return;
	}

	const data = await response.json();

	console.log(data);

	if (data.error_message) {
		throw new Error(data.error_message);
	}
	const address = data.results[0].formatted_address;
	return address;
}

export async function getCoordsFromAddress(addrass) {
	const urlAddrass = encodeURI(addrass);
	const response = await fetch(
		`https://maps.googleapis.com/maps/api/geocode/json?address=${urlAddrass}&key=${GLOBAL_API_KEY}`,
	);
	if (!response.ok) {
		throw new Error('Faild to fetch coordinates. please try again!');
		return;
	}

	const data = await response.json();

	console.log(data);

	if (data.error_message) {
		throw new Error(data.error_message);
	}

	const coordinates = data.results[0].geometry.location;
	return coordinates;
}
