import { Request, Response } from "express";
import { prismaClient } from "../../prismaClient";
import { Prisma } from "@prisma/client";

export async function CriarProduto(request: Request, response: Response) {
  const { nome, valor, imagem } = request.body;
  try {
    const aux = await prismaClient.produto.create({
      data: {
        nome: nome,
        valor: valor,
        imagem: imagem,
      },
    });
    return response.status(200).json(aux);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // Trata erros conhecidos do Prisma
      return response.status(409).json({ erro: e.code });
    }
    // Trata outros erros desconhecidos
    return response.status(500).json({ erro: "Erro no servidor" });
  }
}

export async function LerProdutos(request: Request, response: Response) {
  try {
    const aux = await prismaClient.produto.findMany({});
    return response.status(200).json(aux);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // Trata erros conhecidos do Prisma
      return response.status(409).json({ erro: e.code });
    }
    // Trata outros erros desconhecidos
    return response.status(500).json({ erro: "Erro no servidor" });
  }
}

export async function DeletarProduto(request: Request, response: Response) {
  const { id } = request.body;
  try {
    const aux = await prismaClient.produto.delete({
      where: {
        id: Number(id),
      },
    });
    return response.status(200).json(aux);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // Trata erros conhecidos do Prisma
      return response.status(409).json({ erro: e.code });
    }
    // Trata outros erros desconhecidos
    return response.status(500).json({ erro: "Erro no servidor" });
  }
}

export async function AtualizarProduto(request: Request, response: Response) {
  const { id } = request.body;
  const { nome, valor, imagem } = request.body;
  try {
    const aux = await prismaClient.produto.update({
      where: {
        id: Number(id),
      },
      data: {
        nome: nome,
        valor: valor,
        imagem: imagem,
      },
    });
    return response.status(200).json(aux);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // Trata erros conhecidos do Prisma
      return response.status(409).json({ erro: e.code });
    }
    // Trata outros erros desconhecidos
    return response.status(500).json({ erro: "Erro no servidor" });
  }
}