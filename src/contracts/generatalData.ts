interface IItemData  {
    v: string;
    f: string;
}

export interface IGeneralData {
    associationsDescription?: string;
    totalBuilding: IItemData;
    estimatedTotal: IItemData;
    totalMdo: IItemData;
    estimatedMdo: IItemData;
    taxMdo: number;
    tax: number;
    valueMeters: IItemData;
    associations: any;
    contactsList: any;
}
