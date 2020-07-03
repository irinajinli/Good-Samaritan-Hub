# Our React App: The Good Samaritan Hub

## Instructions to Run:
Clone the github repository by running the following:
`git clone https://github.com/csc309-summer-2020/team16.git`

Then navigate to `/csc309-summer-2020/team16/` and run the following:   
`npm install`  
`npm start`  

Now open up your browser and go to `localhost:3000`

## Instructions to Use:
### User
#### Login Credentials:
username: `user`  
password: `user`  

#### Features:

- The landing page (`/`) explains to newcomers what the site is about. Its header contains a link back to the landing page and a link to the login page.
- On the login page (`/login`), the user can input their username and password, and log in. If they don’t have an account, they can click register (`/registration`) and create an account.
- After logging in, the user is taken to the homepage (`/home`) where they can see a list of current posts, filter these posts by offer/request, sort the posts by location, create a new post, and search for users/posts by username, first and/or last name, and post title. At the top is a link to the homepage, a search box, a link to the user’s inbox, a link to the user’s profile page, and a logout button.
    - Clicking a post’s arrow button will expand the post, and you can read the full description of the post, go back, or click on the poster’s name to view their profile. 
        - If it’s your own post, you can also remove the post. Posts that you remove become permanently hidden from the public and are viewable only by you on your profile.
        - If it’s another person's post, you can also report the post or send the poster a message. Reported posts are hidden from you for the rest of your session. 
    - Creating a new post will take you to a screen where you can input the title, body, type of request, and location and post it.
- On the Inbox page (`/inbox`), you can see all of your past messages and can message another user about their post. You also have the ability to report another person’s message.
- The profile page (`/profile`) allows you to see a user’s info along with any posts they have made. 
    - If it’s your own profile, you also have the option to change any of your info. 
    - If it’s another person’s profile, you can click Message to message them, which will bring up the past messages you have with this person or start a new conversation with them.
- The setting page (`/setting`) allows you to edit your profile information. You can change your first and last name, biography, and location. 
    - Your first and last name, and location must not be empty. 
    - You can also change your password but you must know your current password for safety reasons and must confirm the new password you entered to prevent typing mistakes.



### Admin

#### Login Instructions and Credentials:
The admin login page can be found at `/admin`

Credentials:
username: `admin`  
password: `admin`  

#### Features:
- Here they can see a list of all the users. The list is sorted with those having a report pending at the top to allow the admin to easily see them. 
- Clicking a user shows their complete information and post history, as well as any reports other users have made about them. The admin can look at the reports and either delete the report or ban the user with a ban reason. 
- The admin also has the ability to unban a previously banned user.

