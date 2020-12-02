import React, { useEffect, useState } from "react";
import * as ProjectMemberService from '../../../../services/ProjectMemberService'
import * as AccountService from '../../../../services/AccountService'
import "./index.scss"

const ProjectMembers = () => {

    const [members, setMembers] = useState<ProjectMember[]>([])
    const [accounts, setAccounts] = useState<Map<number, PublicAccount>>(new Map())

    useEffect(() => {
        ProjectMemberService
            .index(19)
            .then(async members_ => {
                const accounts_ = await AccountService
                    .cached
                    .findAndCacheAll(...members_.map(member => member.accountId))

                setAccounts(accounts_)
                setMembers(members_)
            })
    }, [])

    return (
        <form className="Members">

            <table>

                <thead>

                    <tr>

                        <th>Name</th>
                        <th>Email</th>
                        <th>Team Name</th>
                        <th>Permission</th>
                        <th>Create At</th>

                    </tr>

                </thead>
                <tbody>
                    {members.map((member) => {
                        const account = accounts.get(member.accountId);

                        return (
                            <tr key={`${member.accountId}`}>
                                <th>{account?.name}</th>
                                <th>{account?.email}</th>
                                <th></th>
                                <th>{member.permission}</th>
                                <th>{member.createdAt}</th>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

        </form>
    )
}
export default ProjectMembers;
