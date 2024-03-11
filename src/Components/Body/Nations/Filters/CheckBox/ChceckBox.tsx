import React from 'react';
import './CheckBox.css';
import {iCurrency} from '../Filters'

export default function Body({currency, handleFiltersChange}:{currency:iCurrency, handleFiltersChange:(currencyLabel:string, add?:boolean) => void}) {

  return (

    <div className="form-check form-check-inline">
      <input className="form-check-input" type="checkbox" id={currency.label} value={currency.label} onChange={(e) => {handleFiltersChange(currency.label, e.target.checked)}}/>
      <label className="form-check-label" htmlFor={currency.label}>{`${currency.label} [${currency.symbol}]`}</label>
    </div>

  );
}
