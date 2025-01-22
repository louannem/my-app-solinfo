'use client'
import Link from "next/link";
import style from "./user-card.module.css";
import { useAppSelector } from "@/lib/store";

export default function UserCard() {
  const user = useAppSelector((state) => state.user);
    return (
			<div className={style.cardWrapper}>
				<Link href={`/user/${user._id}`}>
					<h3>{user.firstname} {user.lastname}</h3> 
				</Link>
			</div>
    );
}