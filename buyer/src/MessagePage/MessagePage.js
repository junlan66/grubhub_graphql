import React from "react";
import "./style.css";
import axios from "axios";
const DUMMY_DATA = [
  {
    senderId: "perborgen",
    text: "who'll win?"
  },
  {
    senderId: "janedoe",
    text: "who'll win?"
  },
  {
    senderId: "Junlan",
    text: "hello"
  }
];
class MessagePage extends React.Component {
  constructor(props) {
    super(props);
    const { data } = this.props.location;
    console.log("print data here");
    // console.log(data._id);
    this.state = {
      fake_messages: DUMMY_DATA,
      messages: [],
      orderId: data._id
    };

    // axios
    //   .get("http://localhost:4000/api/buyer/messages/getTextbox", {
    //     params: {
    //       orderId: data._id
    //     }
    //   })
    //   .then(response => {
    //     this.setState({
    //       messages: this.state.messages.concat(response.data)
    //     });
    //   });
  }
  componentDidMount() {
    var self = this;
    const { data } = this.props.location;
    setInterval(function() {
      axios
        .get("http://localhost:4000/api/buyer/messages/getTextbox", {
          params: {
            orderId: data._id
          }
        })
        .then(response => {
          self.setState({
            messages: response.data
          });
        });
    }, 1000);
  }

  render() {
    return (
      <div className="app">
        <Title />
        <MessageList
          orderId={this.state.orderId}
          messages={this.state.messages}
        />
        <SendMessageForm orderId={this.state.orderId} />
      </div>
    );
  }
}
class MessageList extends React.Component {
  render() {
    return (
      <ul className="message-list">
        {this.props.messages.map((message, index) => {
          return (
            <li key={message.id} className="message">
              <div>{message._id}</div>
              <div>{message.message}</div>
            </li>
          );
        })}
      </ul>
    );
  }
}
class SendMessageForm extends React.Component {
  constructor(props) {
    super(props);
    const orderId = this.props.orderId;
    this.state = {
      message: "",
      orderId: orderId
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      message: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    var new_messages = this.state.message;
    console.log(new_messages);

    const orderId = this.state.orderId;
    console.log("print orderId");
    console.log(this.state.orderId);

    axios
      .get("http://localhost:4000/api/buyer/messages/textbox", {
        params: {
          // send to backend
          messages: new_messages,
          orderId: orderId
        }
      })
      .then(response => {
        //get from backend
        console.log(response);
      });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="send-message-form">
        <input
          onChange={this.handleChange}
          value={this.state.message}
          placeholder="Type your message and hit ENTER"
          type="text"
        />
      </form>
    );
  }
}

function Title() {
  return <p className="title">My Chat Room</p>;
}
export default MessagePage;
