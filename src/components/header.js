import { useAppSelector } from "@/lib/store";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import style from "../style/home.module.css";
import Link from "next/link";

export default function Header() {
    const dispatch = useDispatch();
    const auth = useAppSelector((state) => state.auth.authState);
    const [ isAuth, setIsAuth ] = useState(auth);

  const logout = () => {
    fetch('/api/logout');
    dispatch(setAuthState(false));
  };

  useEffect(() => { 
    setIsAuth(auth);
  }, [auth]);

    return (        
        <div className={style.navigation} >
            <h1 className={style.page_title}>Homepage</h1>
            <div className={style.navigation_actions}>
            {
                isAuth === true ? 
                <>
                    <button onClick={logout}>Logout</button>
                    <Link href="/profile">Profile</Link>
                </>
                : <Link href="/login">Login</Link> 
                }
            </div>
        </div>
    )
};