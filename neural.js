module.exports = function () {

  var exports = {
    Neuronio: Neuronio,
    executar: executar,
    treinar: treinar,
    debug: false
  };

  // neuronio
  function Neuronio() {
    var pesos = [];

    this.pesos = function () {
      return pesos;
    };

    // recebe as entradas, multiplica pelos pesos e calcula a saida
    this.run = function (input) {
      if(pesos.length != input.length) {
        pesos = new Array(input.length);
      }
      var o = 0;
      input.forEach(function (i, index) {
        o += i * pesos[index];
      });
      return o > 0;
    }

    // recalcula os pesos
    this.reload = function () {
      for (var p = 0; p < pesos.length; p++) {
        pesos[p] = Math.random() > 0.5 ? 1 : -1;
      }
    };
  }

  // calcula os pesos comparando o resultado obtido com o esperado
  function treinar(inputNeuros, dados, profundidade, quantidade) {
    var time = new Date();
    var neuronios = geraNeuro(profundidade || 0, quantidade || 0);
    neuronios.unshift(inputNeuros);
    neuronios.push(new Neuronio());
    for (var i = 0; i < dados.length; i++) {
      if(executar(neuronios, dados[i].input) == dados[i].output) {
        if(exports.debug) console.log('dados[' + i + ']' + ' output = ' + dados[i].output);
      } else {
        neuronios.forEach(function (camada) {
          if(Array.isArray(camada)) {
            camada.forEach(function (n) {
              n.reload();
            });
          } else {
            camada.reload();
          }
        });
        if(exports.debug) console.log('dados[' + i + ']' + ' reload pesos');
        i = -1;
      }
    }
    if(exports.debug) console.log('Treinado em ' + (((new Date()).getTime() - time.getTime()) / 1000) + 's');
    return neuronios;
  }

  // gera as camadas intermediarias
  function geraNeuro(prof, tam) {
    var neuronios = [];
    for (var p = 0; p < prof; p++) {
      var nr = [];
      for (var t = 0; t < tam; t++) {
        nr.push(new Neuronio());
      }
      neuronios.push(nr);
    }
    return neuronios;
  }

  // executa todos os neuronios das camadas iniciais -> intermediarias -> saida
  function executar(neuronios, input) {
    var output = [input];
    var result = null;
    neuronios.forEach(function (camada, i) {
      if(Array.isArray(camada)) {
        output.push([]);
        camada.forEach(function (n) {
          output[i + 1].push(n.run(output[i]));
        });
      } else {
        result = camada.run(output[i]);
      }
    });
    return result;
  }

  return exports;

}();
