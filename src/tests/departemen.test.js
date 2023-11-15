import request from 'supertest';
import { app, server, prisma } from './server';

const agent = request.agent(app);

afterAll(async () => {
    await server.close();
    await prisma.$disconnect();
});

describe('Departemen', () => {
    test('should get departemen list', async () => {
        const data = await prisma.departemen.findMany();
        const res = await agent.get('/departemen');

        expect(res.status).toBe(200);
        expect(res.body).toEqual(data);
    });

    test('Test department - All', async () => {
        const newDepartemen = {
            nama_department: 'konten digital'
        };

        // Membuat departemen baru
        const createRes = await agent.post('/departemen').send(newDepartemen);
        expect(createRes.status).toBe(201);
        expect(createRes.body.nama_department).toBe(newDepartemen.nama_department);

        const id_department = createRes.body.id_department;

        // Mendapatkan departemen berdasarkan ID
        const getByIdRes = await agent.get(`/departemen/${id_department}`);
        expect(getByIdRes.status).toBe(200);
        expect(getByIdRes.body.nama_department).toBe(newDepartemen.nama_department);

        // Memperbarui nama departemen
        const updatedDepartemen = {
            nama_department: 'konten digital baru'
        };
        const updateRes = await agent.patch(`/departemen/${id_department}`).send(updatedDepartemen);
        expect(updateRes.status).toBe(200);

        // Mendapatkan departemen setelah diperbarui
        const getUpdatedRes = await agent.get(`/departemen/${id_department}`);
        expect(getUpdatedRes.status).toBe(200);
        expect(getUpdatedRes.body.nama_department).toBe(updatedDepartemen.nama_department);

        // Menghapus departemen
        const deleteRes = await agent.delete(`/departemen/${id_department}`);
        expect(deleteRes.status).toBe(200);
    });



});
