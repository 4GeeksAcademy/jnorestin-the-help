const getState = ({ getStore, getActions, setStore }) => {
	return {
	  store: {
		token: "",
		user: {},
		apiUrl: process.env.BACKEND_URL,
		posts: [],
		userPosts: []
	  },
	  actions: {
		logIn: async (email, password) => {
		  const store = getStore();
		  const response = await fetch(store.apiUrl + "/api/log-in", {
			method: "POST",
			body: JSON.stringify({
			  email,
			  password
			}),
			headers: {
			  "Content-Type": "application/json"
			}
		  });
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
  
		logout: () => {
		  setStore({
			token: "",
			user: {}
		  });
		  localStorage.removeItem("token");
		  localStorage.removeItem("user");
		},
  
		fetchUserPosts: async () => {
		  const store = getStore();
		  let token = store.token;
		  const opts = {
			headers: {
			  Authorization: "Bearer " + token
			}
		  };
		  try {
			const response = await fetch(store.apiUrl + "/api/userposts", opts);
			if (!response.ok) {
			  throw new Error("Fail to fetch posts");
			}
			const data = await response.json();
			console.log(data);
			setStore({
			  userPosts: data
			});
			return data;
		  } catch (error) {
			console.log(error);
		  }
		},
  
		fetchPosts: async () => {
		  const store = getStore();
		  try {
			const response = await fetch(store.apiUrl + "/api/posts");
			if (!response.ok) {
			  throw new Error("Failed to fetch posts");
			}
			const data = await response.json();
			console.log(data);
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
				Authorization: `Bearer ${store.token}`
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
  
