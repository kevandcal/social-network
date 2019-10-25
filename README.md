# Social Network

This social network is the first project that I built using React and the biggest project from my time as a student at [SPICED Academy](https://spiced.academy/program/full-stack-web-development/). It incorporates registration, login, image uploading, bio editing, sending and receiving friend requests, dynamic rendering of current friendships and pending friend requests, and a chat room.

## Built with

HTML, CSS, React, Redux, Node.js (Express), Bundle.js, Moment.js, Socket.IO, PostgreSQL, AWS (S3), Multer

## Demo

-   Landing page, where users can sign up:

<img src="public/pictures/for-readme/social-network-1.png" width="70%" height="70%">

-   Here we're signing up as Harry Houdini:

<img src="public/pictures/for-readme/social-network-2.png" width="70%" height="70%">

-   Once registered, Harry is taken to `My Profile`, which at this stage has a default profile picture and no biography:

<img src="public/pictures/for-readme/social-network-3.png" width="70%" height="70%">

-   To add a profile picture, the user clicks either the small default profile pic in the upper right corner or the large one below to open a pop-up window (the same procedure can be used to update a existing profile pic):

<img src="public/pictures/for-readme/social-network-4.png" width="70%" height="70%">

-   In the pop-up window, the user can browse through files and upload one as his/her profile pic:

<img src="public/pictures/for-readme/social-network-5.png" width="70%" height="70%">

-   Harry now has a profile pic but still lacks a biography:

<img src="public/pictures/for-readme/social-network-6.png" width="70%" height="70%">

-   After clicking `Edit Bio`, Harry is able to type in a description of himself:

<img src="public/pictures/for-readme/social-network-7.png" width="70%" height="70%">

-   Clicking `Submit` sets the bio:

<img src="public/pictures/for-readme/social-network-8.png" width="70%" height="70%">

-   Now that Harry has taken care of everything in `My Profile`, he goes to `My Friends` but finds that he doesn't yet have any friends:

<img src="public/pictures/for-readme/social-network-9.png" width="70%" height="70%">

-   So he goes to `Find People`, which lists the three people who have signed up most recently. (Since he is among the members shown here, he could click on himself, but that would simply redirect him to his own profile) Clicking on them will take him to their profile, where he can see their bio and click `Add Friend` if he so chooses:

<img src="public/pictures/for-readme/social-network-10.png" width="70%" height="70%">

-   In addition to showing the three newest members, `Find People` includes a input field with which to search for members by name. Search query results replace the list of newest members:

<img src="public/pictures/for-readme/social-network-11.png" width="70%" height="70%">

-   Having search for Eric Cartman and clicked on his profile picture in the search results, Harry has now been redirected to Eric Cartman's profile, which includes his bio:

<img src="public/pictures/for-readme/social-network-12.png" width="70%" height="70%">

-   Having clicked `Add Friend`, this button now reads `Cancel Friend Request` and would do just that if clicked:

<img src="public/pictures/for-readme/social-network-13.png" width="70%" height="70%">

-   In the meantime Eric Cartman has accepted the friend request, and Mark Twain has requested becoming friends with Harry, all of which is now shown in `My Friends`:

<img src="public/pictures/for-readme/social-network-14.png" width="70%" height="70%">

-   After accepting Mark Twain's friend request, the `My Friends` component changes to reflect Harry's updated list of friends and lack of pending friend requests:

<img src="public/pictures/for-readme/social-network-15.png" width="70%" height="70%">

-   In the `Chat Room`, Harry can see what other users have posted:

<img src="public/pictures/for-readme/social-network-16.png" width="70%" height="70%">

-   Harry decides to add to the conversation:

<img src="public/pictures/for-readme/social-network-17.png" width="70%" height="70%">

-   The only other thing left to do is sign out. This takes Harry back to the registration page. To log back in, he simply has to click the link for members to log in and then enter his email and password:

<img src="public/pictures/for-readme/social-network-18.png" width="70%" height="70%">
