const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // Permite ler o corpo da requisição em JSON

let users = []; // Simulação de banco de dados com um array

// Rota para listar todos os usuários
app.get('/api/users', (req, res) => {
  res.json(users);
});

// Rota para criar um novo usuário
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  const newUser = { id: users.length + 1, name, email };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Rota para editar um usuário
app.put('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const { name, email } = req.body;
  const userIndex = users.findIndex(user => user.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ message: 'Usuário não encontrado' });
  }

  users[userIndex] = { id: userId, name, email };
  res.json(users[userIndex]);
});

// Rota para excluir um usuário
app.delete('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex(user => user.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ message: 'Usuário não encontrado' });
  }

  users.splice(userIndex, 1);
  res.status(204).send(); // 204 sem conteúdo
});

// Definindo a porta para o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
