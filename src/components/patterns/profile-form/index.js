'use client'
import Button from "@/components/elements/button"
import MessageBox from "@/components/elements/message-box";
import { setUserState } from "@/lib/features/user";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import style from "../../../app/profile/profile.module.css";

export default function ProfileForm({ profile }) {
	const [newProfile, setNewProfile] = useState(profile);
	const [isSuccess, setIsSuccess] = useState(false);

	const dispatch = useDispatch();

	const updateProfile = () => {
		dispatch(
			setUserState({
				...profile,
				...newProfile
			})
		);
		
		fetch(`/api/users/edit/${profile.id}`, {
			method: 'POST',
			headers: {
					"Content-Type": "application/json",
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


	useEffect(() => {
		setNewProfile(profile);
	}, [profile]);

	const successConfirmation = {
		message: 'Edited successfully !',
		type: 'success'
}

	return (
		<>
			{ isSuccess ?
				<div className={style.profilePopinBox}>
						<MessageBox {...successConfirmation} />
				</div>
				: null
      }
			<div className={style.profileSettingsBlock}>
				<div className={style.profileSettingsInput}>
					<label> Firstname</label>
					<input 
						value={newProfile.firstname ?? ""} 
						onChange={(e) => setNewProfile({...newProfile, firstname: e.target.value})} 
					/>
				</div>

				<div className={style.profileSettingsInput}>
					<label>Lastname</label>
					<input 
						value={newProfile.lastname ?? ""} 
						onChange={(e) => setNewProfile({...newProfile, lastname: e.target.value})} 
					/>
				</div>
			</div>

			<div className={style.profileSettingsBlock}>
				<div className={style.profileSettingsInput}>
					<label>Email</label>
					<input 
						value={newProfile.email ?? ""} 
						onChange={(e) => setNewProfile({...newProfile, email: e.target.value})} 
					/>
				</div>
			</div>


			<div className={[style.profileDescription, style.profileSettingsBlock].join(' ')}>
				<div className={style.profileSettingsInput}>
					<label>Description</label>
					<textarea 
						value={newProfile.description ?? ""}
						onChange={(e) =>  setNewProfile({...newProfile, description: e.target.value})} 
					/>
				</div>
			</div>

			<Button {...saveButton} />
		</>
	)
}