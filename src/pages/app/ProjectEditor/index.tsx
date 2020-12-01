import React from "react"
import { BiEdit } from "react-icons/bi"
import { GrGroup } from "react-icons/gr"
import { MdKeyboardArrowLeft } from "react-icons/md"
import { Link, NavLink, Redirect, Route, Switch, useParams, useRouteMatch } from "react-router-dom"
import { project_path } from "../../../pages"
import ProjectDetails from "./Details"
import './styles.scss'

const activeClassName = 'active'

const ProjectEditor = () => {
  const { projectId } = useParams<Dict<string>>();
  const path = project_path.replace(/:projectId/, projectId)

  return (
    <div className="ProjectEditor">
      <header className="Menu">
        <Link
          className="Back"
          children={<MdKeyboardArrowLeft />}
          to={path}
        />
        <NavLink
          children={<><BiEdit />Details</>}

          className="Link"
          activeClassName={activeClassName}
          to={`${path}/edit/details`}
        />
        <NavLink
          children={<><GrGroup />Members</>}

          className="Link"
          activeClassName={activeClassName}
          to={`${path}/edit/members`}
        />
      </header>
      <main>
        <Switch>
          <Route path={`${project_path}/edit/details`} component={ProjectDetails} />
          <Route path={`${project_path}/edit/members`} component={() => <h1>Members</h1>} />
          <Redirect to={`${path}/edit/details`} />
        </Switch>
      </main>
    </div>
  )
}

export default ProjectEditor
