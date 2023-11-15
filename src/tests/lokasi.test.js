import request from 'supertest';
import { app, server, prisma } from './server';

const agent = request.agent(app);

afterAll(async () => {
    await server.close();
    await prisma.$disconnect();
});

describe('Lokasi', () => {
    test('APi lokasi', async () => {

        //GET all Lokasi
        const getLokasiListRes = await agent.get('/lokasi');
        expect(getLokasiListRes.status).toBe(200);

        //Create Lokasi
        const newLokasi = {
            nama_lokasi: 'Gedung B',
        };
        const createLokasiRes = await agent.post('/lokasi').send(newLokasi);
        expect(createLokasiRes.status).toBe(201);

        //GET Lokasi By ID
        const id_lokasi = createLokasiRes.body.id_lokasi;
        const getLokasiByIdRes = await agent.get(`/lokasi/${id_lokasi}`);
        expect(getLokasiByIdRes.status).toBe(200);

        //Update Lokasi
        const updatedLokasi = {
            nama_lokasi: 'Gedung Z',
        };
        const updateLokasiRes = await agent
            .patch(`/lokasi/${id_lokasi}`)
            .send(updatedLokasi);
        expect(updateLokasiRes.status).toBe(200);

        //delete Lokasi
        const deleteLokasiRes = await agent.delete(`/lokasi/${id_lokasi}`);
        expect(deleteLokasiRes.status).toBe(200);
        // Tambahkan assertion lainnya sesuai kebutuhan
    });
});
