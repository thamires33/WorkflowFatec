const bcrypt = require('bcryptjs');

async function gerarHash() {
  const senha = 'novaSenha123'; // altere aqui se quiser outra senha
  const hash = await bcrypt.hash(senha, 10);
  console.log('Hash gerado:', hash);
}

gerarHash();
