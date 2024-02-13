import { verifyToken } from "@/utils/auth";

export default function authMiddleware(handler) {
    return async (req, res) => {
      const token = req.headers.authorization.split("Bearer ")[1];
      if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
  
      try {
        const decodedToken = await verifyToken(token);
        req.user = decodedToken;
        console.log('req.user ',req.user)
        return handler(req, res);
      } catch (error) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
    };
  }