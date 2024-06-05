import { ObjectId } from "mongodb";
import clientPromise from "../../../../database/db";


export default async (req, res) => {
    const param = req.query;
    const id =   new ObjectId(param.id);

    try {
        const client = await clientPromise;
        const db = client.db();
        
        const users = await db
        .collection("users")
        .updateOne(
            {_id: id}, 
            {$set: {
              session: {
                id: null,
                expiresAt: new Date(0),
                createdAt: new Date(0)
              }
            }},
            {upsert: true}
        )
        res.json(users);
    } catch (e) {
        console.error(e);
    }
}