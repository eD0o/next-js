import Link from 'next/link';

export default function Menu() {
  return (
    <>
      <ul className="menu">
        <li>
          <Link href={'/'}>Home</Link>
        </li>
        <li>
          <Link href={'/courses'}>Courses</Link>
        </li>
      </ul>
    </>
  );
}
