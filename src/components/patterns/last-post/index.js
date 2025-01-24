'use client'
import { useAppSelector } from "@/lib/store";
import { useEffect, useState } from "react";
import FontAwesome from "react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import Button from "@/components/elements/button";
import style from "@/style/home.module.css";

export default function LastPost() {	
  	const user = useAppSelector((state) => state.user);
	const  [postLists, setPostsList] = useState([]);
	const  [post, setPost] = useState({});

	const submitButton = { 
    label: 'Submit',
    handleClick: () => {
		fetch(`/api/users/post/${user.id}`, {
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				posts: [...postLists, post]
			})
		})
		.then((res) => res.json())
		.then((data) => console.log(data))
    }
  };

  useEffect(() => { 
		if (user.id) {
			fetch(`/api/users/${user.id}`)
			.then(res => res.json())
			.then((data) => {      
				setPostsList(data.posts);
				setPost(data.posts);
			})
		}
  }, [user]);

	return (
		<>
			{ postLists.length > 0 ?  <div>{postLists[postLists.length - 1].content}</div> : null }
			<span>Something new ? <FontAwesome icon={faMessage}  /></span>
			<div className={style.homeSection_input_separator}>
				<textarea 
					placeholder="Write a post !" 
					onChange={(e) => {
						setPost({content: e.target.value})
					} }
				/>
			</div>
			<Button {...submitButton} />
		</>
	)
}