import StoreProvider from "./StoreProvider";
import { headers } from "next/headers";
import "./globals.css";
import UserProvider from "@/providers/user";
import { Poppins } from 'next/font/google';

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

// If loading a variable font, you don't need to specify the font weight
const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

async function getData() {
  const userId = headers().get('x-user-id');
  
  if(userId !== undefined) {
    const res = await fetch(`${process.env.__NEXT_PRIVATE_ORIGIN}/api/users/${userId ?? 123456}`);
    return res.json();
  } else {
    return {};
  }
}



export default function RootLayout({ children }) {
  const user = getData();
  return (
    <html lang="en" className={poppins.className}>
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
