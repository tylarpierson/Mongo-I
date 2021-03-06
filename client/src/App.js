import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import FriendList from './components/friend/FriendList';
import FriendForm from  './components/friend/FriendForm';
class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            friends: []
        }

    }

    componentDidMount() {
        this.getdata();
    }

    getdata() {
        axios.get('http://localhost:5000/api/friends')
            .then(friend => {
                this.setState({friends: friend.data})
            })
    }

    componentDidUpdate() {
      // this.getdata();
    }

    deleteFriend = (event) => {

        const _id = event.target.id;
        console.log(_id);
        axios.delete(`http://localhost:5000/api/friends/${_id}`)
            .then(friend => {
                console.log(friend);
            });


    };

    addFriend =(firstName, lastName, age) => {
        console.log(firstName);
         const newFriend = { firstName: firstName, lastName: lastName, age: age };

         axios.post('http://localhost:5000/api/friends', newFriend).then(response => {
             console.log(response);
            //  this.setState({ friends: newFriends });
         }).catch(err => {
             console.log('error adding friend');
         }); 
    };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
          {/*<ul>*/}
              {/*{this.state.friends.map((friend) => {*/}
                  {/*return <li>{`${friend.firstName} ${friend.lastName}`}</li>*/}
              {/*})}*/}
          {/*</ul>*/}
          <FriendList friends={this.state.friends} onDelete={this.deleteFriend}/>
          <FriendForm onSubmit={this.addFriend}/>
      </div>
    );
  }
}

export default App;
