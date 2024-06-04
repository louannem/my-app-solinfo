import { useAppSelector } from "@/lib/store";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import style from "../style/home.module.css";
import { setAuthState } from "@/lib/features/auth";
import UiLink from "./ui-link";
import { useRouter } from "next/navigation";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function Header() {
    const dispatch = useDispatch();
    const router = useRouter();

    const auth = useAppSelector((state) => state.auth.authState);
    const [ isAuth, setIsAuth ] = useState(auth);

  const logout = () => {
    fetch('/api/logout');
    dispatch(setAuthState(false));
    router.refresh();
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
            <Link href="/"><img height={40} width={55} /></Link>
            <div className={style.navigation_actions}>
            {
                isAuth === true ? 
                <div className={style.navigationActions} >
                    <FontAwesomeIcon 
                      icon={faArrowRightFromBracket} 
                      onClick={logout} 
                      style={{ cursor: 'pointer' }}
                    />
                    <UiLink {...profileLink}/>
                </div>
                : <UiLink {...loginLink} />
                }
            </div>
        </div>
    )
};