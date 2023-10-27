const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			people: [],
			planets: [],
			favorites:[],
			searchData:[]
		},
		actions: {
			apiFetch: async (address, index, item) => {
				try{
					const resp = await fetch(address);
					const data = await resp.json();
					const store = getStore();
					Object.entries(data.result.properties).map(([key, value])=>{
						store[item][index][key]=value;
					})
					setStore(store);
					localStorage.setItem(item, JSON.stringify(store[item]));
				} catch (error) {
					console.log("Error");
				}
			},
			getData: async (endpoint, number=null) => {
				try {
					let address = "https://www.swapi.tech/api/" + endpoint;
					if (number) address += number;
					const resp = await fetch(address);
					const data = await resp.json();
					const {apiFetch} = getActions();
					if (endpoint == "people/"){
						setStore({ people: data.results});
						const store = getStore();
						store.people.map((element, index)=>{
							address = element.url;
							apiFetch(address, index, "people");
						});
					} else {
						setStore({ planets: data.results});
						const store = getStore();
						store.planets.map((element, index)=>{
							address = element.url;
							apiFetch(address, index, "planets");
						});
					}
				} catch (error) {
					console.log("Error al solicitar los datos", error)
				}
			},
			loadData: ()=> {
				const people = JSON.parse(localStorage.getItem("people"));
				const planets = JSON.parse(localStorage.getItem("planets"));
				if (people){
					const store= getStore();
					store.people = people;
					store.planets = planets;
					setStore(store);
					//setStore({"people": people});
					//setStore({"planets": planets});
				} else {
					const {getData} = getActions();
					getData("people/");
					getData("planets/");
				}
			},
			addFavorites: (item) => {
				const store = getStore();
				const found = store.favorites.find((value) => value == item);
				if (!found)
					store.favorites.push(item);
				else
					console.log("ya existe");
				setStore(store);
			},
			delFavorites: (index) => {
				const store = getStore();
				store.favorites.splice(index, 1);
				setStore(store);
			}
		}
	};
};

export default getState;
