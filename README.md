# Download the App
  ## [Download From Here](https://www.amazon.in/Kushagra-Rathore-Foundo-Lost-Found/dp/B0BTWKPSSG/ref=sr_1_3?crid=CG8M8E4FJZU3&keywords=lost+and+found&qid=1676153695&s=mobile-apps&sprefix=lost+and+foundo%2Cmobile-apps%2C228&sr=1-3_)

  
 # Foundo: Lost and Found (React-Native Application)
## Screenshots

<div align="center">
    <img src="https://m.media-amazon.com/images/I/717yFkA6l1L._SL500_.jpg" width="200" alt="Screenshot 1">
  <img src="https://m.media-amazon.com/images/I/71HkVGMI0ML._SL500_.jpg" width="200" alt="Screenshot 2">
  <img src="https://m.media-amazon.com/images/I/71KQjYJOR6L._SL500_.jpg" width="200" alt="Screenshot 3">
  <img src="https://m.media-amazon.com/images/I/71lEPQldVXL._SL500_.jpg" width="200" alt="Screenshot 4">
  <img src="https://m.media-amazon.com/images/I/71fjiaN08kL._SL500_.jpg" width="200" alt="Screenshot 4">
  <img src="https://m.media-amazon.com/images/I/71RG+vyKFxL._SL500_.jpg" width="200" alt="Screenshot 5">
  <img src="https://m.media-amazon.com/images/I/61ijVuGUrwL._SL500_.jpg" width="200" alt="Screenshot 6">
    <img src="https://m.media-amazon.com/images/I/81cdDVuNBhL.jpg" width="200" alt="Screenshot 4">
  <img src="https://m.media-amazon.com/images/I/71HqQ959FYL._SL500_.jpg" width="200" alt="Screenshot 6">
</div>

## Demo Video  
Click the Youtube Icon to watch the demo video on YouTube:

[<img src="https://www.iconpacks.net/icons/2/free-youtube-logo-icon-2431-thumb.png" width="50">](https://www.youtube.com/watch?v=FFfxGZapPZE)



## Overview
-    A feature-packed Android application, featuring a visually pleasing and user-friendly UI, utilizing React-Native, integrated with AWS services such as RDS MySQL and S3 storage. 
-    This AI Powered app enabled users to easily report lost or found items by collecting pictures and necessary information, search and filter listings, connect and chat with other users, and access location-based features, login/authentication, password reset, privacy settings, and user profiles. 
- Utilized Jest for unit, integration, and API testing, and Detox for frontend end-to-end (E2E)  testing.
-    Backend built with Node.js, Express, MySQL, and WebSocket for real-time chat functionality.
-    Utilized Docker in conjunction with GitHub Actions(CI/CD)  for testing and deployment.

## Features
- Report lost or found items with pictures and necessary information.
- AI Powered Lost Item Matching.
- Search and filter listings easily.
- Connect with other users for item retrieval.
- Chat with other users to coordinate item retrieval.
- Location-based features for improved item tracking.
- Login/authentication and password reset functionalities.
- Customizable privacy settings and user profiles.
- Push notifications when Item is matched.


## Installation

### Prerequisites
- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/en/download/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Android Studio](https://developer.android.com/studio) (for Android emulator)
- [AWS Account](https://aws.amazon.com/) (for AWS services)
- [Node.js](https://nodejs.org/en/download/) (for local server)
- [Docker](https://www.docker.com/products/docker-desktop) (for local server and database)

To run the Foundo Android application locally, follow these steps:

1. Clone the repository:
   ```shell
   git clone https://github.com/kushagra1212/foundo-app
   ```

2. Install dependencies:
   ```
   cd foundo-app/
   npm install
   ```
3. Add your google-services.json file to the root directory of the project.
4. Copy the example-env.txt file to .env and add your AWS credentials.
5. Start the Android emulator or connect a physical device.
6. Start the application:
    ```
    npm run dev-start (for Android emulator or physical device)
    ```


## Testing

### Unit Tests (Jest) & Integration Tests (Jest)
To run the unit and integration tests, run the following command:
#### pre-requisites:
- Make sure you are running the local server and database using Docker.

```
node run-test.js
```

### End-to-End Tests (Detox & Jest)

To run the end-to-end tests, follow these steps:

#### pre-requisites:
- Make sure you are running the local server and database using Docker.

1. Open Emulator
2. To run the end-to-end tests, run the following command:
    ```
    ./e2e-test
    ```

## Technologies Used
    React Native
    Node.js
    MySQL
    RTK Query 
    AWS (RDS, S3)
    Express.js
    JavaScript
    TypeScript
    & more ...
  
   
