import fs from 'fs/promises';

export default async function Access(){
  await fs.appendFile('access.txt', `${Date.now()}-`, 'utf8');

  const data = await fs.readFile('access.txt', 'utf8');
  return (
    <>
      {data}
    </>
  )
}