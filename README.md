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
*   [Environment Configuration](#environment-configuration)
*   [Installation Guide](#installation-guide)
*   [Stay Connected](#stay-connected)

---

### **Key Features**

*   **Secure by Design:** Implements HttpOnly cookies to prevent cross-site scripting (XSS) attacks from accessing sensitive cookie data.
*   **Backend Focused:** A clear and concise backend implementation, perfect for learning and integration.
*   **Easy to Follow:** Well-structured and commented code to guide you through the authentication flow.

---

### **Environment Configuration**

Properly setting up your environment variables is crucial for the application to run correctly. Below are the sample `.env` configurations for both the frontend and backend components.

#### **.ENV frontend sample**
```
# No environment variables are required for the frontend in this example.
```

#### **.ENV backend-auth sample**
```
DATABASE_URL=
DB_USERNAME=
DB_PASSWORD=
DB_HOSTNAME=
DB_NAME=
SECRET_KEY_BASE=
GUARDIAN_SECRET=
```
> **Important:** Ensure you replace the placeholder values with your actual database credentials and secret keys.

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

### **Stay Connected**

<p align="center">
  <a href="https://www.linkedin.com/in/your-profile" target="_blank">
    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn">
  </a>
  <a href="https://twitter.com/your-profile" target="_blank">
    <img src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white" alt="Twitter">
  </a>
</p>
