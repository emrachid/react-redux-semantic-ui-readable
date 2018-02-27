# Readable Project

This is the project for the assessment Udacity's React/Redux course. This is a content and comment web app. Users is able to post content to predefined categories, comment on their posts and other users' posts, and vote on posts and comments. Users can edit and delete posts and comments.

Why this project?

This content and comment structure is common across a large number of websites and applications, from news sites to blogs to aggregators like Hacker News and Reddit. This project allowed me to gain an understanding of how Redux can function in a standard type of application.

Specification

This project uses a local backend server. The server is built in Node, but it is very simple. This app will talk to the server using documented API endpoints. The server's endpoints is used to manage storing, reading, updating, and deleting data for this application. Using this server, a React/Redux frontend for the application was created.

## Build and run this project

To get started:
1. Download or fork and clone this repository
2. Enter into the project root directory, e.g. "react-redux-semantic-ui-readable"
3. Install all project dependencies with `npm install`
4. Start the development server with `npm start`

## Project files
```bash
├── CONTRIBUTING.md
├── README.md - This file.
├── package.json # npm package manager file.
├── public
│   ├── favicon.ico # React Icon.
│   └── index.html # Start point.
└── src
    ├── actions
        └── index.js # Redux actions.
    ├── components
        ├── App.js # This is the app root.
        ├── CategoryHeader.js # This is for rendering the category title and actions related to each category.
        ├── CategoryItem.js # This is for rendering each post inside the category.
        ├── PostForm.js # This is the form for new posts, update posts, add comments and update comments.
        └── PostView.js # This is the detailed post view.
    ├── icons
        └── avatar.svg # This is the user icon image.
    ├── reducers
        └── index.js # This is the Redux reducer.
    ├── utils
        ├── ArrayHelper.js # This is a utility function to remove one element from array.
        ├── ConvertTimeToDate.js # This is a utility function to convert from timestamp to date and time format.
        └── ServerAPI.js # It includes all the server REST APIs implemented into utility functions.
    ├── App.css # Styles
    ├── App.test.js # Used for testing. Provided with Create React App.
    ├── index.css # Global styles.
    └── index.js # It is used for DOM rendering only.
```

## Backend Server
The server is built in Node. Follow this steps to run the server on your local machine:
1. Download or fork and clone the starter server repository: https://github.com/udacity/reactnd-project-readable-starter
2. Enter into the project root directory, e.g. "reactnd-project-readable-starter"
3. Enter into the "api-server" sub-folder: `cd api-server`
4. Install the requirements from the included "package.json" file: `npm install`
3. Start the server with `node server`

## Contributing

This repository is for React Udacity course. Therefore, pull requests are not allowed.

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).
