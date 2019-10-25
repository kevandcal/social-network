export default function reducer(state = {}, action) {
    if (action.type === "GET_ANIMALS") {
        // then change redux state (immutably!)
        console.log("GET_ANIMALS in reducer: ", action);
        state = {
            ...state,
            cuteAnimals: action.cuteAnimals
        };
    }
    if (action.type === "GET_FRIENDS_AND_WANNABES") {
        console.log("GET_FRIENDS_AND_WANNABES in reducer: ", action);
        const { friendsWannabes } = action;
        state = {
            ...state,
            friendsWannabes
        };
    }
    if (action.type === "ACCEPT_WANNABE") {
        console.log("ACCEPT_WANNABE in reducer: ", action);
        state = {
            ...state,
            friendsAndWannabes: state.friendsAndWannabes.map(fw => {
                if (fw.id === action.id) {
                    return {
                        ...fw,
                        accepted: true
                    };
                } else {
                    return fw;
                }
            })
        };
    }
    if (action.type === "REMOVE_FRIEND") {
        console.log("REMOVE_FRIEND in reducer: ", action);
        state = {
            ...state,
            friendsAndWannabes: state.friendsAndWannabes.filter(fw => {
                return fw.id != action.id;
            })
        };
    }
    if (action.type === "GET_MESSAGES") {
        console.log("GET_MESSAGES in reducer: ", action);
        state = {
            ...state,
            messages: action.messages
        };
    }
    if (action.type === "GET_MESSAGE") {
        console.log("GET_MESSAGE in reducer: ", action);
        state = {
            ...state,
            messages: [...state.messages, action.message]
        };
    }
    return state;
}
