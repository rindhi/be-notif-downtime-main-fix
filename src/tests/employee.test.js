import request from 'supertest';
import { app, server, prisma } from './server';

const agent = request.agent(app);

afterAll(async () => {
    await server.close();
    await prisma.$disconnect();
});

describe('Employee', () => {
    test('should get employee list', async () => {
        const data = await prisma.employee.findMany();
        const formattedData = data.map((employee) => ({
            ...employee,
            tgl_lahir: employee.tgl_lahir.toISOString(),
        }));

        const res = await agent.get('/employee');

        expect(res.status).toBe(200);
        expect(res.body).toEqual(formattedData);
    });

    test('Test employee - All', async () => {
        const newEmployee = {
            "nama": "Citra Ayuti",
            "tgl_lahir": "2007-12-23T18:25:43.511Z",
            "tempat_lahir": "Pemalang",
            "jenis_kelamin": "Laki-laki",
            "email": "alifzulfan@gmail.com",
            "no_hp": "087654868877",
            "status": "active",
            "alamat": "Pedurungan Asri, Pemalang",
            "keterangan": "sering bolos nih...",
            "departemenId": 1,
            "jabatanId": 3
        };

        // Membuat karyawan baru
        const createRes = await agent.post('/employee').send(newEmployee);
        expect(createRes.status).toBe(201);

        const expectedEmployee = { ...newEmployee, id_employee: createRes.body.id_employee };

        expect(createRes.body).toEqual(expectedEmployee);

        const id_employee = createRes.body.id_employee;

        // Mendapatkan karyawan berdasarkan ID
        const getByIdRes = await agent.get(`/employee/${id_employee}`);
        expect(getByIdRes.status).toBe(200);
        expect(getByIdRes.body).toEqual(expectedEmployee);

        // Memperbarui data karyawan
        const updatedEmployee = {
            "nama": "Lumban Tobing Updated",
            "tgl_lahir": "2007-12-23T18:25:43.511Z",
            "tempat_lahir": "Pemalang",
            "jenis_kelamin": "Laki-laki",
            "email": "alifzulfan@gmail.com",
            "no_hp": "087654868877",
            "status": "active",
            "alamat": "Pedurungan Asri, Pemalang",
            "keterangan": "sering bolos nih...",
            "departemenId": 1,
            "jabatanId": 3
        };
        const updateRes = await agent.patch(`/employee/${id_employee}`).send(updatedEmployee);
        expect(updateRes.status).toBe(200);

        const expectedUpdatedEmployee = { ...updatedEmployee, id_employee };

        // Mendapatkan karyawan setelah diperbarui
        const getUpdatedRes = await agent.get(`/employee/${id_employee}`);
        expect(getUpdatedRes.status).toBe(200);
        expect(getUpdatedRes.body).toEqual(expectedUpdatedEmployee);

        // Menghapus karyawan
        const deleteRes = await agent.delete(`/employee/${id_employee}`);
        expect(deleteRes.status).toBe(200);
    });


});
