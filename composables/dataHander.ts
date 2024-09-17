import type { BikelineData, BikelineDataRow } from "~/model/bikelineData";
import { useStorage } from '@vueuse/core';


export const useDataHandler = () => {
    const shuffler = useShuffelHandler();
    //
    const lastData = useStorage<BikelineData>("lastData", {
        rows: [] as BikelineDataRow[],
        date: new Date(),
        filename: "lastData.csv"
    })

    const data1 = ref<BikelineData | null>(lastData.value);
    const data2 = ref<BikelineData>();


    const uploadData1 = (data: string | undefined, filename: string) => {
        if (!data) {
            return;
        }
        data1.value = parseBikelineData(data, filename);
    }
    const removeData1 = () => {
        console.log("remove data1");

        data1.value = null;
    }
    const uploadData2 = (data: string | undefined, filename: string) => {
        if (!data) {
            return;
        }
        data2.value = parseBikelineData(data, filename);

        // calc data for shuffler with data2 - data1
        let diffData = data2.value;
        lastData.value = data2.value;
        if (data1.value) {
            diffData = calcDiffData(data1.value, data2.value);
        }
        console.log(diffData);

        shuffler.uploadData(diffData);
    }
    const calcDiffData = (d1: BikelineData, d2: BikelineData): BikelineData => {
        const diffData: BikelineData = {
            rows: [],
            date: new Date(),
            filename: d2.filename
        }
        // subtract the values like km, hm, trips from d1 from d2
        d2.rows.forEach(row2 => {
            const row1 = d1.rows.find(r => r.name === row2.name);
            if (row1) {
                diffData.rows.push({
                    id: row2.id,
                    name: row2.name,
                    km: row2.km - row1.km,
                    hm: row2.hm - row1.hm,
                    trips: row2.trips - row1.trips
                })
            } else {
                diffData.rows.push({
                    id: row2.id,
                    name: row2.name,
                    km: row2.km,
                    hm: row2.hm,
                    trips: row2.trips
                })
            }
        })
        return diffData;
    }

    return {
        data1,
        data2,
        lastData,
        uploadData1,
        uploadData2,
        removeData1
    }
}