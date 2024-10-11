const bcrypt = require('bcryptjs');

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
 
  const user = { username: 'user1', password: '$2a$10$...' }; 

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).send('Invalid credentials');
  }

  const token = jwt.sign({ username: user.username }, secretKey, { expiresIn: '1h' });
  res.json({ token });
});

