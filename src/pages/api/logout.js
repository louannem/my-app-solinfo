import { serialize } from "mongodb";

export default async (req, res) => {
    try {
        const cookies = `name=session; maxAge=-1;path=/` 

        res.setHeader("Set-Cookie", cookies);

        res.writeHead(302, { Location: '/login' });
        res.end();
    } catch (e) {
        console.error(e);
    }
}