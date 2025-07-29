const bcrypt = require('bcrypt');

(async () => {
  const senhas = ['senha123', 'abc456', 'minhasenha'];
  for (let senha of senhas) {
    const hash = await bcrypt.hash(senha, 10);
    console.log(`${senha} => ${hash}`);
  }
})();
