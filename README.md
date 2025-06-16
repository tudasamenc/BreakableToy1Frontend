# Taskerr

Taskerr is a modern, interactive task management web application built with **React**, **TypeScript**, and **Vite**. It features a beautiful UI with Material-UI, advanced filtering and sorting, AI-powered advice for tasks, and animated visuals.

## Features

- **Task CRUD**: Create, edit, delete, and mark tasks as done/undone.
- **Filtering & Sorting**: Search by name, filter by priority and status, and sort by various fields.
- **Pagination**: Navigate through tasks with pagination controls.
- **AI Advice**: Get AI-generated advice for each task.
- **Statistics**: View average completion times overall and by priority.
- **Responsive Design**: Works well on desktop and mobile.
- **Animated Header & Background**: Eye-catching animated title and Spline 3D background.

## Screenshots

![Taskerr Screenshot](public/vite.svg) <!-- Replace with actual screenshot if available -->

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/taskerr.git
   cd taskerr
   ```

2. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```

3. **Start the development server:**
   ```sh
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser:**  
   Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

### Backend

Taskerr expects a backend API running at `http://localhost:9090/api/tasks`.  
You can implement your own backend or connect to the provided API.

## Project Structure

- `src/App.tsx` – Main application logic and UI
- `src/NewTask.tsx` – Modal for creating new tasks
- `src/EditTask.tsx` – Modal for editing tasks
- `src/AdviceTask.tsx` – AI advice dialog for tasks
- `src/TextPressure.tsx` – Animated header component
- `src/assets/` – Static assets

## Customization

- **Theme:** Easily customizable via Material-UI's theme in [`src/App.tsx`](src/App.tsx).
- **API URL:** Change the backend API URL in the Axios client configuration.

## Scripts

- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npm run preview` – Preview production build
- `npm run lint` – Run ESLint

## License

MIT

---

```

