const express = require('express');
const app = express();
const port = 8080;
const cors = require('cors');
const axios = require('axios');
const sharp = require('sharp');
const fs = require('fs');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use('/images', express.static('images'));

const imageUrl = [];

async function convertImageToPng(url, outputPath) {
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data, 'binary');

    await sharp(buffer)
      .toFormat('png')
      .toFile(outputPath);
  } catch (error) {
    console.error('Error converting image:', error);
  }
}

app.get('/', (req, res) =>  {
  res.send('Hello World!!');
});

app.get('/api/convert', (req, res) => {
  res.json(imageUrl);
});

app.post('/api/convert', (req, res) => {
  const { id, url } = req.body;
  imageUrl.push({
    id,
    url,
  });
  console.log(imageUrl);
  const outputPath = `./images/image-${id}.png`;

  try {
    convertImageToPng(url, outputPath);
    console.log(`Image converted and saved as ${outputPath}`);
  }
  catch (error) {
    console.error('Error converting image:', error);
    return res.status(500).send('Error converting image');
  }
  return res.send('success');
});

app.listen(port, () => {
  console.log(`Start!! Server listening at http://localhost:${port}`);
});

