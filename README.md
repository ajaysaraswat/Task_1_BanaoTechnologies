Task-1
Create APIs for

let User full Name : Test
    User Email     : ajaykumarsaraswat9045@gmail.com
    User Password  : Test@123(it will be hash during save in database)
 
Base_Url - http://localhost:3000/
Api      - Base_Url/Api_End_Point

1.1 User Registration using Email Password and username

    Api_End_Point : /register
    Api           : http://localhost:3000/register 

1.2 User Login using username and password

    Api_End_Point : /login
    Api           : http://localhost:3000/login


1.3 Forget User password API

	2 steps->
		1. email verification(through gmail link)
		2. Password Reset

    Api_End_Point : /(post request with params email)
    Api           : http://localhost:3000/

    let New Password = ajay@123

    get the reset email link and provide password 
    Api           : http://localhost:3000/:UserId/:token 

Now ui of this --->
