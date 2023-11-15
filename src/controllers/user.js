import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const getUser = async (req, res) => {
    try {
        const data = await prisma.User.findMany();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const data = await prisma.User.findUnique({
            where: {
                id_user: Number(req.params.id_user)
            }
        });
        res.status(200).json(data);
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
};

// if (!jenis_scw) {
//     return res.status(404).json({
//         message: "Anda mengirimkan data yang salah",
//         data: null
//     })
// }

const createUser = async (req, res) => {
    const { nama, username, password } = req.body;

    try {
        // Menghasilkan salt yang digunakan untuk mengenkripsi password
        const salt = await bcrypt.genSalt(10);

        // Mengenkripsi password menggunakan salt yang dihasilkan
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await prisma.User.create({
            data: {
                nama: nama,
                username: username,
                password: hashedPassword, // Simpan password yang telah dienkripsi
                status: true,
                tgl_buat: new Date(),
            },
        });
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};


const updateUser = async (req, res) => {
    const { nama, username, password, status } = req.body;
    try {
        // Menghasilkan salt yang digunakan untuk mengenkripsi password
        const salt = await bcrypt.genSalt(10);

        // Mengenkripsi password menggunakan salt yang dihasilkan
        const hashedPassword = await bcrypt.hash(password, salt);


        const user = await prisma.User.update({
            where: {
                id_user: Number(req.params.id_user)
            },
            data: {
                nama: nama,
                username: username,
                password: hashedPassword,
                status: status,
                tgl_update: new Date()
            }
        });
        res.status(200).json({
            message: "updated success...",
            user
        });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

export {
    getUser,
    getUserById,
    createUser,
    updateUser,
};