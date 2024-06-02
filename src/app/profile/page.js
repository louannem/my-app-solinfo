'use client'
import { useAppSelector } from "@/lib/store";
import Link from "next/link";

export default function Profile() {
    const user = useAppSelector((state) => state.user);

    // useLayoutEffect(() => {
    //     if(!isAuth){
    //       redirect("/login")
    //     }
    //   }, [])

    return(
        <main>
            <h1>Profile</h1>
            <h2>{user.firstname} {user.lastname} </h2>

            <Link href="/">Home</Link>
        </main>
    )
}