# Vue Blog Frontend

A Vue.js-based blogging platform frontend that interacts with a backend API to display, create, edit, and manage blog posts.

## 🚀 Features
- User authentication and authorization
- View all blogs and individual blog details
- Like, dislike, and comment on blogs
- Create, edit, and delete blogs
- Admin panel included to manage blog analytics,category and blog manage, comment and contact listing etc.
- BroadCasting email and contact confirmation email applied
- Read a loud feature added in client side
- Specific Blog download by converting pdf
- Seamless API integrated and implemented
- Single Sign On with google implemented
- Go To Top button added and navbar activated
- Search blog feature added

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
npm run serve
```
This will start the Vue application at `http://localhost:8080/` (or another available port).

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
This frontend interacts with a Laravel backend API.

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
│── package.json      # Dependencies and scripts
│── README.md         # Project documentation
```

## 🤝 Contributing
1. Fork the repository
2. Create a new branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add new feature'`
4. Push to branch: `git push origin feature-name`
5. Open a Pull Request

## 📜 License Under Processing
## 📞 Contact
For any issues or improvements, feel free to open an issue or contact [Jeshan1](https://github.com/Jeshan1).
