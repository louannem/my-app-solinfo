'use client'
import GradientBackground from "@/components/elements/gradient-background";
import style from "./style.module.css";

export default function UserPost({ post }) {
	return (
		<article key={post.createdAt} className={style.userPagePostsBlock}>
			<GradientBackground end="#fcedf2">
					<span className={style.userPagePostsBlock_avatar}>
						<GradientBackground start="#ffd4e2" />
					</span>
				<div className={style.userPagePostsBlock_content}>
					<span>{post.createdAt}</span>
					<p>{post.content}</p>
				</div>
			</GradientBackground>
		</article>
	)
}