import express from 'express';
const router = express.Router();
import { signup, login, profile, addtask, particulartask,deletetask,updatetask,addsubtask,allsubtask,togglesubtask,deletesubtask} from '../controllers/auth.js';
import middleware from '../middleware/middleware.js';

router.post('/signup', signup);
router.post('/login', login);
router.get('/profile', middleware, profile);
router.post('/addtask', middleware, addtask);
router.get('/particulartask', middleware, particulartask);
router.delete('/deletetask/:id',deletetask)
router.put('/updatetask/:id',updatetask)
router.post('/addsubtask',addsubtask)
router.get('/allsubtask/:task_id',allsubtask)
router.put('/togglesubtask/:id',togglesubtask)
router.delete('/deletesubtask',deletesubtask)

export default router;
