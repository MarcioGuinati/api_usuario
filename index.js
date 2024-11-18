let users = []; // Simulação de banco de dados com um array

module.exports = (req, res) => {
  const { method } = req;

  if (method === 'GET') {
    // Rota para listar todos os usuários
    return res.status(200).json(users);
  }

  if (method === 'POST') {
    // Rota para criar um novo usuário
    const { name, email } = req.body;
    const newUser = { id: users.length + 1, name, email };
    users.push(newUser);
    return res.status(201).json(newUser);
  }

  if (method === 'PUT') {
    // Rota para editar um usuário
    const userId = parseInt(req.query.id);
    const { name, email } = req.body;
    const userIndex = users.findIndex(user => user.id === userId);

    if (userIndex === -1) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    users[userIndex] = { id: userId, name, email };
    return res.status(200).json(users[userIndex]);
  }

  if (method === 'DELETE') {
    // Rota para excluir um usuário
    const userId = parseInt(req.query.id);
    const userIndex = users.findIndex(user => user.id === userId);

    if (userIndex === -1) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    users.splice(userIndex, 1);
    return res.status(204).send(); // 204 sem conteúdo
  }

  // Método não permitido
  return res.status(405).json({ message: 'Método não permitido' });
};
