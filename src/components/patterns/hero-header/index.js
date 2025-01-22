'use client'
import { useAppSelector } from "@/lib/store";
import style from "@/style/home.module.css";
import { faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useState } from "react";
import LastPost from "../last-post";
import UiLink from "@/components/elements/ui-link";

export default function HeroHeader() {
	const auth = useAppSelector(state => state.auth.authState);
  const user = useAppSelector((state) => state.user);

	const [ mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

	useEffect(() => {
		const updateMousePosition = (ev) => {
				setMousePosition({ x: ev.clientX, y: ev.clientY });
		};
		window.addEventListener('mousemove', updateMousePosition);
		
		return () => {
				window.removeEventListener('mousemove', updateMousePosition);
		};
	}, []);

	const headerIcons = [
    {
      icon: faUser,
      url: '/profile'
    },
    {
      icon: faEnvelope,
      url: '/'
    }
  ];
	
	
	const loginLink = {
    label: 'Login',
    url: '/login'
  };
	
	return (
		auth ?
		<>
			<div 
				className={style.home_greeting}
				style={{
					backgroundImage: `radial-gradient(
						circle at ${mousePosition.x}px ${mousePosition.y}px,
						rgb(238, 232, 255), 
						rgba(0,0,0,0) 20% 
					)`
				}}
			> 
				<img />
				<div className={style.home_greeting_text}>
					<h2>Welcome {user.firstname} !</h2> 
					<p>
						Lorem ipsum dolor sit amet consectetur. Eu neque vestibulum commodo tellus.
					</p>
				</div>
				<div className={style.home_greeting_icons}>
					<ul>
						{  
							headerIcons.map((item, i) => {
								return (
									<li key={i}>
										<Link href={item.url}>
											<FontAwesomeIcon icon={item.icon} />
										</Link>
									</li>
								)
							})
						}
	
					</ul>
				</div>
			</div>
			<section className={[`${style.homeSection} ${style.homeSection_input}`].join(' ')}>
			<LastPost user={user} />
			</section>
		</>
			:
		<section>
			<h1>Welcome !</h1>
			<p>Log in to explore our app !</p>
			<UiLink {...loginLink} />
		</section>

	)
}