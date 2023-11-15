import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getEmployee = async (req, res) => {
    try {
        const data = await prisma.Employee.findMany();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const getEmployeeById = async (req, res) => {
    try {
        const data = await prisma.Employee.findUnique({
            where: {
                id_employee: Number(req.params.id_employee)
            }
        });
        res.status(200).json(data);
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
};

const createEmployee = async (req, res) => {
    const { nama, tgl_lahir, tempat_lahir, jenis_kelamin, email, no_hp, status, alamat, keterangan, departemenId, jabatanId } = req.body;
    try {
        const employee = await prisma.Employee.create({
            data: {
                nama: nama,
                tgl_lahir: tgl_lahir,
                tempat_lahir: tempat_lahir,
                jenis_kelamin: jenis_kelamin,
                email: email,
                no_hp: no_hp,
                status: status,
                alamat: alamat,
                keterangan: keterangan,
                departemenId: departemenId,
                jabatanId: jabatanId,
            }
        });
        res.status(201).json(employee);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

const updateEmployee = async (req, res) => {
    const { nama, tgl_lahir, tempat_lahir, jenis_kelamin, email, no_hp, status, alamat, keterangan, departemenId, jabatanId, mesinId } = req.body;
    try {
        const employee = await prisma.Employee.update({
            where: {
                id_employee: Number(req.params.id_employee)
            },
            data: {
                nama: nama,
                tgl_lahir: tgl_lahir,
                tempat_lahir: tempat_lahir,
                jenis_kelamin: jenis_kelamin,
                email: email,
                no_hp: no_hp,
                status: status,
                alamat: alamat,
                keterangan: keterangan,
                departemenId: departemenId,
                jabatanId: jabatanId,
            }
        });
        res.status(200).json(employee);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

const deleteEmployee = async (req, res) => {
    try {
        const employee = await prisma.Employee.delete({
            where: {
                id_employee: Number(req.params.id_employee)
            }
        });
        res.status(200).json({
            message: "Deleted Success... ",
            employee: null
        });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

export {
    getEmployee,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee
};