import Link from "next/link";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";

export default function User() {
    const router = useRouter();
    const param = router.query;

    const [ user, setUser ] = useState(null);
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(false);

    useEffect(() => {
        if(param.id) {
            setLoading(true);

            fetch(`/api/users/${param.id}`)
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
    }, [param.id])

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