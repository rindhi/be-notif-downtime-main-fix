import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getDepartemen = async (req, res) => {
    try {
        const data = await prisma.departemen.findMany();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const getDepartemenById = async (req, res) => {
    try {
        const data = await prisma.departemen.findUnique({
            where: {
                id_department: Number(req.params.id_department)
            }
        });
        res.status(200).json(data);
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
};

const createDepartemen = async (req, res) => {
    const { nama_department } = req.body;

    if (!nama_department) {
        return res.status(404).json({
            message: "Anda mengirimkan data yang salah",
            data: null
        })
    }
    try {
        const departemen = await prisma.departemen.create({
            data: {
                nama_department: nama_department
            }
        });
        res.status(201).json(departemen);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

const updateDepartemen = async (req, res) => {
    const { nama_department } = req.body;
    try {
        const departemen = await prisma.departemen.update({
            where: {
                id_department: Number(req.params.id_department)
            },
            data: {
                nama_department: nama_department
            }
        });
        res.status(200).json({
            message: "updated success...",
            departemen
        });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

const deleteDepartemen = async (req, res) => {
    try {
        const departemen = await prisma.departemen.delete({
            where: {
                id_department: Number(req.params.id_department)
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
    getDepartemen,
    getDepartemenById,
    createDepartemen,
    updateDepartemen,
    deleteDepartemen
};