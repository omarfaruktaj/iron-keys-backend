# Iron Keys - Backend

A Mechanical Keyboard Shop.

## Overview

This is the backend for the Iron keys, an e-commerce website exclusively for mechanical keyboards. The backend is built with TypeScript, Node.js, Express, MongoDB, Mongoose, and Zod.

## Features

-   **Products API**: CRUD operations for products.
-   **Orders API**: Process orders.

## Live

Check out the live site: [Iron Keys](https://iron-keys.vercel.app/)

## Getting Started

### Prerequisites

-   Node.js (v14 or later)
-   yarn
-   MongoDB

### Setup

1. **Clone the repository**:

```sh
   git clone https://github.com/omarfaruktaj/iron-keys-backend.git iron-keys-backend
  cd iron-keys-backend
```

2. **Install dependencies**:

```sh
  yarn install
```

3. **Set up environment variables**:
   Create a .env file in the backend directory and add the following:

```sh
  MONGO_URI=your_mongodb_connection_string
  PORT=5000
```

4. **Start the server**:

```sh
  yarn dev
```
