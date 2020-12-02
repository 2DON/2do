import React, { useEffect, useRef, useState } from "react"
import * as ProjectService from '../../../../services/ProjectService'
import { Chart } from 'chart.js'
import { useParams } from "react-router-dom"
import './styles.scss'
import { GoSignOut } from "react-icons/go"

const ProjectStats = () => {
  const canvas = useRef<HTMLCanvasElement | null>(null)
  const { projectId } = useParams<Dict<string>>()
  const [stats, setStats] = useState<ProjectStats>();

  useEffect(() => {
    ProjectService.stats(Number(projectId)).then(setStats)
  }, [projectId])

  useEffect(() => {
    if (!stats || !canvas.current) return

    canvas.current.width = window.innerWidth * .8
    canvas.current.height = window.innerHeight * .6

    const labels = stats.week.map(day => day.date)

    const created = stats.week.map(day => day.created)
    const updated = stats.week.map(day => day.updated)

    new Chart(canvas.current, {
      type: 'bar',
      data: {
        labels,
        datasets: [
            {
              label: 'created',
              backgroundColor: "#fff",
              data: created
            },
            {
              label: "updated",
              backgroundColor: "#b4b4b4",
              data: updated
            },
        ]
    },
      options: {
        scales: {
          xAxes: [{
            stacked: true
          }],
          yAxes: [{
              stacked: true
          }]
        }
      }
    })
  }, [stats, canvas])

  return (
    <div className="ProjectStats">
      <canvas id="graph" ref={canvas} />
    </div>
  )
}

export default ProjectStats
