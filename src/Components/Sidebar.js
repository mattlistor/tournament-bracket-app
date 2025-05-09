import React, {Component} from 'react';
import SeedContainer from './SeedContainer.js';
class Sidebar extends Component {
  state = {
    shuffle: this.props.shuffle
  }

  changeShuffle = () => {
      this.setState({
        shuffle: !this.state.shuffle
      })
      this.props.checkbox(!this.state.shuffle)
  }

  clear = () => {
    this.setState({
      shuffle: false
    })
    this.props.clear()
  }

  render(){

    return (
        <div className="content">
            <div className="sidebar" />
            {/* <h1 className="sidebar">TOURNAMENT <br></br> BRACKET  <br></br> GENERATOR</h1> */}
            
            {/* SEED FORM */}
            <div className="lowerContainer">
              <form className="seedForm">
                  <input id="seedInput" spellCheck="false" type="text" placeholder="Enter Seeds" name="name" maxLength="18" onChange={(e) => this.props.currentSeedChange(e)}/>
                  <input id="myPlusBtn" type="submit" value="+"  onClick={(e) => this.props.submitSeed(e)}/>
              </form>
            
              <div className="checkbox-and-button">
                  {/* GENERATE BRACKET BUTTON */}

                  {[4, 8, 16, 32].includes(this.props.seedList.length)  && !this.props.showBracket ?
                  <button className="generateBtnGreenLight" onClick={() => this.props.generate()}>GENERATE</button>
                  :
                  <button className="generateBtn" onClick={() => this.props.generate()}>GENERATE</button>
                  }
                  <button className="generateBtn" onClick={() => this.clear()}>CLEAR</button>
                  {/* <button className="generateBtn" onClick={() => this.props.logOut()}>LOGOUT</button> */}

                  {this.state.shuffle ? 
                  <div className="shuffleOn" onClick={() => this.changeShuffle()} />
                  :
                  <div className="shuffle" onClick={() => this.changeShuffle()} />
                  }

              </div>

              <SeedContainer greenLight={false} seedList={this.props.seedList} submitSeedEdit={this.props.submitSeedEdit} editingSeed={this.props.editingSeed} editSeedIndex={this.props.editSeedIndex} editSeed={this.props.editSeed} deleteSeed={this.props.deleteSeed}/>
            </div> 
      </div> 
    );
  }
}

export default Sidebar;
