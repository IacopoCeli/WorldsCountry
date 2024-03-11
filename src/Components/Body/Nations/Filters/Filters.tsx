import React from 'react';
import {useState, useEffect} from 'react';
import './Filters.css';
import CheckBox from './CheckBox/ChceckBox';

const Countries = require('../../../../my_modules/GetCountries');

export interface iFilters{
  name:string,
  carSide:string,
  continent:string,
  populationMax:number,
  populationMin:number,
  currencies:string
}

export interface iCurrency{
  name:string,
  label:string,
  symbol:string
}

export function Filters({handleFiltersChange}:{handleFiltersChange:(filters:iFilters) => void}) {

  const [minPopulation, setMinPopulation] = useState(0);
  const [maxPopulation, setMaxPopulation] = useState(0);
  const [name, setName] = useState('');
  const [carSide, setCarSide] = useState('');
  const [continent, setContinent] = useState('');
  const [currencies, setCurrencies] = useState(''); //Lista delle valute selezionate
  const [_currencies, _setCurrencies] = useState(Array<iCurrency>); //Lista completa delle valute

  useEffect(() => {

    Countries.GetCountries()
    .then((data: { jsonObject: { object: iCurrency[]; }; }) => {
      _setCurrencies(data.jsonObject.object.sort((a:iCurrency, b:iCurrency) => (a.label > b.label) ? 1 : -1))
    })
    .catch((err: any) => _setCurrencies([]))

  }, [])

  useEffect(() => {

    onChangeFilters();

  }, [name, carSide, continent, maxPopulation, minPopulation, currencies]);

  const onChangeFilters = () => {

    let filters:iFilters = {
      name: name,
      carSide: carSide,
      continent: continent,
      populationMax: maxPopulation,
      populationMin: minPopulation,
      currencies: currencies
    };

    handleFiltersChange(filters);

  };

  const GetNewCurrencies = (currencyLabel:string, add:boolean = true) => {

    let currency:iCurrency = _currencies.filter(ele => ele.label === currencyLabel)[0]
    let curr = currencies;

    if(add){
      if(currencyLabel === 'all'){
        _currencies.forEach(ele => {
          let element = document.getElementById(ele.label) as HTMLInputElement;
          element.checked = true; 
        })
        setCurrencies('');
      }
      else{
        curr += ((curr) ? ';' : '') + currency.label;
        setCurrencies(curr);
      }
    }
    else{
      if(currencyLabel === 'all'){
        _currencies.forEach(ele => {
          let element = document.getElementById(ele.label) as HTMLInputElement;
          element.checked = false; 
        })
        setCurrencies('');
      }
      else{
        curr = currencies.replace(';' + currency.label, '');
        setCurrencies(curr);
      }
    }

  }

  return (

    <>
      <div className="container-fluid">

        <div className="input-group mb-3">
          <span className="input-group-text" id="inputGroup-sizing-sm">Country Name</span>
          <input type="text" className="form-control" aria-label="Sizing input" aria-describedby="inputGroup-sizing-sm" onChange={(e) => setName(e.target.value)}/>
        </div><p>{name}</p>

        <div className="input-group mb-3">
          <span className="input-group-text" id="inputGroup-sizing-sm">Continent Name</span>
          <input type="text" className="form-control" aria-label="Sizing input" aria-describedby="inputGroup-sizing-sm" onChange={(e) => setContinent(e.target.value)}/>
        </div><p>{continent}</p>

        <div className="input-group mb-3">
          <span className="input-group-text" id="inputGroup-sizing-sm">Car side</span>
          <select className="form-select" aria-label="select" defaultValue="Both" onChange={(e) => setCarSide(e.target.value === 'both' ? '' : e.target.value)}>
            <option value="both">Both</option>
            <option value="left">Left</option>
            <option value="right">Right</option>
          </select>
        </div><p>{carSide}</p>

        <div className="input-group">
          <div className="container-fluid accordion" id="accordionCurrencies" style={{padding: "0px"}}>
            <div className="accordion-item">
              <h4 className="accordion-header">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseCurrencies" aria-expanded="false" aria-controls="collapseCurrencies">
                  Currencies
                </button>
              </h4>
              <div id="collapseCurrencies" className="accordion-collapse collapse" data-bs-parent="#accordionCurrencies">
                <div className="accordion-body">
                  <div>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" id="all" value="all" onChange={(e) => {GetNewCurrencies(e.target.value, e.target.checked)}}/>
                    <label className="form-check-label" htmlFor="all">{`all`}</label>
                  </div>
                    {
                      _currencies.map((currency, index) => {
                        return <CheckBox 
                            key={index}
                            currency={currency}
                            handleFiltersChange={GetNewCurrencies}/>
                      })
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p>{currencies}</p>
        </div><br/>

        <div className="input-group">
          <label htmlFor="populationLowLimit" className="form-label">Population low limit</label>
          <input type="range" className="form-range" min="0" max="1000000000" id="populationLowLimit" onChange={(e) => setMinPopulation(parseInt(e.target.value))}/>
          <p>{minPopulation}</p>
        </div>

        <div className="input-group">
          <label htmlFor="populationHighLimit" className="form-label">Population high limit</label>
          <input type="range" className="form-range" min="0" max="1000000000" id="populationHighLimit" onChange={(e) => setMaxPopulation(parseInt(e.target.value))}/>
          <p>{maxPopulation}</p>
        </div>

      </div>  
    </>

  );
}
