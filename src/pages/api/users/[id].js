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
            .findOne({_id: id});
        res.json(users);
    } catch (e) {
        console.error(e);
    }
}