# Code Staff — iape.tech

Página pública do coletivo Code Staff, primeira geração **CS_0**. Site estático sem dependências de produção ou etapa de build, publicado no GitHub Pages a partir de `main` e da raiz `/`. O arquivo `CNAME` mantém o domínio `iape.tech`.

## Desenvolvimento

```sh
python3 -m http.server 4187 --bind 127.0.0.1
node --test tests/*.test.mjs
node --check main.js
node --check portraits.js
```

- `index.html`: conteúdo, projetos expansíveis e perfis.
- `styles.css`: identidade, layout responsivo e movimento reduzido.
- `main.js`: menu móvel, seletor de efeitos e pausa persistida localmente.
- `portraits.js`: Canvas 2D; anima somente quando visível e durante interações.
- `effects-math.mjs`: progressos, deslocamentos e nomenclatura binária.
- `assets/cs0-portraits.webp`: retratos demonstrativos gerados, sem fotos reais de alunos.
- `assets/fonts/`: fontes hospedadas localmente com as respectivas licenças OFL.

## Atualizar a equipe

Os quatro perfis são fictícios e estão identificados no site como demonstração. Editar nomes, funções, bios e rótulos acessíveis na seção `#equipe` de `index.html`. Retratos compartilham uma imagem com quatro painéis verticais de igual largura; `data-portrait="0"` a `"3"` seleciona o painel. Substituir a imagem mantendo o mesmo arranjo, ou adaptar `Portrait.resize()` para arquivos individuais. Manter a mesma proporção de retratos para preservar a composição.

Para uma nova turma, atualizar os textos da geração ativa, a linha de gerações e os retratos. A sequência solicitada é `CS_0 → CS_01 → CS_10 → CS_11 → CS_100 → CS_101 → …`; a função `cohortName()` e seus testes documentam a convenção.

## Imagem demonstrativa

Criada com a ferramenta integrada ImageGen. Prompt: quatro jovens adultos brasileiros fictícios, retratos preto e branco em retícula de gibi antigo, recorte de papel amassado, fundo claro e painéis separados. O arquivo WebP foi codificado a partir da imagem gerada para reduzir a transferência. A imagem não representa alunos reais.

## Comportamento sem JavaScript

Conteúdo, projetos (`details/summary`), links e menu móvel permanecem disponíveis. O retrato é exibido como imagem de fundo. Controles que exigem JS são ocultados. O site respeita `prefers-reduced-motion` e permite pausar os efeitos no rodapé.
