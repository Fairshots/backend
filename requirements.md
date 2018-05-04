
Fairshots is a platform that connects photographers and non-profit organizations. It makes it easy for organizations to browse and connect to photographer that are looking for world changing work, both globally and locally.

1. Fairshots Backend serve as API endpoint/controller for the website system.

2. Photographers will register and may store following personal information:
- Name
- E-mail
- Phone
- City --> relationship 1-to-1
- Country --> relationship 1-to-1 linked with city
- Skill level --> enumeration
- Biography
- Portfolio Images (up to 10) ==> images will go to CDN / links to image will be stored on DB
- personal site (optional)
- facebook  (optional)
- instagram (optional)
- language (opt) --> relationship 1-to-many
- interest in causes (opt) --> relationship 1-to-many

3. Organizations will register. Following fields can be stored:
- Name
- If local branch => parent organization (optional)
- Logo (image)
- Contact person
- Position (optional)
- E-mail
- Phone
- City
- Country
- Languages (optional)
- Primary Cause (optional)
- Organization Background (optional)
- Org website
- Org facebook
- Funding Partner or Participating NGO

4 - Organizations might create projects with following info.

- Title
- Primary Cause
- Description
- Reference images
- Location (city/country)
- Starting date
- Duration
- Photographers needed
- Application deadline
- Photographs delivery deadline (optional)
- Funding options
- Funds available ($ - optional)
- Funding details
- Fairshots funding help option (optional)
- Geographic restriction for applications
- Up to Three specific questions to be asked

-> Modeled by relationship between org and project.

5 - The projects created in 4 will be used to get application from photographers

-> This is modeled by database relationship between photographer and project


6 - Fairshots Admin wants to do advanced search queries over data in 2,3,4

-> Admin will have a specific route and his status will be checked in DB by looking for ID of the user and verifying if he has the admin role set. Other admins can only be setup by the administrator.

-> Inside his route Admin will be able to access info and queries only allowed to him.


7 - Integration with a Maps API

8 - Unique Gallery style for individual project
(think personalized blog / maybe should store microblogs with wordpress themes for this )

9 - donation widget
(any crowdfunding platforms? )

10 - FAIRSHOTS SHOP
(another project by itself.. Maybe phase three)
	Online store for selling fairshots exclusive publications (books and magazines) and raise money for the project pool.
