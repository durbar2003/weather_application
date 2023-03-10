import {ReactWidget} from '@jupyterlab/apputils';
import React, {useState} from 'react';
import axios from 'axios';
import {Config} from "./config";

const CounterComponent = () => {
    const [place, setPlace] = useState('');
    const [temp, setTemp] = useState(0);
    const divStyle = {
        padding: '3rem',
        backgroundColor: 'white',
        height: '100%'
    };

    return (
        <div style={divStyle}>
            <h2>Weather Jupyter Lab Extension</h2>
            <input
                value={place} placeholder='Enter city name'
                onChange={(event) => {
                    setPlace(event.target.value);
                    setTemp(0)
                }}
            />
            <br/>
            <br/>
            <button onClick={
                async () => {
                    let resp = await axios.get('http://api.weatherstack.com/current?access_key=' + Config.apiKey +
                        '&query=' + place
                        )
                    ;
                    setTemp(resp.data.current.temperature)
                }}>
                Submit
            </button>
            {temp != 0 &&
            <h4>
                The weather at {place} is {temp}&#176;C
            </h4>
            }
        </div>
    );
};

export class Weather extends ReactWidget {
    protected render(): React.ReactElement<any> {
        return <CounterComponent/>;
    }
}