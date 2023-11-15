import request from 'supertest';
import { app, server, prisma } from './server';

const agent = request.agent(app);

afterAll(async () => {
    await server.close();
    await prisma.$disconnect();
});

describe('ProblemScw', () => {
    test('APi Problem Scw', async () => {

        //GET all Scw
        const getScwListRes = await agent.get('/scw');
        expect(getScwListRes.status).toBe(200); //OK

        //Create Scw
        const newScw = {
            jenis_scw: 'Mati Total',
        };
        const createScwRes = await agent.post('/scw').send(newScw);
        expect(createScwRes.status).toBe(201);

        //GET Scw By ID
        const id_scw = createScwRes.body.id_scw;
        const getScwByIdRes = await agent.get(`/scw/${id_scw}`);
        expect(getScwByIdRes.status).toBe(200);

        //Update Scw
        const updatedScw = {
            jenis_scw: 'Konseleting Listring Dinamis',
        };
        const updateScwRes = await agent
            .patch(`/scw/${id_scw}`)
            .send(updatedScw);
        expect(updateScwRes.status).toBe(200);

        // delete Scw
        const deleteScwRes = await agent.delete(`/scw/${id_scw}`);
        expect(deleteScwRes.status).toBe(200);
        // Tambahkan assertion lainnya sesuai kebutuhan
    });
});
