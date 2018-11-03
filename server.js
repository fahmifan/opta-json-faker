const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const bodyParser = require('body-parser')
const middlewares = jsonServer.defaults()

const BASE_ROUTE = "/api"

server.use(bodyParser.json())

const pt = "goodluck!"
const TOKEN = new Buffer(pt).toString("base64")    
const USER_ID = 1

server.post(BASE_ROUTE +  '/login', (req, res) => {
  const email = req.body.email
  const password = req.body.password

  if(!email || !password || email === "" || password === "") {
    res.statusCode = 400
    res.send({
      "error": "Email or Password Empty"
    })

    return
  }
 
  if(email === "opta@email.com" && password === "opta") {
    res.statusCode = 200
    res.send({
      "token": TOKEN,
      "user_id": USER_ID,
    })  

    return
  }
  
  res.statusCode = 400
  res.send({
    "email": email,
    "password": password,
    "error": "Email or Password Invalid"
  })
  
  return
})

server.use(middlewares)
server.use((req, res, next) => {
  console.log("token", req.headers.token)
  if(!req.headers.token) {
    res.sendStatus(401)
    return
  }

  if(req.headers.token !== TOKEN) {
    res.sendStatus(401)
    return
  }

  next() // continue to JSON Server router
})

server.get(BASE_ROUTE + '/ping', (req, res) => {
  return res.jsonp({
    "message": "pong"
  })
})

server.post(BASE_ROUTE + '/pay', (req, res) => {
  res.statusCode = 200
  
  return res.jsonp({
    "price": Number.parseFloat(8000.00),
  })
})

server.use('/api', router)

server.listen(8080, () => {
  console.log('JSON Server is running')
})