import { validateJwtTokenAndGetUser } from "@/action/token";
import CustomLayout from "@/custom-layout";
import { cookies } from "next/headers";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt")?.value;
  let initialUser = null;

  if (token) {
    const response = await validateJwtTokenAndGetUser();

    initialUser = await response.user;
  }
  return <CustomLayout initialUser={initialUser}>{children}</CustomLayout>;
}
