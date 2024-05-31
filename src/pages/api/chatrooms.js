import clientPromise from "../../../database/db";


export default async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db();
        const users = await db
            .collection("chatrooms")
            .find({})
            .toArray();
        res.json(users);
    } catch (e) {
        console.error(e);
    }
}