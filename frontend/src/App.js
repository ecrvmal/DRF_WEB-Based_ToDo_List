import React from 'react';
import ReactDom from "react-dom";
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import {HashRouter,Route,Routes,BrowserRouter,Link} from "react-router-dom";
//import { browserHistory } from 'react-router'
import Cookies from "universal-cookie";
import { useNavigate , withRouter } from "react-router-dom";

import UserListForm from './components/UsersListForm.js';

import ProjectCreateForm from './components/ProjectCreateForm.js';
import ProjectDetailsForm from './components/ProjectDetailsForm.js';
import ProjectsListForm from './components/ProjectsListForm.js';
import ProjectsSearchForm from './components/ProjectsSearchForm.js';

import TodoListForm from './components/TodoListForm.js';
import TodoCreateForm from './components/TodoCreateForm.js';

import MenuDiv from './components/Menu.js';
import LoginForm from './components/Auth.js';
import FooterDiv from './components/Footer.js';
import BlancPage from  './components/Blanc.js'
import NotFound404 from "./components/NotFound404.js";


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


    createProject(name,user,url) {
         console.log("create project", name, user, url)
         const headers = this.get_headers()
         const data = {project_name: name, project_users:[Number(user)],project_url: url}
//         const my_user = this.state.users.filter((item) =>{ return  [Number(+user)].includes(item.id) } );
//         console.log ('users', this.state.users)
//        console.log('user ', user, my_user)
         axios.post('http://178.21.10.181:8000/api/projects/',data,{headers}).
            then(response => {
                let new_project= response.data
                this.setState({projects:[...this.state.projects, new_project]})
                        })
            .catch(error => {console.log(error)})
    }

    deleteProject(id) {
        const headers = this.get_headers()
        axios.delete(`http://178.21.10.181:8000/api/projects/${id}`, {headers: headers})
            .then(response =>{
                this.setState({projects:this.state.projects.filter((item) =>item.id !== id)})
        }).catch(error => console.log(error))
    }



    createTodo(text,author,project) {
         console.log("create Todo", text,author,project)
         const headers = this.get_headers()
         author = Number(author)
         const data = {note_text: text, note_active: true, note_author: author, note_project: project}
//         const my_author = this.state.users.filter((item) =>{ return  [Number(author)].includes(item.id) } );
//         console.log ('users', this.state.users)
//         console.log('author ', author, my_author)
//         console.log('data =' ,data)
         axios.post('http://178.21.10.181:8000/api/todo/',data,{headers}).
            then(response => {
                let new_todo= response.data
                this.setState({TODOList:[...this.state.TODOList, new_todo]})
                        })
            .catch(error => {console.log(error)})
    }


    deleteTodo(id) {
        const headers = this.get_headers()
        axios.delete(`http://178.21.10.181:8000/api/todo/${id}`, {headers: headers})
            .then(response =>{
                this.setState({TODOList:this.state.TODOList.filter((item) =>item.id !== id)})
        }).catch(error => console.log(error))
    }



    load_data() {
        const headers = this.get_headers()
        console.log('load_data')
        axios.get('http://178.21.10.181:8000/api/users/',{headers}).then(response => {
            this.setState(
                {
                    'users': response.data
                },()=>console.log("users",this.state.users)
            )
        }).catch(error => console.log(error))

        axios.get('http://178.21.10.181:8000/api/projects/',{headers}).then(response => {
            this.setState(
                {
                    'projects': response.data
                },()=>console.log("projects",this.state.projects)
            )
        }).catch(error => console.log(error))

        axios.get('http://178.21.10.181:8000/api/todo/',{headers}).then(response => {
            this.setState(
                {
                    'TODOList': response.data
                },()=>console.log("TODOlist",this.state.TODOList)
            )
        }).catch(error => console.log(error))

    }

    get_token(username, password) {
        axios.post('http://178.21.10.181:8000/api-token-auth/',
            {'username': username, 'password': password})
            .then(response => {
//              console.log(response.data['token'])
                this.set_token(response.data['token'])
                this.setState({'username': username}, ()=>{
                    console.log("username",this.state.username)})
//                changes url without reloading
                window.history.replaceState(null, null, '/users')

            }).catch(error => alert('Не верный логин или пароль'))


            }

    set_token(token) {
        console.log('set_token')
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token': token}, () => {
        console.log("token",this.state.token)
        this.load_data()})
    }

    is_auth(){
            console.log('is_auth', this.state.token)
        if (this.state.token === "") {
        return false }
        else {
        return true
        }
    }

    get_headers(){
        console.log('get_headers')
        let headers = {
        'Content-Type':'application/json'
        }
        if(this.is_auth()){
            headers['Authorization'] = `Token ${this.state.token}`
        }
        return headers
    }

    logout() {
        console.log('logout')
//        this.setState({token : ""})
        this.setState({username:'_'},()=>console.log("username",this.state.username))
        this.setState({token:''},()=>console.log("token",this.state.token))
//        this.state.token = ""
//        this.state.username = "_"
        const cookies = new Cookies()
        cookies.set("token", "")
        cookies.set("username", "")
        window.location.replace('http://178.21.10.181:80');
    }

    get_token_from_cookies(){
        const cookies = new Cookies()
        const token = cookies.get('token')

        console.log('get_token_from_cookies token : ',token)
    }

    componentDidMount() {
        this.get_token_from_cookies()
    }

    render () {
        return (
        <div>
            <BrowserRouter>
                <nav>
                    <MenuDiv username={this.state.username} status={this.is_auth()} logout={() => this.logout()}/>
                    <Routes>
                        <Route exact path="/" element={<UserListForm users={this.state.users}/>}/>

                        <Route path="/users" element={<UserListForm users={this.state.users}/>}/>

                        <Route path="/projects" element={<ProjectsListForm
                            projects={this.state.projects}
                            users={this.state.users}
                            deleteProject={(id)=> this.deleteProject(id)}
                            />}/>

                        <Route path="/project/:id" element={
                            <ProjectDetailsForm
                                projects={this.state.projects}
                                users={this.state.users}
                            />}/>

                        <Route path="/project/create" element={
                            <ProjectCreateForm
                                users={this.state.users}
                                createProject={(name,user,url)=> this.createProject(name,user,url)}/>}/>

                        <Route path="/project/search" element={<ProjectsSearchForm
                            projects={this.state.projects}
                            users={this.state.users}
                            />}/>

                        <Route path="/todos" element={
                            <TodoListForm
                                todolist={this.state.TODOList}
                                projects={this.state.projects}
                                users={this.state.users}
                                deleteTodo={(id)=> this.deleteTodo(id)}
                            />}/>

                        <Route path="/todo/create" element={
                            <TodoCreateForm
                                users={this.state.users}
                                projects={this.state.projects}
                                createTodo={(text,author,project)=> this.createTodo(text,author,project)}/>}/>

                        <Route path="/login" element={<LoginForm
                            get_token={(username, password) => this.get_token(username, password)}/>}/>

                        {/* <Route exact path='/logout' component={() => { this.logout();
                        <LoginForm get_token={(username, password) => this.get_token(username, password)}/>
                            }}/>   */}

                        <Route path="*" element={NotFound404}/>
                    </Routes>
                    <FooterDiv />
                </nav>
            </BrowserRouter>
        </div>

        );
    }

}

export default App;
