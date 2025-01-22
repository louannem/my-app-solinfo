'use client'
import { useAppSelector } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RegisterForm() {
	const auth = useAppSelector(state => state.auth.authState);
	const router = useRouter();
	
	const [ form, setForm ] = useState({
			firstname: null,
			lastname: null,
			email: null,
			password: null
	})

	const submitForm = async(e) => {
		e.preventDefault();
		
		await fetch('/api/register', {
			method: 'POST',
			body: JSON.stringify(form)
		})
		.then(res => res.json())
		.then(data => {
			if(data.ok) {
				router.push('/');
			}
		})
	} 

	useEffect(() => {
		if (auth) router.push("/");
	}, [auth])

	return (
		<form>
			<label htmlFor="lastname">Lastname : </label>
			<input 
				id="lastname" 
				name="lastname" 
				type="text"
				onChange={(e) => setForm({...form, lastname: e.target.value})} 
			/>

			<label htmlFor="firstname">Firstname : </label>
			<input 
				id="firstname" 
				name="firstname" 
				type="text"
				onChange={(e) => setForm({...form, firstname: e.target.value})} 
			/>

			<label htmlFor="password">Email : </label>
			<input 
				id="email" 
				name="email" 
				type="text"
				onChange={(e) => setForm({...form, email: e.target.value})} 
			/>

			<label htmlFor="password">Password : </label>
			<input 
				id="password" 
				name="password" 
				type="password"
				onChange={(e) => setForm({...form, password: e.target.value})} 
			/>

			<button onClick={(e) => submitForm(e)}>Submit</button>
		</form>
	)
}