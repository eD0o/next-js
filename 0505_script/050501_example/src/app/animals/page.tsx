import Image from 'next/image';
import styles from './animals.module.scss';

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
      <Image src={'/images/dogs.svg'} alt="Dogs Brand" width={28} height={22} />
      <Image
        src={'/images/login.jpg'}
        alt="Dogs Brand"
        width={1200}
        height={1600}
        sizes="100vw"
      />
      <h1>Animals</h1>
      <ul className={styles.animals}>
        {animals.map((animal, i) => (
          <li key={animal.id}>
            <h2>{animal.nome}</h2>
            <Image
              src={animal.imagem}
              width={2400}
              height={1600}
              alt={animal.descricao}
              quality={75} // default
              sizes="(max-width: 600px) 100vw, 50vw"
              priority={i < 2}
            />
          </li>
        ))}
      </ul>
    </main>
  );
}
