const express = require('express');
const cors = require('cors');
const pool = require('./db');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Check if the backend is working
app.get('/api', (req, res) => {
    res.json({
        message: 'Portfolio API is working!'
    });
});

// Get projects from PostgreSQL
app.get('/api/projects', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM projects ORDER BY id ASC'
        );

        res.json(result.rows);
    } catch (error) {
        console.error('Database error:', error.message);

        res.status(500).json({
            message: 'Could not load projects.'
        });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Backend running at http://localhost:${PORT}`);
});