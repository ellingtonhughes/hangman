import React from 'react';

class ChildComponent extends React.Component {

  constructor(props) {
   super(props);
  }
  
  render(){
   return (
    <div className="child-card">
    
      <button onClick={() => this.props.onAction(this.props.id)}>
        New Game
      </button>

    </div>
  );
 }
}

export default ChildComponent;
