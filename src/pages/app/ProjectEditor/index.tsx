import React from "react"
import { BiEdit } from "react-icons/bi"
import { GrGroup } from "react-icons/gr"
import { GoGraph } from "react-icons/go"
import { MdKeyboardArrowLeft } from "react-icons/md"
import { Link, NavLink, Redirect, Route, Switch, useParams } from "react-router-dom"
import { project_path } from "../../../pages"
import ProjectDetails from "./Details"
import ProjectMembers from "./Members"
import ProjectStats from "./Stats"
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
          children={<><GoGraph />Stats</>}

          className="Link"
          activeClassName={activeClassName}
          to={`${path}/edit/stats`}
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
          <Route path={`${project_path}/edit/stats`} component={ProjectStats} />
          <Route path={`${project_path}/edit/members`} component={ProjectMembers} />
          <Redirect to={`${path}/edit/details`} />
        </Switch>
      </main>
    </div>
  )
}

export default ProjectEditor
