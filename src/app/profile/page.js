'use client'
import { setUserState } from "@/lib/features/user";
import { useAppSelector } from "@/lib/store";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import style from "./profile.module.css";
import Button from "@/components/button";
import MessageBox from "@/components/message-box";

export default function Profile() {
    const user = useAppSelector((state) => state.user);
    const dispatch = useDispatch();

    const [profile, setProfile] = useState(null);
    const [newProfile, setNewProfile] = useState(user);

    const [isSuccess, setIsSuccess] = useState(false);

    const successConfirmation = {
        message: 'Edited successfully !',
        type: 'success'
    }


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
            <div className={style.profileHeader}>
                <div>
                    <h1>My account</h1>
                    <h3>@{profile.id}</h3>
                </div>

                            
                {isSuccess ?
                    <div className={style.profilePopinBox}>
                        <MessageBox {...successConfirmation} />
                    </div>
                    : null
                }

            </div>

            <div className={style.profileSettingsBlock}>
                <div className={style.profileSettingsInput}>
                    <label> Firstname</label>
                    <input 
                        value={newProfile.firstname} 
                        onChange={(e) => setNewProfile({...newProfile, firstname: e.target.value})} 
                    />
                </div>

                <div className={style.profileSettingsInput}>
                    <label>Lastname</label>
                    <input 
                        value={newProfile.lastname} 
                        onChange={(e) => setNewProfile({...newProfile, lastname: e.target.value})} 
                    />
                </div>
            </div>

            <div className={style.profileSettingsBlock}>
                <div className={style.profileSettingsInput}>
                    <label>Email</label>
                    <input 
                        value={newProfile.email} 
                        onChange={(e) => setNewProfile({...newProfile, email: e.target.value})} 
                    />
                </div>
            </div>


            <div className={[style.profileDescription, style.profileSettingsBlock].join(' ')}>
                
                <div className={style.profileSettingsInput}>
                    <label>Description</label>
                    
                    <textarea 
                        // type="text" 
                        onChange={(e) =>  setNewProfile({...newProfile, description: e.target.value})} 
                        value={newProfile.description}
                    />
                    
                </div>
            </div>

            <Button {...saveButton} />

        </main>
    ) : <p>Chargement...</p>
}