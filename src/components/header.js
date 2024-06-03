import { useAppSelector } from "@/lib/store";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import style from "../style/home.module.css";
import Link from "next/link";
import { setAuthState } from "@/lib/features/auth";
import UiLink from "./ui-link";
import { useRouter } from "next/navigation";

export default function Header() {
    const dispatch = useDispatch();
    const router = useRouter();

    const auth = useAppSelector((state) => state.auth.authState);
    const [ isAuth, setIsAuth ] = useState(auth);

  const logout = () => {
    fetch('/api/logout');
    dispatch(setAuthState(false));
    router.push('/');
  };

  useEffect(() => { 
    setIsAuth(auth);
  }, [auth]);

  const profileLink = {
    label: 'Profile',
    url: '/profile'
  };
  
  const loginLink = {
    label: 'Login',
    url: '/login'
  };

    return (        
        <div className={style.navigation} >
            <h1 className={style.page_title}>Homepage</h1>
            <div className={style.navigation_actions}>
            {
                isAuth === true ? 
                <>
                    <button onClick={logout}>Logout</button>
                    <UiLink {...profileLink}  />
                </>
                : <UiLink {...loginLink} />
                }
            </div>
        </div>
    )
};