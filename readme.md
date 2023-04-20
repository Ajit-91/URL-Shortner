# URL Shortner

## Prerequisites
To run this application, you must have the following software installed on your system:

Node.js
npm (Node Package Manager)

## Installation

1. Clone this repository to your local machine.
2. Navigate to the root directory of the project in your terminal.
3. Install the dependencies, run the following command in root directory:

```bash
  npm install
```

## Running the Server

1. Navigate to the root directory of the project in your terminal.
2. Create .env file in root directory and Create following variables :

``` 
    DB_URI= (mongodb URI)
    REDIS_HOST= (Redis Host name)
    REDIS_PORT= (Redis Port No)
    REDIS_PASSWORD= (Redis Password)
    JWT_EXPIRE= (provide no of days in integer)
    JWT_SECRET= (any string)
    ROOT_URL= (root url of app)
    URL_CREATION_LIMIT= (integer)
```
3. Run following command to run the Server
```bash
  node index.js
```

    