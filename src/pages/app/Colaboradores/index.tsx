import React from 'react';
import './styles.scss';

/**
 * @function
 * @description returns a list with collaborators
 * @returns React.FC
 */
const Colaboradores: React.FC = () => {
  const projects = [
    {
      name: 'Wesley',
      nameTime: 'aaaaa',
      createAt: '22/11/2020',
      permission: 'VIEW',
    },
  ];

  return (
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Nome do Time</th>
          <th>Criado no Dia</th>
          <th>Permissão</th>
        </tr>
      </thead>
      <tbody>
        {projects.map((project) => (
          <tr key={`${project.name}${project.permission}`}>
            <th>{project.name}</th>
            <th>{project.nameTime}</th>
            <th>{project.createAt}</th>
            <th>{project.permission}</th>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Colaboradores;
