import { Request, Response, NextFunction } from 'express';
import { body, param, query, validationResult } from 'express-validator';

export const validateCreateRecord = [
    body('type').isString().withMessage('Type must be a string'),
    body('timestamp').isISO8601().withMessage('Timestamp must be a valid ISO 8601 date'),
    body('data').custom((value) => typeof value === 'object' && value !== null && !Array.isArray(value)).withMessage('Data must be a valid JSON object'),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

export const validateGetRecordById = [
    param('id').isUUID().withMessage('ID must be a valid UUID'),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

export const validateGetRecords = [
    query('type').optional().isString().withMessage('Type must be a string'),
    query('timestamp').optional().isISO8601().withMessage('Timestamp must be a valid ISO 8601 date'),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];