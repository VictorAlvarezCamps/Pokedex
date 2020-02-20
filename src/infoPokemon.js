import React,{Component} from 'react';
import './index.css';

class InfoPokemon extends Component{

    constructor(props){
        super(props);

        this.state = {
            datos: {},
            datos2: this.props.pok2,
            tipo: this.props.tipo
        }
    }
    componentDidUpdate(prevProps, prevState) {
        console.log("Esta fuera")
        
        if (prevProps !== this.props) {
            console.log("Ha entrado");
            
            this.setState({datos2:this.props.pok2})
          }
        
      }

    render(){

            return(
                <div>
                    <img className="imgPokemon" alt={this.props.pok.id} src={this.state.datos2.sprites.front_default}></img>
                    <p className="numPokemon">#{this.props.pok.id}</p>
                    <p className="nombrePokemon2">{this.props.pok.name}</p>
                    <p className="descripcionPokemon">{this.props.descripcion}</p>
                    <div className="extraInfo">
                        <p>Altura: {this.props.pok.height}</p>
                        <br></br>
                        <p>Peso: {this.props.pok.weight}</p>
                    </div>
                </div>
            
            );

    }

}

export default InfoPokemon;