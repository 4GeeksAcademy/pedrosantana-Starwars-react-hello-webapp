import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

import "../../styles/demo.css";

export const Demo = () => {
	const { store, actions } = useContext(Context);
	const params = useParams();
	const imgCharUrl = "https://starwars-visualguide.com/assets/img/characters/";
	const imgPlanetsUrl = "https://starwars-visualguide.com/assets/img/planets/";
	const element = params.theelement;
	const index = params.theindex;
	const description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In est ante in nibh mauris cursus mattis molestie. Ut sem nulla pharetra diam sit amet. Arcu cursus euismod quis viverra nibh cras pulvinar mattis. Erat pellentesque adipiscing commodo elit. Interdum velit euismod in pellentesque massa.Ornare lectus sit amet est placerat in egestas erat. Mus mauris vitae ultricies leo integer malesuada nunc vel. Pellentesque elit eget gravida cum sociis natoque penatibus et magnis. A condimentum vitae sapien pellentesque habitant morbi tristique. Velit euismod in pellentesque massa placerat duis ultricies lacus sed. Tincidunt nunc pulvinar sapien et ligula ullamcorper. Imperdiet sed euismod nisi porta lorem mollis aliquam ut. Amet volutpat consequat mauris nunc congue nisi."
	const titles = element == "people"? {
		"Name": store[element][index].name,
		"Birth Year": store[element][index].birth_year, 
		"Gender": store[element][index].gender, 
		"Height": store[element][index].height, 
		"Skin Color": store[element][index].skin_color, 
		"Eye Color": store[element][index].eye_color
	}:
	{
		"Name": store[element][index].name,
		"Climate": store[element][index].climate, 
		"Population": store[element][index].population, 
		"Orbital Period": store[element][index].orbital_period, 
		"Rotation Period": store[element][index].rotation_period, 
		"Diameter": store[element][index].diameter
	};

	return (
		<div className="container">
			<div className="card d-flex" style={{minHeight: "300px", minWidth: "300px"}} key={index}>
				<div className="row text-center">
					<div className="col-auto">
						<img className="img-fluid p-5" src={element=="people"? imgCharUrl+store[element][index].uid+".jpg":imgPlanetsUrl+store[element][index].uid+".jpg"} alt="" style={{maxWidth:"800px", maxHeight:"600px"}} />
					</div>
					<div className="col mt-5">
						<h1 className="card-title">{store[element][index].name}</h1>
						<p className="card-text mt-2 mx-5">{description}</p>
					</div>
				</div>
				<div className="card-footer bg-transparent border-danger w-100 d-flex flex-row justify-content-between px-5">
					{Object.entries(titles).map(([key, value])=>(
						<div key={key+1}>
							<p className="fw-bold text-danger" key={key+2}>{key}</p>
							<p className="mb-0 text-danger" key={key+3}>{value}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};