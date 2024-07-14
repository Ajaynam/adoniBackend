const express = require('express');
const router = express.Router();
const productController = require('../controllers/modalController');
const upload = require('../middleware/modalMiddleware');

router.post('/new_modal', upload.single('productFile'), productController.createModal);
router.get('/get_modal', productController.getAllModal);
router.get('/get_modal/:id', productController.getModalById);
router.put('/update_modal/:id', upload.single('productFile'), productController.updateModal);
router.delete('/remove_modal/:id', productController.deleteModal);

module.exports = router;
