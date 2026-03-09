import { NextRequest, NextResponse } from 'next/server';
import { authService } from '@/src/modules/auth/auth.service';

export const GET = async (req: NextRequest) => {
    return NextResponse.json({ message: 'Hello from the auth API!' }, { status: 200 });
}

export const POST = async (req: NextRequest) => {
    const { username, password } = await req.json();
    if(!username && !password) {
        return NextResponse.json({ message: 'Username and password are required' }, { status: 400 });
    }
    const response=await authService.Login(username, password);
    return NextResponse.json(response);
}