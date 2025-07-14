'use client';

import React, { useState } from 'react';
import styles from './Form.module.scss';
import { IPoint } from '@imports/app/models/iCoordinates';

interface IFormPoint {
	id: number;
	latitude: number;
	longitude: number;
}

interface IFormProps {
	onProcessPoints: (points: IPoint[]) => void;
}

export const Form = ({ onProcessPoints }: IFormProps) => {
	const [data, setData] = useState<IFormPoint[]>([
		{ id: 1, latitude: 0, longitude: 0 },
		{ id: 2, latitude: 0, longitude: 0 },
	]);

	const handleAddPoint = () => {
		setData([
			...data,
			{
				id: data.length + 1,
				latitude: 0,
				longitude: 0,
			},
		]);
	};

	const handleChangePoint = (
		id: number,
		field: 'latitude' | 'longitude',
		value: number
	) => {
		const newPoints = data.map((point) =>
			point.id !== id ? point : { ...point, [field]: value }
		);

		setData(newPoints);
	};

	const handleDeletePoint = (id: number) => {
		const newPoints = data
			.filter((point) => point.id !== id)
			.map((point, index) => ({
				...point,
				id: index + 1
			}));

		setData(newPoints);
	}

	const handleSubmit = () => {
		const coordinates = data.map(({ latitude, longitude }) => ({
			lat: latitude,
			lng: longitude,
		}));

		onProcessPoints(coordinates);
	};

	return (
		<form className={styles.form}>
			{data.map(({ latitude, longitude, id }) => (
				<div className={styles.points_container} key={id}>
					<label htmlFor='latitude'>Latitude</label>
					<input
						id='latitude'
						type='number'
						defaultValue={latitude}
						onChange={(e) =>
							handleChangePoint(
								id,
								'latitude',
								parseFloat(e.target.value)
							)
						}
					/>

					<label htmlFor='length'>Longitude</label>
					<input
						id='longitude'
						type='number'
						defaultValue={longitude}
						onChange={(e) =>
							handleChangePoint(
								id,
								'longitude',
								parseFloat(e.target.value)
							)
						}
					/>

					{data.length > 2 && (
						<button
							type='button'
							onClick={() => handleDeletePoint(id)}
							className={styles.deleteButton}
						>
							Delete
						</button>
					)}
				</div>
			))}

			<button onClick={() => handleAddPoint()} type='button' className={styles.addButton}>
				Add Point
			</button>

			<button onClick={handleSubmit} type='button' className={styles.processButton}>Process Points</button>
		</form>
	);
};
