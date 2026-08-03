# Tornearia Barbosa — site institucional

Site institucional estático em HTML, CSS e JavaScript.

## Estrutura

```text
index.html
robots.txt
sitemap.xml
vercel.json
assets/
  css/style.css
  js/script.js
  img/  ← copie a pasta de imagens do projeto original
```

## Imagens esperadas

- `assets/img/logotorneariabarbosa.png`
- `assets/img/torno.jpg`
- `assets/img/hero.jpg` (opcional)
- `assets/img/andreeadelmo.png`
- `assets/img/galeria (1).jpeg` até `galeria (6).jpeg`

## Publicar no GitHub pelo terminal

Crie no GitHub um repositório vazio chamado `tornearia-barbosa`, sem README, licença ou `.gitignore`. Depois, dentro da pasta do projeto:

```bash
git init
git add .
git commit -m "Publica site da Tornearia Barbosa"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/tornearia-barbosa.git
git push -u origin main
```

## Publicar no Vercel

1. No painel do Vercel, escolha **Add New → Project**.
2. Importe o repositório `tornearia-barbosa`.
3. Use **Framework Preset: Other**.
4. Mantenha a pasta raiz como `./`.
5. Não informe Build Command nem Output Directory.
6. Defina o nome do projeto como `tornearia-barbosa` e clique em **Deploy**.

## URL de SEO

Os arquivos estão configurados para:

```text
https://tornearia-barbosa.vercel.app/
```

Se o Vercel gerar outro endereço, substitua a URL em:

- `index.html`
- `robots.txt`
- `sitemap.xml`
