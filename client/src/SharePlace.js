import { Modal } from './UI/Modal';
import { Map } from './UI/Map';
import { getCoordsFromAddress, getAddressFromCoords } from './Utility/Location';

class PlaceFinder {
	constructor() {
		const addressForm = document.querySelector('form');
		const locatUserBtn = document.getElementById('locate-btn');
		this.shareBtn = document.getElementById('share-btn');

		this.shareBtn.addEventListener('click', this.sharePlaceHandler.bind(this));
		locatUserBtn.addEventListener('click', this.locatUserHandler.bind(this));
		addressForm.addEventListener('submit', this.findAddrassHandler.bind(this));
	}

	sharePlaceHandler() {
		const sharedLinkinputEl = document.getElementById('share-link');
		if (!navigator.clipboard) {
			sharedLinkinputEl.select();
			return;
		}
		navigator.clipboard
			.writeText(sharedLinkinputEl.value)
			.then(() => {
				alert('copeid into clipoard');
			})
			.catch((error) => {
				console.log(error);
				sharedLinkinputEl.select();
			});
	}
	selectPlace(coordinates, address) {
		if (this.map) {
			this.map.render(coordinates);
		} else {
			this.map = new Map(coordinates);
		}
		fetch('http://localhost:3000/add-location', {
			method: 'POST',
			body: JSON.stringify({
				address: address,
				lat: coordinates.lat,
				lng: coordinates.lng,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				const locationId = data.locId;
				this.shareBtn.disabled = false;
				const sharedLinkinputEl = document.getElementById('share-link');
				sharedLinkinputEl.value = `${location.origin}/my-place?location=${locationId}`;
			});
	}

	locatUserHandler() {
		if (!navigator.geolocation) {
			alert('ERROR! Your browser not supported yet');
			return;
		}
		const modal = new Modal(
			'loading-modal-content',
			'Loading location-please wait!',
		);
		modal.show();
		navigator.geolocation.getCurrentPosition(
			async (succesResult) => {
				const coordinates = {
					lat: succesResult.coords.latitude ,
					lng: succesResult.coords.longitude ,
				};
				try {
					const address = await getAddressFromCoords(coordinates);
					this.selectPlace(coordinates, address);
				} catch (error) {
					alert(error.message);
				}
				modal.hide();
			},
			(errorResult) => {
				modal.hide();
				alert('could not locate you unfortunately. Please try again later');
			},
		);
	}

	async findAddrassHandler(event) {
		event.preventDefault();
		const address = event.target.querySelector('input').value;
		if (!address || address.trim().length === 0) {
			alert('invalid address!!!try again...');
			return;
		}
		const modal = new Modal(
			'loading-modal-content',
			'Loading location-please wait!',
		);
		modal.show();
		try {
			const coordinates = await getCoordsFromAddress(address);
			this.selectPlace(coordinates, address);
		} catch (error) {
			alert(error.message);
		}
		modal.hide();
	}
}
new PlaceFinder();
