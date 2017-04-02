var neural = require('../lib/neural');

// classificando uma entrada como ave
// bico, olhos, penas, bipede, asas, voa
var dados_treino = [
  {
    // pombo
    input: [1, 1, 1, 1, 1, 1],
    output: true
  },
  {
    // galinha
    input: [1, 1, 1, 1, 1, 0],
    output: true
  },
  {
    // ornitorrinco
    input: [1, 1, 0, 0, 0, 0],
    output: false
  }
];

// habilitando o modo debug para ver os logs
neural.debug = true;

// executando o treinamento e salvando os neuronios treinados em uma variavel
var neuronios_treinados = neural.treinar(dados_treino, 3, 10, 30);

// testando ornitorrinco com os neuronios ja treinados
console.log(neural.executar(neuronios_treinados, [1, 1, 0, 0, 0, 0]) ? 'ave' : 'nao é ave');
