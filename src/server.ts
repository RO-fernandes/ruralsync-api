import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Rota de verificação: abra no navegador http://localhost:3333/health
app.get('/health', (req, res) => {
  return res.json({ status: 'RuralSync API operante 🚜' });
});

// Listagem de fazendas (Usando bypass para ignorar o erro visual do VS Code)
app.get('/fazendas', async (req, res) => {
  try {
    // O (prisma as any) serve para o código rodar mesmo se o VS Code marcar erro
    const fazendas = await (prisma as any).fazenda.findMany();
    return res.json(fazendas);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao buscar dados no banco' });
  }
});

const PORT = 3333;

app.listen(PORT, () => {
  console.log('-------------------------------------------');
  console.log(`🚀 RuralSync rodando na porta ${PORT}`);
  console.log('-------------------------------------------');
});