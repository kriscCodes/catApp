import './App.css'
import { useState } from 'react';
import download from './assets/download.png';
function App() {

  const [name, setName] = useState('Kitty');
  const [weight, setWeight] = useState('Weight');
  const [country, setCountry] = useState('Country');
  const [life, setLife] = useState('Life Span');
  const [src, setSrc] = useState(download)
  const breedString = 'https://api.thecatapi.com/v1/breeds';
  const [list, setList] = useState([]);
  
  const infoCall = async (e) => {
    e.preventDefault();
    const call = await fetch(breedString);
    const breedArray = await call.json();
    let randomNum = Math.floor(Math.random() * 67);
    let breed = breedArray[randomNum];
    const id = breed.id;
    const imgString =
			`https://api.thecatapi.com/v1/images/search?breed_ids=${id}`;
    const img = await fetch(imgString);
    let imgResult = await img.json();
    let imgSrc = imgResult[0].url;
    setSrc(imgSrc);
    setName(breed.name);
    setWeight(breed.weight.imperial);
    setCountry(breed.origin);
    setLife(breed.life_span);
    console.log(breed);
  }

  const shadowRealmName = (e) => {
    e.preventDefault();
    setList([...list, name])

  }
  const shadowRealmWeight = (e) => {
		e.preventDefault();
		setList([...list, weight]);
	};
  const shadowRealmCountry = (e) => {
		e.preventDefault();
		setList([...list, country]);
	};
  const shadowRealmLife = (e) => {
		e.preventDefault();
		setList([...list, life]);
	};
  return (
		<>
			<div className="mainContent">
				<h1>Veni Vici!</h1>
				<h3>Discover cats from your wildest dreams :)</h3>
				<div className="buttonRow">
					<button onClick={shadowRealmName}>{name}</button>
					<button onClick={shadowRealmWeight}>{weight}</button>
					<button onClick={shadowRealmCountry}>{country}</button>
					<button onClick={shadowRealmLife}>{life}</button>
				</div>

				<img src={src} alt="Cartoon Cat"></img>

				<div className="mainButton">
					<button onClick={infoCall}>Get Random Cat</button>
				</div>
			</div>

			<div className="banList">
				<h1>Ban List</h1>
        <ul>
          {list.map((el, index) => (
            <li key={index}>{el}</li>
          ))}
        </ul>
			</div>
		</>
	);
}

export default App
