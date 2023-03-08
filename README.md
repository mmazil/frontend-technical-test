# Leboncoin frontend technical test — Maël Martin

## Overview

Creation of a `Next.js` based `React` app to display and use a simple chat app, served by a `json-server` db, for a job interview at Leboncoin.

## Installation

- `git clone https://github.com/mmazil/frontend-technical-test.git`
- `cd frontend-technical-test`
- `npm install`
- `npm run start-server`
- `npm run dev`

## Added dependencies

- `react-query` for client-side fetching, state invalidation and re-fetching.

## features

- **Safety Guard** : I was able to add a login feature which allows me to add some safety in the pages of conversations and messages.

- **New Conversation** : I add the feature to add a new conversation, (you need to re run the server when you create a new conversationn to show up)

## Conclusion

I started the project with my own fetching data management, after some time I decided to go with react query as my fetching data management because it gives me a lot of features, I also spent some time thinking about how Im going to implement the safety guard so I went with the token authentification.