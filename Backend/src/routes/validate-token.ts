import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();
const secret_key : string = process.env.SECRET_KEY as string;

const validateToken = (req: Request, res: Response, next:NextFunction) => {
    
    const variable = req.headers['authorization'] ?? ''

    
    if (variable ==''){
        
        res.status(401).json({
            msg: 'Error al validar el token. Token no valido.'
        })
    }
try {
    const headerToken = req.headers['authorization']

    if (headerToken !=undefined && headerToken.startsWith('Bearer ')){
            
            
            const bearerToken=headerToken.slice(7);
            jwt.verify(bearerToken, secret_key);
           

            console.log ("Exito al validar token");
            

            next()}
    }catch (error) {
            
            res.status(401).json({
                msg: 'token no valido'
            })
        }
    }; 

export default validateToken;