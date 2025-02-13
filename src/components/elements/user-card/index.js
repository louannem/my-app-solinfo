'use client'
import Link from "next/link";
import style from "./user-card.module.css";

export default function UserCard({ user }) {
    return user ? (
		<Link className={style.cardWrapper} href={`/user/${user.id}`}>
			<h3>{user.firstname} {user.lastname}</h3> 
		</Link>
    ) : null ;
}