import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getHistory = async (req, res) => {
    try {
        const data = await prisma.historyKerusakan.findMany();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const getHistoryById = async (req, res) => {
    try {
        const data = await prisma.historyKerusakan.findUnique({
            where: {
                id_kerusakan: Number(req.params.id_kerusakan)
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

const createHistory = async (req, res) => {
    const { problemscwsId, mesinId, lokasiId, picId, start_time } = req.body;

    try {

        const History = await prisma.historyKerusakan.create({
            data: {
                problemscwsId: problemscwsId,
                mesinId: mesinId,
                lokasiId: lokasiId,
                picId: picId,
                start_time: start_time
            }
        });
        res.status(201).json(History);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};


const updateHistory = async (req, res) => {
    const { problemscwsId, mesinId, lokasiId, picId, end_time } = req.body;
    try {
        const History = await prisma.historyKerusakan.update({
            where: {
                id_kerusakan: Number(req.params.id_kerusakan)
            },
            data: {
                problemscwsId: problemscwsId,
                mesinId: mesinId,
                lokasiId: lokasiId,
                picId: picId,
                end_time: new Date()
            }
        });
        res.status(200).json({
            message: "updated success...",
            History
        });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

const deleteHistory = async (req, res) => {
    try {
        const History = await prisma.historyKerusakan.delete({
            where: {
                id_kerusakan: Number(req.params.id_kerusakan)
            }
        });
        res.status(200).json({
            message: "Deleted Success... ",
            History: null
        });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

export {
    getHistory,
    getHistoryById,
    createHistory,
    updateHistory,
    deleteHistory
};