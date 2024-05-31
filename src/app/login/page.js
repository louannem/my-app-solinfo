'use client'
import { setAuthState } from "@/lib/features/auth";
import { setUserState } from "@/lib/features/user";
import { makeStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useStore } from "react-redux";

export default function Login () {
    const router = useRouter();
    const dispatch = useDispatch();
    const store = useStore();

    const [ loading, setLoading ] = useState(false);
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

    return (
        <div>
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
        </div>
    )
}