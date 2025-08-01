import { Router } from 'express';
import { RecordsController } from '../controllers/recordsController';
import { validateCreateRecord } from '../middlewares/validation';

const router = Router();
const recordsController = new RecordsController();

router.post('/records', validateCreateRecord, recordsController.createRecord.bind(recordsController));
router.get('/records/:id', recordsController.getRecordById.bind(recordsController));
router.get('/records', recordsController.getRecords.bind(recordsController));

export default router;