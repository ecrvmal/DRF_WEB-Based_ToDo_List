import React from "react";
import '../App.css';
import {useParams} from "react-router-dom";
import axios from 'axios';
import {HashRouter,Route,BrowserRouter,Link,Switch,Redirect} from "react-router-dom";


let usernames =""

const ProjectData = ({project, users})  => {
    console.log( "projectData works");
    console.log('project ', project);
 const usr_indexes = project.project_users;
console.log('usr_indexes   ', usr_indexes);
  const proj_users = users.filter((item) =>{
               return   usr_indexes.includes(item.id)
                } );
                console.log('proj_users  ', proj_users);
              usernames =  proj_users.map((usr) => {
                  return usr.first_name}).join(', ')
                                  console.log('usernames ', usernames);

return (
    <tr>
        <td>
             {project.project_name}
        </td>
        <td>
            {usernames}
        </td>
        <td>
            {project.project_date_created}
        </td>
        <td>
            {project.project_url}
        </td>
    </tr>

    )
}

const ProjectDetails = ({projects, users}) => {
     let {id} =  useParams()
//      console.log('project details works, id =  ', parseInt(id))
//      console.log('projects =  ', projects)
      let project = projects.filter((project, index) => index === parseInt(id))
//      let project = projects.filter [parseInt(id)]
 //      console.log('project ', project)


    return(
        <table>
            <th>
                Project_Name
            </th>
               <th>
                Members
            </th>
               <th>
                Date of creation
            </th>
          { project.map((project) => <ProjectData project={project} users={users}/>)}
        </table>
    )

    }

export default ProjectDetails