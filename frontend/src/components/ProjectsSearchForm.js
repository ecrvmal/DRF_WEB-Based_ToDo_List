import React from "react";
import '../App.css';
import {Link} from "react-router-dom";
import {useParams} from "react-router-dom";


const ProjectItem = ({project}) => {
    return (
    <tr>
        <td>
             {project.project_name}
        </td>
        <td>
            {project.project_users}
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

const selected_projects = (my_string,projects) => {
    console.log('all_projects' , projects)
     if (my_string === "") {
        return projects
     } else {
        return projects.filter(project => project.project_name.includes(my_string))
        }
    }



class ProjectsSearchForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            'proj':[],
        }}


    handleChange(event) {
        this.setState(
        {[event.target.name]: event.target.value})
        }

    handleSubmit(event) {
       let a = selected_projects(this.state.my_string,this.props.projects)
       this.setState({'proj': [ ...a]})
       event.preventDefault()
       }


    render() {
        return(
        <div>
            <form onSubmit={(event)=> this.handleSubmit(event)}>
                <div className = {"form-group input_line" }>
                    <label className = {"input_field1"} form={"name"}>String to Search</label>
                    <input type="text" className="form-control input_field2"
                        name="my_string" value={this.state.my_string}
                        onChange={(event)=>this.handleChange(event) }/>
                </div>
                <div className="form-group input_line">
                <input type="submit" className="btn btn-primary mrgn20"
                        name="project" value="Search" />
                <input type="reset" className="btn btn-primary mrgn20"
                        name="project" value="Clear" />
                </div>
            </form>

            <table>
                <tbody>
                    <tr>
                        <th>
                            Project name
                        </th>
                        <th>
                            Project Users
                        </th>
                        <th>
                            Date Created
                        </th>
                        <th>
                            Project URL
                        </th>
                    </tr>
                {this.state.proj.map((project) => <ProjectItem project={project} /> )}
                  {/*   for(let i=0; i< this.state.s_projects.length; i++) {
                    <ProjectItem( {this.state.s_projects[i]})/>
                    }

                     {this.state.s_projects.map((v) => {console.log(v) })}
                           */}



                </tbody>
            </table>
        </div>
        )}
    }

export default ProjectsSearchForm
