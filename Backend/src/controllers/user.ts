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
    return;
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
            msg: `Succes! New user registered `});
            return;

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
        msg: 'No existe'});
    return;
}
//Pass correcto??
try{
    const passwordValid = await bcrypt.compare(password, user.password );
   if(!passwordValid) {
    res.status(400).json({
        msg: 'password no coincide'})
        return;
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
    console.log(req.headers);
    const headerToken = req.headers['authorization'];
    type myToken = {
        email: string
    }

    if (headerToken !=undefined && headerToken.startsWith('Bearer')){
        try{
            const bearerToken=headerToken.slice(7);
            const decoded = jwt.verify(bearerToken, secret_key) as myToken;
            const email =decoded.email;
            const user: any = await User.findOne({ where: {email : email}});

            res.status(200).json({
                id : `${user.id}`,
                firstname : `${user.firstname}`,
                lastname : `${user.lastname}`,
                email : `${user.email}`
                
            })
        }

        catch (error) {
            
            res.status(401).json({
                msg: 'Unauthorized'
            })
        }
    } 
}