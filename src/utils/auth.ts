import jwt from "jsonwebtoken";

export const secretKey = "seuSegredo";

export function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    console.error("Erro ao verificar token:", error.message);
    return null;
  }
}
