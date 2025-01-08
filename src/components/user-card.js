import Link from "next/link";
import style from "@/style/user-card.module.css";

export default function UserCard(user) {
    return (
        <div className={style.cardWrapper}>
            <Link href={`/user/${user._id}`}>
                <h3>{user.firstname} {user.lastname}</h3> 
            </Link>
            </div>
    );
}