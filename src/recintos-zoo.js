import { Recintos } from "./recintos.js";

class RecintosZoo extends Recintos {
  constructor(recintos) {
    super(recintos);
    this.erro = "";
    this.recintosViaveis = [];
  }

  analisaRecintos(especie, quantidade) {
    if (
      typeof especie !== "string" ||
      especie.length < 2 ||
      typeof quantidade !== "number"
    ) {
      this.erro = "Parâmetro(s) inválido(s)";
      return { erro: this.erro };
    }

    const nomeDaEspecieEmMaiusculo = especie.toUpperCase();
    const animal = RecintosZoo.obterAnimal(nomeDaEspecieEmMaiusculo);
    console.log(`Animal obtido:`, animal);

    if (!animal) {
      this.erro = "Animal inválido";
      return { erro: this.erro };
    }

    if (quantidade <= 0) {
      this.erro = "Quantidade inválida";
      return { erro: this.erro };
    }

    const recintos = this.obterRecintoPorTipo(animal, quantidade);

    if (recintos.length === 0) {
      this.erro = "Não há recinto viável";
      return { erro: this.erro };
    }

    const recintosViaveis = this.obterRecintosViaveis(
      recintos,
      animal,
      quantidade
    );

    if (recintosViaveis.length === 0) {
      this.erro = "Não há recinto viável";
      return { erro: this.erro };
    }

    this.recintosViaveis = recintosViaveis;
    return { recintosViaveis };
  }
}

export { RecintosZoo as RecintosZoo };

const resultado = new RecintosZoo();
// console.log(resultado.analisaRecintos("Leao", 1));
// console.log(resultado.analisaRecintos("CROCODILO", 1));
// console.log(resultado.analisaRecintos("ELEFANTE", 1));
console.log(resultado.analisaRecintos("HIPOPOTAMO", 1));
// console.clear();
// console.log(resultado.analisaRecintos("MACACO", 2));
