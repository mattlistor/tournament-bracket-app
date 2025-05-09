import React, {Component} from 'react';
import Seed from './Seed.js';
class SeedContainer extends Component {
  
  generateSeedComponents = () => {
    return this.props.seedList.map((seed, index, array) => {
        return <Seed seed={seed} key= {index} num={index} name={seed} submitSeedEdit={this.props.submitSeedEdit} editingSeed={this.props.editingSeed} editSeedIndex={this.props.editSeedIndex} editSeed={this.props.editSeed} deleteSeed={this.props.deleteSeed}/>
    })
  }
  
  render(){
    return (
          <div className="SeedContainer">
            {this.generateSeedComponents()}
          </div>
    );
  }
}

export default SeedContainer;
