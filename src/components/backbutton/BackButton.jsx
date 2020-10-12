/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import PropTypes from 'prop-types'
import React from 'react'
import leftarrow from '../../assets/leftarrow.svg'
import './BackButton.scss'

function BackButton({ onClick }) {
  return (
    <div className="BackButton">
      <img src={leftarrow} alt="go back" onClick={onClick} />
    </div>
  )
}

BackButton.propTypes = {
  onClick: PropTypes.func,
}

BackButton.defaultProps = {
  onClick: undefined,
}

export default BackButton
