- Learn about Monolithic and Microservices. 
- Learn about basic of LLD vs HLD.
- Learn about Express.js and REST APIs.
- Create a repository.
- Initialize the repository - npm init.
- What is node_modules, package.lock-json, package.json?
- Difference between caret and tilde.
- Install express and nodemon.
- Make changes to the scripts in the package.json.
- What is "-g" used while installing nodemon npm package?
- What is dependencies in package.json?
- Create a server using express and listen the incoming request on port 7777.
- Create route for /test, /hello, /data, etc.
- Learn about routes and route handler.


- Initialize git.
- Create .gitignore file and ignore the node_modules
- Create a remote repository on GitHub.
- Push all your code in the remote repository
- Play with routes and route extensions /hello, /, /hello/2, /xyz, etc.
- NOTE: Order of the route matters the most, because if any route get matches from the top then the route you want to access gets override by the route which is matched at the top of the code.
- Study about HTTP Methods - GET, POST, PUT, PATCH, DELETE
- Install postman for testing APIs.
- Create a workspace in postman and make a test api call.
- Write logic to handle GET, POST, PATCH, DELETE API Calls and test them on Postman.
- Study about req.query, req.params, req.body and how to read this in handler.
- Explore routing and use of ?, +, (), * in the routes.
- Use of regex in routes /a/, /.*fly$/


- Multiple Route Handlers - Play with the code
- next();
- next function and errors along with the res.send().
- app.use("/route", rH, [rH2, rH3], rH4, rH5).
- What is middlewares? Why do we need it?
- How Express.js basically handles requests behind the scenes.
- HTTP status code
- app.use vs app.all
- Write a dummy admin auth middleware for admin.
- Write a dummy auth middleware for all user routes, create a directory for middleware and import the middleware in the app.js.
- Error handling - try..catch, (err, req, res, next)

- Create a free cluster in the mongo atlas site.
- Install mongoose library
- Connect your application to the database <connection-url>/devTinder
- Call the connectDb function and connect to the database before starting application on 7777
- What is Schema in mongoose?
- Create a directory models in src and then add user.js and then create a userSchema and user model.
- Create a POST: /signup API to add data to database.
- Push some documents using API calls from postman.
- Error handling using try..catch


- Diff JS Object vs JSON
- Send dynamic JSON data from the req.body from the Postman.
- Add express.json middleware to your app.
- Make your /signup api dynamic to receive data from the end user
- Use read method of mongoose which are findOne, find, findById etc.
- Perform CRUD operation on the database
- Difference between PATCH and PUT
- Explore Mongoose Documentation for Model Methods


- Explore SchemaTypes options from Mongoose Document for Schema Validation. (eg. required, default, unique, minLength, maxLength, create custom validation function,  etc.).
- Put all appropriate validations on each field in all schema.
- Add timestamps in all the schema
- Add API level validation on user update and user signup api
- Data Sanitization - Add API validation for each field
- Install validator package of npm - npm i validator
- Use validator for validating email in the schema level or api level.
- Explore validator's different methods for validating the schema or api.
- NEVER TRUST req.body as it can have any type of malicious data in it.


- Validate data in Signup API
- Install bcrypt package
- Create hashedPassword using bcrypt.hash & save the user with encrypted password to the database.
- Create login API
- Compare passwords and throw error if email or password is invalid


- Install cookie-parser
- Send a dummy cookie to user
- create GET /profile API and check if you get the cookie back
- Install jsonwebtoken
- In login API, after email and password validation, create JWT token and send it to user
- Read the cookies inside you profile API and find the logged in user.
- Create userAuth Middleware
- Add the userAuth middleware in profile API and a new sendConnectionRequest API.
- Set the expiry of JWT token and cookies to 7 days.
- Create userSchema methods to getJWT().
- Create userSchema method to validatePassword()


- Explore tinder APIs
- Create a list of APIs you can think of in devTinder.
- Group multiple routes under respective routers.
- Read documentation for express.Router
- Create routes folder for managing auth, profile, request routers
- Create authRouter, profileRouter, requestRouter
- Import these routers in app.js
- Create POST /logout API
- Create PATCH /profile/edit API
- HW - Create PATCH /profile/password API => Forgot Password API
- Make sure you validate all data in every POST, PATCH APIs.


- Create connectionRequest model
- Create POST /request/send/:status/:receiverId for sending connection request.
- Apply validation to the above API such as for status, not sending connection request to same user and yourself as well, also check whether the user to whom you are sending connection exists of not, etc. (Think about all corner cases).
- Read about $or and $and query. Also explore different method used in mongoDB.
- Create a middleware .pre for the connectionRequestSchema which checks that the user is not sending request to itself.
- Read about indexes in MongoDb**
- Read about compound indexes. 
- Advantages and disadvantages to creating indexes.
- Study about why not to use more indexes in your schema.


- Write code with proper validation for - POST /request/review/:status/:requestId
- Thought process - POST vs GET
- Read about ref and populate
- Create - GET /user/requests/received
- Create - GET /user/connections


 - Logic for GET /feed API
 - Explore the $nin , $and, $ne and other query operators
 - Pagination

NOTES: 

 /feed?page=1&limit=10 => 1-10 => .skip(0) & .limit(10)

 /feed?page=2&limit=10 => 11-20 => .skip(10) & .limit(10)

 /feed?page=3&limit=10 => 21-30 => .skip(20) & .limit(10)

 /feed?page=4&limit=10 => 21-30 => .skip(20) & .limit(10)

skip = (page-1)*limit;