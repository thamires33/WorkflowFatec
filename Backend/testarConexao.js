const bcrypt = require('bcryptjs');

const senha = 'carla789';

async function teste() {
  const hash = await bcrypt.hash(senha, 10);
  console.log('Hash gerado:', hash);

  const resultado = await bcrypt.compare(senha, hash);
  console.log('Resultado da comparação:', resultado ? '✅ Correta' : '❌ Incorreta');
}

teste();







//const db = require('./config/db');

/*async function testarConexao() {
  try {
    await db.query('SELECT 1');
    console.log('✅ Conexão com o MySQL bem-sucedida!');
  } catch (erro) {
    console.error('❌ Erro ao conectar com o banco de dados:');
    console.error(erro);
  }
}

testarConexao();*/
/*const bcrypt = require('bcrypt');
const db = require('./src/config/db'); // ajuste o caminho conforme necessário

async function atualizarSenha() {
  const senhaPura = '123456';
  const hash = await bcrypt.hash(senhaPura, 10);

  await db.query('UPDATE secretaria SET senha = ? WHERE email = ?', [hash, 'rafael@fatec.com']);

  console.log('Senha atualizada com hash.');
  process.exit();
}

atualizarSenha();*/


