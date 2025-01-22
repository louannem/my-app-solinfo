import style from "@/app/login/login.module.css";
import UiLink from "@/components/elements/ui-link";
import LoginForm from "@/components/patterns/login-form";

export const metadata = {
	title: "Login",
};

export default function Login () {
    const homeLink = {
        label: 'Home',
        url: '/',
        type: 'secondary'
    };

    return (
			<main className={style.login}>
				<h1>Login</h1>
				<LoginForm />
				<UiLink {...homeLink} />
			</main>
    )
}