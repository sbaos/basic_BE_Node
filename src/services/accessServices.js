import { BadRequestError, ForbiddenError, NotFoundError } from "../helpers/errorResponse.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import userModel from "../model/userModel";

dotenv.config();

const { SECRET_KEY } = process.env.SECRET_KEY || 'secret';


class AccessServices {
    static async login(email, password) {
        if (!email || !password) {
            throw new BadRequestError("Email or password is missing");
        }
        const user = await userModel.findUserByEmail(email);
        if (!user) {
            throw new NotFoundError("User not found");
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            throw new BadRequestError("Password is incorrect");
        }
        const token = jwt.sign({ id: user.id }, SECRET_KEY);
        const { name, phone, gender } = user;
        const data = { email, name, phone, gender }
        return { token, ...data };
    }

    static async register(email, password) {
        if (!email || !password) {
            throw new BadRequestError("Email or password is required")
        }
        const user = await userModel.findUserByEmail(email);
        if (user) {
            throw new BadRequestError("User already exists");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await userModel.createUser(email, hashedPassword);
        const token = jwt.sign({ id: newUser.id }, SECRET_KEY);
        return { token, user: newUser };
    }

}

export default AccessServices;