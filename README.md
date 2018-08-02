# backend

## Api Instructions

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
