import { Animais } from "./animais.js";

class RecintosZoo extends Animais {
  constructor(recintos) {
    super();
    this.erro = "";
    this.recintosViaveis = [];
    //Ideal que a informação de recintos existentes venha como parâmetro no construtor
    this.recintosExistentes = [
      {
        numero: 1,
        biomas: ["savana"],
        tamanhoTotal: 10,
        animaisExistentes: [{ especie: "MACACO", quantidade: 3 }],
      },
      {
        numero: 2,
        biomas: ["floresta"],
        tamanhoTotal: 5,
        animaisExistentes: [],
      },
      {
        numero: 3,
        biomas: ["savana", "rio"],
        tamanhoTotal: 7,
        animaisExistentes: [{ especie: "GAZELA", quantidade: 1 }],
      },
      { numero: 4, biomas: ["rio"], tamanhoTotal: 8, animaisExistentes: [] },
      {
        numero: 5,
        biomas: ["savana"],
        tamanhoTotal: 9,
        animaisExistentes: [{ especie: "LEAO", quantidade: 1 }],
      },
    ];
    if (recintos) {
      this.recintosExistentes.push(...recintos);
    }
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
  }
}

export { RecintosZoo as RecintosZoo };

const resultado = new RecintosZoo().analisaRecintos("Leao", 1);
