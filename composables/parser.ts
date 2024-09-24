import type { BikelineData, BikelineDataRow } from "~/model/bikelineData"



// export const parseBikelineData = (data: string, filename: string): BikelineData => {
//     // data in csv format
//     // "Nachname";"Vorname";"Schule";"Typ";"Geschlecht";"WBTW: Fahrten [#]";"WBTW: Distanz [km]";"WBTW: Anstieg [Hm]";"Jahr: Fahrten [#]";"Jahr: Distanz [km]";"Jahr: Anstieg [Hm]"
//     const lines = data.split("\n").filter(line => line.length > 0);
//     const header = lines.shift()!.split(";")
//     const entries = lines.map(line => {
//         const values = line.split(";")
//         // remove '"' from values
//         values.forEach((value, index) => {
//             values[index] = value.replace(/"/g, "")
//         })


//         return {
//             id: Math.random().toString(36).substring(7),
//             name: `${values[1]} ${values[0]}`,
//             km: parseFloat(values[6].replace(",", ".")),
//             hm: parseFloat(values[7].replace(",", ".")),
//             trips: parseInt(values[5])
//         } as BikelineDataRow
//     });
//     return {
//         rows: entries,
//         date: new Date(),
//         filename: filename
//     }
// }

export const parseBikelineData = (data: string, filename: string): BikelineData => {
    // "Nachname";"Vorname";"Schule";"Typ";"Geschlecht";"WBTW: Fahrten [#]";"WBTW: Distanz [km]";"WBTW: Anstieg [Hm]";"Jahr: Fahrten [#]";"Jahr: Distanz [km]";"Jahr: Anstieg [Hm]"
    const lines = data.split("\n").filter(line => line.length > 0);
    const header = lines.shift()!.split(";")
    const entries = lines.map(line => {
        const values = line.split(";")
        // remove '"' from values
        values.forEach((value, index) => {
            values[index] = value.replace(/"/g, "")
        })
        console.log(values);


        return {
            id: Math.random().toString(36).substring(7),
            name: `${values[1]} ${values[0]}`,
            km: parseFloat(values[6].replace(",", ".")),
            hm: parseFloat(values[7].replace(",", ".")),
            trips: parseInt(values[8]) // from the whole year
        } as BikelineDataRow
    });
    return {
        rows: entries,
        date: new Date(),
        filename: filename
    }
}