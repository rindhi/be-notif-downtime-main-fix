import request from 'supertest';
import { app, server, prisma } from './server';

const agent = request.agent(app);

afterAll(async () => {
    await server.close();
    await prisma.$disconnect();
});

describe('History', () => {
    test('should get History list', async () => {
        const data = await prisma.historyKerusakan.findMany();
        const formattedData = data.map((historyKerusakan) => ({
            ...historyKerusakan,
            start_time: historyKerusakan.start_time.toISOString(),
        }));
        const res = await agent.get('/history');

        expect(res.status).toBe(200);
        expect(res.body).toEqual(formattedData);
    });

    test('Test History - All', async () => {
        const newHistory = {
            problemscwsId: 2,
            mesinId: 1,
            lokasiId: 1,
            picId: 2,
            end_time: null,
        };

        // Membuat history baru
        const createRes = await agent.post('/history').send(newHistory);
        expect(createRes.status).toBe(201);

        const id_kerusakan = createRes.body.id_kerusakan;

        // Mendapatkan history berdasarkan ID
        const getByIdRes = await agent.get(`/history/${id_kerusakan}`);
        expect(getByIdRes.status).toBe(200);

        // Memperbarui data history
        const updatedHistory = {
            problemscwsId: 2,
            mesinId: 1,
            lokasiId: 1,
            picId: 2,
            end_time: new Date(),
        };

        const updateRes = await agent.patch(`/history/${id_kerusakan}`).send(updatedHistory);
        expect(updateRes.status).toBe(200);

        // Menghapus history
        const deleteRes = await agent.delete(`/history/${id_kerusakan}`);
        expect(deleteRes.status).toBe(200);
    });
});
