const express = require('express');
const { spawn } = require('child_process');

const app = express();

function pythonProcess() {
  return new Promise((resolve, reject) => {

    let profile = "perfil-kayky"

    const pyProcess = spawn('python', ['src\\backend\\script.py', profile]);

    pyProcess.stdout.on('data', (data) => {
      console.log('Dados recebidos do python:', data.toString());
    });

    pyProcess.stderr.on('data', (data) => {
      console.error('Erro do python:', data.toString());
      reject(new Error('Erro no script'));
    });

    pyProcess.on('close', (code) => {
      if (code === 0) {
        resolve('Script Python executado com sucesso');
      } else {
        reject(new Error('Script Python saiu com código:', code));
      }
    });
  });
}

app.get('/', async (req, res) => {
  if (req.method === 'GET') {
    try {
      const result = await pythonProcess();
      res.send(result);
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro durante a execução do script Python');
    }
  } else {
    res.status(405).send('Método não permitido');
  }
});

app.listen(3000, () => {
  console.log('Servidor escutando na porta 3000!');
});