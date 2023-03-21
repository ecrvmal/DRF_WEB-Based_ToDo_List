import React from "react";
import '../App.css';
import {Link} from "react-router-dom";
import {useParams} from "react-router-dom";

const TodoItem = ({itemnote,users,projects,deleteTodo}) => {

    let activity =''
    let author_name = ''
    let project_name = ''

     if (itemnote.note_active) {activity = 'active';}
        else {activity= 'Non-active';}

     if (itemnote.note_author) {
        const author = users[itemnote.note_author]
//        console.log(author);
        try {
        author_name = author.first_name
        } catch(err) {
         author_name ="Not Defined"}}

     if (itemnote.note_project) {
//     console.log('itemnote.note_project   ', itemnote.note_project);
//     console.log('projects  ', projects);
        const project = projects.filter((project) => project.id === itemnote.note_project )
//        console.log('project   ',project);
        try {
        project_name = project.project_name
        } catch(err) {
         project_name ="Not Defined"}}


    return (
    <tr>
        <td>
            {itemnote.note_text}
        </td>
        <td>
            {author_name}
        </td>
        <td>
            {itemnote.note_daytime_created}
        </td>
        <td>
            {activity}
        </td>
        <td>
            {project_name}
        </td>
          <td>
            <button onClick={()=> deleteTodo(itemnote.id)}type='button'>Delete</button>
        </td>
    </tr>

    )
 }


const TodoListForm = ({todolist,projects,users,deleteTodo}) => {
    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <th>
                            Text
                        </th>
                        <th>
                            Author
                        </th>
                        <th>
                            Created at
                        </th>
                        <th>
                            Active
                        </th>
                        <th>
                            Used in Project
                        </th>
                    </tr>
                    {todolist.map((note) => <TodoItem
                        itemnote = {note}
                        users = {users}
                        projects = {projects}
                        deleteTodo={deleteTodo}
                        />)}
                </tbody>
            </table>

            <Link to="/todo/create" className="link_btn">
                New TODO
            </Link>
        </div>
       )
    }


export default TodoListForm