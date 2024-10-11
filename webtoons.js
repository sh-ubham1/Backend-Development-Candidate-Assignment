app.get('/webtoons', async (req, res) => {
  try {
    const webtoons = await Webtoon.find({}, 'title summary characters');
    res.json(webtoons);
  } catch (err) {
    res.status(500).send('Server error');
  }
});
