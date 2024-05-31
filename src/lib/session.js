import 'server-only';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const sessionToken = process.env.SESSION_SECRET_KEY;
const encodedKey = new TextEncoder().encode(sessionToken);

export async function encrypt(payload){
    return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey)
}

export async function decrypt(session) {
    try {
        const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: ['HS256'],
        });
        
        return payload;
    } catch(error) {
        console.error(error);
    }
}

export function getSessionId(id) {
    console.log(id);
    return id;
}

export async function createSession(userId) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const session = await encrypt({ userId, expiresAt });

    console.log(session);

    // cookies().set('session', session, {
    //     http: true,
    //     secure: true,
    //     expires: expiresAt,
    //     sameSite: 'lax',
    //     path: '/'
    // })
}