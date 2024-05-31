'use client'
import { useAppSelector } from "@/lib/store";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react"
import { useStore } from "react-redux";

export default function Profile() {
    const user = useAppSelector((state) => state.user);
    const isAuth = useAppSelector(state => state.auth.authState);

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