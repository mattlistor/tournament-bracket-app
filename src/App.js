import React, {Component} from 'react';
// import {withRouter, Switch, Route} from 'react-router-dom'
import Sidebar from './Components/Sidebar.js';
import Bracket from './Components/Bracket.js';
// import BracketIndexPage from './Components/BracketIndexPage.js';
import Modal from './Components/Modal.js';
import Signup from './Components/Signup.js';
import Login from './Components/Login.js';
import Welcome from './Components/Welcome.js';

import './App.css';
import './Animations.css'
class App extends Component {
  state = {
    username: "",
    currentSeed: "",
    seedList: [],
    editingSeed: false,
    shuffle: false,
    showBracket: false,
    bracketSeedList: [],
    user: ""
  }

  goToSignup = () => {
    this.props.history.push("/signup")
  }

  goToLogin = () => {
    this.props.history.push("/login")
  }

  fetchUser = (userObj) => {
    fetch("https://dry-wildwood-54834.herokuapp.com/users", {
      method: "POST",
      headers:{
        "Content-Type": "application/json",
        accepts: "application/json"
      },
      body: JSON.stringify({user: userObj})
    })
    .then(res => res.json())
    .then(data => {
      localStorage.setItem("token", data.token)
      this.setState({user: data.user})
      if(userObj.name !== ""){this.props.history.push("/sandbox")}
      else{this.props.history.push("/signup")}
    })
  }

  closeModal = () => {
    this.setState({
        modal: false
    })
  }

  usernameChange = (e) => {
    this.setState({
      username: e.target.value,
      editingSeed: false
    })
  }

  checkbox = (shuffle) => {
    this.setState({
      shuffle: shuffle,
      showBracket: false
    })
  }

  currentSeedChange = (e) => {
    this.setState({
      currentSeed: e.target.value,
      editingSeed: false
    })
  }

  submitSeed = (e) => {
    e.preventDefault()

    if (this.state.currentSeed !== "") {
      this.setState({
        seedList: [...this.state.seedList, this.state.currentSeed],
        username: "",
        editingSeed: false,
        currentSeed: "",
        showBracket: false
      })

      document.getElementById("seedInput").value = ""
    } 

    document.getElementById("seedInput").focus()
  }

  deleteSeed = (index) => {
    let newArray = [...this.state.seedList]
    newArray.splice(index , 1)

    this.setState({
      seedList: newArray,
      showBracket: false
    })

  }

  editSeed = (index) => {
    let newArray = [...this.state.seedList]
    this.setState({
      seedList: newArray,
      editingSeed: true,
      editSeedIndex: index
    })
  }

  submitSeedEdit = (e, newSeedName) => {
    e.preventDefault()
    
    let newArray = [...this.state.seedList]
    newArray[this.state.editSeedIndex] = newSeedName
    
    this.setState({
      editingSeed: false,
      seedList: newArray
    })
}

  componentDidMount(){
    let token = localStorage.getItem("token")
    if(token){
      fetch("https://dry-wildwood-54834.herokuapp.com/api/get_user", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          accepts: "application/json",
          Authorization: `${token}`
        }
      })
      .then(res => res.json())
      .then(data => this.setState({user: data.user}))
    }
  }

  componentDidUpdate(){
    //puts focus on new edit form and makes the initial value of the input field the current seed name
    if (document.getElementById("editSeedForm") !== null){
      document.getElementById("editSeedForm").focus()
      document.getElementById("editSeedForm").value = this.state.seedList[this.state.editSeedIndex]
    } 
  }

  generate = () => {
    let seedList = this.state.seedList
    
    this.setState({
      showBracket: false
    })

    let allowedSeedAmounts = [4, 8, 16, 32, 64]
    if(allowedSeedAmounts.includes(seedList.length)){
      //map out each seed object into 'data' so we can create it all in one bundle
      let bracketSeedList = this.state.seedList.map((seed, index) => {
        return {
          name: seed,
          seed_num: index + 1,
          bracket_id: 1
        }
      })
        
      //creates all seed in one bundle, not one-by-one
      // fetch("https://dry-wildwood-54834.herokuapp.com/seeds", {
      //   method: 'POST', // or 'PUT'
      //   body: JSON.stringify({data}), // data can be `string` or {object}!
      //   headers: {
      //     'Content-Type': 'application/json'
      //   }
      // })
      // .then((res) => res.json())
      // .then((res) => {
      //   // SHUFFLE HAPPENS HERE
      //   if(this.state.shuffle){
      //     res=this.shuffle(res)
      //   }
      //   return res
      // })
      // .then((bracketSeedList) => {
      //   // generate bracket object
      //   let bracket = {
      //     1: seedList.length / 2,
      //   }

      //  generate bracket object
        let bracket = {
          1: seedList.length / 2,
        }

        let pairAmount = seedList.length / 4
        let round = 2 
        let pairAmountPerColumn = [[]]
        while (pairAmount !== 1) {
            pairAmountPerColumn.push(pairAmount)
            bracket[round] = pairAmount
            pairAmount = pairAmount / 2
            round = round + 1
        }
        bracket[round] = 1

        let bracketArray = Object.keys(bracket).map(i => bracket[i])
        let treePlacementSize = bracketArray.reduce((a, b) => a + b, 0) // same as the amount of pairs

        let bracketFinal =  []
        let seedListIndex = 0
        let treePlacement = treePlacementSize - 1 
        
        bracketArray.forEach((columnPairAmount, index) => {
          var i;
          bracketFinal[index] = []
          let top = true

          for (i = columnPairAmount; i > 0; i--) {
            //pushes a PAIR to the index (column) of the array (bracket)            
            let topOrBottom
            if(top){
              topOrBottom = "top"
            }
            else{
              topOrBottom = "bottom"
            }
            let pair = {
              topOrBottom: topOrBottom,
              column: index,
              treePlacement: treePlacement-(i-1),
              top: bracketSeedList[seedListIndex],
              bottom: bracketSeedList[seedListIndex+1],
              interactive: false,
              goldTopOrBottom: "none"
            }
            bracketFinal[index].push(pair)
            top = !top
            seedListIndex = seedListIndex + 2
          }
          treePlacement -= columnPairAmount
        })
        bracketFinal["treePlacementSize"] = treePlacementSize

        this.setState({
          bracket: JSON.stringify(bracketFinal),
          bracketId: bracketFinal.id,
          showBracket: true, 
          bracketSeedList: bracketSeedList,
          treeSize: treePlacementSize
        })

      //   //fetch to create bracket object 
      //   fetch("https://dry-wildwood-54834.herokuapp.com/brackets", {
      //     method: 'POST', // or 'PUT'
      //     body: JSON.stringify(
      //       {
      //       bracket: {
      //         bracket: JSON.stringify(bracketFinal),
      //         user_id: this.state.user.id
      //         }
      //       }
      //     ), 
      //     headers: {
      //       'Content-Type': 'application/json'
      //     }
      //   })
      //   .then(res => res.json())
      //   .then(res => {
      //     this.setState({
      //       bracket: res.bracket,
      //       bracketId: res.id,
      //       showBracket: true, 
      //       bracketSeedList: bracketSeedList,
      //       treeSize: treePlacementSize
      //     })
      //   })
      // })

    }
    if(!allowedSeedAmounts.includes(seedList.length)) {
      let message = `Please enter 4, 8, 16, or 32 seeds.`
      this.showModal(message)
    }
  }

  shuffle = (array) => {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array 
  }

  clear = () => {
    this.setState({
      seedList: [],
      showBracket: false,
      shuffle: false,
      bracketSeedList: [],
    })
  }

  showModal = (message) => {
    this.setState({
      modal: true,
      modalMessage: message
    })
  }

  loginUser = (userObj) => {
    fetch("https://dry-wildwood-54834.herokuapp.com/api/login", {
      method: "POST",
      headers:{
        "Content-Type": "application/json",
        accepts: "application/json"
      },
      body: JSON.stringify({user: userObj})
    })
    .then(res => res.json())
    .then(data => {
      // invalid username or password - then redirects back to login screen
      if(data.errors){
        let message = `Invalid username or password`
        this.showModal(message)
        this.props.history.push("/login") 
      }
      else{
        localStorage.setItem("token", data.token)
        this.setState({user: data.user, shuffle: false})
        // redirect to the bracket generator
        this.props.history.push("/sandbox") 
      }


    })
  }

  logOut = () => {
    localStorage.removeItem("token")
    //reset everything and clear seedlist and bracket display info
    this.setState({
      user: "", 
      showBracket: false,
      bracketSeedList: [],
      seedList:[]
    }) 
    // redirect to the bracket generator
    this.props.history.push("/login") 
  }

  render(){
    return (
      <>
          <Sidebar shuffle={this.state.shuffle} clear={this.clear} showBracket={this.state.showBracket} logOut={this.logOut}seedList={this.state.seedList} generate={this.generate} submitSeedEdit={this.submitSeedEdit} editingSeed={this.state.editingSeed} editSeedIndex={this.state.editSeedIndex} checkbox={this.checkbox} currentSeedChange={this.currentSeedChange} submitSeed={this.submitSeed} editSeed={this.editSeed} deleteSeed={this.deleteSeed}/>  
          
          {this.state.showBracket ?
            <div className="bracket">
              <Bracket seedList={this.state.bracketSeedList} treeSize={this.state.treeSize} bracket={this.state.bracket} bracketId={this.state.bracketId}/>
            </div>
          :
            null
          }

            {this.state.modal ?
            <Modal closeModal={this.closeModal} message={this.state.modalMessage}/>
            :
            null
            }
          </>

    );
  }
  
  // render(){
  //   return (
  //     <>
  //     <Route exact path="/signup" render={(routerProps) => <Signup fetchUser={this.fetchUser} /> }/>
  //     <Route exact path="/login" render={(routerProps) => 
  //       <>
  //         <Login loginUser={this.loginUser} />

  //         {this.state.modal ?
  //         <Modal closeModal={this.closeModal} message={this.state.modalMessage}/>
  //         :
  //         null
  //         }
  //       </>} 
  //     />

  //     <Route exact path="/sandbox" render={(routerProps) => 
  //         <>
  //         <Sidebar shuffle={this.state.shuffle} clear={this.clear} showBracket={this.state.showBracket} logOut={this.logOut}seedList={this.state.seedList} generate={this.generate} submitSeedEdit={this.submitSeedEdit} editingSeed={this.state.editingSeed} editSeedIndex={this.state.editSeedIndex} checkbox={this.checkbox} currentSeedChange={this.currentSeedChange} submitSeed={this.submitSeed} editSeed={this.editSeed} deleteSeed={this.deleteSeed}/>  
          
  //         {this.state.showBracket ?
  //           <div className="bracket">
  //             <Bracket seedList={this.state.bracketSeedList} treeSize={this.state.treeSize} bracket={this.state.bracket} bracketId={this.state.bracketId}/>
  //           </div>
  //         :
  //           null
  //         }

  //           {this.state.modal ?
  //           <Modal closeModal={this.closeModal} message={this.state.modalMessage}/>
  //           :
  //           null
  //           }
  //         </>
  //       }/>

  //      <Route exact path="/" render={(routerProps) => 
  //       <>
  //         <Welcome goToSignup={this.goToSignup} goToLogin={this.goToLogin}/>
  //       </>
  //     }/>
      
  //     </>
  //   );
  // }
}

export default App;
