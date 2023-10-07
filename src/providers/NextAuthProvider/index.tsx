"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
const NextAuthProvider = ({ children }: { children: React.ReactNode }) => {
  return <SessionProvider> {children}</SessionProvider>;
};

export default NextAuthProvider;
