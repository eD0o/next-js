import { cookies } from 'next/headers';
import Link from 'next/link';

type Account = {
  autorizado: boolean;
  usuario: string;
};

export default async function Menu() {
  let account: Account = {
    autorizado: false,
    usuario: '',
  };
  const token = cookies().get('token')?.value;

  const response = await fetch('https://api.origamid.online/conta/perfil', {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }); 
  

  if (response.ok) {
    account = (await response.json()) as Account;
  }

  return (
    <>
      <ul className="menu">
        <li>
          <Link href={'/'}>Home</Link>
        </li>
      </ul>
    </>
  );
}
