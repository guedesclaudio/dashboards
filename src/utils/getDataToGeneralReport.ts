import { requests } from "../api";
import { IGeneralData } from "../contracts/generatalData";


export async function getGeneralData(): Promise<IGeneralData> { 
    let associationsDescription = '';
    const associations: any = {}
    const result = await requests.getData();
    const table = result.table.rows[0];
    const totalBuilding = (table.c[6]);
    const estimatedTotal = table.c[18];
    const totalMdo = table.c[13];
    const estimatedMdo = table.c[19];
    const taxMdo = Number(((totalMdo.v / estimatedMdo.v) * 100).toFixed(2));
    const tax = Number(((totalBuilding.v / estimatedTotal.v) * 100).toFixed(2));
    const valueMeters = table.c[9];
      
    result?.table?.rows?.map((value: any) => {
      if (!value?.c[15]?.v) return;
      const key = value?.c[15]?.v;
      const keyFormat = key.charAt(0).toUpperCase() + key.slice(1).toLowerCase();
      return associations[keyFormat] = value?.c[16]?.f;
    });

    for (let i = 0; i < Object.keys(associations).length; i++) {
      associationsDescription += `- ${Object.keys(associations)[i]}: ${Object.values(associations)[i]}\n` ;
    }
      
    return {
      associationsDescription,
      totalBuilding,
      estimatedTotal,
      totalMdo,
      estimatedMdo,
      taxMdo,
      tax,
      valueMeters,
      associations
    };
}