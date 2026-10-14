const express = require('express');
const hexToRgb = require('./hextorgb');

const app = express();
app.use(express.json());

app.get('/convert', (req, res) => {
  const { hex } = req.query;
  if (!hex) {
    return res.status(400).json({ error: 'Missing "hex" query parameter' });
  }

  try {
    const rgb = hexToRgb(hex);
    res.json({ hex, rgb });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;