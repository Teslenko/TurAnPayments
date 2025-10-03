import {NextResponse} from 'next/server';

export async function POST(req: Request) {
    const {email, password, company} = await req.json();
    if (!email || !password) {
        return NextResponse.json({message: 'Email & password required'}, {status: 400});
    }
    // TODO: создать пользователя в БД и выдать сессию/токен
    return NextResponse.json({ok: true});
}
