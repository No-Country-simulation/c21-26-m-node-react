import {Request, Response} from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const secret_key : string = process.env.SECRET_KEY as string;

export const createUser = async (req: Request, res: Response) =>{
    const { firstname, lastname, dob, address, phone, email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (user) {
    res.status(400).json({ msg: "Something went wrong" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    try{

        await User.create({
            firstname,
            lastname,
            dob,
            address,
            phone,
            email,
            password: hashedPassword,
          })
          res.status(201).json({
            msg: `Succes! New user registered `,
            
        });

    } catch (error) {
        res.status(400).json({
            msg: 'Something went wrong'

        })
    }
};

export const loginUser = async (req: Request, res: Response) =>{

const {email, password} = req.body;
// Existe?
const user:any = await User.findOne({ where: { email } });

if (!user){
    res.status(400).json({
        msg: 'No existe'
    })
}
//Pass correcto??
try{
    const passwordValid = await bcrypt.compare(password, user.password );
   if(!passwordValid) {
    res.status(400).json({
        msg: 'password no coincide'
    })
   }

   // Success, enviar token

   const token = jwt.sign({
    email:email

   }, secret_key);

   res.json({token});

}catch(error) {
    res.status(400).json({
        msg: 'Ocurrio un error!'

    })
}
};

export const test = async (req: Request, res: Response) =>{
    res.json({
        msg: 'Se ejecuta la funcion protegida'
    })
}