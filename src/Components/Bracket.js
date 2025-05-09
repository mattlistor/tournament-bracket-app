import React, {Component} from 'react';
import FirstColumn from './FirstColumn.js';
import Column from './Column.js';
import Modal from './Modal.js';

class Bracket extends Component {
    state = {
        seedListFirstColumn: this.props.seedList,
        bracket: JSON.parse(this.props.bracket),
        bracketId: this.props.bracketId,
        modal: false
    }

    componentDidMount(){
        //grabs the height of the first column pair container (firstPairContainer)
        //changes the height of the other columns to that so that the css can generate the correct look
  
        let firstPairContainer = document.getElementsByClassName("firstPairContainer")
        let columnHeight = firstPairContainer[0].clientHeight
        this.setState({
            columnHeight: columnHeight,
        })
    }

    closeModal = () => {
        this.setState({
            modal: false
        })
    }

    winnerClickHandle = (e, treePlacement, topOrBottomPair, topOrBottomPlayer) => {
        let opposite = "top" 
        if (topOrBottomPlayer === "top"){
            opposite = "bottom"
        }
        if (topOrBottomPlayer === "bottom"){
            opposite = "top"
        }

        let x = this.getCoordinates(treePlacement)[0]
        let y = this.getCoordinates(treePlacement)[1]
        // if the user is clicking on the winner of the |final round| 
        if(treePlacement === 0) {
            // only does an action if the user clicks on a player that isnt blank & has a partner
            if(this.state.bracket[x][y][topOrBottomPlayer]){
                if(this.state.bracket[x][y][opposite]){
                    // nothing gets mvoed around in the |final round|, but we still have to make 
                    // the winner 'gold' and the other player in the pair 'locked' for UX 
                    let updatedBracket = this.state.bracket
                    updatedBracket[x][y][topOrBottomPlayer].gold = true
                    updatedBracket[x][y][opposite].locked = true
                    updatedBracket[x][y].goldTopOrBottom = topOrBottomPlayer

                    this.setState({
                        bracket: updatedBracket,
                        modal: true,
                        modalMessage: `${updatedBracket[x][y][topOrBottomPlayer].name} is the winner!`
                    })
                }
            }
        }
        else {
            // only does an action if the user clicks on a player that isnt blank & has a partner
            if(this.state.bracket[x][y][topOrBottomPlayer]){
                if(this.state.bracket[x][y][opposite]){
                    let x2 = this.getCoordinates(this.getChildIndex(treePlacement))[0]
                    let y2 = this.getCoordinates(this.getChildIndex(treePlacement))[1]
                    
                    // PUTS THE SELECTED INTO THE CHILD IN THE BRACKET
                    // WHERE THE MAGIC MAPPENS 
                    let updatedBracket = this.state.bracket
                    // if the future placement on the seed that was clicked is empty
                    if (!updatedBracket[x2][y2][topOrBottomPair]){
                        // WHERE THE MAGIC MAPPENS 
                        let newObj = {...this.state.bracket[x][y][topOrBottomPlayer]}
                        updatedBracket[x2][y2][topOrBottomPair] = newObj    
                        updatedBracket[x][y][topOrBottomPlayer].gold = true
                        updatedBracket[x][y][opposite].locked = true
                        updatedBracket[x][y].goldTopOrBottom = topOrBottomPlayer
                    }

                    // this.setState causes a rerender of <Bracket/>, causing it to update on the screen
                    this.setState({
                        bracket: updatedBracket
                    })
                }
                }
            }

        // edit bracket object and rerender
        //fetch to PATCH request updated bracket

        //  console.log(fetch(`http://localhost:3000/brackets/${this.state.bracketId}`, {
        //     method: 'GET', // or 'PUT'
        //     // body: JSON.stringify(
        //     //   {
        //     //   bracket: {
        //     //     bracket: JSON.stringify(bracketFinal),
        //     //     user_id: 1
        //     //     }
        //     //   }
        //     // ), 
        //     headers: {
        //       'Content-Type': 'application/json'
        //     }
        //   }))
    }

    getChildIndex = (parentIndex) => {
        return Math.floor((parentIndex - 1) / 2);
    }

    getCoordinates = (treePlacement) => {
        // getCoordinates() from treePlacement
        // get number of columns [x]
        // get number of rows in first column [y]
        // [x][y]
        // build map that looks like this:
        // 
        // [0,0] === 3   [1,0] === 1   [2,0] === 0
        // [0,1] === 4   [1,1] === 2   
        // [0,2] === 5      
        // [0,3] === 6   

        let columnAmount = JSON.parse(this.props.bracket).length
        let rowAmount = this.props.seedList.length / 2
        let treeArray = []
        let treeTopPlacement = this.props.treeSize-(this.props.seedList.length/2)
        for (let x = 0; x < columnAmount; x++){
          treeArray[x] = []
          // starts at treeTopPlacement and adds up ++ each loop
          for (let y = 0; y < rowAmount; y++){
            treeArray[x].push(treeTopPlacement + y) 
          }
          rowAmount = rowAmount / 2
          treeTopPlacement = treeTopPlacement-rowAmount
        }
    
        // find where the argument 'treePlacement' is located in 'treeArray'and return those coordinates
        let columnAmount2 = JSON.parse(this.props.bracket).length
        let rowAmount2 = this.props.seedList.length / 2 
        treeTopPlacement = this.props.treeTopPlacement-rowAmount2
        for (let x = 0; x < columnAmount2; x++){
          // starts at treeTopPlacement and adds up ++ each loop
          for (let y = 0; y < rowAmount2; y++){
            if (treeArray[x][y] === treePlacement){
              return [x, y] 
            }
          }
          rowAmount = rowAmount / 2
          treeTopPlacement = treeTopPlacement-rowAmount2
        }
    }

    topTreePlacementsPerColumn = () => {
        let bracketObj = JSON.parse(this.props.bracket)
        //end goal: [3, 1, 0]
        let topTree = this.props.treeSize
        let topTreePlacementsPerColumn = bracketObj.map((pairs, index) => {
            topTree = topTree-(pairs.length)
            return topTree
        })
        // topTreePlacementsPerColumn.shift() //remove first column
        return topTreePlacementsPerColumn
    }

    generateColumnComponents = () => {
        let bracketObj = JSON.parse(this.props.bracket)
        let firstColumn = 0
        let semiFinalColumn = bracketObj.length-2 //index of second to last column
        let finalColumn = bracketObj.length-1 //index of last column 

        let columnComponents = bracketObj.map((pairs, index) => {
            if (index === semiFinalColumn){
                return <Column goldCoordinates={this.state.goldCoordinates} bracket={this.state.bracket} getCoordinates={this.getCoordinates} treeTopPlacement={this.topTreePlacementsPerColumn()[index]} height={this.state.columnHeight} winnerClickHandle={this.winnerClickHandle} pairAmount={pairs.length} name="Semifinals" key={index} columnNumber={index}/>
            }
            else if(index === finalColumn){
                return <Column goldCoordinates={this.state.goldCoordinates} bracket={this.state.bracket} getCoordinates={this.getCoordinates} treeTopPlacement={this.topTreePlacementsPerColumn()[index]} height={this.state.columnHeight} winnerClickHandle={this.winnerClickHandle} pairAmount={pairs.length} name="Finals" key={index} columnNumber={index}/>
            }
            else if(index === firstColumn){
                // return <FirstColumn name="Round 1" winnerClickHandle={this.winnerClickHandle} pairAmount={pairs.length} playerAmount={this.state.seedListFirstColumn.length} seedList={this.state.seedListFirstColumn}/>
            }
            else{
                return <Column goldCoordinates={this.state.goldCoordinates} bracket={this.state.bracket} getCoordinates={this.getCoordinates} treeTopPlacement={this.topTreePlacementsPerColumn()[index]} height={this.state.columnHeight} winnerClickHandle={this.winnerClickHandle} pairAmount={pairs.length} name={`Round ${index+1}`} key={index} columnNumber={index}/>
            }
        })
        columnComponents.shift() // remove the first column 
        return columnComponents
    }

    render(){
        return ( 
            <>
                <div className="Bracket">
                    <FirstColumn goldCoordinates={this.state.goldCoordinates} getCoordinates={this.getCoordinates} treeTopPlacement={this.props.treeSize-(this.props.seedList.length/2)} name="Round 1" winnerClickHandle={this.winnerClickHandle} pairAmount={Math.ceil(this.state.seedListFirstColumn.length/2)} playerAmount={this.state.seedListFirstColumn.length} seedList={this.state.seedListFirstColumn} bracket={this.state.bracket}/>
                    {this.generateColumnComponents()}
                </div>
                {/* Mod
                al */}
                {this.state.modal ? 
                <Modal closeModal={this.closeModal} message={this.state.modalMessage}/>
                :
                null
                }
            </>
        );
  }
}

export default Bracket;
