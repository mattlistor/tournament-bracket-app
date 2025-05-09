import React, {Component} from 'react';
import Player from './Player.js';
class Pair extends Component { 
  generatePlayers = () => {
    // deciphers which ones should be gold and which should be locked (no hover color change)
    let gold = this.props.bracket[this.props.coordinates[0]][this.props.coordinates[1]].goldTopOrBottom
    if (gold === "top"){
      return<>
        <Player gold={true} locked={false} bracket={this.props.bracket} goldCoordinates={this.props.goldCoordinates} coordinates={this.props.coordinates} treeTopPlacement={this.props.treeTopPlacement} treePlacement={this.props.treePlacement} topOrBottomPair={this.props.topOrBottom} topOrBottom="top" seedObj={this.props.top} seedNum={this.props.top.seedNum} winnerClickHandle={this.props.winnerClickHandle} />
        <Player gold={false} locked={true} bracket={this.props.bracket} goldCoordinates={this.props.goldCoordinates} coordinates={this.props.coordinates} treeTopPlacement={this.props.treeTopPlacement} treePlacement={this.props.treePlacement} topOrBottomPair={this.props.topOrBottom} topOrBottom="bottom" seedObj={this.props.bottom} seedNum={this.props.bottom.seedNum} winnerClickHandle={this.props.winnerClickHandle}/>
      </>
    } 
    if (gold === "bottom"){
      return<>
        <Player gold={false} locked={true} bracket={this.props.bracket} goldCoordinates={this.props.goldCoordinates} coordinates={this.props.coordinates} treeTopPlacement={this.props.treeTopPlacement} treePlacement={this.props.treePlacement} topOrBottomPair={this.props.topOrBottom} topOrBottom="top" seedObj={this.props.top} seedNum={this.props.top.seedNum} winnerClickHandle={this.props.winnerClickHandle} />
        <Player gold={true} locked={false} bracket={this.props.bracket} goldCoordinates={this.props.goldCoordinates} coordinates={this.props.coordinates} treeTopPlacement={this.props.treeTopPlacement} treePlacement={this.props.treePlacement} topOrBottomPair={this.props.topOrBottom} topOrBottom="bottom" seedObj={this.props.bottom} seedNum={this.props.bottom.seedNum} winnerClickHandle={this.props.winnerClickHandle}/>
      </>
    } 
    if (gold === "none"){
      return<>
        <Player gold={false} locked={false} bracket={this.props.bracket} goldCoordinates={this.props.goldCoordinates} coordinates={this.props.coordinates} treeTopPlacement={this.props.treeTopPlacement} treePlacement={this.props.treePlacement} topOrBottomPair={this.props.topOrBottom} topOrBottom="top" seedObj={this.props.top} seedNum={this.props.top.seedNum} winnerClickHandle={this.props.winnerClickHandle} />
        <Player gold={false} locked={false} bracket={this.props.bracket} goldCoordinates={this.props.goldCoordinates} coordinates={this.props.coordinates}treeTopPlacement={this.props.treeTopPlacement} treePlacement={this.props.treePlacement} topOrBottomPair={this.props.topOrBottom} topOrBottom="bottom" seedObj={this.props.bottom} seedNum={this.props.bottom.seedNum} winnerClickHandle={this.props.winnerClickHandle}/>
      </>
    } 
     

  }

  render(){
    return (
        <div className="Pair">
            {/* <p>{this.props.topOrBottom} - {this.props.treePlacement} - {this.props.bracket[this.props.coordinates[0]][this.props.coordinates[1]].goldTopOrBottom}</p> */}
            {this.generatePlayers()}
        </div>
    );
  }
}

export default Pair;
