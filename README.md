# Infinite Scrolling and Searchable Product List

# Description
This project aims to implement an infinite scrolling feature combined with a searchable product list to enhance user experience on an e-commerce or product listing platform.

# Features
1. Infinite Scrolling:
- Load products dynamically as the user scrolls down the page.
- Avoid pagination buttons and provide a smooth, continuous scrolling experience.

2.Searchable Product List:
- Implement a search bar that allows users to find products by various criteria.
- Fetch and display products in real-time as the user inputs text.

# Technical Requirements
- Framework: React with TypeScript
- Styling: TailwindCSS
- State Management: useState for managing component state
- Data Fetching: axios for making HTTP requests to retrieve product data
- Routing: react-router and react-router-dom for handling navigation and routing
- Side Effects: useEffect for managing side effects like data fetching
- Callbacks: useCallback for optimizing performance by memoizing functions

# Setup
- Install Dependencies:
    npm install react react-dom react-router react-router-dom axios tailwindcss
- Configure TailwindCSS: Follow the official TailwindCSS installation guide to set up TailwindCSS with your React project.
- Setting Up React Router: Configure routes in your application using react-router and react-router-dom to manage different views and navigation.
- Fetch Data with Axios: Use axios to make API requests and fetch product data based on search queries and infinite scrolling requirements.
- Implement Infinite Scrolling: Use React hooks (e.g., useEffect and useCallback) to manage side effects and optimize performance.
- Create a Search Bar Component: Implement a search bar component that interacts with the API to filter and display products in real-time as the user types.

# Run

- At first running, install necessary library with:
    npm install
- Then run with:
    npm start
