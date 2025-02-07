# Parse Hog Next

A specialized healthcare integration tool built with Next.js that provides a suite of HL7 (Health Level 7) utilities for healthcare professionals. This application offers browser-based tools for parsing, analyzing, and understanding HL7 messages, making healthcare data integration more accessible.

## Features

- **HL7 Message Parser**: An interactive, browser-based parser that:
  - Supports HL7 2.X messages (based on 2.8.1 definitions)
  - Provides field-by-field analysis
  - Runs entirely client-side for data privacy
  - Includes hover-based field exploration
  
- **HL7 Field Lookup**: Quick reference tool for HL7 field definitions and mappings

- **ADT Event Code Reference**: Comprehensive mapping of ADT (Admission, Discharge, Transfer) event codes to their definitions

## Privacy & Security

- All parsing and analysis runs client-side
- No data is stored or transmitted to servers
- Completely private analysis of healthcare data

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: 
  - @tippyjs/react for tooltips
  - react-icons for icons

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `/app` - Contains the main application code and pages
- `/public` - Static assets
- `/components` - Reusable React components
- `tailwind.config.ts` - Tailwind CSS configuration
- `next.config.js` - Next.js configuration

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint