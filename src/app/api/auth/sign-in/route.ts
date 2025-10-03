import {NextResponse} from 'next/server';

export async function POST(req: Request) {
    const {email, password} = await req.json();

    // TODO: заменить на реальную проверку (DB/NextAuth/Lucia)
    const ok = typeof email === 'string' && typeof password === 'string' && password.length >= 6;
    if (!ok) return NextResponse.json({message: 'Invalid credentials'}, {status: 400});

    // здесь установите auth-cookie/sesssion (с lib), сейчас — просто 200
    return NextResponse.json({ok: true});
}
