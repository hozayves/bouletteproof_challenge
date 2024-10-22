# Bootteproof Challenge

Bootteproof Challenge is a Next.js-based web application that fetches and visualizes website visit data and customer data from a CRM. This project demonstrates the ability to work with data, APIs, and modern frontend development tools while ensuring performance and user experience.

## Project Overview

Bootteproof Challenge integrates with a CRM API to:
- Fetch and display website visit data
- Retrieve and visualize customer information
- Provide a user-friendly interface for data exploration

## Getting Started

These instructions will help you set up and run Bootteproof Challenge on your local machine for development and learning purposes.

### Prerequisites

- Node.js (version 18.x or higher)
- npm (version 9.x or higher)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/hozayves/bouletteproof_challenge.git
   ```

2. Navigate to the project directory:
   ```
   cd bouletteproof_challenge
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Set up environment variables:
   - Copy the `.env.example` file and rename it to `.env.local`
   - Fill in the required environment variables in `.env.local`

### Running the Development Server

Start the development server:


```
npm run dev
```

The application should now be running on [http://localhost:3000](http://localhost:3000).

## Project Structure

- `src/app`: Contains the main application pages and routing
- `src/components`: Reusable React components
- `src/lib`: Utility functions and providers
- `src/context`: React context definitions

Key components and pages:
- `src/app/customer/page.tsx`: Customer data visualization page
- `src/components/Navbar/Navbar.tsx`: Navigation component
- `src/components/headerBar.tsx`: Header bar component
- `src/components/Table/Table.tsx`: Reusable table component for data display
- `src/app/context/GlobalContext.tsx`: Global context for managing application state

## Features

1. Website Visit Data Visualization
   - Fetches and displays website visit statistics
   - Provides interactive charts or graphs for data analysis

2. Customer Data Management
   - Retrieves customer information from the CRM
   - Displays customer data in a user-friendly format
   - Allows filtering and sorting of customer data

3. Performance Optimization
   - Implements efficient data fetching and caching strategies
   - Utilizes Next.js features for optimal performance

4. Responsive Design
   - Ensures a seamless experience across various device sizes

## Setting Up the Database

This project uses Mockaroo to generate mock data for customer visits and customer information. Follow these steps to set up your database:

1. Visit [Mockaroo](https://mockaroo.com/)

2. Create two schemas:

   a. customer_visit_data Schema:
   ```json
   {
     "visit_id": Row Number,
     "customer_id": Dataset column,
     "visit_timestamp": Datetime,
     "visit_source": Custom List,
     "device_type": Custom List,
     "browser_type": Custom List,
     "session_duration": Number,
     "actions_taken": Custom List,
     "geo_location": Country
   }
   ```

   b. customer_data Schema:
   ```json
   {
     "id": Row Number,
     "first_name": String,
     "last_name": String,
     "customer_email": Email Address,
     "signup_date": Datetime,
     "last_activity": Datetime
   }
   ```

3. After creating these schemas, Mockaroo will provide you with an API key.

4. Add this API key to your `.env.local` file:

   ```
   NEXT_PUBLIC_API_KEY=your_mockaroo_api_key_here
   NEXT_PUBLIC_CUSTOMER_ENDPOINT=https://api.mockaroo.com/api/name_of_customer_schema
   NEXT_PUBLIC_VISIT_ENDPOINT=https://api.mockaroo.com/api/name_of_visit_schema
   ```

5. You can now use these endpoints to fetch data:
   - Customer Visit Data: `https://api.mockaroo.com/api/customer_visit_data`
   - Customer Data: `https://api.mockaroo.com/api/customer_data`

Remember to replace `X-API-Key`, `NEXT_PUBLIC_CUSTOMER_ENDPOINT`, and `NEXT_PUBLIC_VISIT_ENDPOINT` with the actual API key and endpoints provided by Mockaroo.

## Environment Variables

The following environment variables are required for the project:

```
NEXT_PUBLIC_API_KEY=your_mockaroo_api_key_here
NEXT_PUBLIC_CUSTOMER_ENDPOINT=https://api.mockaroo.com/api/name_of_customer_schema
NEXT_PUBLIC_VISIT_ENDPOINT=https://api.mockaroo.com/api/name_of_visit_schema
```

Ensure these are set in your `.env.local` file before running the application.

## API Usage

Bootteproof Challenge interacts with a CRM API to fetch website visit and customer data. The API endpoints and keys are configured using environment variables.

Example API request:

```typescript
const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
  headers: {
    'X-API-Key': `${process.env.NEXT_PUBLIC_API_KEY}`
  }
});
```

Remember to never commit your actual API keys to version control. The `.env.local` file should be in your `.gitignore`.

## Contributing

If you'd like to contribute to Bootteproof Challenge, please fork the repository and create a pull request with your changes. Ensure that your code adheres to the project's coding standards and passes all existing tests.

## License

Bootteproof Challenge is released under the MIT License. See the LICENSE file for more details.


## API Usage Example

Here's an example of how to fetch customer data using Axios with the Mockaroo API:

```typescript
import axios from 'axios';

const fetchCustomerData = async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}`, {
      params: {
        "X-API-Key": process.env.NEXT_PUBLIC_API_KEY
      }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch customer data:', error);
    throw error;
  }
};

// Example usage:
const getCustomerData = async () => {
  try {
    const customerData = await fetchCustomerData();
    console.log('Customer data:', customerData);
  } catch (error) {
    console.error('Error fetching customer data:', error);
  }
};

// Function to fetch customer visit data
const fetchCustomerVisitData = async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/customer_visit_data`, {
      params: {
        key: process.env.NEXT_PUBLIC_API_KEY
      }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch customer visit data:', error);
    throw error;
  }
};

```

These functions demonstrate how to use Axios to fetch both customer data and customer visit data from the Mockaroo API. Remember to install Axios in your project:

```bash
npm install axios
```

Also, ensure that your `.env.local` file contains the correct API URL and key:

```
   NEXT_PUBLIC_API_KEY=your_mockaroo_api_key_here
   NEXT_PUBLIC_CUSTOMER_ENDPOINT=https://api.mockaroo.com/api/name_of_customer_schema
   NEXT_PUBLIC_VISIT_ENDPOINT=https://api.mockaroo.com/api/name_of_visit_schema
```

You can use these functions in your components or pages to fetch and display the data as needed.
