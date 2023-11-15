import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getScw = async (req, res) => {
    try {
        const data = await prisma.problemScw.findMany();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const getScwById = async (req, res) => {
    try {
        const data = await prisma.problemScw.findUnique({
            where: {
                id_scw: Number(req.params.id_scw)
            }
        });
        res.status(200).json(data);
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
};

const createScw = async (req, res) => {
    const { jenis_scw } = req.body;

    if (!jenis_scw) {
        return res.status(404).json({
            message: "Anda mengirimkan data yang salah",
            data: null
        })
    }
    try {
        const scw = await prisma.problemScw.create({
            data: {
                jenis_scw: jenis_scw
            }
        });
        res.status(201).json(scw);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

const updateScw = async (req, res) => {
    const { jenis_scw } = req.body;
    try {
        const scw = await prisma.problemScw.update({
            where: {
                id_scw: Number(req.params.id_scw)
            },
            data: {
                jenis_scw: jenis_scw
            }
        });
        res.status(200).json({
            message: "updated success...",
            scw
        });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

const deleteScw = async (req, res) => {
    try {
        const scw = await prisma.problemScw.delete({
            where: {
                id_scw: Number(req.params.id_scw)
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
    getScw,
    getScwById,
    createScw,
    updateScw,
    deleteScw
};