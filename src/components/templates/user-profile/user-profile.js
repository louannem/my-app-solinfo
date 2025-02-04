'use client'

import ProfileHeader from "@/components/elements/profile-header";
import ProfileForm from "@/components/patterns/profile-form";
import { useAppSelector } from "@/lib/store";
import { useEffect, useState } from "react";

export default function UserProfile() {
	const user = useAppSelector(state => state.user);	
	const [profile, setProfile] = useState(null);

	useEffect(() => {
		setProfile(user);
	}, [user]);

	return (user) ?
		<>
			<ProfileHeader profile={user} />
			<ProfileForm profile={user} />
		</>
	: <p>Chargement...</p>
}