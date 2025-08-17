const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const UrlController = require('../controllers/UrlController');
const urlController = (typeof UrlController === 'function') ? new UrlController() : UrlController;

// GET /api/urls/ -> serve index.html
router.get('/', (req, res) => {
    const indexPath = path.resolve(__dirname, '../../public/index.html');
    if (fs.existsSync(indexPath)) return res.sendFile(indexPath);
    return res.type('html').send('<h1>URL Shortener</h1><p>Use POST /api/urls para criar short URLs</p>');
});

// POST /api/urls/ -> cria short URL
router.post('/', (req, res, next) => urlController.createShortUrl(req, res, next));

// GET /api/urls/:shortUrl -> redireciona
router.get('/:shortUrl', (req, res, next) => urlController.getShortUrl(req, res, next));

module.exports = router;