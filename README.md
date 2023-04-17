# Award Application

## Quick Start
* Clone Application
```
git clone https://github.com/dhianica/test-member-id.git
```

* Move Folder Application
```
cd test-member-id
```
  
## Requirements
 Before instalation we must install some package
 * [Node.js version > 18](https://nodejs.org/en)
 * [Yarn](https://yarnpkg.com/)
 * [Mysql](https://www.mysql.com/)

## Structure Folder
Structure folder application
  * backend
  * frontend
  
## Installation & Run Application
* ### Database
  * Create Database `test-member-id`
  * Exports file `test-member-id-202304171917.sql`
* ### Backend
  * Move folder backend
    ```
    cd backend
    ```
  * Rename file `.env.example` to `.env`
  * Install package
    ```
    yarn
    ```
  * Run Application
    ```
    yarn start:dev
    ```
  * Listen Application
    ```
    Application will be running in port 7030
    ```
    
* ### Frontend
  * Move folder frontend
    ```
    cd frontend
    ```
  * Install package
    ```
    yarn
    ```
  * Run Application
    ```
    yarn dev
    ```
  * Listen Application
    ```
    Application will be running in port 3000
    ```
  
## Testing Application
  * After exports sql we have 2 users email
    - user1@member.id
      - this is an user have a award
      
    - user2@member.id
      - this is an user dont have a award
  
  * Open Browser
    - visit `http://localhost:3000`
 
