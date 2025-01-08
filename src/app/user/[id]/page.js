'use client'
import { useEffect, useState } from "react";
import UiLink from "@/components/ui-link";
import style from "./user.module.css";
import { useAppSelector } from "@/lib/store";
import Button from "@/components/button";
import { useParams } from "next/navigation";

export default function User() {
	const activeUser = useAppSelector((state) => state.user);

	const [ user, setUser ] = useState(null);
	const [ loading, setLoading ] = useState(false);
	const [ error, setError ] = useState(false);

	const params = useParams();
	useEffect(() => {

		if(params.id) {
			setLoading(true);

			fetch(`/api/users/${params.id}`)
			.then(res => res.json())
			.then(data => {
					setUser(data);
					setLoading(false);
			})
			.catch(e => {
				console.error(e);
				setError(true);
			}) 
	}
}, [params.id]);


    const homeLink = {
        label: 'Home',
        url: '/',
        type: 'transparent'
    }

    const submitButton = { 
        label: 'Submit',
        handleClick: () => {}
    }

    const profileLink = { 
        label: 'Edit your profile',
        url: '/profile',
        type: 'secondary'
    }

    return (
			<main className={style.userPage}>
				{
					error ? <p>Oops ! Something went wrong !</p>
					: null
				}
				{
					loading && user === null ? <p>Fetching your data...</p>
					: user ?
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

								{activeUser.id === user._id ? 
									<div className={style.userPageOwnerActions}>
											<UiLink {...profileLink} />
									</div>
								: null
								}                   
							</div>
							<section className={style.userPageContent}>
								{activeUser.id === user._id ? 
									<div className={style.userPagePostInput}>
										<textarea placeholder="Write a post !" />
										<Button {...submitButton} />
									</div>

								: null
								}

								<section className={style.userPagePostsWrapper}>
									{
										user.posts ? user.posts.map((post) => {
											return (
												<article key={post.createdAt} className={style.userPagePostsBlock}>
														<span>{post.createdAt}</span>
														<p>{post.content}</p>
												</article>
											)
										})
										: <p>{user.fistname} {user.lastname} didn't post anything yet !</p>
									}
								</section>
							</section>
						</div>
						: (
						<div>
							<p>User unknown</p> 
							<UiLink {...homeLink} />
						</div>
					)
				}	
			</main>
	)
}
