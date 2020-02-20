/*IMPORTS*/
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Datos from './Datos.js';
import InfoPokemon from './infoPokemon';
import Header from './Header';


var todos = "";

function init() {   

    ReactDOM.render(<Pokedex />, document.getElementById('root'))  

}

/*-----------------------------------------------REACT-----------------------------------*/

class Pokedex extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            datos: [],
            todos: [],
            datos2: [],
            filtro: 1,
            descriptions: [],
            elegido: {}
        }
        this.handleClick = this.handleClick.bind(this);
    }
    
    filtrarLista = async (e) =>{
        
        const { datos } = this.state;

        const { todos } = this.state;

        var listaActualizada = datos;

        if (e.target.value === "") {

            this.setState({datos: todos});

            this.setState({filtro: 0});
            

        }else if(e.target.value !== ""){

            listaActualizada = listaActualizada.filter(function(pokemon) { 
                
                return pokemon.name.search(e.target.value) !== -1;

            });

            this.setState({datos: listaActualizada});
        }
        
        
        
        
    }

    componentDidMount = async () => {      

        let url = "https://pokeapi.co/api/v2/pokemon?limit=1000";

        let url2 = "https://pokeapi.co/api/v2/pokedex/1";

        const result1 = await fetch(url);

        const pokemons = await result1.json();

        const todosPokemons = pokemons.results.map( async datos => {

            const url2 = await fetch(datos.url);

            const datosPokemon = await url2.json();      

            return datosPokemon;
            
            
        });
        

        Promise.all(todosPokemons).then(pokemons => {

            this.setState({
                loading: false,
                todos: pokemons,
                datos: pokemons                
            })

                
        })


        const result2 = await fetch(url2);

        const pokemons2 = await result2.json();

        const todosPokemons2 = pokemons2.pokemon_entries.map( async datos2 => {

            const url3 = await fetch(datos2.pokemon_species.url);

            const datosPokemon2 = await url3.json();

            return datosPokemon2;

        })
        

        Promise.all(todosPokemons2).then(pokemons => {

            let result = [];

            let descripciones = []
            
            pokemons.forEach( async pokemon => {

                const url4 = await fetch(pokemon.varieties[0].pokemon.url);

                const datosPokemon3 = await url4.json();

                result.push(datosPokemon3);
                descripciones.push(pokemon);

            })
            

            this.setState({
                loading: false,
                datos2: result,
                descriptions: descripciones    
            })

            
        })

    }

    handleClick = (e,data) =>{

        this.state.datos.map(pokemon => {
            if(data === pokemon.id){
                this.setState({elegido:pokemon});
            }
        })
       
        
    }

    devolverDescripciones =(nombre) =>{
        let contador = 0;

        let idioma;

        this.state.descriptions.map(pokemon2 => {
            if(nombre === pokemon2.name){
                pokemon2.flavor_text_entries.map(idiomaES => { 
                    if(idiomaES.language.name === "es"){
                        if (contador === 0 ) {
                            contador++;                 
                            idioma = idiomaES.flavor_text;
                        }
                    }
                })                                               
            }
        });

        return idioma;
        
    }

    render() {
        


        if (this.state.loading) {
            return (<div className="Cargando">.</div>);
        }
       
        if(this.state.datos.length < 961){
            console.log("Filtrando");
            
            return (
                <div className="contenido">
                    <Header key="header"/> 
                    <div className="input">
                        <input type="text" id="filter" placeholder="Busca un pokémon aquí!" onChange={this.filtrarLista}></input>
                    </div>
                    <div className="ListaPokemon">
                            {this.state.datos.map(pokemon => {
                                return (
                                    <Datos key={pokemon.name} id={pokemon.id} onClick={((e) => this.handleClick(e, pokemon.id))} 
                                    imagen={pokemon.sprites.front_default} nombre={pokemon.name}/>
                                )
                            })}               
                    </div>
                    <div className="infoPokemon">
                        {this.state.datos2.map(pokemon => {
                            
                            if(this.state.elegido.name === pokemon.name) {

                                return <InfoPokemon key="infoPokemon" pok={this.state.elegido} pok2={pokemon} tipo={pokemon.types} descripcion={this.devolverDescripciones(pokemon.name)}/>
                            }
                            
                        })}                    
                    </div>
                </div>
            );  

        }else if(this.state.todos.length === 961){
            console.log("Mostrando todos");
            

            return (
                <div className="contenido">
                    <Header key="header"/> 
                    <div className="input">
                        <input type="text" id="filter" placeholder="Busca un pokémon aquí!" onChange={this.filtrarLista}></input>
                    </div>
                    <div className="ListaPokemon">
                            {this.state.todos.map(pokemon => {
                                //console.log(pokemon.name);
                                return (
                                    <Datos key={pokemon.name} id={pokemon.id} onClick={((e) => this.handleClick(e, pokemon.id))} 
                                    imagen={pokemon.sprites.front_default} nombre={pokemon.name}/>
                                )
                            })}               
                    </div>
                    <div className="infoPokemon">
                        {this.state.datos2.map(pokemon => {
                            
                            if(this.state.elegido.name === pokemon.name) {

                                return <InfoPokemon key="infoPokemon" pok={this.state.elegido} pok2={pokemon} tipo={pokemon.types} descripcion={this.devolverDescripciones(pokemon.name)}/>
                            }
                            
                        })}                    
                    </div>
                </div>
            ); 
        }else{
            return (
                <div className="contenido">
                    <Header key="header"/> 
                    <div className="input">
                        <input type="text" id="filter" placeholder="Busca un pokémon aquí!" onChange={this.filtrarLista}></input>
                    </div>
                    <div className="ListaPokemon">
                            {this.state.datos.map(pokemon => {
                                return (
                                    <Datos key={pokemon.name} id={pokemon.id} onClick={((e) => this.handleClick(e, pokemon.id))} 
                                    imagen={pokemon.sprites.front_default} nombre={pokemon.name}/>
                                )
                            })}               
                    </div>
                    <div className="infoPokemon">
                        {this.state.datos2.map(pokemon => {
                            
                            if(this.state.elegido.name === pokemon.name) {

                                return <InfoPokemon key="infoPokemon" pok={this.state.elegido} pok2={pokemon} tipo={pokemon.types} descripcion={this.devolverDescripciones(pokemon.name)}/>
                            }
                            
                        })}                    
                    </div>
                </div>
            );  
        }

    }  


}

window.onload = init;