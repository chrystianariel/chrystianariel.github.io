# Portfólio Chrys — tema Gato Preto

React + Vite + TypeScript, animações com GSAP (+ ScrollTrigger) e smooth scroll com Lenis.

## Rodar

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # gera /dist para publicar
```

## Onde mexer

| O quê | Arquivo |
| --- | --- |
| Textos em português / inglês | `src/content/pt.ts` e `src/content/en.ts` |
| Ordem, cores e imagens dos projetos | `src/content/projects.ts` |
| Cores, fontes e espaçamentos | `src/styles/tokens.css` |
| Gato (olhos, piscar, rabo, orelha) | `src/components/BlackCat.tsx` |
| Cursor custom | `src/components/Cursor.tsx` |
| Páginas | `src/pages/Home.tsx`, `CaseStudy.tsx`, `About.tsx` |

## Adicionar imagens (ex.: TRIS)

1. Exporte as telas do Figma em PNG para a pasta `D:\Portfolio Update`.
2. Adicione cada arquivo na lista de `scripts/optimize-images.mjs`.
3. Rode `npm run images` (gera WebP otimizado em `public/images`).
4. Preencha `cover` e `gallery` do projeto em `src/content/projects.ts`.

## Publicar (GitHub Pages)

O site fica em https://chrystianariel.github.io/ e o repositório tem dois branches:

| Branch | Conteúdo |
| --- | --- |
| `source` | este código — é aqui que você edita e faz commit |
| `main` | o site pronto (gerado), que o GitHub Pages publica. Não edite à mão |

Para publicar uma alteração:

```bash
git add . && git commit -m "sua mensagem" && git push   # salva o código no branch source
npm run deploy                                            # gera o build e atualiza o branch main
```

O site atualiza em 1–2 minutos. O `npm run deploy` cria `404.html` (para as rotas como `/work/conemo` funcionarem ao abrir direto) e `.nojekyll`.
