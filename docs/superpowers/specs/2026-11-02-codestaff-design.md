# Code Staff / CS_0

Reformular a página pública iape.tech para apresentar o coletivo semestral de alunos Code Staff, começando em CS_0. A cada semestre, nova equipe: CS_0 → CS_01 → CS_10 → CS_11 → CS_100. Preservar o CNAME e os sistemas nos subdomínios.

## Direção escolhida a partir do briefing
Composição editorial clara inspirada na simplicidade da Ello: papel quase branco (#f7f7f2), tinta quase preta (#191919), amarelo manteiga (#f2edac), verde suave (#cfe9be), lilás (#dcd0ee). Títulos Space Grotesk e detalhes IBM Plex Mono hospedados localmente. Muito espaço em branco, linhas finas, cantos retos e retratos de gibi em retícula, recortados e amassados.

Alternativas consideradas: uma experiência WebGL integral daria efeitos imersivos, com maior custo de processamento; um site apenas CSS seria leve mas não permitiria a desintegração pedida. Implementar HTML/CSS e Canvas 2D: atende à apresentação e aos efeitos com recursos nativos e sem dependências em produção. Escolha técnica do implementador.

## Estrutura e comportamento
- Navegação para Projetos, Equipe, Manifesto e Gerações.
- Hero com marca CS_0, retratos e demonstração interativa dos três efeitos.
- Projetos reais do ecossistema: MyTask, Projetos IAPE, Speaking Arena e IAPE Notify; descrições verificadas em fontes existentes e detalhes expandíveis. Não atribuir a autoria dos sistemas à turma fictícia.
- Quatro perfis explicitamente fictícios com nomes, funções e bios demonstrativas, preparados para substituição.
- Materialização por linhas, dissolução em partículas e glitch de faixas; hover/foco, toque e botões explícitos para experimentar.
- Manifesto explica aprender construindo e passagem de conhecimento entre turmas.
- Linha de gerações com CS_0 ativa e próximas marcadas como futuras, sem datas inventadas.
- Movimento reduzido respeitado e botão para pausar efeitos, conteúdo visível sem JS, links e detalhes nativos acessíveis.

## Publicação e verificação
GitHub Pages existente, branch main, raiz /. Atualização no mesmo repositório iapeTEC/iape-tech; não criar hospedagem Sites paralela. Verificar sintaxe, arquivos locais, links internos, lógica dos efeitos e geração binária; realizar QA visual se navegador disponível; revisar antes do push e acompanhar build Pages.
