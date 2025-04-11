/*
  Warnings:

  - You are about to drop the `accountspayable` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `accountsreceivable` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `bankaccount_holder` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `billing` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cashflowentries` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `incominginvoice` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `outgoinginvoice` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `paymentmethod` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `registers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `remittance` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "accountspayable" DROP CONSTRAINT "fk_accountspayable_2";

-- DropForeignKey
ALTER TABLE "accountspayable" DROP CONSTRAINT "fk_accountspayable_3";

-- DropForeignKey
ALTER TABLE "accountspayable" DROP CONSTRAINT "fk_accountspayable_4";

-- DropForeignKey
ALTER TABLE "accountspayable" DROP CONSTRAINT "fk_accountspayable_5";

-- DropForeignKey
ALTER TABLE "accountspayable" DROP CONSTRAINT "fk_accountspayable_6";

-- DropForeignKey
ALTER TABLE "accountsreceivable" DROP CONSTRAINT "fk_accountsreceivable_2";

-- DropForeignKey
ALTER TABLE "accountsreceivable" DROP CONSTRAINT "fk_accountsreceivable_3";

-- DropForeignKey
ALTER TABLE "accountsreceivable" DROP CONSTRAINT "fk_accountsreceivable_4";

-- DropForeignKey
ALTER TABLE "accountsreceivable" DROP CONSTRAINT "fk_accountsreceivable_5";

-- DropForeignKey
ALTER TABLE "accountsreceivable" DROP CONSTRAINT "fk_accountsreceivable_6";

-- DropForeignKey
ALTER TABLE "billing" DROP CONSTRAINT "fk_billing_2";

-- DropForeignKey
ALTER TABLE "cashflowentries" DROP CONSTRAINT "fk_cashflowentries_2";

-- DropForeignKey
ALTER TABLE "cashflowentries" DROP CONSTRAINT "fk_cashflowentries_3";

-- DropForeignKey
ALTER TABLE "outgoinginvoice" DROP CONSTRAINT "fk_outgoinginvoice_2";

-- DropForeignKey
ALTER TABLE "registers" DROP CONSTRAINT "fk_registers_1";

-- DropForeignKey
ALTER TABLE "registers" DROP CONSTRAINT "fk_registers_2";

-- DropForeignKey
ALTER TABLE "remittance" DROP CONSTRAINT "fk_remittance_2";

-- DropTable
DROP TABLE "accountspayable";

-- DropTable
DROP TABLE "accountsreceivable";

-- DropTable
DROP TABLE "bankaccount_holder";

-- DropTable
DROP TABLE "billing";

-- DropTable
DROP TABLE "cashflowentries";

-- DropTable
DROP TABLE "incominginvoice";

-- DropTable
DROP TABLE "outgoinginvoice";

-- DropTable
DROP TABLE "paymentmethod";

-- DropTable
DROP TABLE "registers";

-- DropTable
DROP TABLE "remittance";

-- DropTable
DROP TABLE "user";

-- CreateTable
CREATE TABLE "AccountPayable" (
    "id" SERIAL NOT NULL,
    "document" VARCHAR(30),
    "amount" DECIMAL(15,2),
    "amount_paid" DECIMAL(15,2),
    "issue_date" DATE,
    "due_date" DATE,
    "payment_date" DATE,
    "status" VARCHAR(20),
    "fk_user_id" INTEGER,

    CONSTRAINT "AccountPayable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccountReceivable" (
    "id" SERIAL NOT NULL,
    "document" VARCHAR(30),
    "amount" DECIMAL(15,2),
    "amount_received" DECIMAL(15,2),
    "issue_date" DATE,
    "due_date" DATE,
    "receipt_date" DATE,
    "status" VARCHAR(20),
    "fk_user_id" INTEGER,

    CONSTRAINT "AccountReceivable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CashFlowEntry" (
    "id" SERIAL NOT NULL,
    "type" VARCHAR(20),
    "amount" DECIMAL(15,2),
    "date" DATE,
    "description" VARCHAR(100),
    "reference_document" VARCHAR(30),
    "reconciled" BOOLEAN,
    "fk_user_id" INTEGER,

    CONSTRAINT "CashFlowEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(50),
    "email" VARCHAR(100),
    "password" VARCHAR(255),
    "full_name" VARCHAR(100),
    "active" BOOLEAN,
    "creation_date" TIMESTAMP(6),
    "last_login" TIMESTAMP(6),
    "role" VARCHAR(50),
    "recovery_token" VARCHAR(255),
    "token_expiry" TIMESTAMP(6),
    "login_attempts" INTEGER DEFAULT 0,
    "lock_until" TIMESTAMP(6),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "AccountPayable" ADD CONSTRAINT "AccountPayable_fk_user_id_fkey" FOREIGN KEY ("fk_user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "AccountReceivable" ADD CONSTRAINT "AccountReceivable_fk_user_id_fkey" FOREIGN KEY ("fk_user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "CashFlowEntry" ADD CONSTRAINT "CashFlowEntry_fk_user_id_fkey" FOREIGN KEY ("fk_user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
