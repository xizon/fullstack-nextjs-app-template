import { useEffect, useState } from 'react';
import UserService from "@/utils/dataservice-user";

const Userinfo = () => {

    const [username, setUsername] = useState<string>('');

    useEffect(() => {

        UserService.getUserName()?.then(function (response) {
            setUsername(response);
        });

    }, []); // Empty array ensures that effect is only run on mount and unmount

    return (
        <>
            {username !== '' ? <><p style={{ color: "green" }}>&#08730; You need to be authorized after successful login to see this information.</p><p>Your user name is: <code>{username}</code></p><hr /></> : null}


        </>
    )
};

export default Userinfo;
