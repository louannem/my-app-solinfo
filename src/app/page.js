import style from "@/style/home.module.css";
import HeroHeader from "@/components/patterns/hero-header/";
import UsersList from "@/components/patterns/users-list";

export const metadata = {
  title: 'Home',
}

export default function Home() {
  return (
    <main>
			<HeroHeader  />

      <section className={style.homeSection}>
        <h2>Liste des utilisateurs</h2>
        <UsersList />
      </section>        
    </main>
  );
}
