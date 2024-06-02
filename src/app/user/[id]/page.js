'use client'
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router"

export default function User({ params }) {
    const [ user, setUser ] = useState(null);
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(false);

    useEffect(() => {
        if(params.id) {
            setLoading(true);

            fetch(`/api/users/${params.id}`)
            .then(res => res.json())
            .then(data => {
                setUser(data);
                setLoading(false);
            })
            .catch(e => {
                console.error(e);
                setError(true);
            }) 
            
        }
    }, [params.id])

    return (
        <main>
            {
                error ? <p>Oops ! Something went wrong !</p>
                : null
            }
            {
                loading && user === null ? <p>Fetching your data...</p>
                : user ?
                <div>
                    <h1>{`${user.firstname}   ${user.lastname}`}</h1>
                    
                </div>
                : "User unknown" 
            }
            
            <Link href="/">Home</Link>
           
        </main>
    )
}
