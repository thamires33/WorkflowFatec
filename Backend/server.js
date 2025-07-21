// Backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Importação das rotas
const chamadoRoutes = require('./src/routes/chamadoRoutes');
const authRoutes = require('./src/routes/authRoutes'); // ✅ Rotas de autenticação

// Middlewares globais
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos da pasta de uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Registro das rotas principais da API
app.use('/api/chamados', chamadoRoutes); // 📦 Chamados
app.use('/api/auth', authRoutes);        // 🔐 Login (aluno e secretaria)

// Rota principal (teste de vida)
app.get('/', (req, res) => {
  res.send('🚀 Servidor WorkflowFatec rodando...');
});

// Inicialização do servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em: http://localhost:${PORT}`);
});
