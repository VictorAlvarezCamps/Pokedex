import React,{Component} from 'react';
import './index.css';

class Datos extends Component{

    constructor(props){
        super(props);
        this.ref=React.createRef();
        
    }

    handleClick = () => {

        this.props.onClick(this.props.id);
        
    }
    
    /*componentDidUpdate(pP,pS){
        //pP -> prevProps , pS -> prevState

        //console.log(pS);
        

        //console.log(this.state.id);
        if(this.state.id !== pS.id || this.state.imagen !== pS.imagen || this.state.nombre !== pS.nombre){
            this.setState({
                id: pS.id,
                imagen: pS.imagen,
                nombre: pS.name
            });
        }

    }*/
    
    render(){ 

        return(
            <div className={"Pokemon"} key={this.props.id} onClick={this.handleClick}>
                <img className="imagenPokemon" alt={this.props.id} src={this.props.imagen}></img>
                <h1 >{this.props.id}</h1>
                <h1 className="nombrePokemon">{this.props.nombre}</h1>
            </div>
        );
    }


}

export default Datos;