export interface IPoint {
	lat: number;
	lng: number;
}

export interface IBounds {
    north: number;
    south: number;
    east: number;
    west: number;
}

export interface ICoordinates {
    centroid: IPoint;
    bounds: IBounds;
}