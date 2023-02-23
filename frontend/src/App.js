import React from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import UserList from './components/Users.js'
import ProjectList from './components/Projects.js'
import TODOList from './components/TODO.js'
// import ProjectDetails from './components/ProjectDetails.js'
import FooterDiv from './components/Footer.js'
import MenuDiv from './components/Menu.js'
import NotFound404 from "./components/NotFound404.js";
import {HashRouter,Route,BrowserRouter,Link,Switch,Redirect} from "react-router-dom";



class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users':[],
            'projects':[],
            'TODOList':[],
        }
    }

    componentDidMount() {
//        const users = [
//            {
//            'first_name': "Fedor",
//            'last_name' : "Dostoevskiy",
//            "birthday_year" : 1821,
//            "email_address": "Fedor@mail.ru",
//            },
//            {
//            'first_name': "Aleksander",
//            'last_name' : "Grin",
//            "birthday_year" : 1880,
//            "email_address": "Alex@yandex.ru",
//            },
//        ]
//
//        this.setState({
//            'users':users
//            })


        axios.get('http://127.0.0.1:8000/api/users/').then(response => {
            this.setState(
            {
                'users':response.data
            }
            )}
        ).catch(error => console.log(error) )

                axios.get('http://127.0.0.1:8000/api/projects/').then(response => {
            this.setState(
            {
                'projects':response.data
            }
            )}
        ).catch(error => console.log(error) )

                axios.get('http://127.0.0.1:8000/api/TODO/').then(response => {
            this.setState(
            {
                'TODOList':response.data
            }
            )}
        ).catch(error => console.log(error) )
    }

    render () {
        return (
            <div>
            < MenuDiv />
                <BrowserRouter>
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

                          <Route component={NotFound404}/>
                    </Switch>
                </BrowserRouter>
            < FooterDiv />
            </div>
        );
    }
}


export default App;
