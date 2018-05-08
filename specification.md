# 1. General info
Fairshots is a platform that connects photographers and non-profit organizations. It makes it easy for organizations to browse and connect to photographer that are looking for world changing work, both globally and locally.

1. Fairshots Backend serve as API endpoint/controller for the website system.

# 2. Database Initial Requirements 
### 2.1 Photographers will register and may store following personal information (marked are already mapped)
- [x] Name
- [x] E-mail
- [x] Phone
- [x] City 
- [x] Country 
- [x] Skill level --> enumeration
- [x] Biography
- [ ] Portfolio Images (up to 10) ==> images will go to CDN / links to image will be stored on DB
- [x] facebook  (optional)
- [x] instagram (optional)
- [x] language (opt) 
- [x] interest in causes (opt)

### 2.2. Organizations will register. Following fields can be stored:
- [x] Name
- [x] If local branch => parent organization (optional)
- [x] Logo (image)
- [x] Contact person
- [x] Position (optional)
- [x] E-mail
- [x] Phone
- [x] City
- [x] Country
- [x] Languages (optional)
- [x] Primary Cause (optional)
- [x] Organization Background (optional)
- [x] Org website
- [x] Org facebook
- [x] Funding Partner or Participating NGO

### 2.3 - Organizations might create projects with following info.

- [x] Title
- [x] Primary Cause
- [x] Description
- [ ] Reference images
- [x] Location (city/country)
- [x] Starting date
- [x] Duration
- [x] Photographers needed
- [x] Application deadline
- [x] Photographs delivery deadline (optional)
- [x] Funding options
- [x] Funds available ($ - optional)
- [x] Funding details
- [x] Fairshots funding help option (optional)
- [x] Geographic restriction for applications
- [x] Up to Three specific questions to be asked

### 2.4 - The projects created in 4 will be used to get application from photographers
- [ ] This is modeled by associative entity between photographer and project


# 3 - API Requirements

### 3.1 Fairshots Admin wants to do advanced search queries over data in database

-> Admin will have a specific route and his status will be checked in DB by looking for ID of the user and verifying if he has the admin role set. Other admins can only be setup by the administrator.

-> Inside his route Admin will be able to access info and queries only allowed to him.

### 3.2 - Integration with a Maps API

# 4 Others

### 4.1 - Unique Gallery style for individual project
(think personalized blog / maybe should store microblogs with wordpress themes for this )

### 4.2 - donation widget
(any crowdfunding platforms? )

# 5 - FAIRSHOTS SHOP
(another project by itself.. Maybe phase two)
	Online store for selling fairshots exclusive publications (books and magazines) and raise money for the project pool.
