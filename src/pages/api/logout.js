
export default async (req, res) => {
    try {
        const cookies = `${req.headers.cookie}; maxAge=-1;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT` ;

        // console.log(req.headers.cookie);
        res.setHeader("Set-Cookie", cookies);
        

        res.writeHead(302, { Location: '/login' });
        res.end();
    } catch (e) {
        console.error(e);
    }
}