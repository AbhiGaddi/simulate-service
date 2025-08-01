"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecordsController = void 0;
const record_1 = require("../models/record");
class RecordsController {
    async createRecord(req, res) {
        try {
            const recordData = req.body;
            const newRecord = await record_1.Record.create(recordData);
            res.status(201).json(newRecord);
        }
        catch (error) {
            res.status(500).json({ message: 'Error creating record', error });
        }
    }
    async getRecordById(req, res) {
        try {
            const { id } = req.params;
            const record = await record_1.Record.findByPk(id);
            if (!record) {
                return res.status(404).json({ message: 'Record not found' });
            }
            res.status(200).json(record);
        }
        catch (error) {
            res.status(500).json({ message: 'Error retrieving record', error });
        }
    }
    async getRecords(req, res) {
        try {
            const { type, timestamp } = req.query;
            const filters = {};
            if (type)
                filters.type = type;
            if (timestamp) {
                const ts = Array.isArray(timestamp) ? timestamp[0] : timestamp;
                filters.timestamp = { $gte: new Date(ts) };
            }
            const records = await record_1.Record.findAll({ where: filters });
            res.status(200).json(records);
        }
        catch (error) {
            res.status(500).json({ message: 'Error retrieving records', error });
        }
    }
}
exports.RecordsController = RecordsController;
