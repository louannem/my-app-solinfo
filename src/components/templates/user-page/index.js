'use client'
import UserBanner from "@/components/patterns/user-banner";
import { useAppSelector } from "@/lib/store";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "@/components/elements/button";
import UiLink from "@/components/elements/ui-link";
import style from "../../../app/user/[id]/user.module.css";

export default function UserPage() {
	const activeUser = useAppSelector(state => state.user);
	const [ user, setUser ] = useState(null);
	const [ loading, setLoading ] = useState(false);
	const [ error, setError ] = useState(false);

	const params = useParams();


	const homeLink = {
		label: 'Home',
		url: '/',
		type: 'transparent'
	}

	const submitButton = { 
			label: 'Submit',
			handleClick: () => {}
	}

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

	return (
		<>
		{
			error ? (<p>Oops ! Something went wrong !</p>)
			: null
		}

		{
			loading && user === null ? <p>Fetching your data...</p>
			:  user ? (
			<>
				<UserBanner 
					isActiveUser={activeUser && params.id === activeUser.id} 
					user={user} 
				/>
				<section className={style.userPageContent}>
					{
						activeUser.id === params._id ? 
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
			</>
			)	 : (
			<div>
				<p>User unknown</p> 
				<UiLink {...homeLink} />
			</div>
			)
		}
	</>
)
}