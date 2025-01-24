'use client'
import GradientBackground from "@/components/elements/gradient-background";
import style from "./style.module.css";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "next/navigation";

export default function UserPost({ post, index, array }) {
	const params = useParams();

	const deletePost = () => {
		const newArray = array.filter((post, i) => i !== index);
		fetch(`/api/users/post/${params.id}`, {
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
			  },
			body: JSON.stringify({
				posts: newArray
			})
		  })
		  .then((res) => res.json())
		  .then(() => window.location.reload());
	}
	return (
		<article key={post.createdAt} className={style.userPagePostsBlock}>
			<GradientBackground end="#fcedf2" range="30%">
				<div className={style.userPagePostsBlock_main}>
					<span className={style.userPagePostsBlock_avatar}>
						<GradientBackground start="#ffd4e2" range="60%" />
					</span>
				<div className={style.userPagePostsBlock_content}>
					<span>{post.createdAt}</span>
					<p>{post.content}</p>
				</div>
				</div>
				<div className={style.userPagePostsBlock_footer}>
					<button onClick={deletePost} className={style.userPagePostsBlock_deleteCta}>
						<FontAwesomeIcon icon={faTrash} />
					</button>
				</div>
			</GradientBackground>
		</article>
	)
}