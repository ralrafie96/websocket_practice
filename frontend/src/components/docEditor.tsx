import useWebSocket from "react-use-websocket";
import { WS_URL, isDocumentEvent } from "../constants";
import DefaultEditor from "react-simple-wysiwyg";

export function DocEditor() {
    const { lastJsonMessage, sendJsonMessage }: any = useWebSocket(WS_URL, {
      share: true,
      filter: isDocumentEvent
    });
  
    let html = lastJsonMessage?.data.editorContent || '';
  
    function handleHtmlChange(e: any) {
      sendJsonMessage({
        type: 'contentchange',
        content: e.target.value
      });
    }
  
    return (
      <DefaultEditor value={html} onChange={handleHtmlChange}/>
    );
  }