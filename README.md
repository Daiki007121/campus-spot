# CampusSpot
A web application for discovering and sharing study spots on campus.

# CampusSpot URL
The application is deployed at [https://campus-spot-2.onrender.com/](https://campus-spot-2.onrender.com/)

## Author
Daiki Koike

## Class Link
[CS5610 Web Development - Spring 2025](https://johnguerra.co/classes/webDevelopment_spring_2025/)

## Project Objective
CampusSpot is a web application designed to help students discover and share study spots on campus. Users can browse existing study spots, add new ones, and leave reviews to help others find the perfect place to study. The application aims to create a community-driven platform that improves the study experience for all students by highlighting the best study locations across campus.

## Screenshots

![Homepage](/homepage.png)
*Homepage with study spot listings*


![Spot Details](/spot-details.png)
*Detailed view of a study spot with reviews*

## Features

- **Browse Study Spots**: View a list of all available study spots on campus
- **Search and Filter**: Find study spots based on building, noise level, and power outlet availability
- **Add New Spots**: Contribute to the community by adding new study spots
- **Edit & Delete**: Manage your submitted study spots
- **Reviews**: Leave ratings and comments on study spots
- **Responsive Design**: Works on desktop and mobile devices

## Technologies Used

- **Frontend**: React, React Router, CSS Modules
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **AI Assistance**: Claude 3.7 Sonnet (used for README creation and project optimization suggestions)
- **Other Tools**: ESLint, Prettier

## Instructions to Build

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB account

### Installation

1. Clone the repository
```
git clone https://github.com/Daiki007121/campus-spot.git
cd campus-spot
```

2. Install dependencies for both client and server
```
npm run install-all
```

3. Set up environment variables
```
# In the server directory, create a .env file with:
MONGODB_URI=your_mongodb_connection_string
PORT=5000

# In the client directory, create a .env file with:
REACT_APP_API_URL=http://localhost:5000/api
```

4. Generate sample data
```
npm run generate-data
```

5. Start the development server
```
npm run dev
```

6. Open your browser and navigate to `http://localhost:3000`

### Building for Production

1. Build the client
```
npm run build
```

2. The production build will be in the `client/build` directory

## Accessibility

This application is designed with accessibility in mind:
- Semantic HTML structure
- Keyboard navigation support
- ARIA attributes where appropriate
- High contrast color scheme
- Responsive design for various devices and screen sizes

## Color Palette

- Primary Color: #2b6cb0 (Blue)
- Secondary Color: #38a169 (Green)
- Background: #f7fafc (Light Gray)
- Text: #2d3748 (Dark Gray)

The color scheme is designed to create a calm, focused environment that matches the application's purpose of helping students find study spaces.

## Typography

The application uses the Poppins font family from Google Fonts, chosen for its excellent readability and modern appearance.

## License

This project is licensed under the [MIT License](LICENSE).
