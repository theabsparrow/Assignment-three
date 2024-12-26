# **Blog Project**

The goal of this assignment is to develop a backend for a blogging platform where users can write, update, and delete their blogs.
This is an advance backend application with rest apis built with the powerfull technology **Express.js**, **TypeScript**, and **MongoDB**. The system will have two roles: Admin and User. The Admin has special permissions to manage users and their blogs, while users can perform CRUD operations on their own blogs. The backend will include secure authentication, role-based access control, and a public API for viewing blogs with search, sort, and filter functionalities.

---

## **Live Demo** : https://blog-backend-node.vercel.app

---

## **Features**

### **User Registration**

- Register a user with the necessary information name, email, password
- User are created for two role like **user** , **admin**.
- Log in user can update their name and email.
- Admin can block a user

### **Blog creation management**

- A valid user can create a blog after logging in with valid email and password.
- A valid user can update the title and content of his own blog by loging with valid email and password.
- Any user can get all the blogs together with the functionality of search, sort,sortby, filter
- Admin can delete any blog from the database.

### **Error Handling**

- Handled the ZOD error effectively
- Handled the mongoose validation error effectively
- Handled the not found error effectively
- Handled the unhandlerejection error
- Handled the uncaughtexception error
- Handled the caste error

---

## **Technologies Used**

- **Language:** TypeScript
- **Backend technology:** Node.js,
- **Framework:** Express.js
- **Database:** MongoDB with the library Mongoose
- **Validation:** Zod validation library
- **API Testing:** Postman
- **Deployment:** vercel

## **Project Structure**

```
📦 Blog-project
├── 📂 src
│   ├── 📂 builder                   # builder files
│   │   ├── QueryBuilder.ts          # queryBuilder functionalities with class
│   ├── 📂 config                    # Configuration files
│   │   ├── index.ts                 # env file connection setup
│   ├── 📂 error                     # error files
│   │   ├── AppError.ts                 # Error functionality with AppError class
│   │   ├── handleCastError.ts                 # Caste error functionality
│   │   ├── handledDuplicateError.ts                 # Dulpicate error functionality
│   │   ├── handleValidationError.ts                 # validation error from mongoose functionality
│   │   ├── handleZodError.ts                 # zod error functionality
│   ├── 📂 interface                     # Global interface files
│   │   ├── error.ts                 # global error interface
│   │   ├── index.ts                 # include custome type to the express with global instance functionality
│   ├── 📂 middlewire                     # middlewire files
│   │   ├── auth.ts                 # auth middlewire functionality middlewire
│   │   ├── globalErrorHandlers.ts                 # global error handling functionality middlewire
│   │   ├── notfound.ts                 # not found error handling functionality middlewire
│   │   ├── validateRequest.ts                 # validateRequest functionality middlewire
│   │
│   ├── 📂 modules                # All modules
│   │   ├── 📂 auth
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.interface.ts
│   │   │   ├── auth.route.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.validation.ts
│   │   │
│   │   ├── 📂 blogs
│   │   │   ├── blog.const.ts
│   │   │   ├── blog.Route.ts
│   │   │   ├── blogs.controller.ts
│   │   │   ├── blogs.interface.ts
│   │   │   ├── blogs.model.ts
│   │   │   ├── blogs.service.ts
│   │   │   ├── blogs.validation.ts
│   │   │   ├── rawsearching.filtering.sorting.ts
│   │   ├── 📂 user
│   │       ├── user.const.ts
│   │       ├── user.controller.ts
│   │       ├── user.interface.ts
│   │       ├── user.model.ts
│   │       ├── user.route.ts
│   │       ├── user.service.ts
│   │       ├── user.validation.ts
│   ├── 📂 router
│   │         ├── index.ts
│   ├── 📂 utills
│   │         ├── catchAsync.ts
│   │         ├── sendResponse.ts
│   ├── app.ts     # Application setup (middleware, routes, etc.)
│   ├── server.ts    # Server startup file
│
├── 📂 dist                       # Compiled output (TypeScript -> JavaScript)
│
├── 📂 node_modules               # Installed dependencies
│
├── .env                          # Environment variables file
├── .gitignore                    # Ignored files for Git
├── .prettierignore                    # Ignored files for Git
├── .prettierrc.json                  # Ignored files for Git
├── eslint.config.mjs                 # Ignored files for Git
├── package-lock.json                # Ignored files for Git
├── package.json                  # Project dependencies and scripts
├── README.md                      # Locked dependency versions
├── tsconfig.json                 # TypeScript configuration
├── vercel.json                 # vercel configuration

```

---

### **Installation**

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/theabsparrow/Assignment-three.git
   cd Assignment-three
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables:**  
   Create a `.env` file in the root directory and add the following:

   ```env
   NODE_ENV=development
   PORT=3000
   DATABASE_URL=your_mongodb_connection_string
   BYCRIPT_SALT_ROUNDS= your own
   JWT_ACCESS_SECRET = your jwt secret
   ```

4. **Run the Server:**
   ```bash
   npm run dev
   ```
   The server will start at `http://localhost:3000`.

to compile the files in java script in dist folder

```bash
npm run build
```

### got to package.json file to know more command located in the script object

---

### **User endpoints**

1. **register a user:**

   - **POST** `https://blog-backend-node.vercel.app/api/auth/register` for role "user"
     `https://blog-backend-node.vercel.app/api/admin/register-admin` for role "admin"
   - **Request Body:**
     ```json
     {
       "name": "something",
       "email": "somethin@gmail.com",
       "password": "your password"
     }
     ```
   - **Response:** Details of the recent registered user info.

2. **Get All user:**

   - **GET** `https://blog-backend-node.vercel.app/api/auth/getAllUsers`
   - Only valid login user with the role "admin" can use this route
   - **Response:** List of users.

3. **Get a certain user:**

   - **GET** `https://blog-backend-node.vercel.app/api/auth/getUser/:id`
   - Only valid login user with the role "admin" can use this route
   - **Response:** Details of a certain user.

4. **Update a user info:**

   - **PATCH** `https://blog-backend-node.vercel.app/api/auth/getUser/:id`
   - valid login user with the role "user" and "admin" both can user this route to update their name and email
   - **Request Body:** Partial updates (e.g., `name`, `email`).
   - **Response:** Updated a certain user`s details.

5. **Block a Car user:**

   - **PATCH** `https://blog-backend-node.vercel.app/api/auth/users/:userId/block`
   - Only "admin" can use this route to block a user after logging in
   - **Response:** Confirmation message for a deletion.

   ### **Blog Endpoints**

6. **create a Blog:**

   - **POST** `https://blog-backend-node.vercel.app/api/blogs`
   - Only A valid login user with the role "user" can use this route to create blogs
   - **Request Body:**
     ```json
     {
       "title": "My First Blog",
       "content": "This is the content of my blog."
     }
     ```
   - **Response:** Details of the created blog.

7. **Update a blog info:**

   - **PATCH** `https://blog-backend-node.vercel.app/api/blogs/:id`
   - Only A valid login user with the role "user" can use this route to update his own blog`s title and content
   - **Request Body:** Partial updates (e.g., `title`, `content`).
   - **Response:** The updated blog data

8. **Delete a blog info by user:**

   - **DELETE** `https://blog-backend-node.vercel.app/api/blogs/:id`
   - Only A valid login user with the role "user" can use this route to delete his own blog
   - **Response:** The blog deleted

9. **Delete any blog info by admin:**

   - **PATCH** `https://blog-backend-node.vercel.app/api/admin/blogs/:id`
   - Only A valid login user with the role "admin" can use this route to delete any blog
   - **Response:** The blog deleted

10. **get all blogs by searching, filtering,sorting :**

- **GET** `https://blog-backend-node.vercel.app/api/blogs?search=technology&sortBy=createdAt&sortOrder=desc&author=authorID`
- the search will work for title and content field with the sort and filtering functionality
- any user without logging in can use this route to see the blog info
- **Response:** list of all blogs

11. **User can login with his valid email and password:**

- **GET** `https://blog-backend-node.vercel.app/api/auth/login`
- A user can login to perform his duties by providing valid email and password
- **Request Body:** (e.g., `email`, `password`).
- **Response:** user login successfully with the token

---

## **Error Handling**

- **Validation Errors:**  
  Returns a clear and meaningfull error message with a sequence when input validation fails.  
  Example:

  ```json
  {
    "success": false,
  "message": "Invalid credentials",
  "statusCode": "necessary status code",
  "error": { "details" },
  "stack": "error stack"
  }
  ```

- **Not Found:**  
  Returns `404` if a product or order is not found.

---
