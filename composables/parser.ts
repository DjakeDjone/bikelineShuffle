import type { BikelineData } from "~/model/bikelineData"


export const parseBikelineData = (data: string): BikelineData => {
    // data in csv format
    const rows = data.split("\n").map(row => {
        const [id, name, km, hm, trips] = row.split(";")
        return {
            id,
            name,
            km: parseFloat(km),
            hm: parseFloat(hm),
            trips: parseInt(trips)
        }
    })
    return {
        rows,
        date: new Date()
    }
}