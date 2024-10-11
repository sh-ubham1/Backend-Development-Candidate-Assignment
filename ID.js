app.get('/webtoons/:id', async (req, res) => {
  try {
    const webtoon = await Webtoon.findById(req.params.id);
    if (!webtoon) return res.status(404).send('Webtoon not found');
    res.json(webtoon);
  } catch (err) {
    res.status(500).send('Server error');
  }
});
