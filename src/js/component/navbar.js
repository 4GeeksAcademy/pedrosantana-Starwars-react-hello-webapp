import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import imgswars from "../../img/starwars.png";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const [numFav, setNumFav] = useState(0);
	const { store, actions} = useContext(Context);

	useEffect(()=>{
		const num = store.favorites.length;
		setNumFav(num);
	}, [store.favorites.length]);

	return (
		<nav className="navbar navbar-light bg-light mb-3">
			<Link to="/">
				<img className="mx-3" src={imgswars}></img>
			</Link>
			<div className="dropdown ml-auto mx-5">
				<button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
					Favorites <span className="badge bg-secondary">{numFav}</span>
				</button>
				<ul className="dropdown-menu w-100">
					{
						numFav == 0? (
							<li>
								<a className="dropdown-item pe-2">(empty)</a>
							</li>) :
							store.favorites.map((item, index)=>(
							<li className="d-flex justify-content-between align-items-center" key={index}>
								<a className="dropdown-item pe-2">{item}</a>
								<i className="fa-solid fa-trash pe-2" onClick={()=>actions.delFavorites(index)} style={{cursor: "pointer"}} ></i>
							</li>
						))
					}
				</ul>
			</div>
		</nav>
	);
};
