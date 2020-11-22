import React from 'react';

const TeamMember: React.FC = () => {
    const teams = [{ account: '4', name: 'Wesley', email: 'wesley@gmail.com', createAt: '22/11/2020' }]


    return (
        <table>
            <thead>
                <tr>
                    <th>Código da Conta</th>
                    <th>Nome do Usuário</th>
                    <th>Email do Usuário</th>
                    <th>Adicionado no Dia</th>
                </tr>
            </thead>
            <tbody>
                {teams.map(teams => (
                    <tr>
                        <th>{teams.account}</th>
                        <th>{teams.name}</th>
                        <th>{teams.email}</th>
                        <th>{teams.createAt}</th>
                    </tr>
                ))}

            </tbody>
        </table>
    );

};

export default TeamMember;