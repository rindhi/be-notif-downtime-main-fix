import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getMesin = async (req, res) => {
    try {
        const data = await prisma.Mesin.findMany();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const getMesinById = async (req, res) => {
    try {
        const data = await prisma.Mesin.findUnique({
            where: {
                id_mesin: Number(req.params.id_mesin)
            }
        });
        res.status(200).json(data);
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
};

// if (!nama_mesin | !tipe_mesin | !status_mesin | !dekripsi_mesin) {
//     return res.status(404).json({
//         message: "Anda mengirimkan data yang salah",
//         data: null
//     })
// } 

const createMesin = async (req, res) => {
    const { nama_mesin, tipe_mesin, deskripsi_mesin, status_mesins, employeeId } = req.body;

    try {

        const Mesin = await prisma.Mesin.create({
            data: {
                nama_mesin: nama_mesin,
                tipe_mesin: tipe_mesin,
                status_mesins: status_mesins,
                deskripsi_mesin: deskripsi_mesin,
                employeeId: employeeId
            }
        });
        res.status(201).json(Mesin);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};




const updateMesin = async (req, res) => {
    const { nama_mesin, tipe_mesin, status_mesins, deskripsi_mesin, employeeId } = req.body;
    try {
        const Mesin = await prisma.Mesin.update({
            where: {
                id_mesin: Number(req.params.id_mesin)
            },
            data: {
                nama_mesin: nama_mesin,
                tipe_mesin: tipe_mesin,
                status_mesins: status_mesins,
                deskripsi_mesin: deskripsi_mesin,
                employeeId: employeeId
            }
        });
        res.status(200).json({
            message: "updated success...",
            Mesin
        });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

const deleteMesin = async (req, res) => {
    try {
        const Mesin = await prisma.Mesin.delete({
            where: {
                id_mesin: Number(req.params.id_mesin)
            }
        });
        res.status(200).json({
            message: "Deleted Success... ",
            Mesin: null
        });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

export {
    getMesin,
    getMesinById,
    createMesin,
    updateMesin,
    deleteMesin
};