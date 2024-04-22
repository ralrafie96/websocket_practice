import useWebSocket from "react-use-websocket";
import { WS_URL, isUserEvent } from "../constants";

export function History() {
    const { lastJsonMessage }: any = useWebSocket(WS_URL, {
      share: true,
      filter: isUserEvent
    });
    const activities = lastJsonMessage?.data.userActivity || [];
    return (
      <ul>
        {activities.map((activity: any, index: any) => <li key={`activity-${index}`}>{activity}</li>)}
      </ul>
    );
  }