# GeminiBot - Chatbot com Google AI Studio

Este é um chatbot simples desenvolvido utilizando a API Gemini do Google AI Studio. O chatbot é capaz de manter conversas naturais e responder a perguntas de forma amigável e profissional.

## Pré-requisitos

- Node.js v18 ou superior
- Conta Google (para acessar o Google AI Studio)
- API Key do Google AI Studio

## Configuração

1. Clone este repositório ou baixe os arquivos
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Obtenha sua API Key:
   - Acesse o [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Crie uma nova API Key
   - Copie a chave gerada

4. Configure a API Key:
   - Abra o arquivo `index.js`
   - Substitua `"YOUR_API_KEY"` pela sua chave de API

## Executando o Chatbot

Para iniciar o chatbot, execute:

```bash
npm start
```

## Como Usar

- Digite suas mensagens no prompt
- O chatbot responderá de forma interativa
- Para encerrar a conversa, digite 'sair'

## Características do Chatbot

O GeminiBot foi configurado com as seguintes características:
- Personalidade amigável e acolhedora
- Respostas concisas e diretas
- Linguagem simples e acessível
- Tom profissional mas descontraído
- Foco em ajudar da melhor forma possível

## Segurança

O chatbot inclui configurações de segurança para bloquear:
- Conteúdo de assédio
- Discurso de ódio
- Conteúdo sexualmente explícito
- Conteúdo perigoso

## Recursos Utilizados

- [Google AI Studio](https://makersuite.google.com/app/home)
- [Documentação da API Gemini](https://ai.google.dev/gemini-api/docs) 