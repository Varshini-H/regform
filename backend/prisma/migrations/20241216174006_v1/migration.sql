-- CreateTable
CREATE TABLE `employee` (
    `employeeId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `department` VARCHAR(191) NOT NULL,
    `dateOfJoining` DATETIME(3) NOT NULL,
    `role` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `employee_employeeId_key`(`employeeId`),
    UNIQUE INDEX `employee_email_key`(`email`),
    PRIMARY KEY (`employeeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
