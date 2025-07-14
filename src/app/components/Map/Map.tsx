import React, { useEffect } from 'react';
import { MapContainer, Marker, Popup, Rectangle, TileLayer, useMap } from 'react-leaflet';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { IBounds, IPoint } from '@imports/app/models/iCoordinates';

L.Icon.Default.mergeOptions({
	iconRetinaUrl:
		'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
	iconUrl:
		'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
	shadowUrl:
		'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface IMapProps {
    centroid: IPoint,
    bounds: IBounds
}

const AutoFitBounds = ({ bounds }: { bounds: IBounds }) => {
	const map = useMap();

	useEffect(() => {
		if (bounds) {
			const leafletBounds = L.latLngBounds([
                    [bounds.south, bounds.west],
                    [bounds.north, bounds.east]
            ])
			map.fitBounds(leafletBounds, { padding: [20, 20] });
		}
	}, [bounds, map]);

	return null;
};



const Map = ({ bounds, centroid }: IMapProps) => {
	return (
		<MapContainer
			center={[51.505, -0.09]}
			zoom={13}
			scrollWheelZoom={false}
			style={{ height: '400px', width: '100%' }}
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
			/>
			<Rectangle
				bounds={[
					[bounds.south, bounds.west],
					[bounds.north, bounds.east],
				]}
				color='blue'
				fillColor='blue'
				fillOpacity={0.1}
			/>
			<Marker position={[centroid.lat, centroid.lng]}>
				<Popup>
					A pretty CSS3 popup. <br /> Easily customizable.
				</Popup>
			</Marker>

			<AutoFitBounds bounds={bounds} />
		</MapContainer>
	);
};

export default Map;
