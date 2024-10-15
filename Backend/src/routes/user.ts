import Router from 'express';
import { Request, Response } from 'express';
import { createUser, loginUser, test } from '../controllers/user';
import validateToken from './validate-token';

const router = Router();

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
router.post('/', createUser);

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
router.post('/login', loginUser);

//Ruta protegida
router.get('/test', validateToken, test);


export default router;