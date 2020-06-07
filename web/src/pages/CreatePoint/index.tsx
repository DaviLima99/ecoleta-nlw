import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { LeafletMouseEvent } from "leaflet";
import { useHistory } from "react-router-dom";

import axios from 'axios';
import api from "../../services/api";
import Header from '../../components/Header';
import Dropzone from '../../components/Dropzone';
import './styles.css';

interface Item {
    id: number;
    title: string;
    image_url: string;
}

interface IBGEUF {
    sigla: string;
}

interface IBGECity {
    nome: string;
}

const CreatePoint = () => {

    const history = useHistory();
    const [formData, setFormDate] = useState({
        name: '',
        email: '',
        wpp: ''
    });
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [items, setItems] = useState<Item[]>([]);
    const [ufs, setUfs] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);
    const [selectedUf, setSelectedUf] = useState('0');
    const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);
    const [selectedCity, setSelectedCity] = useState('0') ;
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0]);

    const [selectedFile, setSelectedFile] = useState<File>();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;

            setInitialPosition([latitude, longitude]);
        })
    }, []);

    useEffect(() =>{
        api.get('/items').then(response => {
            setItems(response.data);
        })
    }, []);

    
    useEffect(() => {
        axios.get<IBGEUF[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
            const ufInitials =  response.data.map(uf => uf.sigla);
            setUfs(ufInitials);
        });
    }, []);
    
    useEffect(() => {
       
        if (selectedUf === '0') return;

        axios.get<IBGECity[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then(response => {
            const citiesName =  response.data.map(city => city.nome);
            setCities(citiesName);
        });
    }, [selectedUf]);

    function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) {
        const uf = event.target.value;
        setSelectedUf(uf);
    }

    function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
        const city = event.target.value;
        setSelectedCity(city);
    }

    function handleMapClick(event: LeafletMouseEvent) {
        setSelectedPosition([
            event.latlng.lat,
            event.latlng.lng
        ])
    }

    function handleInput(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setFormDate({ ...formData, [name]: value });
    }

    function handleItem(id: number) {

        const alreadySelected = selectedItems.findIndex(item => item === id);

        if (alreadySelected >= 0) {
            const filteredItems = selectedItems.filter(item => item !== id);
            setSelectedItems(filteredItems);
            return;
        } 

        setSelectedItems([...selectedItems, id]);
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        const { name, email, wpp } = formData; 
        const uf = selectedUf;
        const city = selectedCity;
        const [latitude, longitude] = selectedPosition;
        const items = selectedItems;

        const data = new FormData();
        data.append('name', name);
        data.append('email', email);
        data.append('wpp', wpp);
        data.append('uf', uf);
        data.append('city', city);
        data.append('latitude', String(latitude));
        data.append('longitude', String(longitude));
        data.append('items', items.join(','));

        if (selectedFile) {
            data.append('image', selectedFile);
        }

        await api.post('points', data);

        history.push('/');

        alert('Successfully created!');
    }

    return (
        <div id="page-create-point">
        <Header/>

            <form onSubmit={handleSubmit}>
                <h1>Cadastro do <br/> ponto de coleta</h1>
                <Dropzone onFileUploaded={setSelectedFile}/>
                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>

                    <div className="field">
                        <label htmlFor="name">Nome da entidade</label>
                        <input 
                            type="text"
                            id="name"    
                            name="name"    
                            onChange={handleInput}
                        />
                    </div>
                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="wpp">E-mail</label>
                            <input 
                                type="email"
                                id="email"
                                name="email"
                                onChange={handleInput}
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="wpp">WhatsApp</label>
                            <input 
                                type="text"
                                id="wpp"
                                name="wpp"
                                onChange={handleInput}
                            />
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o endereço no mapa</span>
                    </legend>

                    <Map center={initialPosition} zoom={15} onClick={handleMapClick}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        <Marker position={selectedPosition} />
                    </Map>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">Estado (UF)</label>
                            <select name="uf" id="uf" value={selectedUf} onChange={handleSelectUf}>
                                <option value="0">Selecione uma UF</option>
                                {ufs.map(uf => (
                                    <option key={uf} value={uf}>{uf}</option>
                                ))}
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="uf">Cidade</label>
                            <select name="city" id="city" value={selectedCity} onChange={handleSelectCity}>
                                <option value="0">Selecione uma cidade</option>
                                {cities.map(city => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Itens de coleta</h2>
                        <span>Selecione um ou mais itens abaixo</span>
                    </legend>

                    <ul className="items-grid">
                        {items.map(item => (
                            <li 
                                key={item.id} 
                                onClick={() => handleItem(item.id)} 
                                className={selectedItems.includes(item.id) ? 'selected' : ''}
                            >
                                <img src={item.image_url} alt="Lampada"/>
                                <span>{ item.title }</span>
                            </li>
                        ))}
                    </ul>
                </fieldset>

                <button type="submit">
                    Cadastrar ponto de coleta
                </button>
            </form>
        </div>
    );
}

export default CreatePoint;
