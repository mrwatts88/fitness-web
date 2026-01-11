# Mock API Setup

This project includes a mock API server using `json-server` for development and testing.

## Running the Mock API

In one terminal:
```bash
npm run api
```

This starts the mock API server on http://localhost:3000

In another terminal:
```bash
npm run dev
```

This starts the Vue app on http://localhost:5173

## Mock API Endpoints

The mock server provides the following endpoints that match your real backend API:

- `GET http://localhost:3000/calories` - Get all calorie entries for today
- `POST http://localhost:3000/calories` - Add a new calorie entry
  - Body: `{ "amount": 350 }`
- `DELETE http://localhost:3000/calories/:id` - Delete a calorie entry

- `GET http://localhost:3000/weight` - Get weight entries (up to 500 days)
- `POST http://localhost:3000/weight` - Add/update weight entry
  - Body: `{ "amount": 185.5, "created_at": "2026-01-11" }`
- `DELETE http://localhost:3000/weight/:date` - Delete weight entry (not fully supported by json-server)

- `GET http://localhost:3000/tdee` - Get TDEE value
  - Returns: `{ "amount": 2500 }`

## Mock Data

The mock data is stored in [db.json](db.json). You can edit this file to change the initial data.

## Switching to Real API

To switch from the mock API to your real backend:

1. Update the `.env` file:
   ```env
   VITE_API_BASE_URL=https://your-real-api.com
   ```

2. Stop the mock API server (the one running `npm run api`)

3. The Vue app will now connect to your real backend

## Notes

- json-server auto-generates IDs for new entries
- The DELETE endpoint for weight by date may require updating the db.json manually since json-server uses IDs
- Changes to db.json are persisted between restarts
- To reset the mock data, restore the original db.json content
