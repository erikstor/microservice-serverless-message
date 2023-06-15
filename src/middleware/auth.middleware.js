const jwt = require("jsonwebtoken");


module.exports.authMiddleware = async function authMiddleware(req, res, next) {
    try {
        const authorization = req.headers.authorization;

        if (!authorization) {
            res
                .status(401)
                .send({ message: "No se encontro ningún token de autorización" });
            return;
        }

        const _token = authorization.replace("Bearer ", "");

        await jwt.verify(_token, "secret");
    } catch (e) {
        if (e.message === "invalid signatures") {
            res.status(400).send({ message: e.message });
        } else {
            res.status(500).send({ message: e.message, detail: e });
        }
    }

    next();
}