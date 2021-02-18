import { useState, useEffect } from "react";

const ChatAPI = {
    id: null,
    subscribeToFriendStatus(friendID, handleStatusChange) {
        console.log("fuck you");
        this.id = setInterval(() => {
            handleStatusChange({ isOnline: Math.random() > 0.8 })
        }, 3000)
    },

    unsubscribeFromFriendStatus() {
        if (this.id !== null)
            clearInterval(this.id)
    }
}

// 底层 Hooks, 返回布尔值：是否在线
function useFriendStatusBoolean(friendID) {
    const [isOnline, setIsOnline] = useState(null);

    function handleStatusChange(status) {
        setIsOnline(status.isOnline);
    }

    useEffect(() => {
        ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
        return () => {
            ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
        };
    }, []);

    return isOnline;
}

// 上层 Hooks，根据在线状态返回字符串：Loading... or Online or Offline
function useFriendStatusString(props) {
    const isOnline = useFriendStatusBoolean(props.friend.id);

    if (isOnline === null) {
        return "Loading...";
    }
    return isOnline ? "Online" : "Offline";
}

// 使用了底层 Hooks 的 UI
function FriendListItem(props) {
    const isOnline = useFriendStatusBoolean(props.friend.id);

    return (
        <span style={{ color: isOnline ? "green" : "black" }}>{props.friend.name}</span>
    );
}

// 使用了上层 Hooks 的 UI
function FriendListStatus(props) {
    console.log('FriendListStatus')
    const status = useFriendStatusString(props);
    console.log('before render')
    return <span>{status}</span>;
}

const people = [
    { friend: { id: 1, name: "rose", key: 1 } }
]

export default function app() {
    return (
        <>
            <ul>
                {people.map(x => <li key="1">
                    {/* <FriendListItem friend={x} /> */}
                    <FriendListStatus friend={x}/>
                </li>)}
            </ul>
        </>
    )
}