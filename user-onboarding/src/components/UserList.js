import React from "react"

function UserList({ users }) {

    console.log(users)


    return (
        <div>
            
            {users.map(user => {
                    return (
                    <div>
                        <h2>{user.name}</h2>
                        <p>{user.email}</p>
                    </div>
                    )
            })}
        </div>
    )
}

export default UserList;