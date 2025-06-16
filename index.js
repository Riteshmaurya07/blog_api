const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
require('dotenv').config();

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', async (req, res) => {
  const [blogs] = await db.query('SELECT * FROM blogs ORDER BY created_at DESC');
  res.render('index', { blogs });
});

app.get('/blogs/:id', async (req, res) => {
  const blogId = req.params.id;
  const [[blog]] = await db.query('SELECT * FROM blogs WHERE id = ?', [blogId]);
  const [reviews] = await db.query('SELECT * FROM reviews WHERE blog_id = ?', [blogId]);
  res.render('blog', { blog, reviews });
});

app.get('/create', (req, res) => res.render('create'));
app.post('/create', async (req, res) => {
  const { title, content } = req.body;
  await db.query('INSERT INTO blogs (title, content) VALUES (?, ?)', [title, content]);
  res.redirect('/');
});

app.get('/edit/:id', async (req, res) => {
  const [[blog]] = await db.query('SELECT * FROM blogs WHERE id = ?', [req.params.id]);
  res.render('edit', { blog });
});
app.post('/edit/:id', async (req, res) => {
  const { title, content } = req.body;
  await db.query('UPDATE blogs SET title = ?, content = ? WHERE id = ?', [title, content, req.params.id]);
  res.redirect('/');
});

app.post('/delete/:id', async (req, res) => {
  await db.query('DELETE FROM blogs WHERE id = ?', [req.params.id]);
  res.redirect('/');
});

// Updated reviews route: remove reviewer_name
app.post('/reviews/:blogId', async (req, res) => {
  const { comment } = req.body;
  const blogId = req.params.blogId;
  await db.query('INSERT INTO reviews (blog_id, comment) VALUES (?, ?)', [blogId, comment]);
  res.redirect('/blogs/' + blogId);
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});