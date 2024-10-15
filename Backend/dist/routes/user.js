"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user");
const validate_token_1 = __importDefault(require("./validate-token"));
const router = (0, express_1.default)();
//Ruta de registro
/**
   * @openapi
   * '/api/users':
   *  post:
   *     tags:
   *     - User
   *     summary: "Registro de nuevo usuario. Debe incluir: nombre/s, apellido/s y correo electronico."
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateUserInput'
   *     responses:
   *      201:
   *        description: Success! New user registered
   *      400:
   *        description: Something went wrong.
   */
router.post('/', user_1.createUser);
//Ruta de login
/**
   * @openapi
   * '/api/users/login':
   *  post:
   *     tags:
   *     - User
   *     summary: "Login service for users. Requres email and password"
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/LoginUserInput'
   *     responses:
   *      200:
   *        description: "Succesful login!"
   *      404:
   *        description: "Email and/or Password invalid(s)"
   */
router.post('/login', user_1.loginUser);
//Ruta protegida
/**
   * @openapi
   * '/api/users/test':
   *  get:
   *     tags:
   *     - User
   *     summary: "Test endpoint for secured routes. Returns user details."
   *     requestBody:
   *      required: false
   *     responses:
   *      200:
   *        description: "Succesful token validation!"
   *      404:
   *        description: "Error"
   */
router.get('/test', validate_token_1.default, user_1.test);
exports.default = router;
