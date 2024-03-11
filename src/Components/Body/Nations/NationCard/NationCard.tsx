import React from 'react';
import './NationCard.css';

export interface iNationCard{
  commonName:string,
  officialName:string,
  flagImg:string,
  flagAlt:string,
  currencies:string,
  area:number,
  population:number,
  continent:string,
  capital:string
}

export function NationCard(nation:iNationCard) {

  return (

    <>
      <div className="col-lg-3 col-md-5 col-sm-6">

        <div className="card" style={{width: "18rem", margin: "0 auto", marginBottom: "30px"}}>
          <img src={nation.flagImg} className="card-img-top" alt={nation.flagAlt} />
          <div className="card-body">
            <h5 className="card-title"><b>{nation.commonName}</b></h5>
            <h6 className="card-subtitle mb-2 text-body-secondary">{nation.officialName}</h6>
            <ul className="list-group">
              <li className="list-group-item">Currencies: <b>{nation.currencies}</b></li>
              <li className="list-group-item">Area: <b>{
                String(nation.area)
              }</b> km<sup>2</sup></li>
              <li className="list-group-item">Population: <b>{
                (nation.population >= 999999) ? String(Math.round(nation.population / Math.pow(10,6) * 100) / 100) : String(nation.population)
                }</b> {(nation.population >= 999999) ? ' mln' : ''}</li>
              <li className="list-group-item">Continent: <b>{nation.continent}</b></li>
              <li className="list-group-item">Capital: <b>{nation.capital}</b></li>
            </ul>
          </div>
        </div>

      </div>
    </>

  );
}

