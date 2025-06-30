const bcrypt = require('bcryptjs');

async function gerarHash() {
  const hash = await bcrypt.hash('aluno123', 10);
  console.log('Hash da senha aluno123:', hash);
}

gerarHash();
