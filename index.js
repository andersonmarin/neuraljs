var neural = require('./neural');

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

// neuronios da camada inicial
var a = new neural.Neuronio();
var b = new neural.Neuronio();
var c = new neural.Neuronio();

// habilitando o modo debug para ver os logs
neural.debug = true;

// executando o treinamento e salvando os neuronios treinados em uma variavel
var neuronios_treinados = neural.treinar([a,b,c], dados_treino, 10, 30);

// testando ornitorrinco com os neuronios ja treinados
console.log(neural.executar(neuronios_treinados, [1, 1, 0, 0, 0, 0]) ? 'ave' : 'nao é ave');
