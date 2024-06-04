'use client'
import UserCard from "@/components/user-card";
import { useAppSelector } from "@/lib/store";
import { useEffect, useState } from "react";
import style from "@/style/home.module.css";
import UiLink from "@/components/ui-link";


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

  const profileLink = {
    label: 'Profile',
    url: '/profile',
  }
  

  return (
    <main>
      {isAuth && 
        <div className={style.home_greeting}> 
          <h2>Welcome {user.firstname} !</h2> 
          <UiLink {...profileLink} />
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
          <ol>
          {
            chatrooms.map((room) => (
              <li key={`room-${room._id}`}>
                {room.name} 
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
