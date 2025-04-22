# ILUVUS - REACT NATIVE APPLICATION

<p align="center">
<img src="./img/icon.png" width="300" height="auto" />
</p>

### Description

We're working on a social media app called ILUVUS, which focuses on celebrating racial minorities and marginalized communities like the LGBTQ+. Our goal is to connect these diverse communities in a world where discrimination and intolerance are still prevalent. ILUVUS aims to address this issue by promoting positivity, celebrating achievements, and combatting discrimination.

We're developing our own platform instead of using existing ones because they don't prioritize the celebration and recognition of these communities' accomplishments. Our focus is on offering a unique user experience that celebrates diversity. By doing this, we can ensure strict moderation of hateful posts and messages and promote positivity effectively.

## Installation Guide: Getting Started

### Technology Stack:

-   **React Native**: A JavaScript framework for building mobile applications that can run on both iOS and Android platforms.
-   **Tailwind CSS**: A utility-first CSS framework for rapidly building custom designs.

### Dependencies

#### To build:

-   NodeJS
-   NPM
-   Firebase

#### To run:

-   Optional: Expo App on [iOS](https://apps.apple.com/us/app/expo-go/id982107779) and [Android](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en_US&gl=US&pli=1)
-   iOS Simulator on Mac OS only
-   Android Studio Android Simulator or any Android Studio on Mac OS, Windows, or Linux

### Connect with Firebase

#### Creating a Firebase project

Sign in with your Google Account. Once you’re in, you should see the Firebase console - click on the Add project button.

<img src="./img/firebase/1.png" width=400 />

Give your project a name (whatever you’d like!):

<img src="./img/firebase/2.png" width=500 />

Next you’ll be asked if you want to enable analytics - at the time of writing the Firebase SDK’s implementation of analytics does not work with React Native, however you can configure this separately using Expo’s FirebaseAnalytics - Expo Documentation package.

<img src="./img/firebase/3.png" width=500 />

You’ll then have to wait a few seconds for Firebase to provision your new project…

### Add a Firebase web application

<img src="./img/firebase/6.png" width=500 />

Give your app a nickname (whatever you’d like) and click Register app:

<img src="./img/firebase/7.png" width=500 />

You’ll then see your Firebase credentials open up - copy the highlighted part into your clipboard and we’ll use this to create your Firebase configuration file.

<img src="./img/firebase/8.png" width=700 />

Locate to the root directory, go to `src/utils`, create a file named `iluvus_bucket_credential.js`.

Replace the following `firebaseConfig = {}` with the highlighted part you copied above:

```javascript
import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: '',
    authDomain: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
    measurementId: '',
}

const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
```

### Connect to the backend

In the project root, create a file named `.env`, replace `BASE_URL` with the backend url:

```
BASE_URL=https://127.0.0.1:8080
```

### Installing & Execute

With the Firebase connection and connection to backend, the application is ready to build.

1. Use this link [https://nodejs.org/en/download](https://nodejs.org/en/download) to download and install NodeJS LTS version that is compatible with your Operation System.

2. Clone the ILUVUS React Native Repository:

```bash
git clone https://github.com/ILUVUS/iluvus-react-native-JIA-3317.git
```

3. Go to the repository directory on your Operation System. Install NPM packages

```bash
npm install
```

4. Build and run the application:

```bash
npm start
```

5. The output will prompt for which OS you would like to run:

-   `i` for iOS Simulator
-   `a` for Android Simulator

or scan the QR Code on the output with phone camera to run on Expo application.

# Release Notes
## Version 1.1.0

### Features

- Users can now block other users of their choosing
- Users can additionally view warnings for potential sensitive or triggering content on reported posts that are still under review
- Users can now review and report other users in their community to a community moderator for final review.
  
### Bug Fixes
- The loading time for the profile picture, posts, and communities was slowing down the entire app
- Notifications for direct messaging/chats and sharing posts had a default icon that wasn't displaying properly.

### Known Issues

- If the owner of a community reports a post, that post will automatically be deleted
- Creating posts with pictures is no longer publishing correctly.

## Version 1.0.0

### Features

- Users can now create chatrooms to chat one-on-one with other users.
- Users can additionally create group chatrooms to chat with 3-4 other users of their choosing.
- Users can now view "Topics of the Day" on the home page to keep up with current events on the application.
- Users can now explore popular topics from communities to keep up with and take part in community discussions.
  
### Bug Fixes
- The community view was breaking when more than one community was included on the platform.
- User Searching rendering is breaking, have to type slowly to ensure user would show up.

### Known Issues

-   The loading time across the application is still too long but variably.
-   Dupilicate chats can be created (chatrooms with the same participants).
-   User searching will autofill with viewed user after returning from the clicked profile view.

## Version 0.9.0

### Features

-  Users can now look up BOTH communities and other users and click on their icons to view their respective pages.
-  Users can now search for specific posts using keywords.
-  Users can now add filters to their search to narrow down content by specific criteria.

### Bug Fixes

- After sharing posts, other icons were being pushed off to the side.
- Publish post button was not working for posts with media in it.
- Clicking on a picture that has already been added while creating a post was causing the application to crash.

### Known Issues

-   When searching for users to tag in a post, no users are showing up.
-   Loading time across the application is still too long.

## Version 0.8.0

### Features

-  Users can now create community posts to share their achievements and interests.
-  Users can now receive notifications for likes and comments on their posts.
-  Users can now share posts they like within their respective communities' feed (sharable link or under someone's profile).
-  Users can now optionally include and/or view sources in a community.
  
### Bug Fixes

- The "Forgot my password" link not working on the login screen.
- Community Posts were not showing up on the home-feed screen.
- Announcement icon in communities was not working previously.

### Known Issues

-   Loading time is still too long across the app.
-   Unable to post pictures/media with community posts.

## Version 0.7.0

### Features

-  Users can now set their profile picture for their account
-  Users can now add a personal bio to their profile page
-  Users can now display both their skills and interests on their profile page
-  Users can now toggle to set their profile settings to be general or professional
-  Users can now view and agree to the terms and conditions of using the application upon account creation
-  Users can edit their profile to display their job and relationship status if needed
  
### Bug Fixes

- Interests list topics in both the community and profile screen were not loading when users looked up topics
- Google Cloud Deployment was not syncing up with local environment testing
- Profile Icon (no picture) was not loading properly anytime the user navigated to the screen

### Known Issues

-   Loading time for images and videos too long
-   Announcement icon in community posts not working
-   Community Posts not showing up on the posts screen
-  "Forgot my password" link not working on the login screen

## Version 0.6.0

### New Features

-  Community owners can now designate whether their community is professional or general upon creating a community
-  Users can now search for both professional and general communities by name
-  Users can join both professional and general communities (before they could only join general)
-  Users can now leave both private and public communities that they no longer wish to follow

### Bug Fixes

- Publish post icon was not displaying properly
- Users were first unable to leave communities and then after adding the feature unable to leave upon request
- Create community button was not displayed properly

### Known Issues

-   Switching between default icons and user inputed images when entering community page, viewing posts 
-   Loading time for images and videos too long
-   Profile not loading properly unless you make a post first

## Version 0.5.0

### New Features

-   Community Users can view videos in Media Viewer.
-   Community Users can create new post with videos.
-   Professional Users can view their Created Groups in its own view.
-   All Users can view their Following Groups in its own view.
-   Users can view their birthday on Profile page.
-   Live error indicators in Registration Form.
-   Communities are removed if a user account is removed from ILUVUS.

### Bug Fixes

-   Users could not get the relevant post properly on Home Screen after re-selecting interests.
-   User could not post Text only post.
-   Professional Users could not receive verification code.
-   Users must be 18 or older to sign up an account.
-   Community View buttons were flickery.
-   Reported post automatically removed once there is more than 5 reports.

### Known Issues

-   Login Form Scrollview does not scroll down properly.
-   Status bar text blends with background color.

## Version 0.4.0

### New Features

-   Users can receive notifications for uplifts, comments, tags, reports, and other types from communities.
-   Users can view the posts that are relevant to their interests in the newsfeed.
-   Users can select the interest topic when creating posts.
-   Added the profile page to display user information.
-   Users can select and edit their interests on the profile page.
-   Added users as moderators at the creating community view to manage reporting posts (keep or remove from the community).
-   Moderator users can view and accept or reject reporting posts.
-   Community owner can set profile pictures for their community at the creating point.

### Bug Fixes

-   Fixed the problem where notifications disappear.
-   Fixed the image display on the posts in the communities.
-   Change to switch button when asking for the professional or regular user at the registration screen.
-   The community list is displayed in order.

### Known Issues

-   The algorithm to sort the posts by interests sometimes goes wrong.
-   The post page is frozen if no images are selected.

## Version 0.3.0

### New Features

-   Users can now upload and share images along with their posts.
-   Users can view/zoom images in a post.
-   Implemented image processing capabilities such as resizing and compression.
-   Ability to tag other users in a post has been added.
-   Communities can now be set as either public or private.
-   Added a "Request Join" button for private communities.
-   Owners of private communities can now accept/decline join requests.
-   All login passwords are now hashed to increase security.
-

### Bug Fixes

-   Corrected the display of the number of likes/uplifts.
-   Fixed the problem where posts were not displaying properly.
-   Fixed the report button and added a report message when reporting.

### Known Issues

-   Users can tag people not in the community.

## Version 0.2.0

### New Features

-   Create text-only posts and display them on the community posts.
-   Like and dislike a post in a community.
-   Comment on a post in a community.
-   Report a post in a community.
-   Display the number of uplift(like) on the community posts.
-   Display the comment view on the community posts.

### Bug Fix

### Known Issues

-   Registration will navigate to verification screen even the user existed.
-   Verification page may send 2 emails.

## Version 0.1.0

### Features

-   Search community by the community’s name
-   View, and join community
-   Register inputs indicator
-   Date picker for Date of Birth input on Register screen

### Bug Fixes

-   Register new user with empty username and password
-   Create new community button did not show up
-   Verify does not work with userId

### Known Issues

## License

This project is licensed under the MIT License.

## Contributors:

-   [Arjun Ramani](#)
-   [Binaya Timsina](#)
-   [Doan Tran](#)
-   [Thuan Vo](#)
-   [Tyler Lin](#)
-   [Shreya Devaraju](#)
-   [Christeena Joby](#)
-   [Devika Papal](#)
-   [Sahil Virani](#)
-   [Roham Wahabzada](#)

## Acknowledgments

Ideas, Inspiration, and Project belong to [Jay Elliott](#)
