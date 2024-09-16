import type { BikelineData } from "~/model/bikelineData";

export const useDataHandler = () => {
    const shuffler = useShuffelHandler();

    const data1 = ref<BikelineData>();
    const data2 = ref<BikelineData>();

    const uploadData1 = (data: string | undefined) => {
        if (!data) {
            return;
        }
        data1.value = parseBikelineData(data);
    }
    const uploadData2 = (data: string | undefined) => {
        if (!data) {
            return;
        }
        data2.value = parseBikelineData(data);
    }

    return {
        data1,
        data2,
        uploadData1,
        uploadData2,
        shuffler
    }
}