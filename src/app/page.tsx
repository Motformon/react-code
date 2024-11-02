import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol>
          <li>
            <Link className={styles.link} href={'/table'}>Example React-Table</Link>
          </li>
          {/*<li>Save and see your changes instantly.</li>*/}
        </ol>
      </main>
    </div>
  );
}
