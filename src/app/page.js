'use client'
import { setAuthState } from "@/lib/features/auth";
import { useAppSelector } from "@/lib/store";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";


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
  

  return (
    <main>
      {isAuth && <p>Welcome {user.firstname} !</p> }
      <h2>Liste des utilisateurs</h2>
      { users ? 
        <ol>
        {
          users.map((user) => {
            return ( 
              <li key={`user-${user._id}`}>
                <Link href={`/user/${user._id}`}>{user.firstname} {user.lastname} </Link>
              </li>
            )
          })        
        }
        </ol>
      : null
      }

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
          
    </main>
  );
}
