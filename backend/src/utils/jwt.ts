import * as jose from "jose";
import dotenv from "dotenv";

dotenv.config();

interface JwtPayload {
  userId: string;
  email: string;
  [key: string]: unknown;
}

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key-here",
);

export const generateToken = async (payload: JwtPayload): Promise<string> => {
  const jwt = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1w")
    .sign(secret);

  return jwt;
};

export const verifyToken = async (token: string): Promise<JwtPayload> => {
  try {
    const { payload } = await jose.jwtVerify(token, secret);
    if (!payload.userId || !payload.email) {
      throw new Error("Invalid token payload");
    }
    return payload as JwtPayload;
  } catch {
    throw new Error("Invalid token");
  }
};
