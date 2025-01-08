"use client"

import { setAuthState } from "@/lib/features/auth";
import { setUserState } from "@/lib/features/user";
import { useAppSelector } from "@/lib/store";
import React, {createContext, useEffect} from "react";
import { useDispatch } from "react-redux";

const UserContext = createContext({})

export default function UserProvider({children, data}){
    const dispatch = useDispatch();  
    const auth = useAppSelector((state) => state.auth.authState);
    const user = JSON.parse(data.value);

    useEffect(() => {
        if(user && user._id) {
            dispatch(setAuthState(true));
            dispatch(
                setUserState({
                    id: user._id,
                    lastname: user.lastname,
                    firstname: user.firstname,
                    email: user.email,
                    description: user.description ?? ''
                })
            );
        }
    }, [auth])
return (
<UserContext.Provider value={JSON.parse(data.value)}>
 {children}
</UserContext.Provider>
)
}
