import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { getCountries, getCurrentCountry, getTopConfirmed } from '../../store/actions/countries-action';
import { getDate, getISODate } from '../../helpers/dateConverter';

const StatsPage = () => {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries)
  const currCountry = useSelector((state) => state.currentCountry)
  const topConfirmed = useSelector((state) => state.topConfirmed)
  const [country, setCountry] = useState(localStorage.getItem('sortId') || 'kyrgyzstan')


  useEffect(() => {
    getData()
    fetchCountries(country)
  }, [])

  useEffect(() => {
    calculateTopConfirmed()
  }, [currCountry])


  const getData = async () => {
    const fetch = await axios.get('https://api.covid19api.com/countries');
    const data = fetch.data.sort((a, b) => a.Country > b.Country ? 1 : -1);
    dispatch(getCountries(data));
  }

  const fetchCountries = async(country) => {
    const to = new Date();
    const from = new Date();
    from.setDate(from.getDate()-7);
    const fetch = await axios(`https://api.covid19api.com/total/country/${country}?from=${getISODate(from)}&to=${getISODate(to)}`);
    const data = fetch.data.reverse();
    dispatch(getCurrentCountry(data))
  }

  const getSelected = (e) => {
    fetchCountries(e.target.value)
    setCountry(e.target.value)
    localStorage.setItem('sortId', e.target.value)
  }

  const calculateTopConfirmed = () => {
    const topConfirmed = {
      cases: 0,
      date: '',
    };
    currCountry.forEach((country, idx) => {
      if(idx >= currCountry.length - 1) {
        return
      }
      const curConfirmed = country.Confirmed - currCountry[idx + 1].Confirmed;
      if(curConfirmed > topConfirmed.cases) {
        topConfirmed.cases = curConfirmed;
        topConfirmed.date = country.Date;
      }
    })
    dispatch(getTopConfirmed(topConfirmed))
  }  


  return (
    <div className='main'>
      <div className="country_selector">
        <select id='selector' name='country' value={country} onChange={getSelected}> 
          {countries.map((item) => {
            return <option value={item.Slug}>{item.Country}</option>
          })}
        </select>
      </div>
      <div className="flexible">
        <div className="stats-list">
          {currCountry.slice(0, currCountry.length - 1).map((item) => {
            return <div className="stats-block">
            <div className="date">
              {getDate(item.Date)}
            </div>
            <div className="main-stats">
              <div className="main-stats-data"><span>Active</span><span className='stats-count'>{item.Active}</span></div>
              <div className="main-stats-data"><span>Deaths</span><span className='stats-count'>{item.Deaths}</span></div>
              <div className="main-stats-data"><span>Confirmed</span><span className='stats-count'>{item.Confirmed}</span></div>
              <div className="main-stats-data"><span>Recovered</span><span className='stats-count'>{item.Recovered}</span></div>
            </div>
          </div>
          })}
        </div>
        <div className="stats_top-revocered">
          <div className="main-top-recovered">
            <h3>Top confirmed cases</h3>
            <h2 className='top-recovered-count'>{topConfirmed.cases}</h2>
            <h4 className='top-recovered-date'>{getDate(topConfirmed.date)}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsPage;