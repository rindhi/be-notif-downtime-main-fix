-- CreateTable
CREATE TABLE `Employee` (
    `id_employee` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `tgl_lahir` DATETIME(3) NOT NULL,
    `tempat_lahir` VARCHAR(191) NOT NULL,
    `jenis_kelamin` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `no_hp` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `alamat` VARCHAR(191) NOT NULL,
    `keterangan` VARCHAR(191) NOT NULL,
    `departemenId` INTEGER NULL,
    `jabatanId` INTEGER NULL,

    PRIMARY KEY (`id_employee`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Departemen` (
    `id_department` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_department` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_department`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Jabatan` (
    `id_jabatan` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_jabatan` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_jabatan`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProblemScw` (
    `id_scw` INTEGER NOT NULL AUTO_INCREMENT,
    `jenis_scw` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_scw`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HistoryKerusakan` (
    `id_kerusakan` INTEGER NOT NULL AUTO_INCREMENT,
    `problemscwsId` INTEGER NULL,
    `mesinId` INTEGER NULL,
    `lokasiId` INTEGER NULL,
    `picId` INTEGER NULL,
    `start_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `end_time` DATETIME(3) NULL,

    PRIMARY KEY (`id_kerusakan`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Mesin` (
    `id_mesin` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_mesin` VARCHAR(191) NOT NULL,
    `tipe_mesin` VARCHAR(191) NOT NULL,
    `status_mesins` INTEGER NULL,
    `deskripsi_mesin` VARCHAR(191) NOT NULL,
    `employeeId` INTEGER NULL,

    PRIMARY KEY (`id_mesin`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id_user` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT false,
    `tgl_buat` DATETIME(3) NOT NULL,
    `tgl_update` DATETIME(3) NULL,

    PRIMARY KEY (`id_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Lokasi` (
    `id_lokasi` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_lokasi` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_lokasi`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_departemenId_fkey` FOREIGN KEY (`departemenId`) REFERENCES `Departemen`(`id_department`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_jabatanId_fkey` FOREIGN KEY (`jabatanId`) REFERENCES `Jabatan`(`id_jabatan`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HistoryKerusakan` ADD CONSTRAINT `HistoryKerusakan_problemscwsId_fkey` FOREIGN KEY (`problemscwsId`) REFERENCES `ProblemScw`(`id_scw`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HistoryKerusakan` ADD CONSTRAINT `HistoryKerusakan_mesinId_fkey` FOREIGN KEY (`mesinId`) REFERENCES `Mesin`(`id_mesin`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HistoryKerusakan` ADD CONSTRAINT `HistoryKerusakan_lokasiId_fkey` FOREIGN KEY (`lokasiId`) REFERENCES `Lokasi`(`id_lokasi`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HistoryKerusakan` ADD CONSTRAINT `HistoryKerusakan_picId_fkey` FOREIGN KEY (`picId`) REFERENCES `Employee`(`id_employee`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mesin` ADD CONSTRAINT `Mesin_status_mesins_fkey` FOREIGN KEY (`status_mesins`) REFERENCES `ProblemScw`(`id_scw`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mesin` ADD CONSTRAINT `Mesin_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id_employee`) ON DELETE SET NULL ON UPDATE CASCADE;
