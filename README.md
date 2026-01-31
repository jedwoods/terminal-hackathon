# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

### Deploying to GitHub Pages (byuhspc.org/2026/)

The project is configured for **https://byuhspc.org/2026/**.

1. **Build for deployment**  
   Run:
   ```sh
   npm run build:gh
   ```
   This builds the app and copies `dist/index.html` to `dist/404.html` so direct links and refreshes on routes like `/2026/faq` work.

2. **Preview the production build locally**  
   Opening `dist/index.html` with Live Server (or directly) shows a blank page because the build uses base path `/2026/`, so assets are requested from `/2026/assets/...` and 404 when the server root is different. To preview the built site correctly, run:
   ```sh
   npm run build:gh
   npm run preview
   ```
   Then open **http://localhost:4173/2026/** in your browser (the preview server may open it automatically).

3. **Publish the `dist` folder**  
   Deploy the contents of `dist` so they are served from the `/2026/` path on your host (e.g. GitHub Pages, with the site or repo configured so that the built files live under `/2026/`).

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
