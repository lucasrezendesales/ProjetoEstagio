<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 2df5c4e (first commit)
# 📌 Menu do Projeto

## 🗺 Diagramas

- [🔹 Diagrama de Caso de Uso](docs/diagramas/Diagrama%20de%20Caso%20de%20Uso.md)
- [🔹 Diagrama de Classe](docs/diagramas/Diagrama%20de%20Classe.md)
- [🔹 Diagrama de Entidade-Relacionamento](docs/diagramas/Diagrama%20de%20Entidade-Relacionamento.md)
- [🔹 Diagrama de Estado](docs/diagramas/Diagrama%20de%20Estado.md)
- [🔹 Diagrama de Implantação](docs/diagramas/Diagrama%20de%20implantacao.md)
- [🔹 Workflow AS-IS e TO-BE](docs/diagramas/Workflow%20AS-IS%20e%20TO-BE.md)

## 📄 Artefatos

- [📄 Especificação Complementar](docs/artefatos/Especificacao%20Complementar.md)
- [📄 Pedido do Investidor](docs/artefatos/Pedido%20do%20investidor.md)
- [📄 Visão do Projeto](docs/artefatos/Visao%20do%20Projeto.md)
- [📄 Glossário](docs/artefatos/glossario.md)
- [📄 Plano de Estágio](docs/artefatos/Plano%20de%20estagio.md)


## 📚 Artefatos de Casos de Uso

### Caso de Uso A

- [🔹 Diagrama de Sequência](docs/casos_de_uso/Caso-de-uso-A/Diagrama%20de%20Sequencia-a.md)
- [📄 Especificação Caso de Uso](docs/casos_de_uso/Caso-de-uso-A/Especificacao%20Caso%20de%20Uso-a.md)

### Caso de Uso Y

- [🔹 Diagrama de Sequência](docs/casos_de_uso/Caso-de-uso-Y/Diagrama%20de%20Sequencia-b.md)
- [📄 Especificação Caso de Uso](docs/casos_de_uso/Caso-de-uso-Y/Especificacao%20Caso%20de%20Uso-b.md)


# Atualização Importante a partir de 27/02/2025: Migração de Documentos e Novo Workflow

## Documentos Migrados da Wiki para o Repositório Principal

Todos os documentos que anteriormente estavam na Wiki foram migrados para o repositório principal, dentro da pasta `/docs` e o menu enconta-se no README. Essa mudança foi necessária porque a Wiki agora não é mantida automaticamente ao gerar uma TAG, o que pode causar inconsistências nas versões dos documentos.

## Novo Workflow de Conversão para PDF

Implementamos um workflow do GitHub Actions que converte automaticamente os arquivos Markdown em PDF com alta qualidade. 

Você pode encontrar o arquivo de workflow em `.github/workflows/convert-md-to-pdf.yml`.

## Instruções para Entrega das Atividades

Para as atividades de documentação no Google Classroom, siga estas orientações:

- **Entrega em PDF:** Faça o upload do arquivo PDF gerado com a documentação.  
- **Não envie links do Google Classroom:** A entrega deve ser exclusivamente o arquivo PDF.
- **Sem necessidade de TAGs:** Não é preciso criar TAGs para as entregas; basta entregar o documento diretamente.
- **Referência ao Repositório:** Sempre anexe também o link do repositório GitHub para facilitar a verificação e acompanhamento.

## Migração da Versão Antiga para a Nova

Para migrar da versão antiga para a nova estrutura, siga os passos abaixo:

1. **Clone o Diretório `/docs`:** Faça o clone da pasta `/docs` do repositório principal para garantir que você tenha todos os documentos atualizados. Além disso, copie o MENU deste README.
2. **Atualize ou Remova a Wiki:** Se preferir, remova a Wiki antiga. Caso decida mantê-la, lembre-se que ela precisará ser atualizada manualmente sempre que houver alterações.
3. **Adicione o Workflow:** Certifique-se de que o workflow de conversão para PDF (localizado em `.github/workflows/convert-md-to-pdf.yml`) está presente no repositório.
4. **Entrega no Classroom:** Para cada atividade, gere o PDF com os documentos atualizados, faça o upload no Google Classroom e anexe o link do GitHub para referência.

Agradecemos a colaboração de todos durante essa transição para garantir que os documentos estejam sempre atualizados e que o processo de entrega seja o mais eficiente possível.



# 🚀 Estágio Supervisionado UniFil - Guia Ágil para Alunos
Este repositório é um template no GitHub para que você possa criar seu próprio repositório de estágio supervisionado a partir dele. Para usá-lo:

- Clique no botão "Use this template" para gerar uma cópia personalizada.
- Renomeie e ajuste a estrutura conforme as necessidades do seu projeto.
- Atualize os documentos de acordo com as entregas do seu estágio.


As regras aqui são apenas diretrizes e não substituem as orientações do seu orientador e coordenador de estágio.

**Bem-vindo ao seu Estágio Supervisionado!**  
Aqui, você desenvolverá um projeto real usando metodologias ágeis, dividido em **4 unidades curriculares sequenciais**. Para simplicar, chamaremos a unidades curriculares de "unidades". Cada unidade é uma **"Jornada Ágil"** com sprints flexíveis, mas entregas obrigatórias. Seu orientador atuará como *Agile Master* (PO + Scrum Master), e **todo progresso deve ser registrado no GitHub e validado via Google Classroom**. 🛠️  

---

## ⚠️ Regras Cruciais (Não Pule Essa Parte!)
1. **Unidades 1 e 3**: Avaliadas **diretamente pelo orientador** (nota final).  
2. **Unidades 2 e 4**: Avaliadas por **banca examinadora**. Para apresentar, você precisará de um **atestado de aptidão do orientador**.  
3. **Documentação progressiva**: Até a Unidade 2, você deve ter **toda a documentação básica pronta**, exceto diagramas de novos casos de uso desenvolvidos posteriormente.  

---

## 📌 Visão Geral do Estágio
| Unidade | Avaliação | Pré-Requisitos para Banca | Artefatos-Chave |
|---------|-----------|----------------------------|------------------|
| 1️⃣ **Análise** | Nota do Orientador | - | CRUD, Documento de Visão, Workflow As-Is/To-Be e etc... |
| 2️⃣ **Projeto** | Banca | Atestado do Orientador + 1 Caso de Uso Funcional + **Todos os Diagramas** | Especificação de Caso de Uso, Diagramas de Sequência e etc... |
| 3️⃣ **Implementação I** | Nota do Orientador | - | 50-80% dos Casos de Uso |
| 4️⃣ **Implementação II** | Banca Final | Atestado do Orientador + Sistema 100% Funcional | Relatório Final, todos os artefatos e todos os diagramas  |


---

## 🧩 Processo de Avaliação por Unidade

O estágio é dividido em **4 unidades**, cada uma com objetivos e entregas específicas. Para garantir o sucesso, você deve se organizar em **sprints** (ciclos de trabalho) e planejar um **cronograma detalhado**. Lembre-se: **flexibilidade é permitida, mas comunicação é obrigatória**. Qualquer mudança no planejamento deve ser **comunicada imediatamente ao orientador**, que atuará como seu guia e avaliador.

### Como Funciona o Planejamento?
1. **Defina suas Sprints**:  
   Cada sprint deve ter um objetivo claro (ex: desenvolver um CRUD, documentar um caso de uso).  
   - Sugestão: Sprints de **1 ou 2 semanas** são ideais para manter o foco e a produtividade.  
   - Use ferramentas como o **GitHub Projects (RECOMENDADO)** ou um quadro Kanban físico para visualizar as tarefas.  

2. **Crie um Cronograma**:  
   - Estime o tempo necessário para cada tarefa.  
   - Reserve um tempo para **revisões e ajustes** (imprevistos acontecem!).  
   - Compartilhe o cronograma com seu orientador no início de cada unidade.  

3. **Comunique Mudanças**:  
   - Se algo sair do planejado (ex: atrasos, dificuldades técnicas), **informe seu orientador imediatamente**.  
   - Juntos, vocês podem ajustar o cronograma e priorizar tarefas.  


### 🎯 Unidade 1: Análise (EST230168)
- **Avaliação**: Nota do orientador.  
- **Entregas**:
  - Cronograma.
  - CRUD funcional.
  - Plano de estágio.
  - Documentação básica: Visão, Pedido do Investidor, Workflow As-Is/To-Be.  

---
<<<<<<< HEAD
=======
=======
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
>>>>>>> 00da724 (first commit)
>>>>>>> 2df5c4e (first commit)
