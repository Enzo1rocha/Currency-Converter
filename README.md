# Conversor de Moedas 💰

Um aplicativo web simples para conversão de moedas, utilizando a API de cotações da [AwesomeAPI](https://docs.awesomeapi.com.br/api-de-moedas). O projeto permite que você insira um valor e selecione as moedas de origem e destino para realizar a conversão.

## Funcionalidades ✨

- **Conversão de moedas**: Converta valores entre diferentes moedas com base nas cotações em tempo real.
- **Selects dinâmicos**: O primeiro select (moeda de origem) só exibe moedas que possam ser convertidas para pelo menos uma moeda no segundo select (moeda de destino), garantindo combinações válidas da API [Combinações-AwesomeAPI](https://economia.awesomeapi.com.br/xml/available/uniq).
- **Validação de formulário**:
  - O input de valor é validado para garantir que seja maior que zero.
  - Caso o input esteja vazio ou inválido, as bordas ficam vermelhas e uma mensagem de aviso é exibida.
  - Ao focar no input, as mensagens de erro e a estilização são removidas.
- **Design responsivo**: Funciona bem em dispositivos móveis e desktops.

## Tecnologias utilizadas 🛠️

- **HTML**: Estrutura.
- **CSS**: Estilização.
- **JavaScript**: Lógica de integração com a API, manipulação dos dados e validações.
- **API AwesomeAPI**: Fornecimento das cotações de moedas em tempo real.

## Como usar 🚀

1. Acesse o aplicativo pelo GitHub Pages: [Acesse-Aqui](https://enzo1rocha.github.io/Currency-Converter/).
2. Insira o valor que deseja converter no campo de valor.
3. Selecione a moeda de origem no primeiro select.
4. Selecione a moeda de destino no segundo select.
5. Clique em "Converter" para ver o resultado.

## Pré-visualização 🖼️

![Pré-visualização](</readme-Img/Captura de tela 2025-02-05 205843.png>)

## Como executar localmente 💻

Se você quiser rodar o projeto na sua máquina, siga os passos abaixo:

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git

2. Rode o arquivo "index.html" com Live Server