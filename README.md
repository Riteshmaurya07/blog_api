# 📝 Blog API with MySQL, Express, and EJS

A full-stack blog application built using **Node.js**, **Express**, **MySQL**, and **EJS templating**. It supports all CRUD operations on blog posts and includes a review system for each blog.

## 🚀 Features

- Create, read, update, and delete blog posts
- Add reviews/comments to individual blogs
- Responsive and clean UI with EJS and CSS
- MySQL database integration
- Environment variables managed via `.env`

---

## 📂 Project Structure

```
blog-api-project/
│
├── app.js                # Main application file
├── db.js                 # MySQL DB connection
├── .env                  # Environment variables
├── views/                # EJS templates
│   ├── index.ejs
│   ├── blog.ejs
│   ├── create.ejs
│   ├── edit.ejs
│   └── partials/
│       ├── header.ejs
│       └── footer.ejs
├── public/
│   └── styles.css        # Custom CSS
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/Riteshmaurya07/blog-api-project.git
cd blog-api-project
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file and update it with your database credentials:

```env
DB_HOST=localhost
DB_USER=root
DB_PASS=your_mysql_password
DB_NAME=blogdb
PORT=3000
```

### 4. Create MySQL Tables

Run this SQL in your MySQL database:

```sql
CREATE TABLE IF NOT EXISTS blogs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    blog_id INT NOT NULL,
    reviewer_name VARCHAR(100),
    comment TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (blog_id) REFERENCES blogs(id) ON DELETE CASCADE
);
```

---

## 📦 Run the Application

```bash
nodemon app.js
```

Open your browser and visit: [http://localhost:3000](http://localhost:3000)

---

## 📸 Screenshots

| Blog List Page | Blog Detail & Reviews |
|----------------|------------------------|
| ![](screenshots/blog-list.png) | ![](screenshots/blog-detail.png) |

> (Add screenshots manually to the `screenshots/` folder if needed)

---

## 📌 Future Enhancements

- Authentication (Login/Signup)
- Pagination for blogs and reviews
- Like/Dislike system
- Search and filtering
- Rich text blog editor

---

## 🧑‍💻 Author

**Ritesh Maurya**  
Full-stack Developer  
[GitHub](https://github.com/Riteshmaurya07)

---

## 📝 License

This project is licensed under the MIT License.
