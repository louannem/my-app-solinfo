import { useEffect, useState } from "react"

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
    <article>
      {data.name} by {owner.name}
      <p>{data.users.length} user(s)</p>
    </article>
  )
}