# News and Weather Application

Involves a news application which fetches news articles, and a weather API which fetches data from 3rd party api vendor.

### Overview of the Application
* This web application allows the user to sign up, login and logout. An incorrect username or password won't allow the user to login. For the login, you can use -> (username: **user**, password: **12345678**).
* Only authenticated users can use the functionality.
* Allowed the user to choose to search news source with any search query. On trying to access the api without any search error will thrown to provide the search value.
* Allowed the user to get top news headlines.
* Allowed the user to get weather information based on location. 


## Steps to set up and Run the Application

### Installation and Running
1. You need to have **node.js** , **npm** and **mongodb** installed on your machine. Once installed, you can check the versions using the below commands

```sh
node -v // using v10.10.0
npm -v
```


2. Clone the project from GitHub Repository and Install all the necessary packages

```sh
git clone https://github.com/swatiM19/NewsAndWeatherInfo.git
cd NewsAndWeatherInfo
npm install
```

3. Start node.js server

```sh
nodemon app.js
```
4. Setup Redis for caching

```sh
  $ curl -O http://download.redis.io/redis-stable.tar.gz
  $ tar xzvf redis-stable.tar.gz
  $ cd redis-stable
  $ make
  $ make test
  
  ( In case following error is encountered on mac: node-gyp 'pkg-config: command not found', run following command:
     $ brew install zeromq
     $ brew install pkgconfig
  )
  
  $ sudo make install
  $ redis-server

Redis server is ready.

```


###POSTMAN
You can use below link to access api documentation and example.
https://documenter.getpostman.com/view/9681111/TzRSgnXn

### Technologies Used
Core :
* Nodejs
* Express
* Mongodb
* mongoose

Tool: 
* eslint

Caching: 
* redis
( caching is done only for search news API as a sample. Can be implemented for other APIs also.)

Authentication: 
* bcryptjs
* jsonwebtoken

Testing:
* mocha 

External Apis
* newsapi (client library)
* openweathermap 

###Test

```shell script
npm test
```

#### For Task 1 
go to file : task-1.md in main directory