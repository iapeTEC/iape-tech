# Code Staff Implementation Plan

> **For agentic workers:** Execute inline with superpowers:executing-plans, then request one whole-change review.

**Goal:** Publicar a nova identidade Code Staff CS_0 em iape.tech.
**Architecture:** Site estático sem build; HTML semântico e CSS responsivo, Canvas 2D para efeitos de retratos; módulos JS pequenos para interações e matemática dos efeitos.
**Tech Stack:** HTML, CSS, JavaScript ESM, node:test, GitHub Pages.
**Spec:** docs/superpowers/specs/2026-11-02-codestaff-design.md

## Global Constraints
- Preservar CNAME iape.tech e sistemas em subdomínios.
- Paleta clara, preto, amarelo manteiga, verde e lilás suaves.
- CS_0 → CS_01 → CS_10 → CS_11 → CS_100.
- Perfis e retratos fictícios identificados como demonstração.
- Conteúdo legível sem animação/JavaScript; movimento reduzido e pausa.

## Review Focus
- Mobile estreito sem overflow e navegação alcançável.
- Toque e teclado conseguem acionar efeitos e abrir projetos.
- Falha de imagem ou Canvas mantém conteúdo e alternativa visual.
- Pausa e prefers-reduced-motion impedem animações contínuas.
- Links de projetos não revelam dados privados nem atribuem autoria fictícia.

### Task 1: Conteúdo e identidade
- [x] Criar index.html, styles.css, assets/favicon.svg, imagens fictícias e fontes locais.
- [x] Preservar CNAME; conteúdo e detalhes nativos de projetos e perfis.
- [x] Verificar HTML, recursos locais e layout responsivo.

### Task 2: Efeitos e interação
- [x] Escrever testes de sequência binária, progresso limitado, partículas determinísticas e offsets de glitch.
- [x] Rodar node --test tests/*.test.mjs e observar falhas antes da implementação.
- [x] Implementar effects-math.mjs, portraits.js e main.js.
- [x] Rodar testes e node --check para scripts.
- [x] Revisar navegação, detalhes e movimento reduzido no código; navegador indisponível, limite registrado em docs/VERIFICATION.md.

### Task 3: Revisão e publicação
- [x] Revisar toda a alteração com revisor independente e corrigir problemas importantes.
- [x] Verificar recursos e testes finais, commit, push para main autorizado pelo pedido de substituir o site.
- [ ] Acompanhar GitHub Pages e verificar que iape.tech serve a nova identidade.
