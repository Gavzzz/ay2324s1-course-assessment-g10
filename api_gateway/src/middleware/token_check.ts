import { expressjwt } from 'express-jwt';

export const jwtCheck = expressjwt({
    secret: process.env.SECRET_KEY || 'YOUR_SECRET_KEY',
    algorithms: ['HS256'],
    getToken: (req: any) => {
        return req.cookies['AUTH_SESSION'] ? req.cookies['AUTH_SESSION'] : null
    },
    credentialsRequired: true,
});


export const onCredentialFailure = (err: any, req: any, res: any, next: any) => {
    console.log(err);
    if (err.name === "UnauthorizedError") {
        res.status(401).send("invalid token...");
    } else {
        next(err, req, res);
    }
}

