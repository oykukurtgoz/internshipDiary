import { NextRequest, NextResponse } from 'next/server';
import prisma from "@/prisma/client"

export async function DELETE(request: NextRequest,  { params }: { params: { id: string } }) {
    const { id } = params;

    if (!id) {
        return NextResponse.json({ error: 'Task ID is required' }, { status: 400 });
    }
    console.log(id, "taskId");

    try {
        const deletedTask = await prisma.task.delete({
            where: {
                id: Number(id),
            },
        });
        return NextResponse.json(deletedTask, { status: 200 });
    } catch (error) {
        console.error('Failed to delete task:', error);
        return NextResponse.json({ error: 'Failed to delete task' }, { status: 500 });
    }
}