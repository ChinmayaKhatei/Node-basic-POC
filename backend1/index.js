const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Chinu1997#",
  database: "chinmaya_db"
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
});

app.post('/product', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'pdf', maxCount: 1 }, { name: 'videos', maxCount: 1 }]), (req, res) => {
  // Access files using req.files

  console.log('Request Body:', req.body);
  console.log('Request Files:', req.files);

  const image = req.files['image'] ? req.files['image'][0] : null;
  const pdf = req.files['pdf'] ? req.files['pdf'][0] : null;
  const videos = req.files['videos'] ? req.files['videos'][0] : null;

  const { name, price, description, youtubelink } = req.body;

  const values = {
    name,
    price,
    description,
    image: image ? image.filename : null,
    pdf: pdf ? pdf.filename : null,
    videos: videos ? videos.filename : null,
    youtubelink,
  };

  const sql = 'INSERT INTO PRODUCT SET ?';

  db.query(sql, values, (error, results) => {
    if (error) {
      console.error("Product insertion error:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    console.log("Product created successfully:", results);
    return res.status(200).json({ message: 'Product created successfully', data: results });
  });

  console.log('Request Body:', req.body);
  console.log('Request Files:', req.files);
});

app.get('/', (req, res) => {
  // Use path.join to create the correct file path
  const filePath = path.join(__dirname, 'homepage.html');
  res.sendFile(filePath);
});

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log(`Server connected on port ${PORT}`);
});
