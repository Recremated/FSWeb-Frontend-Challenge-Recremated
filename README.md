# FSWeb Frontend Challenge - Portfolio Website

This is a modern portfolio website built with React, Vite, TailwindCSS, and Framer Motion. The application features a responsive design with sections for introducing yourself, showcasing your technical skills, projects, and contact information.

## Features

- **Responsive Design**: Adapts seamlessly to different screen sizes (mobile, tablet, desktop)
- **Multi-language Support**: Full internationalization with English and Turkish language options
- **Theme Switching**: Light, dark, and auto (system preference) theme options
- **Animated UI**: Smooth transitions and animations using Framer Motion
- **Modern Technology Stack**: Built with the latest web technologies

## Key Sections

- **Hero**: Landing section with introduction and social links
- **Tech Stack**: Visual showcase of technical skills and technologies
- **Profile**: Personal information and bio
- **Projects**: Portfolio of past projects and work samples
- **Contact**: Contact information and form

## Technology Stack

- **React 19**: Latest version of the React library
- **Vite**: Fast build tool and development server
- **TailwindCSS**: Utility-first CSS framework for styling
- **Framer Motion**: Library for animations and transitions
- **Context API**: For global state management (theme, language)
- **Font Awesome**: For icons and visual elements

## Getting Started

### Prerequisites

- Node.js (latest LTS version recommended)
- npm or yarn package manager

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd fsweb-frontend-challenge
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Start the development server

```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Building for Production

```bash
npm run build
# or
yarn build
```

The built application will be available in the `dist` directory.

## Project Structure

- `src/` - Source code
  - `components/` - React components for different sections
  - `context/` - Global context for theme and language
  - `data/` - Static data for the application
  - `hooks/` - Custom React hooks
  - `mock/` - Mock data for translations
  - `services/` - API services
  - `assets/` - Static assets like images

## Customization

The portfolio can be customized by modifying:

- Content in the translation files (`src/mock/en.js`, `src/mock/tr.js`)
- Project data in the data files
- Color schemes via CSS variables and Tailwind configuration

## License

[MIT License](LICENSE)
