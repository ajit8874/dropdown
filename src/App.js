import React, { useEffect, useState } from "react";
import { data } from "./data";
// import './style.css';

function App() {
  const [datas, setDatas] = useState([]);
  const [countryId, setCountryId] = useState(-1);
  const [selectedItems, setSelectedItems] = useState(null);

  const handleSelect = (e) => {
    console.log(e.target.value);
    setCountryId(e.target.value - 1);
    // console.log(data[0]["state"][0]['city']);
  };
  useEffect(() => {
    setDatas(data);
  }, []);

  return (
    <div className="App">
      <h1>Hello</h1>

      <select onChange={handleSelect}>
        <>
          <option key="item.id" value="None">
            None
          </option>
          {datas &&
            datas.map((item) => (
              <option key={item.id} value={item.id}>
                {item.country}
              </option>
            ))}
        </>
      </select>
      <Country countryId={countryId} />
    </div>
  );
}

export default App;

function Country({ countryId }) {
  const [states, setStates] = useState([]);

  const selectCityandState = (stateName, cityName, checked) => {
    let temp = states;

    temp.map((s, idx) => {
      if (s.state === stateName) {
        return temp[idx]["city"].map((c) => {
          if (c.name === cityName) {
            return (c.visible = checked);
          }
        });
      }
    });

    let anyCheck = false;
    temp.forEach((s, idx) => {
      if (s.state === stateName) {
        temp[idx]["city"].forEach((c) => {
          if (c.visible === true) {
            anyCheck = true;
          }
        });
      }
    });

    temp.map((s, idx) => (s.visible = anyCheck));

    // setStates(temp);
    console.log(temp);
  };

  const selectAllCity = (allCityChecked) => {
    console.log;
  };

  useEffect(() => {
    if (countryId >= 0) {
      let temp = [];
      data[countryId]["state"].forEach((state) => {
        state.visible = false;
        state.city.map((city) => (city.visible = false));
        temp.push(state);
      });
      setStates(temp);
    } else {
      setStates([]);
    }
  }, [countryId]);

  return (
    <div>
      {states &&
        states.map((state) => (
          <>
            <States
              selectAllCity={selectAllCity}
              selectCityandState={selectCityandState}
              state={state}
              key={`${state.id}_${state.state}`}
            />
          </>
        ))}
    </div>
  );
}

function States({ state, selectCityandState, selectAllCity }) {
  const [states, setStates] = useState("");
  const [checked, setChecked] = useState(false);

  const handleSelect = (e) => {
    let temp = JSON.parse(states);
    temp.visible = e.target.checked;
    temp.city.map((city) => (city.visible = e.target.checked));
    setStates(JSON.stringify(temp));
    console.log(states);
  };

  const selectCity = (cityName, checked) => {
    let temp = JSON.parse(states);
    selectCityandState(temp.state, cityName, checked);
    // console.log(temp.state);
  };

  function toggle(value) {
    selectAllCity(!value);
    return !value;
  }

  useEffect(() => {
    setStates(JSON.stringify(state));
  }, [state]);

  return (
    <div>
      <input
        checked={checked}
        onChange={() => setChecked(toggle)}
        type="checkbox"
        id={`${state.id}_${state.state}`}
        name="state"
        value={state.id}
      />
      <label htmlFor="state">{state.state}</label>
      <br />
      <City cty={states} selectCity={selectCity} />
    </div>
  );
}

function City({ cty, selectCity }) {
  const [datas, setDatas] = useState("");

  const handleSelect = (e) => {
    // let temp = JSON.parse(cty);
    // temp.visible = true;
    // temp["city"].map((c) => {
    //   if (c.name === e.target.value) {
    //     c.visible = e.target.value;
    //     c.visible = e.target.checked;
    //   }
    // });
    // console.log(temp);
    // selectCity(e.target.value, e.target.checked);
  };

  useEffect(() => {
    setDatas(cty);
    // console.log(cty);
  }, [cty]);

  return (
    <div style={{ margin: "0 0 0 1.2rem" }}>
      {datas &&
        JSON.parse(datas)["city"].map((c) => (
          <CityName c={c} selectCity={selectCity} />
        ))}
    </div>
  );
}

function CityName({ c, selectCity }) {
  const [checked, setChecked] = useState(false);

  function toggle(value) {
    selectCity(c.name, !checked);
    return !value;
  }

  return (
    <>
      <input
        checked={checked}
        onChange={() => setChecked(toggle)}
        type="checkbox"
        id={c.id}
        name="state"
        value={c.name}
      />
      <label htmlFor="state">{c.name}</label>
      <br />
    </>
  );
}
