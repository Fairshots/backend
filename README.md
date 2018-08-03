# backend

## API Instructions

| Title  | URL  | Method  | Params  |
|---|---|---|---|
| login  | /login  | POST  |   |
| register new photographer  | /api/photographer  | POST  |  |
|  read photographer | /api/photographer/:id | GET  | Header Authorization: 'bearer token'   |
|  update photographer info  | /api/photographer/:id   |  PUT | Header Authorization: 'bearer token'   |
| insert links of photos | /api/photographer/:id/photos  |  POST | Header Authorization: 'bearer token'   |
| delete photographer account  | /api/photographer/:id   | DELETE  | Header Authorization: 'bearer token'   |
|  register new organization | /api/organization  | POST  |   | 
| read organization  |  /api/organization/:id | GET  | Header Authorization: 'bearer token'   |
|  update organization |  /api/organization/:id | PUT  | Header Authorization: 'bearer token'   |
| delete organization  | /api/organization/:id  | DELETE  |  Header Authorization: 'bearer token'  |
| create new project  |  /api/project |  POST | Header Authorization: 'bearer token'   |
| apply to project (photographer)  |  /api/project/:id | POST  | Header Authorization: 'bearer token'   |
| view project  | /api/project/:id  | GET  | Header Authorization: 'bearer token'   |

## Details on Request Params

All requests params may be sent as x-www-form-urlencoded or JSON in request body

**/login**  (req body only)
```javascript
{
  email: [string],
  password: [string]
}
````
Success: 
Code 200 - 
content: object
```javascript
{ 
  msg: 'Logged in',
  userId: [string],
  token: [string]
} 
````
Failure:
Code 401 - Unauthorized

**/api/photographer**
```javascript
{
  name: [string],   //required
  email: [string],  //required
  password: [string],
  skill: ['Student' | 'Amateur' | 'Professional'] , //required
  biography: [text], //required
  webpage: [string],
  facebook: [string],
  instagram: [string],
  pictUrl: [string],
  languages: [string array] ,
  causes: [string array] ,
  city: [string] , //required
  country: [string], //required 
}
````
Success: 
Code 201 - created
content: object
```javascript
{ 
  photographer
} 
````
Failure:
Code 500 - Internal Server Error
```javascript
{ 
  error object
} 
````

**/api/photographer/:id*
```javascript

Authentication: 'bearer token'
````
Success: 
Code 201 - created
content: object
```javascript
{ 
  photographer
} 
````
Failure:
Code 500 - Internal Server Error
```javascript
{ 
  error object
} 
````
