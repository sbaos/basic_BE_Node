import express from "express";
import AccessRoute from './access/index.js';
const router = express.Router();
router.get('/', (req, res) => {
    res.send('Hello World!');

});

router.use('/auth', AccessRoute)

export default router;
