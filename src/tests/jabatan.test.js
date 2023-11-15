import request from 'supertest';
import { app, server, prisma } from './server';

const agent = request.agent(app);

afterAll(async () => {
    await server.close();
    await prisma.$disconnect();
});

describe('Jabatan', () => {
    test('should get Jabatan list', async () => {

        //GET all Jabatan
        const getJabatanListRes = await agent.get('/jabatan');
        expect(getJabatanListRes.status).toBe(200);

        //Create Jabatan
        const newJabatan = {
            nama_jabatan: 'Manager',
        };
        const createJabatanRes = await agent.post('/jabatan').send(newJabatan);
        expect(createJabatanRes.status).toBe(201);

        //GET Jabatan By ID
        const id_jabatan = createJabatanRes.body.id_jabatan;
        const getJabatanByIdRes = await agent.get(`/jabatan/${id_jabatan}`);
        expect(getJabatanByIdRes.status).toBe(200);

        //Update Jabatan
        const updatedJabatan = {
            nama_jabatan: 'Supervisor',
        };
        const updateJabatanRes = await agent
            .patch(`/jabatan/${id_jabatan}`)
            .send(updatedJabatan);
        expect(updateJabatanRes.status).toBe(200);

        //delete Jabatan
        const deleteJabatanRes = await agent.delete(`/jabatan/${id_jabatan}`);
        expect(deleteJabatanRes.status).toBe(200);
        // Tambahkan assertion lainnya sesuai kebutuhan
    });
});
