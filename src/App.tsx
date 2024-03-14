import React, { useState }  from 'react';
import './App.css';
import logo from './logo.svg';
import dayjs from 'dayjs';

const nasa_apod_url = "https://api.nasa.gov/planetary/apod";
const nasa_api_key = "wOPSsUDdQBo40ijprU3J7jNnRmB8iVxejJg0Scuu";
type ErrorDefiniton = Readonly<{
  code: number;
  message: string;
}>;

type ApodResponseDefinition = Readonly<{
  explanation: string;
  url: string;
  title: string;
  error?: ErrorDefiniton;
}>;

export function PickADate(): JSX.Element {
  let apodResponse: ApodResponseDefinition = {url: "", explanation: "", title: ""};
  const [date, setDate] = React.useState(dayjs());
  const [explanation, setExplanation] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");
  const [title, setTitle] = React.useState("");
  const onChangeDate = React.useCallback(
   (e: React.ChangeEvent<HTMLInputElement>) => {
     setDate(dayjs(e.target.value)); },
     [setDate]
  );

  
  const onCreateWindow = React.useCallback(
    () => { window.open(imageUrl, 'popUpWindow'); },
    [imageUrl]
  );

  let xhr = new XMLHttpRequest();
  let requestApi = nasa_apod_url+"?api_key="+nasa_api_key+"&date="+date.format("YYYY-MM-DD");
  xhr.open("GET", requestApi);
  xhr.send();
  xhr.onload =
    () => {
      apodResponse = JSON.parse(xhr.responseText);
      setTitle(apodResponse.title);
      setExplanation(apodResponse.explanation);
      setImageUrl(apodResponse.url);
    };

  return (
    <div className="App-layout">
      <h1 className="App-title"> {title ? title : "No Title"} </h1>
      <input type="image" className="App-logo1" onClick={onCreateWindow} src={imageUrl} alt={logo} /> 
      <h1 className="App-title"> Explanation </h1>
      <p className="App-explanation"> { 
        apodResponse.hasOwnProperty("error") ? apodResponse.error?.message : explanation
      } </p>
      <h1 className="App-explanation"> Picked Date: {date.format("DD - MMMM - YYYY")} </h1>
      <input type="date" onChange={onChangeDate} value={date.format("YYYY-MM-DD")} />       
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        OnARoll frontend exercise
      <PickADate/>
      </header>
    </div>
  );
}

export default App;
