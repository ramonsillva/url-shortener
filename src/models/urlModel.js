import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const UrlModel = {
    create: async (urlData) => {
        return await prisma.url.create({
            data: urlData,
        });
    },
    findById: async (id) => {
        return await prisma.url.findUnique({
            where: { id },
        });
    },
    findByShortUrl: async (shortUrl) => {
        return await prisma.url.findUnique({
            where: { shortUrl },
        });
    },
    findAll: async () => {
        return await prisma.url.findMany();
    },
};

export default UrlModel;