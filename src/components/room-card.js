import { useEffect, useState } from "react";
import style from "../style/chatroom-card.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

export default function ChatroomCard(data) {
  const [owner, setOwner] = useState({ name: ''});

  useEffect(() => {
    fetch(`/api/users/${data.owner}`)
    .then(res => res.json())
    .then((data) => {
      setOwner({
        name: `${data.firstname} ${data.lastname}`
      })
    })
  }, [data]);

  return (
    <article className={style.chatroomCard}>
      <p className={style.chatroomCard_name}>{data.name}</p>
      <span className={style.chatroomCard_owner}>by {owner.name}</span>

      <div className={style.chatroomCard_cta}>
        <p>{data.users.length} user(s)</p>
        <FontAwesomeIcon icon={faAngleRight} />
      </div>
    </article>
  )
}