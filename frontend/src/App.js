import React from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import UserList from './components/Users.js'
import ProjectList from './components/Projects.js'
import TODOList from './components/TODO.js'
import ProjectDetails from './components/ProjectDetails.js'
import FooterDiv from './components/Footer.js'
import MenuDiv from './components/Menu.js'
import LoginForm from './components/Auth.js'
import NotFound404 from "./components/NotFound404.js";
import {HashRouter,Route,BrowserRouter,Link,Switch,Redirect} from "react-router-dom";
import Cookies from "universal-cookie";
<<<<<<< HEAD
import BlancPage from  './components/Blanc.js'
=======
>>>>>>> parent of 9b58dd3... Lesson7 Homework Comlete



class App extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            'users':[],
            'projects':[],
            'TODOList':[],
            'token':'',
            'username':'_',
        }
    }




    load_data() {
        const headers = this.get_headers()
        console.log('load_data')
        axios.get('http://127.0.0.1:8000/api/users/',{headers}).then(response => {
            this.setState(
                {
                    'users': response.data
                }
            )
        }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/projects/',{headers}).then(response => {
            this.setState(
                {
                    'projects': response.data
                }
            )
        }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/TODO/',{headers}).then(response => {
            this.setState(
                {
                    'TODOList': response.data
                }
            )
        }).catch(error => console.log(error))

    }

    get_token(username, password) {
        console.log('get_token usern', username)
        this.setState({username: username})
        console.log('get_token ',this.state.username)
        axios.post('http://127.0.0.1:8000/api-token-auth/',
            {'username': username, 'password': password})
            .then(response => {
                this.set_cookies(response.data['token'],username);
            }).catch(error => alert('Не верный логин или пароль'))
            console.log(' state',this.state.username , this.state.token)
            window.location.replace('http://127.0.0.1:3000/users');

}

    set_cookies(token, username) {
        console.log('set_token',token)
        // localStorage.setItem('token',token)
        // let item = localStorage.getItem('token')
        const cookies = new Cookies()
        cookies.set('token', token)
        cookies.set('username', username)
        this.setState({token: token},()=>this.load_data())
    }

    is_auth(){
            console.log('is_auth')
        return !!this.state.token
    }

    get_headers(){

        let headers = {
        'Content-Type':'applications/json'
        }

        if(this.is_auth()){
            headers['Authorization'] = `Token ${this.state.token}`
        }
        return headers
    }

    logout() {
                console.log('logout')
        this.set_token('')
         this.setState({username:''})
         window.location.replace('http://127.0.0.1:3000/login');
    }

    get_token_from_cookies(){
        console.log('get_token_from_cookies')
        const cookies = new Cookies()
        const username = cookies.get('username')
        if (!(username == '_')) {this.setState({'username': username}) }
        console.log('get_token_from_cookies username ',this.state.username)
        const token = cookies.get('token')
        console.log('get_token_from_cookies token',token)
        if (token) {this.setState({'token': token},()=>this.load_data())}
        else {}

    }




    componentDidMount() {
                    console.log('componentDidMount')
        this.get_token_from_cookies()
    }

    render () {
        return (

                <BrowserRouter>
                                <alert return />
                     {/* <Route component={
                            () => <MenuDiv username={this.state.username} status={this.is_auth()}  />}/> */}
                     <MenuDiv username={this.state.username} status={this.is_auth()}  />
                    <Switch>

                      <Route exact path="/" component={
                            () => <UserList users={this.state.users}/>}/>

                      <Route exact path="/users" component={
                            () => <UserList users={this.state.users}/>}/>

                      <Route exact path="/projects" component={
                            () =>  <ProjectList
                            projects={this.state.projects}
                            users={this.state.users}
                            />}/>

                      <Route exact path="/TODO" component={
                            () =>  <TODOList
                                todolist={this.state.TODOList}
                                projects={this.state.projects}
                                users={this.state.users}
                            />}/>

                       <Route path="/project/:id" component={
                            () =>  <ProjectDetails
                                projects={this.state.projects}
                                users={this.state.users}
                            />}/>

                       <Route exact path='/login' component={() => <LoginForm
                            get_token={(username, password) => this.get_token(username, password)}/>}/>

                        <Route exact path='/logout' component={() => { this.logout();
                        <LoginForm get_token={(username, password) => this.get_token(username, password)}/>
                            }}/>

                          <Route component={NotFound404}/>
                    </Switch>
                    <FooterDiv />
                </BrowserRouter>


        );
    }
}


export default App;
