import React from "react";
import { FiUser } from "react-icons/fi";


const Avatar: React.FC<{url?: string}> = ({url}) => {
  return url ? (
    <img className="Avatar" src={url} alt="Avatar" />
  ) : (
    <FiUser className="Avatar" />
  )
}

export default Avatar;
