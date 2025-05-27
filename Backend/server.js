const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const chamadoRoutes = require('./src/routes/chamadoRoutes');
app.use('/api/chamados', chamadoRoutes);

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
