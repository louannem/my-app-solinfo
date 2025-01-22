'use client'
import style from "../../../app/profile/profile.module.css";

export default function ProfileHeader({ profile }) {	
	return (profile) ?
		<div className={style.profileHeader}>
			<div>
					<h1>My account</h1>
					<h3>@{profile.id}</h3>
			</div>
		</div>
	: null
}