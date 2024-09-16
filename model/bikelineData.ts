

export type BikelineData = {
    rows: BikelineDataRow[];
    date: Date;

}

export type BikelineDataRow = {
    id: string;
    name: string;
    km: number;
    hm: number;
    trips: number;
}

export type ShuffleItem = {
    id: string; // random id
    row_id: string;
    name: string;
    km: number;
    hm: number;
    trips: number;
}