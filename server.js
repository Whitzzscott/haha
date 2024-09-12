const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const app = express();
const PORT = 3000;

const VIEW_COUNT_FILE = path.join(__dirname, 'viewCount.json');

app.use(express.static(__dirname));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/view-count', async (req, res) => {
    try {
        const data = await fs.readFile(VIEW_COUNT_FILE, 'utf8');
        res.json(JSON.parse(data));
    } catch (err) {
        console.error('Error reading view count:', err);
        res.status(500).send('Error reading view count');
    }
});

app.post('/update-view-count', async (req, res) => {
    try {
        const data = await fs.readFile(VIEW_COUNT_FILE, 'utf8');
        const viewCountData = JSON.parse(data);
        viewCountData.count += 1;
        await fs.writeFile(VIEW_COUNT_FILE, JSON.stringify(viewCountData));
        res.json(viewCountData);
    } catch (err) {
        console.error('Error updating view count:', err);
        res.status(500).send('Error updating view count');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
