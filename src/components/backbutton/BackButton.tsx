import React from 'react';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import './BackButton.scss';

const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
  return (
    <div className="BackButton" onClick={onClick}>
      <MdKeyboardArrowLeft className="icon" />
    </div>
  );
};

interface BackButtonProps {
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export default BackButton;
