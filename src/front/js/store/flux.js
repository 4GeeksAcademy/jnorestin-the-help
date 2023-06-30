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
		  try {
			const store = getStore();
			const response = await fetch(store.apiUrl + "/api/log-in", {
			  method: "POST",
			  body: JSON.stringify({
				email: email,
				password: password
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
			  return body;
			} else {
			  console.log("Log in unsuccessful");
			}
		  } catch (error) {
			console.log(error);
		  }
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
			user: {},
			posts: [],
			userPosts: []
		  });
		  localStorage.removeItem("token");
		  localStorage.removeItem("user");
		},
  
		fetchUserPosts: async () => {
		  try {
			const store = getStore();
			const token = store.token;
			const opts = {
			  headers: {
				Authorization: "Bearer " + token
			  }
			};
			const response = await fetch(store.apiUrl + "/api/userposts", opts);
			if (!response.ok) {
			  throw new Error("Failed to fetch user posts");
			}
			const data = await response.json();
			setStore({
			  userPosts: data
			});
			return data;
		  } catch (error) {
			console.log(error);
		  }
		},
  
		fetchPosts: async () => {
		  try {
			const store = getStore();
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
		  try {
			const store = getStore();
			const response = await fetch(store.apiUrl + "/api/post-images", {
			  method: "POST",
			  headers: {
				Authorization: `Bearer ${store.token}`
			  },
			  body: formData
			});
			if (!response.ok) {
			  throw new Error("Failed to save post image");
			}
		  } catch (error) {
			console.log(error);
		  }
		},
  
		createPostCandidate: async (postId) => {
		  try {
			const store = getStore();
			const response = await fetch(`${store.apiUrl}/api/postcandidate`, {
			  method: "POST",
			  headers: {
				Authorization: `Bearer ${store.token}`,
				"Content-Type": "application/json"
			  },
			  body: JSON.stringify({ post_id: postId })
			});
			if (!response.ok) {
			  throw new Error("Failed to create post candidate");
			}
			// Fetch posts again after creating post candidate
			getActions().fetchPosts();
		  } catch (error) {
			console.log(error);
		  }
		}
	  }
	};
  };
  
  export default getState;
  