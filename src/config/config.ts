require('dotenv').config();

export const config = {
    "dev": {
        "username": "",
        "password": "",
        "database": "",
        "host": "",
        "dialect": "postgres"
    },
    "prod": {
        "username": "",
        "password": "",
        "database": "",
        "host": "",
        "dialect": "postgres"
    },
    "jwt": {
        "secret": process.env.JWT_SECRET
    }
}