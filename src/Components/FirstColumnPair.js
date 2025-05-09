import React, {Component} from 'react';
import FirstColumnPlayer from './FirstColumnPlayer.js';

// import '../App.css';

class FirstColumnPair extends Component { 
  
  generateFirsrtColumnPlayers = () => {
    // deciphers which ones should be gold and which should be locked (no hover color change)
    let gold = this.props.bracket[this.props.coordinates[0]][this.props.coordinates[1]].goldTopOrBottom
    if (gold === "top"){
      return<>
        <FirstColumnPlayer gold={true} locked={false} bracket={this.props.bracket} goldCoordinates={this.props.goldCoordinates} coordinates={this.props.coordinates} treeTopPlacement={this.props.treeTopPlacement} treePlacement={this.props.treePlacement} topOrBottomPair={this.props.topOrBottom} topOrBottom="top" seedObj={this.props.top} seedNum={this.props.top.seedNum} winnerClickHandle={this.props.winnerClickHandle} />
        <FirstColumnPlayer gold={false} locked={true} bracket={this.props.bracket} goldCoordinates={this.props.goldCoordinates} coordinates={this.props.coordinates} treeTopPlacement={this.props.treeTopPlacement} treePlacement={this.props.treePlacement} topOrBottomPair={this.props.topOrBottom} topOrBottom="bottom" seedObj={this.props.bottom} seedNum={this.props.bottom.seedNum} winnerClickHandle={this.props.winnerClickHandle}/>
      </>
    } 
    if (gold === "bottom"){
      return<>
        <FirstColumnPlayer gold={false} locked={true} bracket={this.props.bracket} goldCoordinates={this.props.goldCoordinates} coordinates={this.props.coordinates} treeTopPlacement={this.props.treeTopPlacement} treePlacement={this.props.treePlacement} topOrBottomPair={this.props.topOrBottom} topOrBottom="top" seedObj={this.props.top} seedNum={this.props.top.seedNum} winnerClickHandle={this.props.winnerClickHandle} />
        <FirstColumnPlayer gold={true} locked={false} bracket={this.props.bracket} goldCoordinates={this.props.goldCoordinates} coordinates={this.props.coordinates} treeTopPlacement={this.props.treeTopPlacement} treePlacement={this.props.treePlacement} topOrBottomPair={this.props.topOrBottom} topOrBottom="bottom" seedObj={this.props.bottom} seedNum={this.props.bottom.seedNum} winnerClickHandle={this.props.winnerClickHandle}/>
      </>
    } 
    if (gold === "none"){
      return<>
        <FirstColumnPlayer gold={false} locked={false} bracket={this.props.bracket} goldCoordinates={this.props.goldCoordinates} coordinates={this.props.coordinates} treeTopPlacement={this.props.treeTopPlacement} treePlacement={this.props.treePlacement} topOrBottomPair={this.props.topOrBottom} topOrBottom="top" seedObj={this.props.top} seedNum={this.props.top.seedNum} winnerClickHandle={this.props.winnerClickHandle} />
        <FirstColumnPlayer gold={false} locked={false} bracket={this.props.bracket} goldCoordinates={this.props.goldCoordinates} coordinates={this.props.coordinates}treeTopPlacement={this.props.treeTopPlacement} treePlacement={this.props.treePlacement} topOrBottomPair={this.props.topOrBottom} topOrBottom="bottom" seedObj={this.props.bottom} seedNum={this.props.bottom.seedNum} winnerClickHandle={this.props.winnerClickHandle}/>
      </>
    } 
     

  }

  render(){
    return (
        <div className="Pair">
            {/* <p>{this.props.topOrBottom} - {this.props.treePlacement} - {this.props.bracket[this.props.coordinates[0]][this.props.coordinates[1]].goldTopOrBottom}</p> */}
            {this.generateFirsrtColumnPlayers()}
        </div>
    );
  }
}

export default FirstColumnPair;
