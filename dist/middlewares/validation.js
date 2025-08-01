"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateGetRecords = exports.validateGetRecordById = exports.validateCreateRecord = void 0;
const express_validator_1 = require("express-validator");
exports.validateCreateRecord = [
    (0, express_validator_1.body)('type').isString().withMessage('Type must be a string'),
    (0, express_validator_1.body)('timestamp').isISO8601().withMessage('Timestamp must be a valid ISO 8601 date'),
    (0, express_validator_1.body)('data').isJSON().withMessage('Data must be a valid JSON object'),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
exports.validateGetRecordById = [
    (0, express_validator_1.param)('id').isUUID().withMessage('ID must be a valid UUID'),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
exports.validateGetRecords = [
    (0, express_validator_1.query)('type').optional().isString().withMessage('Type must be a string'),
    (0, express_validator_1.query)('timestamp').optional().isISO8601().withMessage('Timestamp must be a valid ISO 8601 date'),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
