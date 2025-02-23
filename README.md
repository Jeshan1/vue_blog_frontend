# Vue Blog Frontend

A Vue.js-based blogging platform frontend that interacts with a backend API to display, create, edit, and manage blog posts.

## 🚀 Features
- User authentication (Login/Register)
- View all blogs and individual blog details
- Like, dislike, and comment on blogs
- Create, edit, and delete blogs
- Responsive UI with TailwindCSS

## 📌 Installation

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (LTS recommended)
- [Vue CLI](https://cli.vuejs.org/)
- [Git](https://git-scm.com/)

### Clone the repository
```bash
git clone https://github.com/Jeshan1/vue_blog_frontend.git
cd vue_blog_frontend
```

### Install dependencies
```bash
npm install
```

## 🚀 Running the Project

### Development Server
```bash
npm run dev
```
This will start the Vue application at `http://localhost:5173/` (or another available port).

### Build for Production
```bash
npm run build
```
This generates optimized files in the `dist/` directory.

## ⚙️ Environment Variables
Create a `.env` file in the project root and configure the backend API endpoint:
```env
VITE_API_URL=http://your-backend-url.com/api
```
Replace `your-backend-url.com` with the actual backend server URL.

## 📡 API Integration
This frontend interacts with a Laravel backend API. Ensure your backend is running and accessible at the configured `VITE_API_URL`.

## 📁 Project Structure
```
vue_blog_frontend/
│── src/
│   ├── components/   # Reusable UI components
│   ├── views/        # Page-level components
│   ├── store/        # Vuex store (if used)
│   ├── router/       # Vue Router configuration
│   ├── assets/       # Static assets
│── public/           # Static files (index.html, favicon, etc.)
│── .env              # Environment variables
│── vite.config.js    # Vite configuration
│── package.json      # Dependencies and scripts
│── README.md         # Project documentation
```

## 🚀 Deployment
### Deploy to Vercel
```bash
npm install -g vercel
vercel
```
Follow the setup instructions to deploy the frontend.

### Deploy to Netlify
```bash
netlify deploy --prod
```
Ensure you have configured environment variables in the Netlify dashboard.

## 🤝 Contributing
1. Fork the repository
2. Create a new branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add new feature'`
4. Push to branch: `git push origin feature-name`
5. Open a Pull Request

## 📜 License Under Processing
## 📞 Contact
For any issues or improvements, feel free to open an issue or contact [Jeshan1](https://github.com/Jeshan1).
