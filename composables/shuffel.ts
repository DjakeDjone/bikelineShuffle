import type { BikelineData, ShuffleItem } from "~/model/bikelineData";


export const useShuffelHandler = () => {
    const data = ref<BikelineData>({
        rows: [
            { id: "1", name: "A", km: 1, hm: 1, trips: 1 },
            { id: "2", name: "B", km: 2, hm: 2, trips: 2 },
            { id: "3", name: "C", km: 3, hm: 3, trips: 3 },
            { id: "4", name: "D", km: 4, hm: 4, trips: 4 },
            { id: "5", name: "E", km: 5, hm: 5, trips: 5 },
            { id: "6", name: "F", km: 6, hm: 6, trips: 6 },
            { id: "7", name: "G", km: 7, hm: 7, trips: 7 },
            { id: "8", name: "H", km: 8, hm: 8, trips: 8 },
            { id: "9", name: "I", km: 9, hm: 9, trips: 9 },
            { id: "10", name: "J", km: 10, hm: 10, trips: 10 },
            { id: "11", name: "K", km: 11, hm: 11, trips: 11 },
            { id: "12", name: "L", km: 12, hm: 12, trips: 12 },
            { id: "13", name: "M", km: 13, hm: 13, trips: 13 },
            { id: "14", name: "N", km: 14, hm: 14, trips: 14 },
            { id: "15", name: "O", km: 15, hm: 15, trips: 15 },
        ],
        date: new Date()
    })

    const shuffleItems = ref<ShuffleItem[]>()

    const getShuffleItems = (d: BikelineData): ShuffleItem[] => {
        const shuffleItems: ShuffleItem[] = []
        d.rows.forEach(row => {
            for (let i = 0; i < row.trips; i++) {
                shuffleItems.push({
                    id: Math.random().toString(36).substring(7),
                    row_id: row.id,
                    name: row.name,
                    km: row.km,
                    hm: row.hm,
                    trips: row.trips
                })
            }
        })
        return shuffleItems
    }

    const shuffel = () => {
        if (!shuffleItems.value) {
            shuffleItems.value = getShuffleItems(data.value)
        }
        shuffleItems.value.sort(() => Math.random() - 0.5)
    }

    const getRandRow = () => {
        if (!shuffleItems.value) {
            shuffleItems.value = getShuffleItems(data.value)
        }
        return shuffleItems.value[Math.floor(Math.random() * shuffleItems.value.length)]
    }

    return {
        data,
        shuffleItems,
        shuffel,
        getRandRow
    }
}