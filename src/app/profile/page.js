import style from "./profile.module.css";
import UserProfile from "@/components/templates/user-profile/user-profile";

export const metadata = {
	title: "Profile",
} ;

export default function Profile() {
	return (
		<main className={style.profile}>
			<UserProfile />
		</main>
	)
}