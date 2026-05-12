import { validateJwtTokenAndGetUser } from "@/action/token";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const respone = await validateJwtTokenAndGetUser();
  const user = respone.user;

  if (user?.role.ID !== 2) {
    redirect("/");
  }
  return <main>{children}</main>;
}
