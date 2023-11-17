const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.get('/getCredentials', (req, res) => {
  try {
    // txt dosyasından kullanıcı adı ve şifreyi oku
    const credentials = getCredentialsFromFile('credentials.txt');

    // Verileri JSON formatında döndür
    res.status(200).json({
      statusCode: 200,
      data: credentials,
    });
  } catch (error) {
    // Hata durumunda hata mesajını döndür
    res.status(500).json({
      statusCode: 500,
      error: 'Internal Server Error',
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

function getCredentialsFromFile(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const lines = fileContent.split('\n');

  return {
    username: lines[0].trim(),
    password: lines[1].trim(),
  };
}
