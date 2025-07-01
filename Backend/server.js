 // backend/server.js
require('dotenv').config();               // carrega variáveis do .env

const express  = require('express');
const cors     = require('cors');
const helmet   = require('helmet');
const morgan   = require('morgan');

const chamadoRoutes = require('./src/routes/chamadoRoutes');
const loginRoutes   = require('./src/routes/loginRoutes');
const alunoRoutes   = require('./src/routes/alunoRoutes');

const app = express();

/* ───────────── middlewares globais ───────────── */
app.use(helmet());                                        // segurança
app.use(cors({ origin: process.env.FRONT_URL || '*' }));  // CORS

// Apenas aplica body-parser em métodos que não sejam GET
app.use((req, res, next) => {
  if (req.method === 'GET') return next();
  express.json({ limit: '10mb' })(req, res, next);
});

app.use(morgan('dev'));                                   // log HTTP

/* ───────────── rotas da API ───────────── */
app.use('/api/chamados', chamadoRoutes);  // ex.: /api/chamados/42
app.use('/api/auth',     loginRoutes);    // ex.: /api/auth/login
app.use('/api/alunos',   alunoRoutes);    // ex.: /api/alunos/17

/* ───────────── 404 padrão ───────────── */
app.use((req, res) => {
  res.status(404).json({ message: 'Rota não encontrada.' });
});

/* ───────────── handler global de erros ───────────── */
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Erro interno do servidor.' });
});

/* ───────────── inicia o servidor ───────────── */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
