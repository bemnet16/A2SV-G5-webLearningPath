# (Task-8) Job Listing Application with User Authentication

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Features](#features)
- [Screenshots](#screenshots)

## Description
This project is a job listing application built using Next.js, TailwindCSS, Redux Toolkit Query (RTK Query) for handling API requests and has a user authentication system implemented with **NextAuth**. It includes signup and signin pages, email verification with OTP, and secure handling of user data. The application includes a job listing dashboard, loading state skeletons, a Job Card component populated with fetched data, and appropriate error notification pages.


## Installation

To get a local copy up and running, follow these steps:

1. Clone the repository:

    ```sh
    git clone https://github.com/bemnet16/A2SV-G5-webLearningPath.git
    ```

2. Navigate to the project directory:

    ```sh
    cd A2SV-G5-webLearningPath
    cd task-8
    ```
3. Install dependencies:
    ``` sh 
    npm install #or
    yarn install #or
    pnpm install
    ```
 4. Running the application:
    ```sh
    npm run dev #or
    yarn run dev #or
    pnpm run dev
    ```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features
- **Signup/Signin Page:** Provides a form for existing users to sign in using their email and password and also using **Google email account**.
- **Email Verification:** After signup, users are required to verify their email using an OTP sent to their email address.
- **Client-side Validation:** Ensures that user input is validated on the client side before making API requests, enhancing the user experience.
- **Data Integration:** Utilizes RTK Query to populate the job card with relevant information and provide detailed description dynamically.
- **Job Card Component:** A visually appealing card that displays job details like the company name, job title, and description.
- **User-Friendly UI Skeletons:** Implements loading skeletons to enhance user experience during data fetches.
- **Appropriate Error Pages:** Provides custom error pages to handle scenarios gracefully.
- **Avatar Integration:** Includes an avatar image within the card utilize **next/image**, aligning with the design specifications.
- **Responsive Design:** The application is responsive and works across different screen sizes.
  

## ScreenShots
Home page / has link to navigate to job lists
<p align="center">
<img src="https://github.com/bemnet16/A2SV-G5-webLearningPath/blob/main/task-6/public/images/Screenshot%20from%202024-08-10%2014-23-54.png" height="auto" width="500"/>
</p>

Signup/Signin pages
<p align="center">
<img src="https://github.com/bemnet16/A2SV-G5-webLearningPath/blob/main/task-8/public/images/Screenshot%20from%202024-08-15%2022-59-05.png" height="auto" width="500"/>
  <img src="https://github.com/bemnet16/A2SV-G5-webLearningPath/blob/main/task-8/public/images/Screenshot%20from%202024-08-15%2022-59-11.png" height="auto" width="500"/>
</p>

Validate user input and display appropriate message
<p align="center">
<img src="https://github.com/bemnet16/A2SV-G5-webLearningPath/blob/main/task-8/public/images/Screenshot%20from%202024-08-15%2022-59-30.png" height="auto" width="650"/>
</p>

Login/register using google account
<p align="center">
<img src="https://github.com/bemnet16/A2SV-G5-webLearningPath/blob/main/task-8/public/images/Screenshot%20from%202024-08-15%2023-00-26.png" height="auto" width="650"/>
</p>

Verify email with OTP sent
<p align="center">
<img src="https://github.com/bemnet16/A2SV-G5-webLearningPath/blob/main/task-8/public/images/Screenshot%20from%202024-08-15%2023-03-21.png" height="auto" width="650"/>
</p>

**Authenticated** user job-list page view
<p align="center">
<img src="https://github.com/bemnet16/A2SV-G5-webLearningPath/blob/main/task-8/public/images/Screenshot%20from%202024-08-15%2023-05-19.png" height="auto" width="650"/>
</p>

**Unauthenticated** user job-list page view
<p align="center">
<img src="https://github.com/bemnet16/A2SV-G5-webLearningPath/blob/main/task-8/public/images/Screenshot%20from%202024-08-15%2023-06-05.png" height="auto" width="650"/>
</p>

Loading skeleton while fetching list of jobs
<p align="center">
<img src="https://github.com/bemnet16/A2SV-G5-webLearningPath/blob/main/task-7/public/images/Screenshot%20from%202024-08-13%2001-11-21.png" height="auto" width="650"/>
</p>

Signout/logout page
<p align="center">
<img src="https://github.com/bemnet16/A2SV-G5-webLearningPath/blob/main/task-8/public/images/Screenshot%20from%202024-08-15%2023-05-39.png" height="auto" width="650"/>
</p>

Error fetching list of jobs
<p align="center">
<img src="https://github.com/bemnet16/A2SV-G5-webLearningPath/blob/main/task-7/public/images/Screenshot%20from%202024-08-13%2001-11-39.png" height="auto" width="650"/>
</p>

Detail description of a job
<p align="center">
<img src="https://github.com/bemnet16/A2SV-G5-webLearningPath/blob/main/task-7/public/images/Screenshot%20from%202024-08-13%2001-13-49.png" height="auto" width="650"/>
</p>

<p align="center">
<img src="https://github.com/bemnet16/A2SV-G5-webLearningPath/blob/main/task-7/public/images/Screenshot%20from%202024-08-12%2023-51-20.png" height="auto" width="230"/>
  <img src="https://github.com/bemnet16/A2SV-G5-webLearningPath/blob/main/task-7/public/images/Screenshot%20from%202024-08-12%2023-51-25.png" height="auto" width="230"/>
</p>

Loading skeleton for job description
<p align="center">
<img src="https://github.com/bemnet16/A2SV-G5-webLearningPath/blob/main/task-7/public/images/Screenshot%20from%202024-08-13%2001-12-21.png" height="auto" width="650"/>
</p>

Error pages
<p align="center">
<img src="https://github.com/bemnet16/A2SV-G5-webLearningPath/blob/main/task-7/public/images/Screenshot%20from%202024-08-13%2001-12-43.png" height="auto" width="400"/>
  <img src="https://github.com/bemnet16/A2SV-G5-webLearningPath/blob/main/task-7/public/images/Screenshot%20from%202024-08-13%2001-12-56.png" height="auto" width="400"/>
</p>

