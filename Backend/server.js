const express = require('express');
const cors = require('cors');
const chamadoRoutes = require('./routes/chamadoRoutes');

const app = express();

app.use(cors()); // ✅ Libera o acesso externo (ex: do React)
app.use(express.json());

app.use('/api/chamados', chamadoRoutes); // ✅ Prefixo das rotas

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
