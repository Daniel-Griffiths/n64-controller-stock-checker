# N64 Controller Stock Checker 🎮

A quick script to check if the Nintendo 64 controller for Switch is in stock. It runs every couple of minutes and sends me an email if it's in stock.

## Getting Started

Install the dependencies:

```bash
yarn install
```

Copy the .env.example file to .env and fill in the values:

```bash
cp .env.example .env
```

Then run the development server:

```bash
yarn dev
```

Open [http://localhost:3000/api/check-stock](http://localhost:3000/api/check-stock) with your browser to see the result.
