-- CreateTable
CREATE TABLE "registers" (
    "fk_user_id" INTEGER NOT NULL,
    "fk_bankaccount_holder_id" INTEGER NOT NULL,

    CONSTRAINT "registers_pkey" PRIMARY KEY ("fk_user_id","fk_bankaccount_holder_id")
);

-- CreateTable
CREATE TABLE "bankaccount_holder" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100),
    "bank" VARCHAR(100),
    "agency" VARCHAR(20),
    "account" VARCHAR(20),
    "balance" DECIMAL(15,2),
    "active" BOOLEAN,
    "responsible_user" INTEGER,

    CONSTRAINT "bankaccount_holder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accountspayable" (
    "id" SERIAL NOT NULL,
    "document" VARCHAR(30),
    "amount" DECIMAL(15,2),
    "amount_paid" DECIMAL(15,2),
    "issue_date" DATE,
    "due_date" DATE,
    "payment_date" DATE,
    "status" VARCHAR(20),
    "fk_user_id" INTEGER,
    "fk_bankaccount_holder_id" INTEGER,
    "fk_paymentmethod_id" INTEGER,
    "fk_incominginvoice_id" INTEGER,
    "fk_billing_id" INTEGER,

    CONSTRAINT "accountspayable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accountsreceivable" (
    "id" SERIAL NOT NULL,
    "document" VARCHAR(30),
    "amount" DECIMAL(15,2),
    "amount_received" DECIMAL(15,2),
    "issue_date" DATE,
    "due_date" DATE,
    "receipt_date" DATE,
    "status" VARCHAR(20),
    "fk_user_id" INTEGER,
    "fk_bankaccount_holder_id" INTEGER,
    "fk_paymentmethod_id" INTEGER,
    "fk_outgoinginvoice_id" INTEGER,
    "fk_billing_id" INTEGER,

    CONSTRAINT "accountsreceivable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "billing" (
    "id" SERIAL NOT NULL,
    "start_date" DATE,
    "end_date" DATE,
    "total_received" DECIMAL(15,2),
    "total_to_receive" DECIMAL(15,2),
    "total_paid" DECIMAL(15,2),
    "total_to_pay" DECIMAL(15,2),
    "final_balance" DECIMAL(15,2),
    "status" VARCHAR(20),
    "fk_user_id" INTEGER,

    CONSTRAINT "billing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "paymentmethod" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100),
    "fiscal_code" VARCHAR(20),

    CONSTRAINT "paymentmethod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cashflowentries" (
    "id" SERIAL NOT NULL,
    "type" VARCHAR(20),
    "amount" DECIMAL(15,2),
    "date" DATE,
    "description" VARCHAR(100),
    "reference_document" VARCHAR(30),
    "reconciled" BOOLEAN,
    "fk_user_id" INTEGER,
    "fk_bankaccount_holder_id" INTEGER,

    CONSTRAINT "cashflowentries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "incominginvoice" (
    "id" SERIAL NOT NULL,
    "number" VARCHAR(20),
    "series" VARCHAR(10),
    "issue_date" DATE,
    "entry_date" DATE,
    "total_amount" DECIMAL(15,2),
    "access_key" VARCHAR(44),
    "status" VARCHAR(20),

    CONSTRAINT "incominginvoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "outgoinginvoice" (
    "id" SERIAL NOT NULL,
    "number" VARCHAR(20),
    "series" VARCHAR(10),
    "issue_date" DATE,
    "total_amount" DECIMAL(15,2),
    "access_key" VARCHAR(44),
    "status" VARCHAR(20),
    "fk_paymentmethod_id" INTEGER,

    CONSTRAINT "outgoinginvoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "remittance" (
    "id" SERIAL NOT NULL,
    "generation_date" DATE,
    "send_date" DATE,
    "titles_quantity" INTEGER,
    "total_amount" DECIMAL(15,2),
    "status" VARCHAR(20),
    "file" VARCHAR(255),
    "fk_bankaccount_holder_id" INTEGER,

    CONSTRAINT "remittance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
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

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "registers" ADD CONSTRAINT "fk_registers_1" FOREIGN KEY ("fk_user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "registers" ADD CONSTRAINT "fk_registers_2" FOREIGN KEY ("fk_bankaccount_holder_id") REFERENCES "bankaccount_holder"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "accountspayable" ADD CONSTRAINT "fk_accountspayable_2" FOREIGN KEY ("fk_user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "accountspayable" ADD CONSTRAINT "fk_accountspayable_3" FOREIGN KEY ("fk_bankaccount_holder_id") REFERENCES "bankaccount_holder"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "accountspayable" ADD CONSTRAINT "fk_accountspayable_4" FOREIGN KEY ("fk_paymentmethod_id") REFERENCES "paymentmethod"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "accountspayable" ADD CONSTRAINT "fk_accountspayable_5" FOREIGN KEY ("fk_incominginvoice_id") REFERENCES "incominginvoice"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "accountspayable" ADD CONSTRAINT "fk_accountspayable_6" FOREIGN KEY ("fk_billing_id") REFERENCES "billing"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "accountsreceivable" ADD CONSTRAINT "fk_accountsreceivable_2" FOREIGN KEY ("fk_user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "accountsreceivable" ADD CONSTRAINT "fk_accountsreceivable_3" FOREIGN KEY ("fk_bankaccount_holder_id") REFERENCES "bankaccount_holder"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "accountsreceivable" ADD CONSTRAINT "fk_accountsreceivable_4" FOREIGN KEY ("fk_paymentmethod_id") REFERENCES "paymentmethod"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "accountsreceivable" ADD CONSTRAINT "fk_accountsreceivable_5" FOREIGN KEY ("fk_outgoinginvoice_id") REFERENCES "outgoinginvoice"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "accountsreceivable" ADD CONSTRAINT "fk_accountsreceivable_6" FOREIGN KEY ("fk_billing_id") REFERENCES "billing"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "billing" ADD CONSTRAINT "fk_billing_2" FOREIGN KEY ("fk_user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cashflowentries" ADD CONSTRAINT "fk_cashflowentries_2" FOREIGN KEY ("fk_user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cashflowentries" ADD CONSTRAINT "fk_cashflowentries_3" FOREIGN KEY ("fk_bankaccount_holder_id") REFERENCES "bankaccount_holder"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "outgoinginvoice" ADD CONSTRAINT "fk_outgoinginvoice_2" FOREIGN KEY ("fk_paymentmethod_id") REFERENCES "paymentmethod"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "remittance" ADD CONSTRAINT "fk_remittance_2" FOREIGN KEY ("fk_bankaccount_holder_id") REFERENCES "bankaccount_holder"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
