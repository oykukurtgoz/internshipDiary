-- CreateEnum
CREATE TYPE "TaskState" AS ENUM ('TODO', 'INPROGRESS', 'DONE');

-- CreateTable
CREATE TABLE "task" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR NOT NULL,
    "description" TEXT NOT NULL,
    "taskstate" "TaskState" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "task_pkey" PRIMARY KEY ("id")
);
