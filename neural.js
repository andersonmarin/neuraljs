/**
* @module neuraljs
*/

module.exports = function () {

  var exports = {
    Neuronio: Neuronio,
    executar: executar,
    treinar: treinar,
    debug: false
  };

  /**
  * Cria um novo neuronio
  *
  * @returns {Neuronio}
  */
  function Neuronio() {
    var pesos = [];

    this.pesos = function () {
      return pesos;
    };

    /**
    * Recebe as entradas, multiplica pelos pesos e calcula a saida
    *
    * @param   {Array} input   array de inteiros binario
    * @returns {Boolean} saida saida calculada com base nos inputs e pesos
    */
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

    /**
    * Redefine os valores dos pesos aleatoriamente entre 1 ou -1
    */
    this.reload = function () {
      for (var p = 0; p < pesos.length; p++) {
        pesos[p] = Math.random() > 0.5 ? 1 : -1;
      }
    };
  }

  /**
  * Calcula os pesos comparando o resultado obtido com o esperado
  *
  * @param  {Array} inputNeuros     array de neuronios
  * @param  {Array} dados           array de dados para treino
  * @param  {Integer} profundidade  quantidade de camadas intermediarias
  * @param  {Integer} quantidade    quantidade de neuronios por camada intermediaria
  * @return {Array} neuronios       array de neuronios treinados
  */
  function treinar(inputNeuros, dados, profundidade, quantidade) {
    var time = new Date();
    var neuronios = gerarNeuronios(profundidade || 0, quantidade || 0);
    neuronios.unshift(inputNeuros);
    neuronios.push(new Neuronio());
    for (var i = 0; i < dados.length; i++) {
      if(executar(neuronios, dados[i].input) == dados[i].output) {
        if(exports.debug) console.log('dados[' + i + ']' + ' output ' + dados[i].output);
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
        if(exports.debug) console.log('dados[' + i + ']' + ' reload pesos\n');
        i = -1;
      }
    }
    if(exports.debug) console.log('\ntreinado em ' + (((new Date()).getTime() - time.getTime()) / 1000) + 's');
    return neuronios;
  }

  /**
  * Gera as camadas intermediarias de neuronios
  *
  * @param  {Integer} profundidade  quantidade de camadas intermediarias
  * @param  {Integer} quantidade    quantidade de neuronios por camada intermediaria
  * @return {Array} neuronios       array de neuronios
  */
  function gerarNeuronios(profundidade, quantidade) {
    var neuronios = [];
    for (var p = 0; p < profundidade; p++) {
      var nr = [];
      for (var q = 0; q < quantidade; q++) {
        nr.push(new Neuronio());
      }
      neuronios.push(nr);
    }
    return neuronios;
  }

  /**
  * Executa todos os neuronios em todas as camadas
  *
  * @param  {Array} neuronios  array de neuronios treinados ou não
  * @param  {Array} input      array de inteiros
  * @return {Boolean} saida    saida da rede neural
  */
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
