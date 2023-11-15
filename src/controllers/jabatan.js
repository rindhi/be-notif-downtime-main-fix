import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getJabatan = async (req, res) => {
    try {
        const data = await prisma.Jabatan.findMany();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const getJabatanById = async (req, res) => {
    try {
        const data = await prisma.Jabatan.findUnique({
            where: {
                id_jabatan: Number(req.params.id_jabatan)
            }
        });
        res.status(200).json(data);
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
};

const createJabatan = async (req, res) => {
    const { nama_jabatan } = req.body;

    if (!nama_jabatan) {
        return res.status(404).json({
            message: "Anda mengirimkan data yang salah",
            data: null
        })
    }
    try {
        const Jabatan = await prisma.Jabatan.create({
            data: {
                nama_jabatan: nama_jabatan
            }
        });
        res.status(201).json(Jabatan);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

const updateJabatan = async (req, res) => {
    const { nama_jabatan } = req.body;
    try {
        const Jabatan = await prisma.Jabatan.update({
            where: {
                id_jabatan: Number(req.params.id_jabatan)
            },
            data: {
                nama_jabatan: nama_jabatan
            }
        });
        res.status(200).json({
            message: "updated success...",
            Jabatan
        });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

const deleteJabatan = async (req, res) => {
    try {
        const Jabatan = await prisma.Jabatan.delete({
            where: {
                id_jabatan: Number(req.params.id_jabatan)
            }
        });
        res.status(200).json({
            message: "Deleted Success... ",
            scw: null
        });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

export {
    getJabatan,
    getJabatanById,
    createJabatan,
    updateJabatan,
    deleteJabatan
};