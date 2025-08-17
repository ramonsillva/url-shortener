class UrlController {
    constructor(urlService) {
        this.urlService = urlService || new InMemoryUrlService();
    }

    async createShortUrl(req, res) {
        try {
            console.log('createShortUrl body:', req.body);
            const originalUrl = req.body.originalUrl || req.body.url;
            if (!originalUrl) return res.status(400).json({ error: 'originalUrl é obrigatório' });

            const shortCode = await this.urlService.createShortUrl(originalUrl);

            const host = req.get('host');
            const protocol = req.protocol || 'http';
            const base = req.baseUrl || '';
            const shortUrl = `${protocol}://${host}${base}/${shortCode}`;

            res.status(201).json({ shortUrl });
        } catch (error) {
            console.error('createShortUrl error:', error);
            return res.status(500).json({ error: 'Erro ao criar short URL' });
        }
    }

    async getShortUrl(req, res) {
        try {
            const { shortUrl } = req.params;
            if (!shortUrl) return res.status(400).json({ error: 'shortUrl é obrigatório' });

            const originalUrl = await this.urlService.getOriginalUrl(shortUrl);
            if (originalUrl) {
                return res.redirect(originalUrl);
            } else {
                return res.status(404).json({ error: 'Short URL not found' });
            }
        } catch (error) {
            console.error('getShortUrl error:', error);
            return res.status(500).json({ error: 'Erro no redirecionamento' });
        }
    }
}

// Serviço simples em memória usado como fallback (não persistente)
class InMemoryUrlService {
    constructor() {
        this.map = new Map(); // shortCode -> originalUrl
        this.chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    }

    async createShortUrl(originalUrl) {
        let code;
        do {
            code = this._randomCode(6);
        } while (this.map.has(code));
        this.map.set(code, originalUrl);
        return code;
    }

    async getOriginalUrl(shortCode) {
        return this.map.get(shortCode) || null;
    }

    _randomCode(length) {
        let out = '';
        for (let i = 0; i < length; i++) {
            out += this.chars.charAt(Math.floor(Math.random() * this.chars.length));
        }
        return out;
    }
}

module.exports = UrlController;