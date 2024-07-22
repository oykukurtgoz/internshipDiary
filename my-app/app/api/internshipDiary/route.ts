import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod';
import prisma from "@/prisma/client"

const createInternshipDiarySchema = z.object({
    title: z.string().min(1).max(255),
    description: z.string().min(1)
})
export async function POST(request: NextRequest){
    const body = await request.json();
    const validation = createInternshipDiarySchema.safeParse(body)
    if (!validation.success)
        return NextResponse.json(validation.error.errors, {status : 400})
    
    const newInternshipDiary = await prisma.internshipdb.create({
        data: { title: body.title, description: body.description }
    })
    return NextResponse.json(newInternshipDiary, { status: 201 })
}