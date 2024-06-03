import Link from "next/link";
import style from "@/style/card.module.css";

export default function UserCard(user) {
    return (
        <Link href={`/user/${user._id}`}>
            <div className={style.cardWrapper}>
                <h3>{user.firstname} {user.lastname}</h3> 
            </div>
        </Link>
    );
}