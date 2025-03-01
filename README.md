To run locally: 

For the frontend: 
1. Navigate to the root directory, run `npm install`.
2. Run `npm run start`.
3. Navigate to the localhost URL listed in the terminal.

For the backend:
1. Navigate to the ./backend directory, and run `npm install`.
2. Run `npm run start`.
3. Verify if the backend is running, by checking the terminal.
4. Setup your MongoDB database using Atlas GUI, add `notes` and `users` collections and paste your mongo user id as `MONGO_DB_USER` and mongo user pwd `MONGO_DB_USERPWD` into a .env file.

Once your backend is setup, add your backend url into a .env file in the root directory as the `REACT_APP_BACKEND_HOST` env variable value.

Demo: 
![ScreenRecording2025-03-02at5 14 39AM-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/b639646a-2bf9-4bfb-8514-a558a00d0d2c)
