# (Final-Task) Add bookmark feature into the opportunity listing application and test.

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Features](#features)
- [Screenshots](#screenshots)

## Description
This project is a opportunity listing app built using Next.js, TailwindCSS, Lucid React Icons, and Redux Toolkit Query (RTK Query) for handling API requests. It includes a opportunity listing dashboard, loading state skeletons, a opportunity Card component populated with fetched data, appropriate error notification pages, and a **bookmark feature**. The application demonstrates essential skills such as using RTK Query, component design, data fetching and handling, and managing bookmarks.



## Installation
#### Clone the repository:
```bash
git clone https://github.com/bemnet16/A2SV-G5-webLearningPath.git
```
#### Navigate to the project directory:
```bash
cd final-task
```
#### Install dependencies:
``` bash 
npm install #or
yarn install #or
pnpm install
```
### Running the application:
```bash
npm run dev #or
yarn run dev #or
pnpm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features
- **Data Integration:** Utilizes RTK Query to populate the opportunity card with relevant information and provide detailed descriptions dynamically.
- **opportunity Card Component:** A visually appealing card that displays opportunity details like the company name, opportunity title, and description.
- **Bookmark Functionality:** Users can bookmark or unbookmark opportunities, with the state saved both locally and in the backend.
- **User-Friendly UI Skeletons:** Implements loading skeletons to enhance user experience during data fetches.
- **Appropriate Error Pages:** Provides custom error pages to handle scenarios gracefully.
- **Avatar Integration:** Includes an avatar image within the card using next/image, aligning with the design specifications.
- **Responsive Design:** The application is responsive and works across different screen sizes.
  
#### Testing
- **Cypress Testing:** End-to-end tests using Cypress are implemented to verify the bookmark feature, ensuring that users can reliably bookmark and unbookmark opportunities.
- **Jest Testing:** Tests have been written using Jest to ensure the correctness of the bookmark functionality, including actions like adding and removing bookmarks.


  
## ScreenShots
Home page / has link to navigate to opportunity lists
<p align="center">
<img src="https://github.com/bemnet16/A2SV-G5-webLearningPath/blob/main/task-6/public/images/Screenshot%20from%202024-08-10%2014-23-54.png" height="auto" width="500"/>
</p>

List of opportunities
<p align="center">
<img src="https://github.com/bemnet16/A2SV-G5-webLearningPath/blob/main/final-task/public/images/Screenshot%20from%202024-08-22%2023-28-09.png" height="auto" width="600"/>
</p>

Search opportunities by **title** (shows no result, if there is no match)
<p align="center">
<img src="https://github.com/bemnet16/A2SV-G5-webLearningPath/blob/main/final-task/public/images/Screenshot%20from%202024-08-22%2023-29-11.png" height="auto" width="600"/>
</p>

Loading skeleton while fetching list of opportunities
<p align="center">
<img src="https://github.com/bemnet16/A2SV-G5-webLearningPath/blob/main/task-7/public/images/Screenshot%20from%202024-08-13%2001-11-21.png" height="auto" width="650"/>
</p>

Error fetching list of opportunities
<p align="center">
<img src="https://github.com/bemnet16/A2SV-G5-webLearningPath/blob/main/task-7/public/images/Screenshot%20from%202024-08-13%2001-11-39.png" height="auto" width="650"/>
</p>

Detail description of a opportunity
<p align="center">
<img src="https://github.com/bemnet16/A2SV-G5-webLearningPath/blob/main/task-7/public/images/Screenshot%20from%202024-08-13%2001-13-49.png" height="auto" width="650"/>
</p>

Bookmark list
<p align="center">
  <img src="https://github.com/bemnet16/A2SV-G5-webLearningPath/blob/main/final-task/public/images/Screenshot%20from%202024-08-22%2023-28-23.png" height="auto" width="600"/>
</p>

Show empty bookmark list
<p align="center">
  <img src="https://github.com/bemnet16/A2SV-G5-webLearningPath/blob/main/final-task/public/images/Screenshot%20from%202024-08-22%2023-28-49.png" height="auto" width="600"/>
</p>

Loading skeleton for opportunity description
<p align="center">
<img src="https://github.com/bemnet16/A2SV-G5-webLearningPath/blob/main/task-7/public/images/Screenshot%20from%202024-08-13%2001-12-21.png" height="auto" width="650"/>
</p>

Error pages
<p align="center">
<img src="https://github.com/bemnet16/A2SV-G5-webLearningPath/blob/main/task-7/public/images/Screenshot%20from%202024-08-13%2001-12-43.png" height="auto" width="400"/>
  <img src="https://github.com/bemnet16/A2SV-G5-webLearningPath/blob/main/task-7/public/images/Screenshot%20from%202024-08-13%2001-12-56.png" height="auto" width="400"/>
</p>

