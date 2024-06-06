'use client'
import { setUserState } from "@/lib/features/user";
import { useAppSelector } from "@/lib/store";
import { faPen, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useStore } from "react-redux";
import style from "./profile.module.css";

export default function Profile() {
    const user = useAppSelector((state) => state.user);
    const dispatch = useDispatch();

    const [profile, setProfile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [newDescription, setNewDescription] = useState(null);

    useEffect(() => {
        setProfile(user);
    }, [user]);


    const updateDescription = () => {
        setIsEditing(false);
        dispatch(
            setUserState({
                ...user,
                desciption: newDescription,
            })
        );
        
        setProfile({
            ...user,
            description: newDescription
        });

        fetch(`/api/users/edit/${user.id}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
            body: JSON.stringify({
                ...profile,
                description: newDescription
            })
        })
    }

    return (profile) ? (
        <main className={style.profile}>
            <h1>Profile</h1>
            <h2>{profile.firstname} {profile.lastname} </h2>
            <h3>@{profile.id}</h3>

            <div className={style.profileDescription}>
                <span>Description:</span>
                {
                    isEditing ?
                        <div>
                            <input 
                                type="text" 
                                onChange={(e) => setNewDescription(e.target.value)} 
                            />
                            <button onClick={updateDescription}>
                                <FontAwesomeIcon icon={faSave} />
                            </button>
                        </div>
                    : 
                        <div className={style.profileDescriptionInput}>
                            {
                                profile.description !== '' &&  profile.description !== null ? 
                                    <p>{profile.description}</p>
                                : <span>Aucune description renseignée.</span>
                            }
                            <button onClick={() => setIsEditing(!isEditing)}>
                                <FontAwesomeIcon icon={faPen} />
                            </button>
                        </div>  
                    
                }
            </div>


            <Link href="/">Home</Link>
        </main>
    ) : <p>Chargement...</p>
}