# ready to use Websocket hook based on Socket.IO

## Description

## Basic example

```javascript
import useWebSocket from "mkdm-react-websocket-hook";

export default function App(){
    const {emit, listen, emitAndListen} = useWebSocket({
      url: "https://yourserverurl",
      socketServerPath: "/yoursocketionamespace",
      stateUpdateCallback: (state) => {
          if(state.error){
            console.log(state.error)
          }else if(state.state === "disconnect"){
            console.log(state.reason)
          }else{
            console.log(state.state)
          }
      },
      corsOrigin: "*"
    })

    useEffect(() => {
        listen("pong",(msg) => console.log(msg))
    },[])

    return(
        <View>
          <Button title="Ping !" onPress={() => emit("ping","ping")} >
        </View>
    )
}
```

## Licence
