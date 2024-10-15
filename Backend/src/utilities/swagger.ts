import swaggerJsDoc from "swagger-jsdoc"

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateUserInput:
 *       type: object
 *       required:
 *         - firstname
 *         - lastname
 *         - date of birth
 *         - address
 *         - phone number
 *         - email
 *         - password
 *       properties:
 *         firstname:
 *           type: string
 *           description: "Firstname(s) from the user."
 *         lastname:
 *           type: string
 *           description: "Lastname(s) from the user."
 *         date of birth:
 *           type: string
 *           format: date
 *           description: "Date of birth from the user."
 *         address:
 *           type: string
 *           description: "Address of residence from the user."
 *         phone number:
 *           type: string
 *           description: "Phone number from the user."
 *         email:
 *           type: string
 *           description: "E-mail address from the user. Each email is a unique entry on the database."
 *         password:
 *           type: string
 *           description: "Password from the user."
 *       example:
 *         firstname: John
 *         lastname: Doe
 *         dob: 1998-01-21
 *         address: Elm Street 123
 *         phone: 381155202020
 *         email: johndoe@gmail.com
 *         password: strongpassword
 *     CreateUserResponse:
 *       type: object
 *       required:
 *         - firstname
 *         - lastname
 *         - date of birth
 *         - address
 *         - phone number
 *         - email
 *       properties:
 *         firstname:
 *           type: string
 *           description: "Firstname(s) from the new registered user."
 *         lastname:
 *           type: string
 *           description: "Lastname(s) from the new registered user."
 *         date of birth:
 *           type: string
 *           format: date
 *           description: "Date of birth from the new registered user."
 *         address:
 *           type: string
 *           description: "Address of residence from the new registered user."
 *         phone number:
 *           type: string
 *           description: "Phone number from the new registered user."
 *         email:
 *           type: string
 *           description: "E-mail address from the new registered user."
 *       example:
 *         firstname: John
 *         lastname: Doe
 *         date of birth: 1998-01-21
 *         address: Elm Street 123
 *         phone number: 381155202020
 *         email: johndoe@gmail.com
 *     LoginUserInput:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: "Email from the user, previously registered"
 *         password:
 *           type: string
 *           description: "Password from the user, previously registered"
 *       example:
 *         email: johndoe@gmail.com
 *         password: strongpassword
 *
 */

const swaggerSpec = swaggerJsDoc({
    definition: {
      openapi: "3.0.0",
      info: {
        title: "API MediCall",
        version: "1.0.0",
        description: "This API seeks to provide the essentials functions for the web application MediCall.",
      },
      tags: [{
        name: "User",
        description: "Everything related to the users of MediCall"
      },],
      components:{
          securitySchemes:{
              bearerAuth:{
                  type: "http",
                  scheme: 'bearer',
                  bearerFormat: "JWT",
  
              }
          }
      },
      security: [
      {
          bearerAuth:[],
      }
  ],
    },
    apis: [
      `src/routes/*.js`,
      `src/routes/*.ts`,
      `${__dirname}/swagger.js`,
      `${__dirname}/swagger.ts`,
    ],
  })
  
  export default swaggerSpec