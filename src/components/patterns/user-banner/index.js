'use client'
import style from "../../../app/user/[id]/user.module.css";
import UiLink from "@/components/elements/ui-link";


export default function UserBanner({ isActiveUser = false, user = {} }) {
	const profileLink = { 
		label: 'Edit your profile',
		url: '/profile',
		type: 'secondary'
	}

	return (
		<div>
			<div className={style.userPageHeader}>
				<div className={style.userPageInfos}>
					<h1>{`${user.firstname}   ${user.lastname}`}</h1>
					<span>@{user._id}</span>
				</div>
			</div>
			<div className={style.userPageData}>
				<div className={style.userPageDescription}>
					{user.description}
				</div> 

				{ isActiveUser ? 
					<div className={style.userPageOwnerActions}>
							<UiLink {...profileLink} />
					</div>
					: null
				}                   
			</div>
		</div>
	)
}