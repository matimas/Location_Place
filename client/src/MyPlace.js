import { Map } from './UI/Map';
class LoadPlace {
	constructor(coords, address) {
		new Map(coords);
		const headerTitleEl = document.querySelector('header');
		headerTitleEl.textContent = address;
	}
}

const url = new URL(location.href);
const queryParams = url.searchParams;
// const coords = {
// 	lat: queryParams.get('lat'),
// 	lng: queryParams.get('lng'),
// };
// const address = queryParams.get('address');
const locId = queryParams.get('location');
fetch('http://localhost:3000/location/' + locId)
	.then((response) => {
		if (response.status === 404) {
			throw new Error('Cold not find location!');
		}
		return response.json();
	})
	.then((data) => {
		new LoadPlace(data.coordinates, data.address);
	}).catch((error)=>{
		alert(error.message);
	});
