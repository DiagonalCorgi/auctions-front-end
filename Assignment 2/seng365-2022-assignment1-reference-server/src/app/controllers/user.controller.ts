import {Request, Response} from "express";
import Logger from '../../config/logger';
import * as User from '../models/user.model';
import * as passwords from '../models/passwords';
import {uid} from 'rand-token';

const register = async (req: Request, res: Response): Promise<void> => {
    for (const s of ['firstName', 'lastName', 'email', 'password']) {
        if(!req.body.hasOwnProperty(s)) {
            res.statusMessage = `Please provide ${s} field`;
            res.status(400).send();
            return;
        }
    }
    if(!req.body.email.includes('@') || req.body.email.length>128 || req.body.password.length<1 || req.body.password.length>256){
        res.statusMessage = `Invalid email/password`;
        res.status(400).send();
        return;
    }
    if(req.body.firstName.length<1 || req.body.firstName.length>64 || req.body.lastName.length<1 || req.body.lastName.length>64) {
        res.statusMessage = `Invalid length of first/last name`;
        res.status(400).send();
        return;
    }
    try {
        req.body.password = await passwords.hash(req.body.password)
        const result = await User.register(req.body);
        res.status( 201 ).send({"userId": result.insertId});
        return;
    } catch (err) {
        Logger.error(err)
        res.statusMessage = "Internal Server Error";
        res.status(500).send();
        return;
    }
}

const login = async (req: Request, res: Response): Promise<void> => {
    try {
        for (const s of ['email', 'password']) {
            if(!req.body.hasOwnProperty(s)) {
                res.statusMessage = `Please provide ${s} field`
                res.status(400).send();
                return;
            }
        }
        if(!req.body.email.includes('@') || req.body.email.length>128 || req.body.password.length<1 || req.body.password.length>256){
            res.statusMessage = `Invalid email/password`;
            res.status(400).send();
            return;
        }
        const user = await User.findUserByEmail(req.body.email);
        if(user === null || !await passwords.compare(req.body.password, user.password)) {
            res.statusMessage = 'Invalid email/password';
            res.status(400).send();
            return;
        }
        const token = uid(64)
        await User.login(user.id, token)
        res.status( 200 ).send({"userId": user.id, "token": token});
        return;
    } catch (err) {
        Logger.error(err)
        res.statusMessage = "Internal Server Error";
        res.status(500).send();
        return;
    }
}

const logout = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.authId;
        await User.logout(userId)
        res.status(200).send()
        return;
    } catch (err) {
        Logger.error(err)
        res.statusMessage = "Internal Server Error";
        res.status(500).send();
        return;
    }
}

const view = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id, 10);
        const user = await User.view(id)
        if(user === null) {
            res.statusMessage = "User not found"
            res.status(404).send();
            return;
        }
        if(req.authId === id) {
            res.status(200).send(user)
            return;
        }
        delete user.email
        res.status(200).send(user as userReturn)
        return;
    } catch (err) {
        Logger.error(err)
        res.statusMessage = "Internal Server Error";
        res.status(500).send();
        return;
    }
}

const update = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findUserById(parseInt(req.params.id, 10))
        if(user === null){
            res.status(404).send();
            return;
        }
        if(req.authId !== parseInt(req.params.id, 10)){
            res.status(403).send();
            return;
        }
        if(req.body.hasOwnProperty("email")) {
            if (req.body.email.length > 128) {
                res.status(400).send();
                return;
            }
            user.email = req.body.email
        }
        if(req.body.hasOwnProperty("firstName")) {
            if (req.body.firstName.length > 64) {
                res.status(400).send();
                return;
            }
            user.firstName = req.body.firstName
        }
        if(req.body.hasOwnProperty("lastName")) {
            if (req.body.lastName.length > 64) {
                res.status(400).send();
                return;
            }
            user.lastName = req.body.lastName
        }
        if(req.body.hasOwnProperty("password")) {
            if(req.body.hasOwnProperty("currentPassword") && req.body.password.length<=256 && req.body.currentPassword.length<=256 && await passwords.compare(req.body.currentPassword, user.password))
                user.password = await passwords.hash(req.body.password);
            else {
                res.statusMessage = "Invalid password(s)";
                res.status(400).send();
                return;
            }
        }
        await User.update(user);
        res.status(200).send();
        return;
    } catch (err) {
        Logger.error(err)
        res.statusMessage = "Internal Server Error";
        res.status(500).send();
        return;
    }
}

export {register, login, logout, view, update}