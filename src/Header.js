import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Header extends React.Component {
    constructor(props){
        super(props);

        this.state = {
        }
    }
   

    render(){
        return(
            <div className="header">
                <img className="titulo" ></img>    
            </div>  
        );
    }
}

export default Header;