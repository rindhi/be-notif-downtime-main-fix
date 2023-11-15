import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getLokasi = async (req, res) => {
    try {
        const data = await prisma.lokasi.findMany();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const getLokasiById = async (req, res) => {
    try {
        const data = await prisma.lokasi.findUnique({
            where: {
                id_lokasi: Number(req.params.id_lokasi)
            }
        });
        res.status(200).json(data);
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
};

const createLokasi = async (req, res) => {
    const { nama_lokasi } = req.body;

    if (!nama_lokasi) {
        return res.status(404).json({
            message: "Anda mengirimkan data yang salah",
            data: null
        })
    }
    try {
        const lokasi = await prisma.lokasi.create({
            data: {
                nama_lokasi: nama_lokasi,
            }
        });
        res.status(201).json(lokasi);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

const updateLokasi = async (req, res) => {
    const { nama_lokasi } = req.body;
    try {
        const lokasi = await prisma.lokasi.update({
            where: {
                id_lokasi: Number(req.params.id_lokasi)
            },
            data: {
                nama_lokasi: nama_lokasi
            }
        });
        res.status(200).json({
            message: "updated success...",
            lokasi
        });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

const deleteLokasi = async (req, res) => {
    try {
        const lokasi = await prisma.lokasi.delete({
            where: {
                id_lokasi: Number(req.params.id_lokasi)
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
    getLokasi,
    getLokasiById,
    createLokasi,
    updateLokasi,
    deleteLokasi
};