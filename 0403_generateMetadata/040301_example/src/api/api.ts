type Course = {
  id: number;
  slug: string;
  nome: string;
  descricao: string;
  total_aulas: number;
  total_horas: number;
};

export type Class = {
  id: number;
  slug: string;
  nome: string;
  descricao: string;
  curso_id: number;
  tempo: number;
  ordem: number;
};

export async function getCourses() {
  const response = await fetch('https://api.origamid.online/cursos');
  return (await response.json()) as Course[];
}

export async function getCourse(course: string) {
  const response = await fetch(`https://api.origamid.online/cursos/${course}`);
  return (await response.json()) as Course & {
    aulas: Class[];
  };
}

export async function getClass(course: string, classCourse: string) {
  const response = await fetch(
    `https://api.origamid.online/cursos/${course}/${classCourse}`,
  );
  return (await response.json()) as Class;
}
