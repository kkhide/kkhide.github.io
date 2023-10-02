import React from 'react';
import { useState } from 'react';
import { request } from '../../utils/request';
import Layout from '../Layout';

const Users = () => {
    const [users, setUsers] = useState([]);

    const handleGetUsers = async () => {
        const fetchUsers = await request.users();
        setUsers(fetchUsers);
    };
    return (
        <>
            <Layout>
                <button onClick={handleGetUsers}>Получить</button>
                {users.map((item, index) => {
                    return <li key={index}>{item.email}</li>;
                })}
            </Layout>
        </>
    );
};

export default Users;
