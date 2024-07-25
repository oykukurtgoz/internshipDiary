import { NextRequest, NextResponse } from 'next/server';
import prisma from "@/prisma/client"

export async function DELETE(request: NextRequest) {
  
    const { diaryId } = await request.json();

    if (!diaryId) {
        return NextResponse.json({ error: 'Diary ID is required' }, { status: 400 });
    }
    console.log(diaryId, "diaryId");

    try {
        const deletedDiary = await prisma.internshipdb.delete({
            where: {
                id: diaryId,
            },
        });
        return NextResponse.json(deletedDiary, { status: 200 });
    } catch (error) {
        console.error('Failed to delete task:', error);
        return NextResponse.json({ error: 'Failed to delete task' }, { status: 500 });
    }
}
