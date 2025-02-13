'use client'
import UserBanner from "@/components/patterns/user-banner";
import { useAppSelector } from "@/lib/store";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "@/components/elements/button";
import UiLink from "@/components/elements/ui-link";
import style from "../../../app/user/[id]/user.module.css";
import UserPost from "@/components/patterns/user-post";

export default function UserPage() {
	const activeUser = useAppSelector(state => state.user);
	const [ user, setUser ] = useState(null);
	const [posts, setPosts ] = useState([]);
	const  [newPost, setNewPost] = useState({});
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
		handleClick: () => {
			fetch(`/api/users/post/${user.id}`, {
				method: 'POST',
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newPost)
			})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setPosts(data)
			})
		}
	};

	useEffect(() => {
		if(params.id) {
			setLoading(true);

			fetch(`/api/users/${params.id}`)
			.then(res => res.json())
			.then(data => {
				setUser(data);
				setPosts(data.posts);
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
						activeUser.id === params.id ? 
							<div className={style.userPagePostInput}>
								<textarea 
									placeholder="Write a post !" 
									onChange={(e) => {
										setNewPost({content: e.target.value})
									} }
								/>
								<Button {...submitButton} />
							</div>
						: null
					}

					<section className={style.userPagePostsWrapper}>
						{
							posts.length > 0 ? user.posts.map((post, index) => {
								return (
									<UserPost post={post} key={post.createdAt} index={index} array={user.posts} />
								)
							})
							: <p>{user.name} didn't post anything yet !</p>
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