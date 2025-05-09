import React, {Component} from 'react';

// import '../App.css';

class Seed extends Component {
  state = {
    beingEdited: this.props.editingSeed,
    currentSeedEdit: this.props.name
  }

  changeHandler = (e) => {
    this.setState({
        currentSeedEdit: e.target.value
    })
  }
  
  render(){
    return (
        <>
        {this.props.editingSeed && (this.props.editSeedIndex === this.props.num) 
        ?
        // If this Seed is the seed currently being edited
        <div className="Seed">
            <div className="seedNum">{this.props.num + 1}</div>
            <form className="seedEditForm">
                <input className="editSeedForm" id="editSeedForm" spellCheck="false" type="text" maxLength="18" placeholder={this.props.name}  onChange={(e) => this.changeHandler(e)}/>
                <input className="editIconWhite" type="image" src="https://imgur.com/RZCcxGS.jpg" width = "12px" height = "12px" border="0" alt="Submit" onClick={(e) => this.props.submitSeedEdit(e, this.state.currentSeedEdit)}/>
            </form>           

            <img alt="" id="deleteSeed" src="https://i.imgur.com/tw4Z4Zn.jpg" width = "12px" height = "12px" onClick={() => this.props.deleteSeed(this.props.num)}/>
        </div>
        :
        <div className="Seed">
            <div className="seedNum">{this.props.num + 1}</div>
            <div>{this.props.name}</div>
            <div>
            <img alt="" id="deleteSeed" src="https://i.imgur.com/mrw4Vl1.png" opacity="70%" width = "12px" height = "12px" onClick={() => this.props.editSeed(this.props.num)}/>
            <img alt="" id="deleteSeed" src="https://i.imgur.com/60h7ZE9.png" width = "12px" height = "12px" onClick={() => this.props.deleteSeed(this.props.num)}/>
            </div>
        </div>
        }
        </>
    );
  }
}

export default Seed;
