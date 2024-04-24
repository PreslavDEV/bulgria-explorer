# bulgaria-explorer

## Description

Bulgaria explorer application

## Content

- [Stack](#stack)
- [Environment variables](#environment-variables)
- [Setup](#setup)
- [Run the app locally](#run-the-app-locally)
  - [Run in development mode](#run-in-development-mode)
- [Local scripts](#local-scripts)
  - [ESLint](#eslint)
- [Commit Message Rules](#commit-message-rules)
  - [Commit Message Prefix](#commit-message-prefix)
  - [Commit Summary Subject](#commit-summary-subject)
  - [Commit type (square brackets)](#commit-type-square-brackets)
  - [Commit message example](#commit-message-example)

## Stack

- React Native with Expo - Navigation (Typescript)
- ESLint
- MobX
- Firebase

## Environment variables

| Variable                        | Description                  | Example |
| ------------------------------- | ---------------------------- | ------- |
| EXPO_PUBLIC_API_KEY             | Firebase api key             | ------- |
| EXPO_PUBLIC_PROJECT_ID          | Firebase project id          | ------- |
| EXPO_PUBLIC_APP_ID              | Firebase app id              | ------- |
| EXPO_PUBLIC_MESSAGING_SENDER_ID | Firebase messaging sender id | ------- |
| EXPO_PUBLIC_DATABASE_URL        | Firebase database url        | ------- |
| EXPO_PUBLIC_STORAGE_URL         | Firebase storage url         | ------- |

## Setup

1. Copy environment variables file template
   ```bash
   $ cp example.env .env
   ```
2. Fill `.env` file with actual environment variables accordingly to the [reference](#environment-variables).
3. Install dependencies
   ```bash
   $ npm install
   ```

## Run the app locally

### Run in development mode

```bash
$ npm start
```

## Local scripts

### ESLint

- Lint codebase:

  ```bash
  $ npm run lint
  ```
