const db = require('../models/db');
const fs = require('fs');
const path = require('path');

// const createModal = async (req, res) => {
//     try {
//         const { ProductName, Category, ModelName } = req.body;
//         const productFile = req.file ? req.file.filename : null;

//         console.log('req.file:', req.file);
//         console.log('productFile:', productFile);

//         const sql = 'INSERT INTO newmodal (ProductName, productFile, Category, ModelName) VALUES (?, ?, ?, ?)';
//         const result = await db.queryAsync(sql, [ProductName, productFile, Category, ModelName]);

//         res.status(201).json({ message: 'Modal created successfully', id: result.insertId });
//     } catch (error) {
//         console.error('Error creating Modal:', error);
//         res.status(500).json({ error: 'Error creating Modal' });
//     }
// };

// const getAllModal = async (req, res) => {
//     try {
//         const sql = 'SELECT * FROM newmodal';
//         const results = await db.queryAsync(sql);
//         res.status(200).json(results);
//     } catch (error) {
//         console.error('Error fetching Modal:', error);
//         res.status(500).json({ error: 'Error fetching Modal' });
//     }
// };


const createModal = async (req, res) => {
    try {
        const { ProductName, Category, ModelName } = req.body;
        const productFile = req.file ? req.file.filename : null;

        const sql = 'INSERT INTO newmodal (ProductName, productFile, Category, ModelName) VALUES (?, ?, ?, ?)';
        const result = await db.queryAsync(sql, [ProductName, productFile, Category, ModelName]);

        const fileUrl = productFile ? `${req.protocol}://${req.get('host')}/uploads/${productFile}` : null;

        res.status(201).json({ message: 'Modal created successfully', id: result.insertId, productFile: fileUrl });
    } catch (error) {
        console.error('Error creating Modal:', error);
        res.status(500).json({ error: 'Error creating Modal' });
    }
};

const getAllModal = async (req, res) => {
    try {
        const sql = 'SELECT * FROM newmodal';
        const results = await db.queryAsync(sql);

        const modals = results.map(modal => ({
            ...modal,
            productFile: modal.productFile ? `${req.protocol}://${req.get('host')}/uploads/${modal.productFile}` : null
        }));

        res.status(200).json(modals);
    } catch (error) {
        console.error('Error fetching Modal:', error);
        res.status(500).json({ error: 'Error fetching Modal' });
    }
};


const getModalById = async (req, res) => {
    const { id } = req.params;
    try {
        const sql = 'SELECT * FROM newmodal WHERE id = ?';
        const result = await db.queryAsync(sql, [id]);

        if (result.length === 0) {
            res.status(404).json({ error: 'Modal not found' });
        } else {
            res.status(200).json(result[0]);
        }
    } catch (error) {
        console.error('Error fetching Modal:', error);
        res.status(500).json({ error: 'Error fetching Modal' });
    }
};

const updateModal = async (req, res) => {
    try {
        const { id } = req.params;
        const { ProductName, Category, ModelName } = req.body;
        const productFile = req.file ? req.file.filename : null;

        console.log('req.file:', req.file);
        console.log('productFile:', productFile);

        let sql;
        let params;

        if (productFile) {
            sql = 'UPDATE newmodal SET ProductName = ?, productFile = ?, Category = ?, ModelName = ? WHERE id = ?';
            params = [ProductName, productFile, Category, ModelName, id];
        } else {
            sql = 'UPDATE newmodal SET ProductName = ?, Category = ?, ModelName = ? WHERE id = ?';
            params = [ProductName, Category, ModelName, id];
        }

        const result = await db.queryAsync(sql, params);

        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Modal not found' });
        } else {
            res.status(200).json({ message: 'Modal updated successfully' });
        }
    } catch (error) {
        console.error('Error updating Modal:', error);
        res.status(500).json({ error: 'Error updating Modal' });
    }
};

const deleteModal = async (req, res) => {
    const { id } = req.params;
    try {
        const sql = 'DELETE FROM newmodal WHERE id = ?';
        const result = await db.queryAsync(sql, [id]);

        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Modal not found' });
        } else {
            res.status(204).send();
        }
    } catch (error) {
        console.error('Error deleting Modal:', error);
        res.status(500).json({ error: 'Error deleting Modal' });
    }
};

module.exports = {
    createModal,
    getAllModal,
    getModalById,
    updateModal,
    deleteModal
};
