'use client'
import UserCard from "@/components/user-card";
import { useAppSelector } from "@/lib/store";
import { useEffect, useState } from "react";
import style from "@/style/home.module.css";
import UiLink from "@/components/ui-link";
import { faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import ChatroomCard from "@/components/room-card";


export default function Home() {
  const auth = useAppSelector((state) => state.auth.authState);
  const user = useAppSelector((state) => state.user);
  
  const [ isAuth, setIsAuth ] = useState(auth);

  // Etat users, modifié par setUsers
  const [ users, setUsers ] = useState(null);
  const [ chatrooms, setChatrooms ] = useState(null);


  useEffect(() => { 
    setIsAuth(auth);
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
  ]
  

  return (
    <main>
      {isAuth && 
        <div className={style.home_greeting}> 
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
                headerIcons.map((item) => {
                  return (
                    <li>
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

      <section className={style.homeSection}>
        <h2>Liste des conversations</h2>
        { chatrooms ? 
          <ol className={style.homeSection__chatroomsList}>
          {
            chatrooms.map((room) => (
              <li key={`room-${room._id}`}>
                <ChatroomCard {...room} />
              </li>
            ))
          }
          </ol>
        : null
        }
      </section>

          
    </main>
  );
}
