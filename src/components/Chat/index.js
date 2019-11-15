import React, {useEffect, useState} from 'react';
import client from 'socket.io-client';
import { connect } from 'react-redux'
import moment from 'moment';

let i = 0

function Chat({userInfo}) {
    const [connect, setConnect] = useState('')
    const [message, setMessage] = useState('')
    const [typing, setTyping] = useState('')
    const [users, setUsers] = useState([])
    const [post, setPost] = useState([])
    const socket = client.connect('http://localhost:8080');

    useEffect(() => {
        // replace both componentDidMount and componentDidUpdat
        console.log('connecting...')
        console.log('...')
        socket.on('chat message', function (data) {
            setPost([
                ...post,
                {
                    index: data.index,
                    user: data.user,
                    message:  data.message,
                    datetime:  data.datetime
                }
               
            ])
            setUsers([
                ...new Set([
                    ...users,
                    data.user
                ])
            ])
        });
        socket.on('typing', function (data) {
            setTyping(data)
        });
        socket.on('connect', function (socket) {
            setConnect('connected')
            
        });
    },[post, users])

    const timeoutFunction = () => {
        socket.emit("typing", false);
      }
      let typingtimeout = null
    const sendMsg = (e) => {
        
        if(e.nativeEvent.keyCode === 13){ 
            console.log('sending')
            socket.emit('chat message', {
                index: i++,
                user: userInfo.username,
                message: message,
                datetime: moment(new Date().getTime()).format('HH:mm A')
            });

            setMessage('')
       }
        
    }
    const onInput = (e) => {
       const {value} = e.target
       setMessage(value)
        console.log('typing')
        clearTimeout(typingtimeout);
        socket.emit('typing', userInfo.username);
        typingtimeout = setTimeout(() => {
            timeoutFunction()
        }, 1000)
       
    }
    return (
        <div className="chatroom-wrap">
            <h1>Chat Room <small>{connect}</small></h1>
            <div className="chatroom">
               <div className="joined">
                  {users.length > 0 && users.map((item,index) => {
                      if(item !== userInfo.username) {
                        return (
                            <p key={index}>{item} has joined the chatroom...</p>
                          )
                      }
                  })

                  }
               </div>
               <div className="msg-box">
                <ul>
                       {post.map((item, index) => {
                            return (
                                <li key={index}>
                                <div>
                                   <span>{item.user} <span className="datetime">{item.datetime}</span></span>
                                   <p>{item.message}</p> 
                                    </div>
                                    </li>
                            );
                        })}
                </ul>
               </div>
               <div className="msg-input">
                  {typing && typing !== userInfo.username && (
                      <span className="typing">{typing} is typing ...</span>
                  )}
                  <input type="text" placeholder="say hello" name="message" value={message} onChange={onInput} onKeyPress={sendMsg}/>
               </div>
            </div>
        </div>
    );
}
const mapStateToProps = state => {
    return {
     userInfo: state.user.userInfo
    }
   }
export default connect(mapStateToProps)(Chat);