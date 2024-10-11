const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key';


function authenticateToken(req, res, next) {
  const token = req.header('Authorization');
  if (!token) return res.status(401).send('Access denied');

  try {
    const verified = jwt.verify(token.split(' ')[1], secretKey);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Invalid token');
  }
}

app.post('/webtoons', authenticateToken, async (req, res) => {
  const { title, summary, characters } = req.body;

  
  if (!title || !summary || !Array.isArray(characters)) {
    return res.status(400).send('Invalid data');
  }

  const newWebtoon = new Webtoon({
    title,
    summary,
    characters,
  });

  try {
    await newWebtoon.save();
    res.status(201).send('Webtoon created');
  } catch (err) {
    res.status(500).send('Server error');
  }
});
