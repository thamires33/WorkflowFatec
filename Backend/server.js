const express = require('express');
const cors = require('cors');
const chamadoRoutes = require('./src/routes/chamadoRoutes'); // Caminho corrigido

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/chamados', chamadoRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
