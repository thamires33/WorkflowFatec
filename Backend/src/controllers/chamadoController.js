const Chamado = require('../models/Chamado.temp'); // Confirme a letra maiúscula!
const gerarProtocolo = require('../utils/gerarProtocolo');

const chamadoController = {
  criar: async (req, res) => {
    try {
      const protocolo = gerarProtocolo(); // Gera o protocolo automaticamente

      const chamado = {
        aluno_ra: req.body.aluno_ra,
        tipo: req.body.tipo,
        descricao: req.body.descricao,
        prioridade: req.body.prioridade || 'Média', // ✅ Adicionado
        status: req.body.status || 'Aberto',
        protocolo: protocolo
      };

      const resultado = await Chamado.criar(chamado);

      res.status(201).json({
        mensagem: 'Chamado criado com sucesso!',
        protocolo: protocolo,
        id: resultado.insertId
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: 'Erro ao criar chamado' });
    }
  },

  listar: async (req, res) => {
    try {
      const chamados = await Chamado.listarTodos();
      res.status(200).json(chamados);
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao listar chamados' });
    }
  },

  buscarPorId: async (req, res) => {
    try {
      const chamado = await Chamado.buscarPorId(req.params.id);

      if (!chamado) {
        return res.status(404).json({ erro: 'Chamado não encontrado' });
      }

      res.status(200).json(chamado);
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao buscar chamado' });
    }
  },

  atualizarStatus: async (req, res) => {
    try {
      const { status } = req.body;
      await Chamado.atualizarStatus(req.params.id, status);
      res.status(200).json({ mensagem: 'Status atualizado com sucesso' });
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao atualizar status' });
    }
  },

  deletar: async (req, res) => {
    try {
      const resultado = await Chamado.deletar(req.params.id);

      if (resultado.affectedRows === 0) {
        return res.status(404).json({ erro: 'Chamado não encontrado' });
      }

      res.status(200).json({ mensagem: 'Chamado deletado com sucesso' });
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao deletar chamado' });
    }
  },

  atualizar: async (req, res) => {
    try {
      console.log("Chegou na função atualizar");
      const { descricao, tipo } = req.body;

      await Chamado.atualizarChamadoCompleto(req.params.id, { descricao, tipo });

      res.status(200).json({ mensagem: 'Chamado atualizado com sucesso!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: 'Erro ao atualizar chamado' });
    }
  },
};

module.exports = chamadoController;
