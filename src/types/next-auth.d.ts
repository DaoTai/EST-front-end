import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session extends IUser {}
}

declare module "next-auth/jwt" {
  // interface JWT {
  //   user: IUser;
  // }
}
