import { Animais } from "./animais.js";

class Recintos extends Animais {
  constructor(recintos) {
    super();
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
      console.log("Recinto(s) adicionado(s) com sucesso");
    }
  }

  obterRecintoPorTipo(animal, quantidade) {
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
              const infosAnimal = Recintos.obterAnimal(especie);
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

  obterTamanhoRestanteRecinto(recinto, animal, quantidade) {
    let tamanhoRestante;

    console.log(`Recinto ${recinto.numero}: ${recinto.biomas}`);
    console.log(` > Tamanho total: ${recinto.tamanhoTotal}`);

    const tamanhoAnimalASerColocado = quantidade * animal.tamanho;
    console.log(` > Tamanho a ser ocupado: ${tamanhoAnimalASerColocado}`);

    if (recinto.animaisExistentes.length > 0) {
      const tamanhoOcupado = recinto.animaisExistentes.reduce((acc, animal) => {
        const infosAnimal = Recintos.obterAnimal(animal.especie);
        return acc + animal.quantidade * infosAnimal.tamanho;
      }, 0);
      console.log(` > Tamanho ocupado: ${tamanhoOcupado}`);

      const recintoTemOutraEspecie = recinto.animaisExistentes.some(
        ({ especie }) => especie !== animal.especie
      );
      const tamanhoAdicional = recintoTemOutraEspecie ? 1 : 0;
      console.log(
        ` > Recinto tem outra espécie: ${
          recintoTemOutraEspecie ? "Sim (+1 espaço)" : "Não"
        }`
      );

      tamanhoRestante =
        recinto.tamanhoTotal -
        tamanhoOcupado -
        tamanhoAdicional -
        tamanhoAnimalASerColocado;
      console.log(` > Tamanho restante: ${tamanhoRestante}`);

      return tamanhoRestante;
    }

    tamanhoRestante = recinto.tamanhoTotal - tamanhoAnimalASerColocado;
    console.log(` > Tamanho restante: ${tamanhoRestante}`);
    return tamanhoRestante;
  }

  obterRecintosViaveis(recintos, animal, quantidade) {
    const recintosViaveis = recintos.reduce((arr, recinto) => {
      const tamanhoRestante = this.obterTamanhoRestanteRecinto(
        recinto,
        animal,
        quantidade
      );
      if (tamanhoRestante >= 0) {
        arr.push(
          `Recinto ${recinto.numero} (espaço livre: ${tamanhoRestante} total: ${recinto.tamanhoTotal})`
        );
      }
      return arr;
    }, []);

    return recintosViaveis;
  }
}

export { Recintos as Recintos };
