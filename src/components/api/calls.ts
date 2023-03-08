export const getConversations = (loggedUserId, userToken) => {
  return fetch(`http://localhost:3005/conversations/${loggedUserId}`, { 
    headers: { 'Authorization': userToken }
  }).then(res => res.json());
}

export const getMessages = (conversationId) => {
  return fetch(`http://localhost:3005/messages/${conversationId}`).then(res => res.json());
}

export const getConversation = (conversationId) => {
  return fetch(`http://localhost:3005/conversation/${conversationId}`).then(res => res.json());
}

export const getUser = (userId) => {
  return fetch(`http://localhost:3005/user/${userId}`).then(res => res.json());
}

export const addMessage = ({conversationId, data}) => {
  return fetch(`http://localhost:3005/messages/${conversationId}`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).then(res => res.json())
}