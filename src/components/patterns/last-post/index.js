'use client'
import { useAppSelector } from "@/lib/store";
import { useEffect, useState } from "react";
import FontAwesome from "react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import Button from "@/components/elements/button";
import style from "@/style/home.module.css";

export default function LastPost() {	
  const user = useAppSelector((state) => state.user);
	const  [newPost, setNewPost] = useState(null);
	const  [post, setPost] = useState([]);

	const submitButton = { 
    label: 'Submit',
    handleClick: () => {
      fetch(`/api/users/post/${user.id}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify({
            posts: post
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
				setNewPost(data.posts[data.posts.length - 1]);
				setPost(data.posts);
			})
		}
  }, [user]);

	return (
		<>
			{ newPost ?  <div>{newPost.content}</div> : null }
			<span>Something new ? <FontAwesome icon={faMessage}  /></span>
			<div className={style.homeSection_input_separator}>
				<textarea 
					placeholder="Write a post !" 
					onChange={(e) => setPost([...post, { content: e.target.value}])} 
				/>
			</div>
			<Button {...submitButton} />
		</>
	)
}