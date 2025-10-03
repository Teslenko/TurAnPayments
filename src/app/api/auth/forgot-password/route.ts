import {NextResponse} from 'next/server';

export async function POST(req: Request) {
    const {email} = await req.json();
    if (!email) return NextResponse.json({message: 'Email required'}, {status: 400});

    // TODO: сгенерировать токен и отправить письмо (Resend, Postmark, Mailgun)
    console.log('Send reset link to:', email);
    return NextResponse.json({ok: true});
}
