import express, {Application, Request, Response} from 'express';
import routesUser from '../routes/user';
import { User } from './user';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../utilities/swagger';




class Server{
    private app: Application;
    private port = process.env.PORT;


    constructor(){
        this.app = express();
        this.port;
        this.listen();
        this.middlewares();
        this.routes();
        this.dbConnect();
        
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log('App is running on ' + this.port);
        })
    }

    routes(){
        this.app.use ('/api/users', routesUser);
        this.app.use ('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    }

    middlewares(){
        this.app.use(express.json());
    }

    async dbConnect(){
        try{
            await User.sync();
        }
        catch(error){
            console.error('Unable to connect to the DB', error);
        }
    }
}

export default Server;