import React, {Component} from 'react';
class Modal extends Component {


    render(){
        let message = this.props.message
        if(this.props.message === `Please enter 4, 8, 16, or 32 seeds.`){
            message = <>Please enter<br></br>4, 8, 16, or 32 seeds.</>
          }

        return (  
            <div id="myModal" className="modal" onClick={() => this.props.closeModal()}>
            <div className="closeContainer">
                <div className="close" onClick={() => this.props.closeModal()}>&times;</div>
            </div>
                <div id="object" className="fadeIn" onClick={() => this.props.closeModal()}>
                <div className="message">
                    <p>{message}</p>
                </div>                    
                </div>
            </div>
        );
  }
}

export default Modal;
