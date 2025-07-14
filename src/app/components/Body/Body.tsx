'use client';

import React from 'react';
import { Form } from '../Form/Form';
import { processCoordinates } from '@imports/app/services/geoProcessor.service';
import dynamic from 'next/dynamic';
import { ICoordinates, IPoint } from '@imports/app/models/iCoordinates';

const Map = dynamic(() => import('../Map/Map'), {
	ssr: false,
});

interface IRequestState {
	loading: boolean;
	error: boolean;
	data: ICoordinates | null;
}

export const Body = () => {
	const [request, setRequest] = React.useState<IRequestState>({
		loading: false,
		error: false,
		data: null,
	});

	const handleProcessPoints = async (points: IPoint[]) => {
		setRequest({ loading: true, error: false, data: null });

		try {
			const response = await processCoordinates(points);
			setRequest({ loading: false, error: false, data: response });
		} catch (error) {
			console.error('Error processing points:', error);
			setRequest({ loading: false, error: true, data: null });
		}
	};

	return (
		<main>
			<p>Please insert your coordenates</p>

			<Form onProcessPoints={handleProcessPoints} />

			{request.loading && <p>Loading...</p>}

			{request.error && <p>Error processing points.</p>}

			{request.data && (
				<Map
					centroid={request.data.centroid}
					bounds={request.data.bounds}
				/>
			)}
		</main>
	);
};
