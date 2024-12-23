import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../helpers/errorResponse.js";
import { Request, Response, NextFunction } from "express";


const authenticateToken = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        throw new UnauthorizedError("No token provided");
    }

    jwt.verify(token, process.env.SECRET_KEY || "secret", async (err, member) => {
        if (err) {
            throw new UnauthorizedError("Invalid token");
        }

        req.user = member;
        console.log("User authenticated:", req.user);
        next();
    });
};

export { authenticateToken };
