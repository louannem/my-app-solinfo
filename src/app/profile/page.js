'use client'
import { setUserState } from "@/lib/features/user";
import { useAppSelector } from "@/lib/store";
import { faPen, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useStore } from "react-redux";
import style from "./profile.module.css";
import Button from "@/components/button";

export default function Profile() {
    const user = useAppSelector((state) => state.user);
    const dispatch = useDispatch();

    const [profile, setProfile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [newDescription, setNewDescription] = useState(user.description);
    const [newProfile, setNewProfile] = useState(user);

    const [isSuccess, setIsSuccess] = useState(false);


    useEffect(() => {
        setProfile(user);
        setNewProfile(user);
    }, [user]);

    const updateProfile = () => {
        console.log(newProfile)
        dispatch(
            setUserState({
                ...user,
                ...newProfile
            })
        );

        fetch(`/api/users/edit/${user.id}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
            body: JSON.stringify({
                ...profile,
                ...newProfile
            })
        }).then((res) => res.json())
        .then(() => {
            setIsSuccess(true)
        })
    }

    const saveButton = {
        label: 'Save',
        handleClick: updateProfile
    }
   

    useEffect(() => {
        if(isSuccess) {
            setTimeout(() => {
                setIsSuccess(false)
            }, 1000 * 6)
        }
    }, [isSuccess])

    return (profile) ? (
        <main className={style.profile}>
            <h1>Profile</h1>
            <h3>@{profile.id}</h3>

            <div className={style.profileSettingsBlock}>
                <label>
                    Firstname
                    <input 
                        value={newProfile.firstname} 
                        onChange={(e) => setNewProfile({...newProfile, firstname: e.target.value})} 
                    />
                    
                </label>
                <label>
                    Lastname
                    <input 
                        value={newProfile.lastname} 
                        onChange={(e) => setNewProfile({...newProfile, lastname: e.target.value})} 
                    />
                </label>
            </div>

            <div className={style.profileSettingsBlock}>
                <label>
                    Email
                    <input 
                        value={newProfile.email} 
                        onChange={(e) => setNewProfile({...newProfile, email: e.target.value})} 
                    />
                </label>
            </div>


            <div className={[style.profileDescription, style.profileSettingsBlock].join(' ')}>
                <span>Description:</span>
                
                <textarea 
                    // type="text" 
                    onChange={(e) => setNewDescription(e.target.value)} 
                    value={newProfile.description}
                />
            </div>

            <Button {...saveButton} />
            
            {isSuccess ?
                <div>Updated successfully !</div>
                : null
            }

        </main>
    ) : <p>Chargement...</p>
}