import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";

export const Cards = (props) => {

    const {store, actions} = useContext(Context);
    const element = props.element;
    useEffect (()=>{
        console.log("ELEMENTO:", element);
        actions.getData(element);
    }, [element]);

	return (
        <div className="card-group overflow-auto d-flex flex-row flex-nowrap">{
        store.Data.map((datos, index)=>(
			<div className="card" style={{minHeight: "300px", minWidth: "300px"}} key={index}>
				<img src="..." className="card-img-top flex-basis-auto" alt="..." />
				<div className="card-body">
                    <h5 className="card-title">{datos.name}</h5>
                    <p className="card-text">{datos.text}</p>
				</div>
				<div className="m-3 d-flex justify-content-between">
                    <button className="btn btn-outline-primary">Learn more!</button>
					<button className="btn btn-outline-warning text-end"><i className="fa-regular fa-heart"></i></button>
				</div>
			</div>
        ))}
        </div>
	);
}

export default Cards;