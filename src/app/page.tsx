import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {

  const links = [
    { href: '/table', title: 'Example React-Table' },
    // { href: '/dnd', title: 'Example DnD Lists' },
    // { href: '/calendar', title: 'Example Full-Calendar' },
    // { href: '/form', title: 'Example Form' },
  ];

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/react-code.svg"
          alt="react code logo"
          width={310}
          height={80}
          priority
        />
        <ol>
          {links.map(({ href, title }) => (
            <li key={href}>
              <Link className={styles.link} href={href}>{title}</Link>
            </li>
          ))}
        </ol>
      </main>
    </div>
  );
}
