class UrlService {
    constructor(prismaClient) {
        this.prisma = prismaClient;
    }

    async createShortUrl(originalUrl) {
        const shortUrl = this.generateShortUrl(originalUrl);
        const urlEntry = await this.prisma.url.create({
            data: {
                originalUrl,
                shortUrl,
            },
        });
        return urlEntry;
    }

    async getOriginalUrl(shortUrl) {
        const urlEntry = await this.prisma.url.findUnique({
            where: { shortUrl },
        });
        return urlEntry ? urlEntry.originalUrl : null;
    }

    generateShortUrl(originalUrl) {
        const uniqueId = Math.random().toString(36).substring(2, 8);
        return `${process.env.BASE_URL}/${uniqueId}`;
    }
}

export default UrlService;