'use client'
import UiLink from "@/components/elements/ui-link";
import { useAppSelector } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import style from "./style.module.css";
import { setAuthState } from "@/lib/features/auth";
import { setUserState } from "@/lib/features/user";

export default function LoginForm() {
	const auth = useAppSelector(state => state.auth.authState);
	const router = useRouter();
	const dispatch = useDispatch();

	const [ user, setUser ] = useState({
			email: null,
			password: null,
			lastname: null,
			firstname: null     
	});

	const registerLink = {
		label: 'Signin now !',
		url: '/register',
		type: 'transparent'
}

	const submitLogin = async(e) => {
		e.preventDefault();

		try {
			await fetch('/api/login', {
					method: 'POST',
					body: JSON.stringify(user)
			})
			.then((res) => res.json())
			.then(data => {
				if(data.ok) {                
					dispatch(setAuthState(true));
					dispatch(
						setUserState({
							id: data.user_id,
							lastname: data.user.lastname,
							firstname: data.user.firstname,
							email: data.user.email
						})
					);

					router.push('/');
				};
			});
		} catch(e) {
				console.error(e);
		}
	}

	useEffect(() => {
		if (auth) router.push('/');
	}, [auth]);

	return (
		<>
			<form>
				<label htmlFor="email">Email </label>
				<input 
						type="text" 
						id="email" 
						name="email" 
						onChange={(e) => setUser({ ...user, email: e.target.value }) }
				/>

				<label htmlFor="password">Password </label>
				<input 
						type="password" 
						id="password" 
						name="password" 
						onChange={(e) => setUser({ ...user, password: e.target.value })}
				/>

				<button onClick={(e) => submitLogin(e)}>Submit</button>
		</form>

		<div style={{ margin: 'auto', width: 'fit-content' }}>
				<p className={style.formCta}>Not registered ? <UiLink {...registerLink} /></p>
		</div>
		</>
	)
}