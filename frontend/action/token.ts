import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import axios from "axios";

export const validateJwtTokenAndGetUser = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("jwt")?.value;

    const response = await axios.get(`/user`, {
      headers: { Cookie: `jwt=${token}` },
    });
  } catch (error) {
    console.error("JWT validation error:", error);
    if (error instanceof jwt.JsonWebTokenError) {
      return { success: false, message: "Invalid token signature" };
    }
    if (error instanceof jwt.TokenExpiredError) {
      return { success: false, message: "Token expired" };
    }
    return { success: false, message: "Failed to validate token" };
  }
};

// مثال ساده از تابع findUserById (اگر از Prisma نیستید، با دیتابیس خود جایگزین کنید)
async function findUserById(id: number) {
  // اینجا بسته به پروژه خود کوئری بزنید
  // مثال با SQL:
  // const result = await db.query('SELECT id, email, name FROM users WHERE id = $1', [id]);
  // return result.rows[0];
  // فعلاً یک placeholder:
  return null;
}
