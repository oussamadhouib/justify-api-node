# Text Justification (Node.js / Typescript)

Takes a text, and then converts it to text with 80 chars maximum per line. Check out the
[documentation](https://api-justify-node.herokuapp.com/api/docs) for more information.


## Prerequisites

- [Node.js](https://nodejs.org/en/download/)
- [MongoDB](https://docs.mongodb.com/manual/installation/)

## Installation

1. Clone the repo.

```sh
git clone https://github.com/oussamadhouib/justify-api-node.git
```

2. Change directory.

```sh
cd justify-api-node
```

3. Install NPM packages.

```sh
npm install
```
#### Pre-run instruction
Add your keys to `.env` file or have it in-memory

You could find key names to use in `.env.example`



#### Run in development mode
```
npm run dev
```

#### Run in production mode
```
npm run build
npm run start
```
#### Usage
1. Create a user at `/api/users`
Body example:
```
{
	"email": "foo@bar.com",
	"password": "123456789.azerty!"
}
```
You will have a return from server like:
```
{
    "email": "foo@bar.com",
    "password": "$2b$10$8pNpB.yv1EU5SCGHAFmG8ebS/pyjxDptPpXgWcffAUHtgEnhFv8n2",
    "words": 0,
    "_id": "626bb7453109b30a3c04cdcf",
    "__v": 0
}
```
Where is `email` - is your email
and `words` - your nb of words on the DB


2. Get a token
   
This service using JWT sessions
Before using the justifier you have to request a token here `/api/token`. 
Body example:
```
{
	"email": "foo@bar.com",
	"password": "123456789.azerty!"
}
```
Example of response:
```
{
    "payload": {
        "email": "test@test.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpYXQiOjE2NTEyMjI1MTAsImV4cCI6MTY1MTgyNzMxMH0.ztI3Y8s4MoB31mR-9-CY-Kamu6hzTF8s1AYi_2StRMA"
}
```


3. Justify your text
Now we are ready to use justify your text 
POST request `/api/justify`

To form a request, set headers to:
```
Content-Type: text/plain
Bearer-Token: your token value from the laststep
```
Body example: 
```
"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
```

In response you will find the text in justified form
```
"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
tempor\nincididunt  ut  labore  et  dolore  magna  aliqua. Ut enim ad minim
veniam, quis\nnostrud  exercitation  ullamco  laboris nisi ut aliquip ex e
commodo consequat.\nDuis aute irure dolor in reprehenderit in voluptate velit
esse cillum dolore eu\nfugiat  nulla  pariatur. Excepteur sint occaecat 
cupidatat non proident, sunt in\n"
```


After each usage your `number of words` change.

If you will send a request to justify text and your number of words > 80 000, then server will respond in this manner:
```
{
  "statusCode" : 402,
  "error": "Payment Required"
}
```

