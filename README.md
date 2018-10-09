# backend

## API Instructions

| Title  | URL  | Method  | Params  |
|---|---|---|---|
| login  | /login  | POST  |   |
| register new photographer  | /api/photographer  | POST  |  |
|  read photographer | /api/photographer/:id | GET  | Header Authorization: 'bearer token'   |
|  update photographer info  | /api/photographer/:id   |  PUT | Header Authorization: 'bearer token'   |
| delete photographer account  | /api/photographer/:id   | DELETE  | Header Authorization: 'bearer token'   |
| insert links of photos | /api/photographer/:id/photos  |  POST | Header Authorization: 'bearer token'   |
|  register new organization | /api/organization  | POST  |   | 
| read organization  |  /api/organization/:id | GET  | Header Authorization: 'bearer token'   |
|  update organization |  /api/organization/:id | PUT  | Header Authorization: 'bearer token'   |
| delete organization  | /api/organization/:id  | DELETE  |  Header Authorization: 'bearer token'  |
| insert links of photos | /api/organization/:id/photos  |  POST | Header Authorization: 'bearer token'   |
| create new project  |  /api/project |  POST | Header Authorization: 'bearer token'   |
| apply to project (photographer)  |  /api/project/:id | POST  | Header Authorization: 'bearer token'   |
| view project  | /api/project/:id  | GET  | Header Authorization: 'bearer token'   |

## Details on Request Params  

All requests params may be sent as x-www-form-urlencoded or JSON in request body.  


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
Returning:  
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
Returning:  
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
**GET**  
```javascript

Authentication: 'bearer token'
````
Success:  
Code 200 - created  
content: object  
Returning:  
```javascript
{
  Id: [string]
  Name: [string],   //required
  Email: [string],  //required
  Skill: ['Student' | 'Amateur' | 'Professional'] , //required
  Biography: [text], //required
  Webpage: [string],
  Facebook: [string],
  Instagram: [string],
  ProfilePicture: [string],
  Languages: [string array] ,
  Causes: [string array] ,
  City: [string] , //required
  Country: [string], //required 
  createdAt: [date],
  updatedAt: [date],
  Photos: {} ,
  Project Applications: {} 
}
````
Failure:  
Code 401 - Unauthorized  
Cause: invalid API Token  

**PUT**
```javascript

Authentication: 'bearer token'

{
  key: value // to be updated one or more
}
// Attention: Key name here must be equal to DB column names (most of the column names are capitalized). 
````
Success:  
Code 200 - OK  
content: object  
Returning:  
```javascript
[ x ]  // number of itens updated

````
Failure:  
Code 401 - Unauthorized  
Cause: invalid API Token  
Code 500 - Server Error  
Possible Causes: invalid values, wrong key names  

**DELETE**  
Authentication: 'bearer token'  

Success:  
Code 200 - OK  
content: object  
Returning:  
```javascript
{
  msg: " user deleted from database successfully" // to be updated one or more
}
````
Failure:  
Code 401 - Unauthorized  
Cause: invalid API Token  
Code 500 - Server Error  
Possible Causes: invalid values, wrong key names  


**/api/photographer/:id/photos**  

```javascript
{
  photos:[{
    photographerId: [ID],
    cloudlink:[URL]
  },
  {
    ophotographerId: [ID],
    cloudlink:[URL]
  }]
}
```
Success:  
Code 201 - created  
content: object  
Returning:  
```javascript
[{
    id: [ID]
    organizationId or photographerId: [ID],
    cloudlink:[URL]
  },
  {
    id: [ID]
    organizationId or photographerId: [ID],
    cloudlink:[URL]
 }]
 ```
 

**/api/organization**
```javascript
{
  name: [string],   //required
  _parent: [string],
  logo: [URL],
  email: [email],  //required
  person: [string], //required
  position: [string],
  password: [string],
  phone: [phone]
  background: [text], //required
  website: [URL], //required
  facebook: [URL],
  funding: [boolean], //required
  languages: [string array] ,
  causes: [string array] ,
  city: [string] , //required
  country: [string], //required 
  createdAt: [date],
  updatedAt: [date]
}
````
Success:  
Code 201 - created  
content: object  
Returning:  
```javascript
{ 
  organization
} 
````
Failure:  
Code 500 - Internal Server Error  
```javascript
{ 
  error object
} 
````

**/api/organization/:id**  
**GET**  
```javascript

Authentication: 'bearer token'
````
Success:  
Code 200 - created  
content: object  
Returning:  
```javascript
{
  Name: [string],   //required
  Parent: [string],
  Logo: [URL],
  Email: [email],  //required
  ContactPerson: [string],
  Position: [string],
  Password: [string],
  Phone: [phone]
  Background: [text], //required
  website: [URL],
  facebook: [URL],
  FundingPartner: [boolean],
  Languages: [string array] ,
  Causes: [string array] ,
  City: [string] , //required
  Country: [string], //required 
  Photos: {},
  Projects: {}
}
````
Failure:  
Code 401 - Unauthorized  
Cause: invalid API Token  

**PUT**
```javascript

Authentication: 'bearer token'

{
  key: value // to be updated one or more
}
// Attention: Key name here must be equal to DB column names (most of the column names are capitalized). 
````
Success:  
Code 200 - OK  
content: object  
Returning:  
```javascript
[ x ]  // number of itens updated

````
Failure:  
Code 401 - Unauthorized  
Cause: invalid API Token  
Code 500 - Server Error  
Possible Causes: invalid values, wrong key names  

**DELETE**  
Authentication: 'bearer token'  

Success:  
Code 200 - OK  
content: object  
Returning:  
```javascript
{
  msg: " user deleted from database successfully" // to be updated one or more
}
````
Failure:  
Code 401 - Unauthorized  
Cause: invalid API Token  
Code 500 - Server Error  
Possible Causes: invalid values, wrong key names  


**/api/organization/:id/photos**  

```javascript
{
  photos:[{
    organizationId: [ID],
    cloudlink:[URL]
  },
  {
    organizationId: [ID],
    cloudlink:[URL]
  }]
}
```
Success:  
Code 201 - created  
content: object  
Returning:  
```javascript
[{
    id: [ID]
    organizationId: [ID],
    cloudlink:[URL]
  },
  {
    id: [ID]
    organizationId: [ID],
    cloudlink:[URL]
 }]
 ```
 
 **/api/project/**    
```javascript
{
        title: [string],
        description: [string],
        startingDate: [date],
        duration: [integer],
        applicationDate: : [date],
        deliveryDate: [date],
        fundingOptions: ['No Funds' | 'Expenses' | 'Photographer'],
        fundsAvailable: [string],
        fundsDetails: [string],
        fundsFairshot: [boolean],
        photographersNeeded: [integer],
        professionalOnly: [boolean],
        geographicRestriction: ['Anywhere'|'Continent'|'Country'|'Region'],
        question1: [string],
        question2: [string],
	      question3: [string],
	      city: [string],
	      country: [string],
        cause: [string],
        organizationId: [ID]
}
```
Success:  
Code 201 - created  
content: object  
Returning:  
```javascript
{ 
  project
} 
````
Failure:  
Code 500 - Internal Server Error  
```javascript
{ 
  error object
} 
````

**/api/project/:id*  
**GET**  
```javascript

Authentication: 'bearer token'
````
Success:  
Code 200 - created  
content: object  
Returning:  
```javascript
{
        Title,
        Description,
        StartingDate,
        Duration,
        ApplicationDate,
        Delivery,
        FundingOptions,
        FundsAvailable,
        FundsDetails,
        FundsFairshot,
        PhotographersNeeded,
        ProfessionalOnly,
        GeographicRestriction,
        Question1,
        Question2,
	      Question3,
	      City,
	      Country,
        Cause,
        organizationId,
        createdAt,
        updatedAt
}
````
Failure:  
Code 401 - Unauthorized  
Cause: invalid API Token  

**PUT**
```javascript

Authentication: 'bearer token'

{
  key: value // to be updated one or more
}
// Attention: Key name here must be equal to DB column names (most of the column names are capitalized). 
````
Success:  
Code 200 - OK  
content: object  
Returning:  
```javascript
[ x ]  // number of itens updated

````
Failure:  
Code 401 - Unauthorized  
Cause: invalid API Token  
Code 500 - Server Error  
Possible Causes: invalid values, wrong key names  

**DELETE**  
Authentication: 'bearer token'  

Success:  
Code 200 - OK  
content: object  
Returning:  
```javascript
{
  msg: "Project deleted from database successfully" // to be updated one or more
}
````
Failure:  
Code 401 - Unauthorized  
Cause: invalid API Token  
Code 500 - Server Error  
Possible Causes: invalid values, wrong key names  


**POST**  
```javascript

Authentication: 'bearer token'

{
  photographerId: [Id],
  answer1: [string],
  answer2: [string],
  answer3: [string] 
}
// Attention: Key name here must be equal to DB column names (most of the column names are capitalized). 
````

Success:  
Code 201 - created  
content: object  
Returning:  
```javascript
[ application result ]
````
Failure:  
Code 401 - Unauthorized  
Cause: invalid API Token  
Code 500 - Server Error  
Possible Causes: invalid values, wrong key names  
