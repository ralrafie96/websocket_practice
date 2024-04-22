import useWebSocket from "react-use-websocket";
import { WS_URL, isUserEvent } from "../constants";
import Avatar from 'react-avatar';
import {
    UncontrolledTooltip
} from 'reactstrap';

export function Users() {
    const { lastJsonMessage }: any = useWebSocket(WS_URL, {
        share: true,
        filter: isUserEvent
    });
    console.log(lastJsonMessage)
    const users = Object.values(lastJsonMessage?.data.users || {});
    return (
        <>
            {users.map((user: any) => (
                <div key={user.username}>
                    <span id={user.username} className="userInfo" key={user.username}>
                        <Avatar name={user.username} size="40" round="20px" />
                    </span>
                    <UncontrolledTooltip placement="top" target={user.username}>
                        {user.username}
                    </UncontrolledTooltip>
                </div>
            ))}
        </>
    )
}