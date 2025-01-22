
import style from "./user.module.css";
import UserPage from "@/components/templates/user-page";

export const metadata = {
	title: "Profile",
}; 

export default function User() {
    return (
			<main className={style.userPage}>
				<UserPage />
			</main>
	)
}
