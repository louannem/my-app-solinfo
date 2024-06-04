'use client'
import { setAuthState } from "@/lib/features/auth";
import { setUserState } from "@/lib/features/user";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useStore } from "react-redux";
import style from "@/app/login/login.module.css";
import UiLink from "@/components/ui-link";

export default function Login () {
    const router = useRouter();
    const dispatch = useDispatch();
    const store = useStore();

    const [ user, setUser ] = useState({
        email: null,
        password: null,
        lastname: null,
        firstname: null     
    });

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

    const homeLink = {
        label: 'Home',
        url: '/'
    };

    return (
        <main className={style.login}>
            <h1>Login</h1>
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

            <UiLink {...homeLink} />
        </main>
    )
}