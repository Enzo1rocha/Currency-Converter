const fromSelect = window.document.getElementById('from-select')
const toSelect = window.document.getElementById('to-select')
const getExchangeRateBTN = window.document.getElementById('submit-button')
const divValueRequested = window.document.getElementById('request-values-api-content')
const printValue = window.document.getElementById('values-requested')
const inputValue = window.document.getElementById('input-value')
const p_Alert = window.document.getElementById('alert-p')
const title = window.document.getElementById('h1-a')

// funções

async function getCombinatios() {
    let resp = await fetch('json/combinações.json')
    let data = await resp.json()
    return data
}

 async function getMoedasNameToSelects() {
    resp = await fetch('json/nomesMoedas.json')
    combinacoes = await getCombinatios();

    if (resp.status == 200) {
        let data = await resp.json();
        for (let chave in data) { 

            if (chave == 'USD') {
                let option = document.createElement('option')
                    option.dataset.siglaMoeda = `${chave}`
                    option.textContent = `${data[chave]}`
                    fromSelect.appendChild(option)  

                    for (let combinacao in combinacoes) {
                
                        if (combinacao.startsWith('USD'+'-')) {
                            const moedaDestino = combinacao.split('-')[1];
                            if (data[moedaDestino]) {
                                let option = document.createElement('option')
                                option.dataset.siglaMoeda = moedaDestino;
                                option.textContent = data[moedaDestino];
                                toSelect.appendChild(option)
                            }
                        }
                    }
            } else {

                const temCombinacoes = Object.keys(combinacoes).some(combinacao => combinacao.startsWith(chave + '-'));

                if (temCombinacoes) {
                    let option = document.createElement('option')
                    option.dataset.siglaMoeda = `${chave}`
                    option.textContent = `${data[chave]}`
                    fromSelect.appendChild(option)
                }
            }
        }
        fromSelect.addEventListener('change', (event) => {
            const selectedOption = event.target.options[event.target.selectedIndex];
            const chaveAcessada = selectedOption.dataset.siglaMoeda;
            
            toSelect.innerHTML = ''

            for (let combinacao in combinacoes) {
                
                if (combinacao.startsWith(chaveAcessada+'-')) {
                    const moedaDestino = combinacao.split('-')[1];
                    if (data[moedaDestino]) {
                        let option = document.createElement('option')
                        option.dataset.siglaMoeda = moedaDestino;
                        option.textContent = data[moedaDestino];
                        toSelect.appendChild(option)
                    }
                }
            }
        })
    } else {
        console.log('Error 404');   
    }
}
 
async function performConversion(url, API_KEY) {
    const resp = await fetch(url);
    
    if (resp.status == 200) {
        const data = await resp.json();
        return parseFloat(data[API_KEY].high);
    } else {
        alert("Servidor Não conseguiu converter as moedas");
    }
}

function alertInputValue() {
    inputValue.style.border = '1px solid red'
    inputValue.style.boxShadow = '0px 0px 3px rgba(255,0,0,0.7)'
    p_Alert.style.display = 'block'

    inputValue.addEventListener('focus', () => {
        normalInputValue();
    })

}

function normalInputValue() {
    inputValue.style.border = 'none'
    inputValue.style.boxShadow = '0px 0px 3px rgba(0,0,0,0.7)'
    p_Alert.style.display = 'none'
}

// Eventos

document.addEventListener('DOMContentLoaded', () => {
    getMoedasNameToSelects();
});

title.addEventListener('click', (e) => {
    window.location.reload();
})

getExchangeRateBTN.addEventListener('click', async (e) => {
    if (inputValue.value && !(inputValue.value == 0)) {
        e.preventDefault();
        normalInputValue();
        inputValue.id = 'input-value'
        let moeda_from = fromSelect.options[fromSelect.selectedIndex];
        let moeda_to = toSelect.options[toSelect.selectedIndex];
        
        moeda_from = moeda_from.dataset.siglaMoeda;
        moeda_to = moeda_to.dataset.siglaMoeda;

        const value_for_calculation = await performConversion(
            `https://economia.awesomeapi.com.br/last/${moeda_from}-${moeda_to}`,
            `${moeda_from}${moeda_to}`
        );

        divValueRequested.style.display = 'block';

        let requestedValue = parseFloat(inputValue.value);
        
        if (isNaN(requestedValue) || isNaN(value_for_calculation)) {
            console.log("Valores inválidos para cálculo.");
            alert("Valores inválidos para cálculo.");
            return;
        }

        let value = (requestedValue * value_for_calculation);

        printValue.textContent = `${parseFloat(inputValue.value)} ${moeda_from} = ${value.toFixed(2)} ${moeda_to}`;
    } else {
        alertInputValue();
        divValueRequested.style.display = 'none';
        inputValue.id = 'input-value-danger'
        e.preventDefault();
    }
    });
    