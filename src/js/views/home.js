import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link, useNavigate } from "react-router-dom";

export const Home = () => {

	const {store, actions} = useContext(Context);
	const imgCharUrl = "https://starwars-visualguide.com/assets/img/characters/";
	const imgPlanetsUrl = "https://starwars-visualguide.com/assets/img/planets/";
	const [searchData, setSearchData] = useState([]);
	const navigate = useNavigate();
	const [suggestions, setSuggestions] = useState([]);
	const [suggestionIndex, setSuggestionIndex] = useState(0);
	const [suggestionsActive, setSuggestionsActive] = useState(false);
	const [value, setValue] = useState("");
	const [element, setElement] = useState("people");

    useEffect (()=>{
		actions.loadData();
		//store.people.map((item)=>{searchItems.push({["uid"]: item.uid, ["name"]:item.name})});
		const searchItems = [];
		store[element].map((item)=>{searchItems.push({["uid"]: item.uid, ["name"]:item.name})});
		setSearchData(searchItems);
    }, []);
	

	const handleChange = (e) => {
		const query = e.target.value.toLowerCase();
		setValue(query);
		if (query.length > 0) {
			const filterSuggestions = searchData.filter(
				(suggestion) =>
				suggestion.name.toLowerCase().indexOf(query) > -1
			);
			setSuggestions(filterSuggestions);
			setSuggestionsActive(true);
		} else {
			setSuggestionsActive(false);
		}
	};

	const handleClick = (e, uid) => {
		setSuggestions([]);
		setValue(e.target.innerText);
		navigate("/demo/"+uid+"/"+element);
		setSuggestionsActive(false);
	};

	const handleKeyDown = (e) => {
		// UP ARROW
		if (e.keyCode === 38) {
			if (suggestionIndex === 0) {
				return;
			}
			setSuggestionIndex(suggestionIndex - 1);
		}
		// DOWN ARROW
		else if (e.keyCode === 40) {
			if (suggestionIndex - 1 === suggestions.length) {
				return;
			}
			setSuggestionIndex(suggestionIndex + 1);
		}
		// ENTER
		else if (e.keyCode === 13) {
			setValue(suggestions[suggestionIndex]);
			setSuggestionIndex(0);
			setSuggestionsActive(false);
		}
	};

  const Suggestions = () => {
    return (
      <ul className="suggestions list-group w-auto">
        {suggestions.map((suggestion, index) => {
          return (
            <li
              className={index === suggestionIndex ? "list-group-item active" : "list-group-item"}
			  style={{cursor:"pointer"}}
			  aria-current={index === suggestionIndex ? "true" : ""}
              key={index}
              onClick={(e)=>handleClick(e, suggestion.uid-1)}
            >
              {suggestion.name}
            </li>
          );
        })}
      </ul>
    );
  };

	return (
	<div className="container">

		<div className="autocomplete mx-3" style={{maxWidth:"50%"}}>
			<p className="text-white">Search Character by Name</p>
			<input
				type="text"
				name="people"
				value={value}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
			/>
			{suggestionsActive && <Suggestions />}
		</div>

		<div className="card1 container-fluid py-2">
			<h2 className="text-danger my-2">Characters</h2>
			<div className="card-group overflow-auto d-flex flex-row flex-nowrap">{
				store.people.map((datos, index)=>(
					<div className="card" style={{minHeight: "300px", minWidth: "300px"}} key={index}>
						<img src={imgCharUrl + datos.uid + ".jpg"} className="card-img-top flex-basis-auto" alt="" />
						<div className="card-body">
							<h5 className="card-title">{datos.name}</h5>
							<p className="mb-0">Gender: {datos.gender}</p>
							<p className="mb-0">Hair Color: {datos.hair_color}</p>
							<p className="card-text">Eye Color: {datos.eye_color}</p>
						</div>
						<div className="m-3 d-flex justify-content-between">
							<Link to={"/demo/"+ index + "/people"}>
								<button className="btn btn-outline-primary">Learn more!</button>
							</Link>
							<button className="btn btn-outline-warning text-end" onClick={()=>actions.addFavorites(datos.name)}>
								<i className="fa-regular fa-heart"></i>
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
		<div className="card2 container-fluid py-2">
			<h2 className="text-danger my-2">Planets</h2>
			<div className="card-group overflow-auto d-flex flex-row flex-nowrap">{
				store.planets.map((datos, index)=>(
					<div className="card" style={{minHeight: "300px", minWidth: "300px"}} key={index}>
						<img src={imgPlanetsUrl + datos.uid + ".jpg"} className="card-img-top flex-basis-auto" alt="" />
						<div className="card-body">
							<h5 className="card-title">{datos.name}</h5>
							<p className="mb-0">Population: {datos.population}</p>
							<p className="mb-0">Terrain: {datos.terrain}</p>
						</div>
						<div className="m-3 d-flex justify-content-between">
							<Link to={"/demo/"+ index + "/planets"}>
								<button className="btn btn-outline-primary">Learn more!</button>
							</Link>
							<button className="btn btn-outline-warning text-end" onClick={()=>actions.addFavorites(datos.name)}>
								<i className="fa-regular fa-heart"></i>
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	</div>
	);
}
