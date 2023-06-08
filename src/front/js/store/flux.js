const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: "",
			user: {},
			apiUrl: process.env.BACKEND_URL
		},
		actions: {
			logIn: async (email, password) => {
				const store = getStore();
				const response = await fetch(
					store.apiUrl + "/api/log-in", {
					method: "POST",
					body: JSON.stringify({
						email,
						password
					}),
					headers: {
						"Content-Type": "application/json"
					}
				}
				);
				const body = await response.json();
				if (response.ok) {
					setStore({
						token: body.token,
						user: body.user
					});
					localStorage.setItem("token", JSON.stringify(body.token));
					localStorage.setItem("user", JSON.stringify(body.user));
					return;
				}
				console.log("log in unsuccessful");
			},
			checkUser: () => {
				if (localStorage.getItem("token")) {
					setStore({
						token: JSON.parse(localStorage.getItem("token")),
						user: JSON.parse(localStorage.getItem("user"))
					});
				}
			},
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			fetchPosts: async () => {
				const store = getStore();
				try {
					const response = await fetch(store.apiUrl + "/api/posts");
					if (!response.ok) {
						throw new Error("Failed to fetch posts");
					}
					const data = await response.json();
					setStore({
						posts: data
					});
					return data;
				} catch (error) {
					console.log(error);
				}
			},
			createPostImage: async (formData) => {
				const store = getStore();
				try {
					const response = await fetch(store.apiUrl + "/api/post-images", {
						method: "POST",
						headers: {
							"Authorization": `Bearer ${store.token}`
						},
						body: formData
					});
					const body = await response.json();
					if (!response.ok) {
						throw new Error(`failed to save post image: ${body}`);
					}
					return;
				} catch (error) {
					console.log(error);
				}
			}
		}
	};
};

export default getState;
