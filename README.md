This is example of simple backend auth using *HttpOnly cookies* for better security.

.ENV frontend sample {

}

.ENV backend-auth sample {
  DATABASE_URL=
  
  DB_USERNAME=
  DB_PASSWORD=
  DB_HOSTNAME=
  DB_NAME=
  
  SECRET_KEY_BASE=
  GUARDIAN_SECRET=
}

HOW TO INSTALL PACKAGES:
  frontend:
    *bun install* or *npm install*

  backend:
    *mix deps.get*
