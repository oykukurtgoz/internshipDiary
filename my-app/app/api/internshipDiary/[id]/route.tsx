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
        console.error('Failed to delete diary:', error);
        return NextResponse.json({ error: 'Failed to delete diary' }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest) {
    const body = await request.json();
    
    if (!body.data.diaryId) {
        return NextResponse.json({ error: 'Diary ID is required' }, { status: 400 });
    }

    try {
        const updatedDiary = await prisma.internshipdb.update({
            where: { id: body.data.diaryId },
            data: {
                title: body.data.title,
                description: body.data.description
            }
        });
        return NextResponse.json(updatedDiary, { status: 200 });
    } catch (error) {
        console.error('Failed to update diary:', error);
        return NextResponse.json({ error: 'Failed to update diary' }, { status: 500 });
    }
}