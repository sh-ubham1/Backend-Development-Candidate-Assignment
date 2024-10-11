app.delete('/webtoons/:id', authenticateToken, async (req, res) => {
  try {
    const webtoon = await Webtoon.findByIdAndDelete(req.params.id);
    if (!webtoon) return res.status(404).send('Webtoon not found');
    res.send('Webtoon deleted');
  } catch (err) {
    res.status(500).send('Server error');
  }
});
