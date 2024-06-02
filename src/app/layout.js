import StoreProvider from "./StoreProvider";
import { headers } from "next/headers";
import "./globals.css";
import Template from "./template";
import UserProvider from "@/providers/user";


export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}
async function getData() {
  const userId = headers().get('x-user-id');
  const res = await fetch(`${process.env.__NEXT_PRIVATE_ORIGIN}/api/users/${userId}`);
  return res.json();
}


export default function RootLayout({ children }) {
  const user = getData();
  return (
    <html lang="en">
        <body>
          <StoreProvider data={user}>              
            <UserProvider data={user}>
                {children}
            </UserProvider>
          </StoreProvider>
        </body>
      </html>
  )
}
