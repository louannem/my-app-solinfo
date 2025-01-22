import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppSelector } from "@/lib/store";
import { setAuthState } from "@/lib/features/auth";
import { setUserState } from "@/lib/features/user";
import Link from "next/link";
import UiLink from "./elements/ui-link";
import style from "../style/home.module.css";
import { 
	faArrowRightFromBracket, 
	faUser 
} from "@fortawesome/free-solid-svg-icons";

export default function Header() {
    const user = useAppSelector((state) => state.user);
    const dispatch = useDispatch();
    const router = useRouter();

    const auth = useAppSelector((state) => state.auth.authState);
    const [ isAuth, setIsAuth ] = useState(auth);

  const logout = () => {
    fetch('/api/logout/'+user.id)
    .then((res) => res.json())
    .then(() => {
      let cookieName = "userId=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(';');
      
      for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
          
          if (c.indexOf(cookieName) === 0) {
            document.cookie = cookieName;
          }
        }
      }

      if(ca.length === 1) {
        document.cookie = cookieName;
      }

      dispatch(setAuthState(false));

      dispatch(setUserState({
        id: null,
        firstname: null,
        lastname: null,
        email: null
      }))

      window.location.href = '/';
    });

  };

  useEffect(() => { 
    setIsAuth(auth);
  }, [auth]);
  
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
								<Link href='/profile'>
									<FontAwesomeIcon icon={faUser} color="black" />
								</Link>
						</div>
					: <UiLink {...loginLink} />
					}
				</div>
			</div>
    )
};