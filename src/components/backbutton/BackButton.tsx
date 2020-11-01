/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import leftarrow from '../../assets/leftarrow.svg';
import './BackButton.scss';

const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
  return (
    <div className="BackButton">
      <img src={leftarrow} alt="go back" onClick={onClick} />
    </div>
  );
};

interface BackButtonProps {
  onClick?: (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => void;
}

export default BackButton;
