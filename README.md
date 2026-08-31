# Teste Econverse — Vaga Desenvolvedor Front-End

Implementação da home da Econverse em React e TypeScript, com a vitrine de
produtos consumindo o JSON da API e o modal de detalhes do produto.

## Requisitos

- Node 20.19+ ou 22.12+ (exigência do Vite 8)
- npm 10+

## Como rodar

```bash
npm install     # instala as dependências
npm run dev     # ambiente de desenvolvimento em http://localhost:5173
npm run build   # verifica os tipos e gera a build em dist/
npm run preview # serve a build gerada, para conferir o resultado final
npm run lint    # análise estática com oxlint
```

Não há testes automatizados no projeto — o enunciado não os pede, e preferi não
inflar a entrega com uma suíte simbólica.

## O que foi implementado

| Requisito | Situação |
|---|---|
| Página em React e TypeScript conforme o layout | Todas as seções, medida a medida contra o Figma |
| Vitrine consumindo o JSON de produtos | Os 10 produtos vêm da API em tempo de execução |
| Modal com as informações do produto clicado | Abre pelo botão Comprar de cada card |
| Pré-processador Sass | CSS Modules com Sass (`.module.scss`) |
| Layout pixel a pixel | Inclusive os valores fracionários do arquivo, sem arredondar |
| Sem bibliotecas de UI | Nenhuma dependência adicionada ao projeto inicial |
| SEO | `lang`, `title`, `description`, favicon e Open Graph |
| HTML semântico | Marcos de página, hierarquia de títulos e rótulos acessíveis |

Além do pedido, a página é responsiva e todos os elementos interativos têm
retorno visual ao passar o mouse.

## Estrutura

```
src/
  components/   um componente por seção da página
  styles/       módulos de estilo, variáveis, mixins e estilos globais
  data/         conteúdo fixo do layout (menu, categorias, rodapé…)
  types/        formatos de dados usados por mais de um arquivo
  hooks/        busca dos produtos na API
  utils/        formatação de moeda
  assets/       imagens e ícones exportados do Figma
```

A regra de divisão é simples: componente desenha, `data` guarda o que ele
percorre, `types` descreve o formato, `hooks` traz o que vem de fora.

## Decisões técnicas

**Nenhuma biblioteca além do React.** Em cada ponto onde normalmente entraria
uma dependência, entrou um recurso do próprio navegador. O modal é um elemento
com estado, fechamento por `Esc` e trava de rolagem. O preço é formatado por
`Intl.NumberFormat`, que já conhece a vírgula decimal e o separador de milhar
do português. A troca de cor dos ícones de categoria usa `mask` em CSS —
necessário porque os arquivos exportados do Figma são imagens, e imagem não se
pinta por folha de estilo.

**Os produtos são buscados uma única vez.** O `useProducts` é chamado no `App`
e o resultado desce por props para as três vitrines. Se cada vitrine tivesse o
próprio hook, seriam três requisições para o mesmo JSON.

**Quem rola o carrossel é o navegador.** A faixa de cards é um elemento com
rolagem própria e `scroll-snap` para encaixar o card na parada; as setas apenas
pedem essa rolagem. É por isso que arrastar com o dedo funciona no celular sem
uma linha de código de toque.

E ele mede em vez de assumir: quantos cards cabem e quanto anda cada clique
vêm da largura aferida em tela, não de constantes. É o que permite quatro cards
no desktop e um no celular com a mesma lógica.

**CSS Modules.** As classes são escopadas automaticamente, o que dispensa
convenções de nomenclatura para evitar colisão.

## O proxy da API, e por que ele existe

O endpoint de produtos da Econverse **não envia o cabeçalho
`Access-Control-Allow-Origin`**. Sem ele, o navegador bloqueia a leitura da
resposta a partir de outra origem — a página roda em `localhost:5173` e a API
em `app.econverse.com.br`.

A solução foi o servidor do Vite buscar o JSON e repassar para a página, o que
torna a requisição de mesma origem. A configuração está no `vite.config.ts`, e
a aplicação pede `/api/lista-produtos/produtos.json`.

Isso vale em `npm run dev` e `npm run preview`. Para a publicação na Vercel, o
`vercel.json` declara a mesma reescrita, que a plataforma resolve no servidor
dela — sem isso, a vitrine carregaria em desenvolvimento e falharia no ar.

## Limitações e decisões conscientes

**Os preços derivados.** O JSON traz um único campo `price`, mas o layout
mostra três linhas: preço riscado, preço atual e parcelamento. O preço atual
vem da API; o riscado e o parcelamento são calculados a partir dele, com as
constantes nomeadas e comentadas no topo do `ProductCard`. Nenhum valor é
inventado sem estar explícito no código.

**"Veja mais detalhes do produto" não leva a lugar nenhum.** O JSON não traz
URL de produto.

**As abas da vitrine e os cards de categoria não filtram.** O Figma desenha um
único cenário — "Celular" e "Tecnologia" selecionados — e não existe no JSON
informação de categoria para filtrar. Foram implementados como o layout os
mostra, sem inventar comportamento.

**O modal abre pelo botão Comprar**, não por qualquer ponto do card. Como o
card inteiro seria um elemento clicável, um botão dentro dele resultaria em
HTML inválido.

**O responsivo não vem do layout.** O Figma só existe em 1440px, então tudo
abaixo disso é decisão minha. Escolhi os pontos de quebra por onde as medidas
param de caber, seguindo a regra de nunca esconder conteúdo nem gerar rolagem
horizontal na página.

**Falta o `og:image`.** Ele exige URL absoluta, que só existe depois de
publicar o projeto.

**Dois detalhes do Figma foram reproduzidos apesar de parecerem erro:** o botão
do banner principal fica 7px à direita da coluna de texto, e a coluna "Termos"
do rodapé usa Poppins enquanto as outras duas usam Work Sans. Ambos estão
comentados no código.
