# Creative Tech Stack Newsletter

A newsletter and resource hub for creatives and technologists, built with Next.js.

It features a blog/newsletter section and a curated list of tools and resources, both managed via local files (MDX and JSON).

## Getting Started

### Prerequisites

- Node.js installed

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/jonothanhunt/creative-tech-newsletter.git
    cd creative-tech-newsletter
    ```

2.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

### Development

To start the local development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

-   `posts/`: Contains MDX files for newsletter posts.
-   `app/data/items.ts`: Contains the JSON-like data for the resources list.
-   `components/`: Reusable React components.
-   `app/`: Next.js App Router structure.

## Deployment

This is a standard Next.js application that can be easily deployed on [Vercel](https://vercel.com/new).
