# Nexora Studio

Nexora Studio is a concept architecture and interior design website built to feel like a real studio, not a template. It features a rotating 3D wireframe tower built in pure CSS, an architect crosshair cursor with live coordinates, and cinematic image reveals. Everything is hand coded in React and Tailwind CSS with zero animation libraries.

Live site: https://nexorastudio-web.vercel.app/

## Highlights

* Rotating 3D wireframe tower built with CSS 3D transforms, sized for phones, tablets, and desktops
* Architect crosshair cursor with live X and Y coordinates and a trailing ring that expands on interactive elements
* Parallax hero with a slow cinematic zoom, scroll triggered reveals, and clip path image wipes
* Outlined text marquee, 3D tilt on project cards, and magnetic pull on call to action buttons
* Scroll progress bar, animated counters, and smooth page transitions
* Interactive before and after renovation slider
* Filterable services and projects, plus an eight stage process timeline
* Contact page with a project enquiry form, FAQ accordion, embedded Google Map, and WhatsApp chat
* Performance tuned loading with preconnect, hero image preload, deferred loading of other page images, and fallbacks so content never stays hidden
* Consistent behavior on iPhone and Android

## Pages

* Home: hero, marquee, about preview, services, why choose us, selected work, process, stats, testimonials, partners, and call to action
* About: story, mission, vision, values, team, and process
* Services: ten services with filtering, benefits, timelines, and deliverables
* Projects: filterable portfolio with the before and after slider
* Contact: enquiry form, business details, map, and FAQ

## Tech Stack

* React
* Vite
* Tailwind CSS
* CSS 3D transforms and keyframe animations
* Custom React hooks built on IntersectionObserver and requestAnimationFrame
* Lucide React and React Icons
* Deployed on Vercel

## Getting Started

### Prerequisites

* Node.js 18 or newer
* npm 9 or newer

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open the local URL shown in the terminal

### Build for Production

```bash
npm run build
```

## Project Scripts

* `npm run dev`: start the local development server
* `npm run build`: create a production build
* `npm run preview`: preview the production build locally

## Brand Notes

Nexora Studio is a fictional brand created for frontend demonstration and portfolio purposes. Building photography comes from Unsplash.

## Contact

For questions about the project or implementation details, reach out through the repository or the website contact page.
