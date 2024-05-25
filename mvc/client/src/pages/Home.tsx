import { FC, useEffect } from "react";
import { Navigation } from "../components/Navigation";
import { QuizForm } from "../components/QuizForm";
import { useAuth0 } from "@auth0/auth0-react";

export const Home: FC = () => {
	const { user } = useAuth0();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await fetch(
					`http://localhost:3001/user?email=${user?.email}`
				);

				const a = await result.json();

				console.log(a);
			} catch (error) {
				if (user) {
					fetch("http://localhost:3001/user", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ email: user.email }),
					});
				}
			}
		};

		if (user) {
			fetchData();
		}
	}, [user]);

	return (
		<>
			<Navigation />
			<QuizForm></QuizForm>
		</>
	);
};
