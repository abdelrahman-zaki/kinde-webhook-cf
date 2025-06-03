import { jwtVerify, createRemoteJWKSet } from 'jose';

const JWKS_URL = new URL('https://abdelrahmanzakii.kinde.com/.well-known/jwks.json');

const JWKS = createRemoteJWKSet(JWKS_URL);

export const onRequestPost: PagesFunction = async ({ request }) => {
    try {
        const authHeader = request.headers.get('Authorization');
        if (!authHeader?.startsWith('Bearer ')) {
            return new Response('Missing or invalid Authorization header', { status: 401 });
        }

        const token = authHeader.replace('Bearer ', '');

        const { payload } = await jwtVerify(token, JWKS);
        console.log('JWT verified. Payload:', JSON.stringify(payload));

        const body = await request.json();
        console.log('Webhook body:', JSON.stringify(body, null, 2));

        return new Response('Webhook received', { status: 200 });
    } catch (err: any) {
        console.error('Error:', err.message || err);
        return new Response('Unauthorized', { status: 401 });
    }
};