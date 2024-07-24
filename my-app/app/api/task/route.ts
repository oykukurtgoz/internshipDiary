import { NextRequest, NextResponse } from "next/server";
import { number, z } from 'zod';
import prisma from "@/prisma/client"
import { TaskState } from "@prisma/client";

const createTaskSchema = z.object({
    title: z.string().min(1, 'Title is required').max(255),
    taskState: z.enum(['TODO', 'INPROGRESS', 'DONE'])
})

    export async function POST(request: NextRequest){
        const body = await request.json();
        const validation = createTaskSchema.safeParse(body)
        if (!validation.success)
            return NextResponse.json(validation.error.format(), {status : 400})
        
        const newCreateTaskSchema = await prisma.task.create({
            data: { title: body.title, taskState: body.taskState }
        })
        return NextResponse.json(newCreateTaskSchema, { status: 201 })
    }

    export async function GET(request: NextRequest) {
        try {
            const tasks = await prisma.task.findMany();
            return NextResponse.json(tasks, { status: 200 });
        } catch (error) {
            console.error(error);
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
        }
    }

export async function DELETE(request: NextRequest,{ params }: { params: { id: number } }) {
    const task = await prisma.task.delete({
        where: {
            id : Number(params.id)
        }
    })
}