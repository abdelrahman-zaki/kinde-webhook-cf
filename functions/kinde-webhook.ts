import { jwtVerify, createRemoteJWKSet } from 'jose';

const JWKS_URL = new URL('https://abdelrahmanzakii.kinde.com/.well-known/jwks.json');
const JWKS = createRemoteJWKSet(JWKS_URL);

export const onRequestPost: PagesFunction = async ({ request }) => {
    try {
        // Get the raw text of the body (this is the JWT)
        const rawJwt = await request.text();

        if (!rawJwt || rawJwt.split('.').length !== 3) {
            console.log('Missing or invalid JWT body');
            return new Response('Missing or invalid JWT', { status: 401 });
        }

        const { payload } = await jwtVerify(rawJwt, JWKS);
        console.log('✅ JWT verified. Payload:', JSON.stringify(payload, null, 2));

        return new Response('Webhook received', { status: 200 });
    } catch (err: any) {
        console.error('❌ JWT verification failed:', err.message || err);
        return new Response('Unauthorized', { status: 401 });
    }
};