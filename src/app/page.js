'use client'
import UserCard from "@/components/user-card";
import { useAppSelector } from "@/lib/store";
import { useEffect, useState } from "react";
import style from "@/style/home.module.css";
import { faEnvelope, faMessage, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Button from "@/components/button";
import UiLink from "@/components/ui-link";


export default function Home() {
  const auth = useAppSelector((state) => state.auth.authState);
  const user = useAppSelector((state) => state.user);
  
  const [ isAuth, setIsAuth ] = useState(auth);

  // Etat users, modifié par setUsers
  const [ users, setUsers ] = useState(null);
  const [ chatrooms, setChatrooms ] = useState(null);

  const [post, setPost] = useState({
    content: '',
    createdAt: new Date(),
    createdBy: user._id
   })

   const  [newPost, setNewPost] = useState(null);

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


  useEffect(() => { 
    setIsAuth(auth);
    console.log(user)

		if (user.id) {
			fetch(`/api/users/${user.id}`)
			.then(res => res.json())
			.then((data) => {      
				setNewPost(data.posts[data.posts.length - 1])
			})
		}
  }, [auth]);

  useEffect(() => {
    fetch('/api/users')
    .then((res) => res.json())
    .then((data) => {
      setUsers(data);
    })
    .catch((e) =>  {
      console.error(e)
    })
  }, [])

  useEffect(() => {
    fetch('/api/chatrooms')
    .then((res) => res.json())
    .then((data) => {
      setChatrooms(data);
    })
    .catch((e) =>  {
      console.error(e)
    })
  }, [])


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
  
  const submitButton = { 
    label: 'Submit',
    handleClick: () => {
      fetch(`/api/users/post/${user.id}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        body: JSON.stringify({
            posts: [post]
        })
      })
      .then((res) => res.json())
      .then((data) => console.log(data))
    }
  };



  return (
    <main>
      {isAuth ? 
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
            {newPost ? 
              <div>{newPost.content}</div>
            : null }
            <span>Something new ? <FontAwesomeIcon icon={faMessage}  /></span>
            <div className={style.homeSection_input_separator}>
              <textarea placeholder="Write a post !" onChange={(e) => setPost({...post, content: e.target.value})} />
            </div>
            <Button {...submitButton} />
          </section>
        </>
      : 
      <section>
        <h1>Welcome !</h1>
				<p>Log in to explore our app !</p>
				<UiLink {...loginLink} />
      </section>
      }

      <section className={style.homeSection}>
        <h2>Liste des utilisateurs</h2>
        { users ? 
          <ol className={style.home_userList}>
          {
            users.map((user) => {
              return ( 
                <li key={`user-${user._id}`}>
                  <UserCard {...user} />
                </li>
              )
            })        
          }
          </ol>
					: null
        }
      </section>        
    </main>
  );
}
