# Dany Diniz — Manual do Sistema

## O que é

O site **Dany Diniz** é uma plataforma completa de agendamento online para o salão de beleza. Os clientes agendam horários sozinhos, recebem lembretes automáticos por e-mail e WhatsApp, e você gerencia tudo pelo painel admin.

---

## Funcionalidades para os Clientes

### 🗓️ Agendamento Online
- O cliente acessa o site, escolhe o serviço, a profissional e o melhor horário disponível
- Precisa criar uma conta rápida (nome, e-mail, telefone e senha)
- Após agendar, recebe confirmação na tela

### 🔔 Lembretes Automáticos
- **24 horas antes**: recebe lembrete por e-mail e WhatsApp com botão para confirmar ou cancelar
- **2 horas antes**: recebe um segundo lembrete para não esquecer

### ❌ Cancelamento
- O cliente pode cancelar pelo link no lembrete ou pela área "Meus Agendamentos"
- Existe um prazo mínimo configurável (ex: 24h de antecedência)

### 💰 Preços e PIX
- Página de preços mostra todos os serviços com valores
- QR Code do PIX gerado automaticamente para pagamento antecipado

### 📍 Localização
- Mapa do Google integrado mostrando o endereço do salão
- Botão para abrir no Google Maps (útil para Waze/GPS)

### 💬 WhatsApp
- Botão flutuante no canto da tela para falar diretamente com o salão
- Menu com opções rápidas: dúvidas, agendamento, preços, localização

---

## Funcionalidades do Painel Admin

Acesse em: **seusite.com/login** → entre com conta de admin

### 📊 Dashboard
- Agendamentos do dia
- Receita do mês
- Total de clientes cadastrados
- Serviços mais populares

### 📅 Agenda
- Visualize todos os agendamentos por data
- Altere status: agendado → confirmado → concluído → cancelado
- Bloqueie horários ou dias inteiros (férias, folga)

### 💇 Serviços
- Adicione, edite ou desative serviços
- Defina nome, descrição, preço e duração
- Serviços desativados não aparecem para agendamento

### 📸 Galeria
- Suba fotos dos trabalhos realizados
- Categorize por: cabelo, unhas, maquiagem, estética
- As fotos aparecem na página pública de Galeria

### 💰 Financeiro
- Veja receita por período
- Histórico de atendimentos concluídos com valores

### ⚙️ Configurações
Aqui você controla tudo do salão:

| Configuração | O que faz |
|---|---|
| **Nome do salão** | Aparece no site, e-mails e WhatsApp |
| **Endereço** | Exibido na seção de localização |
| **Telefone** | Mostrado no rodapé e contato |
| **WhatsApp** | Número para o botão flutuante |
| **Chave PIX** | Gera QR Code automático na página de preços |
| **Horário de funcionamento** | Define abertura/fechamento |
| **Dias abertos** | Selecione quais dias da semana o salão funciona |
| **Antecedência de cancelamento** | Prazo mínimo para cliente cancelar (em horas) |
| **Imagens do site** | Troque o banner e fotos das seções de serviço |

---

## Credenciais de Acesso

| Tipo | E-mail | Senha |
|------|--------|-------|
| Admin | admin@danydiniz.com | 123456 |
| Profissional | dani@danydiniz.com | 123456 |

> ⚠️ **Troque as senhas após o primeiro acesso!**

---

## Tecnologias

- **Site**: Next.js (React) — rápido, otimizado para Google
- **Banco de dados**: Neon (PostgreSQL na nuvem)
- **Hospedagem**: Vercel — deploy automático a cada atualização
- **E-mails**: Resend — lembretes automáticos
- **WhatsApp**: Evolution API (opcional) — lembretes via WhatsApp
- **PWA**: O site funciona como app no celular (pode "instalar" no Android/iPhone)

---

## Fluxo Resumido

```
Cliente acessa o site
    → Cria conta (1 minuto)
    → Escolhe serviço + profissional + horário
    → Confirma agendamento
    → Recebe lembrete 24h antes (e-mail + WhatsApp)
    → Recebe lembrete 2h antes
    → Comparece ao salão
    → Admin marca como "concluído"
```

---

## Suporte

Qualquer dúvida ou alteração necessária, entre em contato com a desenvolvedora.
