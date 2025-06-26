// Backend/server.js

const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

const chamadoRoutes = require('./src/routes/chamadoRoutes'); // caminho correto
const loginAlunoRoutes = require('./src/routes/loginAlunoRoutes');
const loginRoutes = require('./src/routes/loginRoutes');


// Usar as rotas definidas
app.use('/chamados', chamadoRoutes);
app.use('/', loginRoutes);
app.use('/', loginAlunoRoutes);

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
