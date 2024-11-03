import * as jose from 'jose';

export async function generateKeyPair() {
  const keyPair = await jose.generateKeyPair('ES256');
  return keyPair;
}

export async function createAccessToken(userId: string, fileId: string) {
  const secret = new TextEncoder().encode(import.meta.env.VITE_JWT_SECRET);
  const jwt = await new jose.SignJWT({ userId, fileId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secret);
  return jwt;
}

export async function verifyAccessToken(token: string) {
  const secret = new TextEncoder().encode(import.meta.env.VITE_JWT_SECRET);
  try {
    const { payload } = await jose.jwtVerify(token, secret);
    return payload;
  } catch (error) {
    console.error('Error verifying token:', error);
    throw error;
  }
}