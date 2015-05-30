# techparty-data

## TechParty API

#### Install dependencies
```js
  npm install
```

#### Starting
```js
  npm start
```

#### Routes

Participant:
- Search
  - url: http://localhost:3000/api/participant/search
  - method: POST
  - params
    - username: daniel
    - year: 2015 (default current year)
  - success (200)
    - name array
  - error (500)
    - error object
- Get
  - url: http://localhost:3000/api/participant/get
  - method: POST
  - params
    - username: daniel
    - year: 2015 (default current year)
  - success (200)
    - name
    - count
  - error (500)
    - error object

Speaker:
- Search
  - url: http://localhost:3000/api/speaker/search
  - method: POST
  - params
    - username: daniel
    - year: 2015 (default current year)
  - success (200)
    - name array
  - error (500)
    - error object
- Get
  - url: http://localhost:3000/api/speaker/get
  - method: POST
  - params
    - username: daniel
    - year: 2015 (default current year)
  - success (200)
    - name
    - email
    - talk
    - date
    - minutes
    - year
  - error (500)
    - error object
 
#### Seed
```js
  node seed/participant.js
  node seed/speaker.js
```

#### Technologies
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.org/)
