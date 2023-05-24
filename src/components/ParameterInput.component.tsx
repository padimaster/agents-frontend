import React, { ChangeEvent, useState } from 'react';

type ParameterInputProps = {
    action: string;
    temperature: string;
    humidity: string;
    energy: string;
    preasure: string;
    uv: string;
}

export default function ParameterInput(){
    const endpoints = {
        temperature : "/agents/temperature",
        humidity : "/agents/humidity",
        energy : "/agents/energy",
        preasure : "/agents/preasure",
        uv : "/agents/uv",
    }

    const [state, setState] = useState<ParameterInputProps>({
        action:'',
        temperature : "30.5",
        energy : "15.2",
        humidity : "65.3",
        preasure : "1000",
        uv : "0.5",
    });

    const baseURL = "http://localhost:8081"

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        });

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: event.target.value,
        }

        const url = `${baseURL}${endpoints[event.target.name as keyof typeof endpoints]}`

        console.log("URL", url);
        console.log("OPTIONS", options);

        fetch(url, options).then(response => response.json()).catch(error => console.log(error));
        
    };

    const handleUpdateAction = () => {
        fetch(`${baseURL}/agents/calculate/irrigation`)
            .then(response => response.json())
            .then(data => setState({ ...state, action: data.action || '' }))
            .catch(error => console.log(error));
    }

    const properties = ['temperature', 'humidity', 'energy', 'preasure', 'uv'];

    return (
        <>
        <div>
            {properties.map(property => (
                <label key={property}>
                    {property.charAt(0).toUpperCase() + property.slice(1)}:
                    <input
                        type="number"
                        name={property}
                        value={state[property as keyof ParameterInputProps] || ''}
                        onChange={handleChange}
                    />
                </label>
            ))}
        </div>

        <div>
            <div>
                <h2>Action: {state.action}</h2>
            </div>
            <button onClick={handleUpdateAction}>Get updated action</button>
        </div>
        </>
    );
};

