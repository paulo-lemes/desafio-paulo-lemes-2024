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

    const recintos = this.#obterRecintoPorTipo(animal, quantidade);

    if (recintos.length === 0) {
      this.erro = "Não há recinto viável";
      return { erro: this.erro };
    }
  }

  #obterRecintoPorTipo(animal, quantidade) {
    const recinto = this.recintosExistentes.filter((recinto) => {
      const filtroBioma = recinto.biomas.some((bioma) =>
        animal.biomas.includes(bioma)
      );

      const filtroAlimentacao =
        animal.alimentacao === "carnivoro"
          ? recinto.animaisExistentes.some(
              ({ especie }) => especie === animal.especie
            ) || recinto.animaisExistentes.length === 0
          : recinto.animaisExistentes.some(({ especie }) => {
              const infosAnimal = RecintosZoo.obterAnimal(especie);
              return infosAnimal.alimentacao !== "carnivoro";
            }) || recinto.animaisExistentes.length === 0;

      const filtroMacaco =
        animal.especie === "MACACO" && quantidade < 2
          ? recinto.animaisExistentes.length !== 0
          : true;

      const possuiHipopotamo = recinto.animaisExistentes.some(
        ({ especie }) => especie === "HIPOPOTAMO"
      );

      const filtroHipopotamo =
        animal.especie === "HIPOPOTAMO"
          ? !recinto.animaisExistentes.some(
              ({ especie }) => especie !== "HIPOPOTAMO"
            ) ||
            (recinto.biomas.includes("savana") &&
              recinto.biomas.includes("rio"))
          : !possuiHipopotamo ||
            (recinto.biomas.includes("savana") &&
              recinto.biomas.includes("rio"));

      return (
        filtroBioma && filtroAlimentacao && filtroMacaco && filtroHipopotamo
      );
    });
    console.log(`Recinto(s) obtido(s):`);
    recinto.forEach((recinto) => console.log(recinto));

    return recinto;
  }
}

export { RecintosZoo as RecintosZoo };

const resultado = new RecintosZoo().analisaRecintos("Leao", 1);
