import React, {useState} from "react"

function UserList({ users }) {



    return (
        <div className="user_list">
            
            {users.map(user => {
                    return (
                    <div key={user.id} className="user">
                        <h2>{user.name}</h2>
                        <p>{user.email}</p>
                        <p>{user.password}</p>
                    </div>
                    )
            })}
        </div>
    )
}

export default UserList;