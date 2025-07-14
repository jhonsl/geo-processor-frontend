import { ICoordinates, IPoint } from '../models/iCoordinates';

const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || '';

export const processCoordinates = async (coordinates: IPoint[]): Promise<ICoordinates> => {        
    try {
		const response = await fetch(`${API_URL}/geo/process`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				points: coordinates,
			}),
		});

		if (!response.ok) {
			throw new Error(
				`Error processing coordinates: ${response.statusText}`
			);
		}

		return await response.json();
	} catch (error) {
		console.error('GeoProcessorService error:', error);
		throw error;
	}
};
