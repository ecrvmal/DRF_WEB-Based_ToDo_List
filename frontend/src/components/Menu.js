

import React from "react";
import '../App.css';
import logout from '../App.js'



const MenuDiv = ({username, status}) => {
    console.log('menu1',username,status)
    if ( username == '_' && status ) {
    username = 'unknown'}
    console.log('menu2',username,status)


    return (
    <div className="Menu-div">
        <nav >
            <ul className="Menu-nav">
                <li className="Menu-li">
                    <a href="/users">Users</a>
                </li>
                <li className="Menu-li">
                    <a href="/projects">Projects</a>
                </li>
                <li className="Menu-li">
                    <a href="/TODO">TODO</a>
                </li>
            </ul>

        </nav>
        <nav>
             <ul className="Menu-nav">
                <li className="Menu-li">
                      { status? username:<p />  }
                </li>
                <li className="Menu-li">
                  {status? <button onClick={()=> logout()}>LogOut</button> :
                           <a href='/login'>LogIn</a>}
                </li>
             </ul>
        </nav>

    </div>

       )
    }


export default MenuDiv