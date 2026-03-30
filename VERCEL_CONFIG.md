# 🚀 Deployment Configuration Guide

## Vercel Environment Variables

Para que o site funcione completamente no Vercel, configure as seguintes variáveis de ambiente:

### 1. **VITE_SITE_URL** (Obrigatório)
- **Valor:** `https://website-tourism-ten.vercel.app` (ou seu domínio customizado)
- **Descrição:** URL base do seu site, usada para links canônicos e sitemap

### 2. **VITE_CALENDLY_URL** (Importante)
- **Valor:** `https://calendly.com/seu-usuario/atendimento`
- **Descrição:** URL do seu calendário Calendly para agendamento de chamadas
- **Como obter:** 
  - Acesse https://calendly.com
  - Faça login na sua conta
  - Copie a URL do seu event/booking link
  - Se não tiver, crie um novo event em Calendly

### 3. **VITE_PEXELS_API_KEY** (Opcional)
- **Valor:** Sua chave API do Pexels (https://www.pexels.com/api/)
- **Descrição:** Para buscar imagens automáticas de tours
- **Se não configurar:** O site usará imagens de fallback (Picsum)

## Como Configurar no Vercel

1. **Acesse:** https://vercel.com/dashboard
2. **Selecione seu projeto:** `website-tourism`
3. **Vá em:** Settings → Environment Variables
4. **Adicione para cada ambiente** (Preview, Production):
   - `VITE_SITE_URL`
   - `VITE_CALENDLY_URL`
   - `VITE_PEXELS_API_KEY` (opcional)

5. **Salve** e vá para **Deployments**
6. **Redeploy** o último commit (será redeployado com as variáveis)
7. **Aguarde** 2-3 minutos

## Status do Deploy

- ✅ Páginas internas (routing)
- ⏳ Vídeo da Hero Section (com fallback de gradient)
- ⏳ Calendly (aguardando configuração de `VITE_CALENDLY_URL`)

---

### Próximos Passos
1. Configure `VITE_CALENDLY_URL` no Vercel
2. Faça redeploy
3. Hard refresh no navegador (`Ctrl+Shift+R`)
4. Teste o botão de agendamento
