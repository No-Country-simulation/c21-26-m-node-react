"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.test = exports.loginUser = exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secret_key = process.env.SECRET_KEY;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstname, lastname, dob, address, phone, email, password } = req.body;
    const user = yield user_1.User.findOne({ where: { email } });
    if (user) {
        res.status(400).json({ msg: "Something went wrong" });
        return;
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    try {
        yield user_1.User.create({
            firstname,
            lastname,
            dob,
            address,
            phone,
            email,
            password: hashedPassword,
        });
        res.status(201).json({
            msg: `Succes! New user registered `
        });
        return;
    }
    catch (error) {
        res.status(400).json({
            msg: 'Something went wrong'
        });
    }
});
exports.createUser = createUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    // Existe?
    const user = yield user_1.User.findOne({ where: { email } });
    if (!user) {
        res.status(400).json({
            msg: 'No existe'
        });
        return;
    }
    //Pass correcto??
    try {
        const passwordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!passwordValid) {
            res.status(400).json({
                msg: 'password no coincide'
            });
            return;
        }
        // Success, enviar token
        const token = jsonwebtoken_1.default.sign({
            email: email
        }, secret_key);
        res.json({ token });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Ocurrio un error!'
        });
    }
});
exports.loginUser = loginUser;
const test = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.headers);
    const headerToken = req.headers['authorization'];
    if (headerToken != undefined && headerToken.startsWith('Bearer')) {
        try {
            const bearerToken = headerToken.slice(7);
            const decoded = jsonwebtoken_1.default.verify(bearerToken, secret_key);
            const email = decoded.email;
            const user = yield user_1.User.findOne({ where: { email: email } });
            res.status(200).json({
                id: `${user.id}`,
                firstname: `${user.firstname}`,
                lastname: `${user.lastname}`,
                email: `${user.email}`
            });
        }
        catch (error) {
            res.status(401).json({
                msg: 'Unauthorized'
            });
        }
    }
});
exports.test = test;
