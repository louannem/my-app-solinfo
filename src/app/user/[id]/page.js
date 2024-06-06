'use client'
import { useEffect, useState } from "react";
import UiLink from "@/components/ui-link";
import style from "./user.module.css";
import { useAppSelector } from "@/lib/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function User({ params }) {
    const activeUser = useAppSelector((state) => state.user);

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
    }, [params.id]);


    const homeLink = {
        label: 'Home',
        url: '/',
        type: 'secondary'
    }

    return (
        <main className={style.userPage}>
            {
                error ? <p>Oops ! Something went wrong !</p>
                : null
            }
            {
                loading && user === null ? <p>Fetching your data...</p>
                : user ?
                <div>
                    <div className={style.userPageHeader}>
                        <div className={style.userPageInfos}>
                            <h1>{`${user.firstname}   ${user.lastname}`}</h1>
                            <span>@{user._id}</span>
                        </div>
                    </div>
                    <div className={style.userPageData}>
                        <div className={style.userPageDescription}>
                            {user.description}
                        </div> 

                        {activeUser.id === user._id ? 
                                <div className={style.userPageOwnerActions}>
                                    <Link href={'/profile'}>
                                        Edit your profile
                                        <FontAwesomeIcon icon={faPen} />
                                    </Link> 
                                </div>
                            : null
                        }                   
                    </div>
                    <section className={style.userPageContent}>
                        {activeUser.id === user._id ? 
                            <div className={style.userPagePostInput}>
                                <textarea placeholder="Write a post !" />
                                <button>Submit</button>
                            </div>

                            : null
                        }
                    </section>
                </div>
                : (
                    <div>
                        <p>User unknown</p> 
                        <UiLink {...homeLink} />
                    </div>
                )
            }

            
           
        </main>
    )
}
