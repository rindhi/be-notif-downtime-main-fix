import request from 'supertest';
import { app, server, prisma } from './server';

const agent = request.agent(app);

afterAll(async () => {
    await server.close();
    await prisma.$disconnect();
});

describe('Mesin', () => {
    test('APi Mesin', async () => {

        //GET all Mesin
        const getMesinListRes = await agent.get('/mesin');
        expect(getMesinListRes.status).toBe(200);

        //Create Mesin
        const newMesin = {
            nama_mesin: "Buldoser Domba",
            tipe_mesin: "Alat Berat",
            status_mesins: 2,
            deskripsi_mesin: "Mesin dengan kecepatan lambatn tapi tenaganya berat",
            employeeId: 2
        };
        const createMesinRes = await agent.post('/mesin').send(newMesin);
        expect(createMesinRes.status).toBe(201);

        //GET Mesin By ID
        const id_mesin = createMesinRes.body.id_mesin;
        const getMesinByIdRes = await agent.get(`/mesin/${id_mesin}`);
        expect(getMesinByIdRes.status).toBe(200);

        //Update Mesin
        const updatedMesin = {
            nama_mesin: "Buldoser Domba Updated",
            tipe_mesin: "Alat Berat Updated",
            status_mesins: 2,
            deskripsi_mesin: "Mesin dengan kecepatan lambatn tapi tenaganya berat",
            employeeId: 7
        };
        const updateMesinRes = await agent
            .patch(`/mesin/${id_mesin}`)
            .send(updatedMesin);
        expect(updateMesinRes.status).toBe(200);

        //delete Mesin
        const deleteMesinRes = await agent.delete(`/mesin/${id_mesin}`);
        expect(deleteMesinRes.status).toBe(200);
        // Tambahkan assertion lainnya sesuai kebutuhan
    });
});
