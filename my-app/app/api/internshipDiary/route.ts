import { NextRequest, NextResponse } from "next/server";
import { number, z } from 'zod';
import prisma from "@/prisma/client"

const createInternshipDiarySchema = z.object({
    title: z.string().min(1, 'Title is required').max(255),
    description: z.string().min(1, 'Description is required')
})

    export async function POST(request: NextRequest){
        const body = await request.json();
        const validation = createInternshipDiarySchema.safeParse(body)
        if (!validation.success)
            return NextResponse.json(validation.error.format(), {status : 400})
        
        const newInternshipDiary = await prisma.internshipdb.create({
            data: { 
                title: body.title, 
                description: body.description 
            }
        })
        return NextResponse.json(newInternshipDiary, { status: 201 })
    }

    export async function GET(request: NextRequest) {
        try {
            const diaries = await prisma.internshipdb.findMany();
            return NextResponse.json(diaries, { status: 200 });
        } catch (error) {
            console.error(error);
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
        }
    }

   