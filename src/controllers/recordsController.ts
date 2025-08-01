import { Request, Response } from 'express';
import { Record } from '../models/record';

export class RecordsController {
    async createRecord(req: Request, res: Response) {
        try {
            const recordData = req.body;
            const newRecord = await Record.create(recordData);
            res.status(201).json(newRecord);
        } catch (error) {
            res.status(500).json({ message: 'Error creating record', error });
        }
    }

    async getRecordById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const record = await Record.findByPk(id);
            if (!record) {
                return res.status(404).json({ message: 'Record not found' });
            }
            res.status(200).json(record);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving record', error });
        }
    }

    async getRecords(req: Request, res: Response) {
        try {
            const { type, timestamp } = req.query;
            const filters: any = {};
            if (type) filters.type = type;
            if (timestamp) {
                const ts = Array.isArray(timestamp) ? timestamp[0] : timestamp;
                filters.timestamp = { $gte: new Date(ts as string) };
            }

            const records = await Record.findAll({ where: filters });
            res.status(200).json(records);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving records', error });
        }
    }
}