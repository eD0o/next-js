import Image from "next/image";

type Animal = {
  id: number;
  nome: string;
  descricao: string;
  imagem: string;
};

export default async function AnimalsPage() {
  const response = await fetch('https://api.origamid.online/animais');
  const animals = (await response.json()) as Animal[];

  return (
    <main>
      <h1>Animals</h1>
      <ul>
        {animals.map((animal) => (
          <li key={animal.id}>
            <h2>{animal.nome}</h2>
            <Image src={animal.imagem} width={2400} height={1600} alt={animal.descricao} />
          </li>
        ))}
      </ul>
    </main>
  );
}
