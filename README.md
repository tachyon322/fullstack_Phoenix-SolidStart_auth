<h1 align="center">Backend Authentication with HttpOnly Cookies</h1>

<p align="center">
  A secure and straightforward example of backend authentication utilizing HttpOnly cookies for enhanced security.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/SolidJS-2C4F7C?style=for-the-badge&logo=solid&logoColor=white" alt="SolidJS">
  <img src="https://img.shields.io/badge/Bun-FBF0DF?style=for-the-badge&logo=bun" alt="Bun">
  <img src="https://img.shields.io/badge/NPM-CB3837?style=for-the-badge&logo=npm" alt="NPM">
  <img src="https://img.shields.io/badge/Elixir-4B275F?style=for-the-badge&logo=elixir" alt="Elixir">
</p>

<br>

This project serves as a practical demonstration of implementing a secure authentication system. By leveraging HttpOnly cookies, it helps mitigate common web vulnerabilities, providing a robust foundation for your backend services.

---

### **Table of Contents**

*   [Key Features](#key-features)
*   [Google Oauth](#google-oauth)
*   [Environment Configuration](#environment-configuration)
*   [Installation Guide](#installation-guide)
*   [API Endpoints & cURL Examples](#api-endpoints--curl-examples)

---

### **Key Features**

*   **Secure by Design:** Implements HttpOnly cookies to prevent cross-site scripting (XSS) attacks from accessing sensitive cookie data.
*   **Backend Focused:** A clear and concise backend implementation, perfect for learning and integration.
*   **Easy to Follow:** Well-structured and commented code to guide you through the authentication flow.

---
### **Google Oauth**

When a user clicks the Google login button, the app navigates to: `http://localhost:4000/auth/google` (can be edited in `frontend/src/routes/index.ts`)

After selecting a Google account, the user gets redirected back to: `frontend_url = System.get_env("FRONTEND_URL") || "http://localhost:3000"` (as configured in the `auth_controller.ex` file).

---

### **Environment Configuration**

Properly setting up your environment variables is crucial for the application to run correctly. Below are the sample `.env` configurations for both the frontend and backend components.

#### **.ENV frontend sample**
```
# No environment variables are required for the frontend in this example.
```

#### **.ENV backend-auth sample**
```
DATABASE_URL=postgresql://user:password@localhost:5432/phx-auth

DB_USERNAME=user
DB_PASSWORD=password
DB_HOSTNAME=localhost
DB_NAME=phx-auth

SECRET_KEY_BASE=hash
GUARDIAN_SECRET=hash

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

FRONTEND_URL=http://localhost:3000
```> **Important:** Ensure you replace the placeholder values with your actual database credentials and secret keys.

---

### **Installation Guide**

Follow these simple steps to get the project up and running on your local machine.

#### **Frontend**

To install the necessary frontend packages, you have two options:

*   **Using Bun:**
    ```sh
    bun install
    ```
*   **Using npm:**
    ```sh
    npm install
    ```

#### **Backend**

For the backend, you'll need to fetch the Elixir dependencies using `mix`:

```sh
mix deps.get
```

---

### **API Endpoints & cURL Examples**

Below are examples of how to interact with the API endpoints using cURL.

#### **Register**

This endpoint creates a new user.

```sh
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"user": {"email": "test@example.com", "password": "yourpassword"}}' \
  http://localhost:4000/api/register
```

#### **Login**

This endpoint authenticates a user and returns an HttpOnly cookie. We use `-c cookie.txt` to save the cookie for subsequent requests.

```sh
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "yourpassword"}' \
  -c cookie.txt \
  http://localhost:4000/api/login
```

#### **Get Current User (Protected Route)**

This is a protected endpoint that requires a valid session cookie. We use `-b cookie.txt` to send the cookie that was saved during login.

```sh
curl -X GET \
  -b cookie.txt \
  http://localhost:4000/api/me
```

#### **Logout**

This endpoint invalidates the user's session. It also requires the session cookie to identify which user to log out.

```sh
curl -X POST \
  -b cookie.txt \
  http://localhost:4000/api/logout
```
