# Contract 
---

- /login
  POST_BODY{
    "email",
    "password"
  }

  RETURN {
    token: String,
    user_id: Int,  
  }

- /register

- /logout: hapus state

- /routes
  RETURN [
    {
      "id": Int,
      "start_loc": String,
      "end_loc": String,
      "detail": [
        {
          "id": Int,
          ...
          "bus_id": Int,
        }
      ]
    }
  ]

- QR Code
  base64("bus_id")

- /pay
  POST_HEADER {
    "token": String
  }
  POST_BODY {
    "user_id": Int,
    "bus_id": Int,
  }
  
  RETURN {
    "status_code": 200 | 400,
    "error": String | null,
    "price": Float, //price bus
  }  
  
  
- /top_up
  POST_HEADER {
    "token": String,
  }
  
  POST_BODY {
    "nominal": Int,
    "user_id": Int,
  }













