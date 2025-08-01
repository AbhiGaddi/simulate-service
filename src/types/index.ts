export interface RecordData {
    [key: string]: any;
}

export interface Record {
    id?: number;
    type: string;
    timestamp: Date;
    data: RecordData;
}
export interface GetRecordsQuery {
    type?: string;
    startDate?: Date;
    endDate?: Date;
}