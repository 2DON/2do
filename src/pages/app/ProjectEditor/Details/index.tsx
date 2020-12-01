import React, { useEffect, useState } from "react";
import { MdViewQuilt } from "react-icons/md";
import { useParams } from "react-router-dom";
import * as ProjectService from '../../../../services/ProjectService'
import '../../../../styles/Named.scss'
import './styles.scss'

const ProjectDetails = () => {
  const { projectId } = useParams<Dict<string>>();
  const [project, setProject] = useState<Project>();
  const [preview, setPreview] = useState<string | undefined>();
  const [updateAvatar, setUpdateAvatar] = useState(false);
  const [errors, setErrors] = useState<Dict<string | undefined>>()

  useEffect(() => {
    ProjectService
      .cached
      .getOrFetch(Number(projectId))
      .then(setProject)
  }, [projectId]);

  useEffect(() => {
    setPreview(project?.icon)
  }, [project])

  function update(form: HTMLFormElement) {
    const icon = new FormData()
    const proj = new FormData(form)

    icon.set('icon', updateAvatar && preview == null ? '  ' : proj.get('icon') as Blob);
    proj.delete('icon')

    Promise.all([
      ProjectService.update(Number(projectId), proj),
      updateAvatar ? ProjectService.updateIcon(Number(projectId), icon) : (async () => undefined)()
    ]).then(([project_, icon]) => {
      if (icon)
        project_.icon = icon.icon

      ProjectService.cached.add(project_)
      setProject(project_)
    })
    .catch(() => {
      form.reset()
      setPreview(project?.icon)
      setUpdateAvatar(false)
    })
  }

  return (
    <form className="ProjectDetails" onSubmit={e => {e.preventDefault(); update(e.currentTarget) }}>
      <label className="Named Icon" onAuxClick={(e => {
          if (e.nativeEvent.button == 2) {
            setPreview(undefined)
            setUpdateAvatar(true)
          }
        })} >
        <span>icon <p>right click to remove</p></span>
        <input
          style={{ display: 'none' }}
          type="file"
          accept="image/x-png,image/jpeg"
          name="icon"
          onChange={(event) => {
            if (!event.target.files || event.target.files.length < 1) return;

            const [image] = event.target.files;

            if (image.size > /* 900KB */ 900000) {
              setErrors({ icon: 'true' })
              return;
            }

            setUpdateAvatar(true)
            setErrors({ ...errors, icon: undefined });
            setPreview(URL.createObjectURL(image));
          }}
        />
        <section>
          {preview ? (
            <img src={preview} alt="avatar" />
          ) : (
            <MdViewQuilt />
          )}
        </section>
      </label>
      {/* <Input /> */}
      <label className="Named Desc">
        <span>Description</span>
        <input
          className="field"
          type="text"
          name="description"
          placeholder="a short(ish) description"
          defaultValue={project?.description}
        />
      </label>
      <label className="Named Obs">
        <span>Observation</span>
        <textarea
          className="field"
          name="observation"
          placeholder="a note, motd, descriptive description"
          defaultValue={project?.observation}
        />
      </label>
      <footer>
        <button className="outlined" type="reset" onClick={() => {
          setPreview(project?.icon)
          setUpdateAvatar(false)
        }}>Reset</button>
        <button className="primary" type="submit">Save</button>
      </footer>
    </form>
  )
}

export default ProjectDetails;
