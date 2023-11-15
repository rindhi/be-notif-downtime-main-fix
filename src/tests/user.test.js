import request from 'supertest';
import bcrypt from 'bcrypt';
import { app, server, prisma } from './server';

const agent = request.agent(app);

afterAll(async () => {
    await server.close();
    await prisma.$disconnect();
});

describe('User', () => {
    test('API Users test to db', async () => {
        // GET all Users
        const getUserListRes = await agent.get('/user');
        expect(getUserListRes.status).toBe(200);

        // Create User
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash("inipasswordWoyy", salt);
        const newUser = {
            nama: "andori bekham",
            username: "awwAndori",
            password: hashedPassword,
            status: true,
            tgl_buat: new Date()
        };
        const createUserRes = await agent.post('/user').send(newUser);
        expect(createUserRes.status).toBe(201);

        // GET User By ID
        const id_user = createUserRes.body.id_user;
        const getUserByIdRes = await agent.get(`/user/${id_user}`);
        expect(getUserByIdRes.status).toBe(200);

        // Update User
        const updatedUser = {
            nama: "andori bekham updated",
            username: "awwAndoriUpdated",
            password: await bcrypt.hash("inipasswogsWoyy", salt),
            status: true,
            tgl_buat: new Date()
        };
        const updateUserRes = await agent
            .patch(`/user/${id_user}`)
            .send(updatedUser);
        expect(updateUserRes.status).toBe(200);

    });
});
