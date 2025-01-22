import RegisterForm from "@/components/patterns/register-form";

export const metadata = {
	title: "Register",
};

export default function Register() {

    return(
			<main>
				<h1>Join us !</h1>
				<RegisterForm />
			</main>
    )
}