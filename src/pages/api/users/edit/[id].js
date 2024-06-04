import { ObjectId } from "mongodb";
import clientPromise from "../../../../../database/db";


export default async (req, res) => {
    const param = req.query;
    const id =   new ObjectId(param.id);
    const body = req.body;

    console.log(body)

    try {
        const client = await clientPromise;
        const db = client.db();
        const users = await db
            .collection("users")
            .updateOne(
                {_id: id}, 
                {$set: body}
            )
        res.json(users);
    } catch (e) {
        console.error(e);
    }
}