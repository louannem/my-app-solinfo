import style from "@/style/home.module.css";
import HeroHeader from "@/components/patterns/hero-header/";
import UsersList from "@/components/patterns/users-list";

export const metadata = {
  title: 'Home',
}


export default async function Home() {
  
  return (
    <main>
			<HeroHeader  />

      <section className={style.homeSection}>
        <h2>Our last seen users</h2>
        <UsersList />
      </section>        
    </main>
  );
}
