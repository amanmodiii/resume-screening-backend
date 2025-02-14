/*
  Warnings:

  - Added the required column `name` to the `Resume` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `parsedData` on the `Resume` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Resume" ADD COLUMN     "name" TEXT NOT NULL,
DROP COLUMN "parsedData",
ADD COLUMN     "parsedData" JSONB NOT NULL;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
