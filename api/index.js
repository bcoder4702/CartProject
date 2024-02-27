const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const productRoute = require("./routes/product");
const cors = require("cors");
require("./config/database").connect();

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};


const app = express();
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");


dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.use(helmet());
app.use(morgan("common"));

const options ={
  definition: {
    openapi: "3.0.0",
    info: {
      title: "E-commerce API",
      version: "1.0.0",
      description: "A simple Express Library API",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          in: 'header',
          name: 'Authorization',
          description: 'Bearer token to access these api endpoints',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    servers: [
      {
        url: "http://localhost:8080",
      },
    ],
   },
    apis: ["./routes/auth.js","./index.js","./routes/users.js","./routes/product.js"],
}

const swaggerSpec = swaggerJSDoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Cheking swagger

/**
 * @openapi
 * /:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
 app.get('/', (req, res) => {
   res.status(200).send("Welcome to E-commerce API");
 });

 /**
  * @openapi
  *  components:
  *      schemas:
  *         Product:
  *                 type: object
  *                 properties:
  *                       img:
  *                         type: string
  *                       price:
  *                         type: string
  */

 // Performing on Product Route

/**
 * @openapi
 * /api/product/:
 *    get:
 *      description: Welcome to prducts
 *      responses:
 *        200:
 *          description: Returns a list of all products.
 *          content:
 *           application/json:
 *            schema:
 *            type: array
 *           items:
 *               $ref: '#/components/schemas/Product'
 * 
 */

/**
 * @openapi
 * /api/user/cart:
 *    get:
 *     summary: Get products from the user's cart
 *     description: Retrieve products from the cart of a particular user.
 *     security:
 *       - bearerAuth: []  # Referencing the security scheme defined in securityDefinitions
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               products:
 *                 - name: Product 1
 *                   price: 20.0
 *                 - name: Product 2
 *                   price: 30.0
 *     securityDefinitions:
 *       bearerAuth:
 *         type: apiKey
 *         in: header
 *         name: Authorization
 */


/**
 * @openapi
 * /api/auth/register:
 *    post:
 *      summary: Register a new user
 *      description: Register a new user with the system
 *      requestBody:
 *              required: true
 *              content:
 *                 application/json:
 *                     schema:
 *                       $ref: '#/components/schemas/Product'
 *      responses:
 *         200:
 *          description: User registered
 *         400:
 *          description: Error
 *         500:
 *          description: Server error
 */

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);

app.listen(8080, () => console.log("listening at 8080"));
