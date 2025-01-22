'use client'
import { useEffect, useState } from "react";
import UserCard from "@/components/elements/user-card";
import style from "@/style/home.module.css";

export default function UsersList() {	
	const [ users, setUsers ] = useState(null);
	
	useEffect(() => {
		fetch('/api/users')
		.then((res) => res.json())
		.then((data) => {
			setUsers(data);
		})
		.catch((e) =>  {
			console.error(e)
		})
	}, [])
	
	return (
		 users ? 
			<ol className={style.home_userList}>
			{
				users.map((user) => {
					return ( 
						<li key={`user-${user._id}`}>
							<UserCard user={user} />
						</li>
					)
				})        
			}
			</ol>
			: null
		
	)
}