import React, {Component} from 'react';

class BracketLink extends Component {

    render(){
        return ( 
            <div className="BracketLink">
                <p>{this.props.name}</p>
            </div>
        );
  }
}

export default BracketLink;
