var neural = require('./neural');

// classificando uma ave
// bico, penas, asas, voa, mama, poe ovo
var dados_treino = [
  {
    // pombo
    input: [1,1,1,1,0,1],
    output: true
  },
  {
    // galinha
    input: [1,1,1,0,0,1],
    output: true
  },
  {
    // cachorro
    input: [0,0,0,0,1,0],
    output: false
  },
  {
    // ornitorrinco
    input: [1,1,0,0,1,1],
    output: false
  },
  {
    // tartaruga
    input: [1,0,0,0,0,1],
    output: false
  },
  {
    // aviao
    input: [1,0,1,1,0,0],
    output: false
  }
];

// camadas iniciais
var a = new neural.Neuronio();
var b = new neural.Neuronio();
var c = new neural.Neuronio();
neural.debug = true;
var neuronios_treinados = neural.treinar([a,b,c], dados_treino, 10, 30);

console.log(neural.executar(neuronios_treinados, [0,0,0,0,1,0]) ? 'ave' : 'nao é ave');
