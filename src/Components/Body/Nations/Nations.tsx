import React from 'react';
import { useState } from 'react';
import './Nations.css';
import {Filters, iFilters} from './Filters/Filters';
import {NationCard, iNationCard} from './NationCard/NationCard';

const Countries = require('../../../my_modules/GetCountries');

export default function Nations() {

  const [nations, setNations] = useState(Array<iNationCard>);
  const [elementNumber, setElementNumber] = useState(0);

  const onFiltersChange = (filters:iFilters) => { 
    
    let {name, carSide, continent, populationMax, populationMin, currencies} = filters;

    Countries.GetCountries(name, carSide, continent, populationMax, populationMin, currencies)
    .then((data: { jsonObject: { object: any[]; elementNumber: React.SetStateAction<number>; }; }) => {
      setNations(data.jsonObject.object.map((nation:any) => {
        return {
          commonName: nation.name.common,
          officialName: nation.name.official,
          flagImg: nation.flags.png,
          flagAlt: nation.flags.alt,
          currencies: Object.getOwnPropertyNames(nation.currencies).join(', '),
          area: nation.area,
          population: nation.population,
          continent: nation.continents.join(', '),
          capital: nation.capital.join(', ')
        }
      }))
      setElementNumber(data.jsonObject.elementNumber)
    })
    .catch((err: any) => console.log(err));

  };

  return (
    <>
      <div className="container-fluid">
        <p className="d-inline-flex gap-1" style={{padding: "10px 0px 0px 5px"}}>
          <button className="btn btn-secondary" type="button" data-bs-toggle="collapse" data-bs-target="#Filters" aria-expanded="false" aria-controls="Filters">
            Filters
          </button>
        </p>
        <div className="collapse" id="Filters">
          <div className="card card-body">
            <Filters 
              handleFiltersChange={onFiltersChange}/>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <label>result element number: <b>{elementNumber}</b></label>
        </div><br/>
        <div className="row">
              {
                nations.map((nation:iNationCard, index) => {
                  return <NationCard 
                            key={index}
                            commonName={nation.commonName}
                            officialName={nation.officialName}
                            flagImg={nation.flagImg}
                            flagAlt={nation.flagAlt}
                            currencies={nation.currencies}
                            area={nation.area}
                            population={nation.population}
                            continent={nation.continent}
                            capital={nation.capital}/>
                })
              }
        </div>
      </div>
    </>

  );
}
