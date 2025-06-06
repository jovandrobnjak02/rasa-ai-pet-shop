# Pet Shop Application

This is a pet shop application built with Angular and integrated with a Rasa AI chatbot.

## Running the Application

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   ng serve
   ```

3. Open your browser and navigate to `http://localhost:4200`.

## Running the Rasa AI Chatbot

1. Create a virtual environment and activate it:
   ```
   py -3.10 -m venv venv
   .\venv\Scripts\Activate.ps1
   ```

2. Install Rasa:
   ```
   python -m pip install rasa
   ```

3. Verify the installation:
   ```
   rasa --version
   ```

4. Initialize a new Rasa project:
   ```
   rasa init --no-prompt
   ```

5. Train the Rasa model:
   ```
   rasa train
   ```

6. Run the Rasa server:
   ```
   rasa run --enable-api --cors "*" --port 5005
   ```

## Features

- User authentication
- Product browsing
- Shopping cart
- Chatbot integration with Rasa AI

## Technologies Used

- Angular
- Rasa AI
- HTML/CSS
- TypeScript 