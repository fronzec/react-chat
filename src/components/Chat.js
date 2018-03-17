import React from "react";
import io from 'socket.io-client'


class Chat extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            username: props.username,
            message: '',
            messages: []
        };

        ///Nos conectamos al servidor
        this.socket = io('localhost:8080')


        ///Para controlar la recepcion de mensajes
        this.socket.on('RECEIVE_MESSAGE', function(data){
            addMessage(data);
        });
        const addMessage = data => {
            // console.log(data);
            this.setState({messages: [...this.state.messages, data]});
            // console.log(this.state.messages);
        };



        ///Envio de mensajes
        this.sendMessage = ev => {
            let idMessage = Date.now();
            let d = new Date();
            d.setTime(idMessage);
            let humanDate  = d.toString()
            console.log(humanDate);
            ev.preventDefault();
            // noinspection JSAnnotator
            this.socket.emit('SEND_MESSAGE', {
                author: this.state.username,
                message: this.state.message,
                idMessage: idMessage,
                timestamp:  humanDate
            });
            this.setState({message: ''});
        }

    }
    render(){
        return (
            <div className="container">
                <div className="row justify-content-md-center ">
                    <div className="col-6">
                        <div className="card">
                            <div className="card-body">
                                <div className="card-title">Chat...</div>
                                <hr/>
                                <div className="list-group">
                                    {this.state.messages.map(message => {
                                        return (

                                            <a key={message.idMessage} className="list-group-item list-group-item-action flex-column align-items-start">
                                                <div className="d-flex w-100 justify-content-between">
                                                    <h4 className="mb-1">{message.author}: {message.message}</h4>
                                                </div>
                                                <small className="text-muted">{message.timestamp}</small>
                                            </a>
                                        )
                                    })}
                                </div>
                                <hr/>
                                <div className="footer">
                                    <input type="text" placeholder="Username" value={this.state.username}
                                           onChange={ev => this.setState({username: ev.target.value})}
                                           className="form-control"/>
                                    <br/>
                                    <input type="text" placeholder="Message" className="form-control" value={this.state.message}
                                           onChange={ev => this.setState({message: ev.target.value})}/>
                                    <br/>
                                    <button onClick={this.sendMessage} className="btn btn-primary form-control">Send</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Chat;