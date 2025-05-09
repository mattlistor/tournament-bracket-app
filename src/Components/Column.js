import React, {Component} from 'react';
import Pair from './Pair.js';


// import '../App.css';

class Column extends Component {

  generateColumnPairs = () => {
    let pairComponents = []
    let i = 0
    let top = true 

    while (i < this.props.pairAmount) {
      let x = this.props.getCoordinates(this.props.treeTopPlacement+i)[0]   
      let y = this.props.getCoordinates(this.props.treeTopPlacement+i)[1]   
      let pairObj = this.props.bracket[x][y]
  
      let topSeedObj = {name: "", seedNum: "-"}
      let bottomSeedObj = {name: "", seedNum: "-"}
      if(pairObj.top){
        topSeedObj = pairObj.top
      }
      if(pairObj.bottom){
        bottomSeedObj = pairObj.bottom
      }
      (top ? 
      pairComponents = [...pairComponents, <Pair coordinates={[x,y]} goldCoordinates={this.props.goldCoordinates} treePlacement={this.props.treeTopPlacement+i} topOrBottom="top" key={i} winnerClickHandle={this.props.winnerClickHandle} top={topSeedObj} bottom={bottomSeedObj} seedList={this.props.seedList} bracket={this.props.bracket}/>]
      :
      pairComponents = [...pairComponents, <Pair coordinates={[x,y]} goldCoordinates={this.props.goldCoordinates} treePlacement={this.props.treeTopPlacement+i} topOrBottom="bottom" key={i} winnerClickHandle={this.props.winnerClickHandle} top={topSeedObj} bottom={bottomSeedObj} seedList={this.props.seedList} bracket={this.props.bracket}/>]
      )
      i = i + 1;
      top = !top
    }
    return pairComponents
  }

  getHeight = () => {
    return this.state.columnHeight
  }

  render(){
    const style = {
        height: this.props.height + 'px'
      };

    return (
      <div className = "Column" id = "bracketColumn">
        <div className = "columnHeader" >{this.props.name}</div>
        <div className = "pairContainer" style={style}>
            {this.generateColumnPairs()}
        </div>
      </div>
    );
  }
}

export default Column;
