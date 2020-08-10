export const getAllMessages = async () => {
  const url = `/messages`;
  let res = await fetch(url)

  if(res.status === 200) {
    let json = await res.json()
    return json
  }
}

export const getMessagesForUser = async (username) => {
  const url = `/messages/${username}`;
  let res = await fetch(url)

  if(res.status === 200) {
    let json = await res.json()
    return json
  }
}

export const sendMessage = async (newMessage) => {
      // the URL for the request
      const url = "/messages";

      // Create our request constructor with all the parameters we need
      const request = new Request(url, {
          method: "post",
          body: JSON.stringify(newMessage),
          headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json"
          }
      });

      const res = await fetch(request);

      if(res.status === 200) {
        return res
      } else {
        alert("Message failed to send")
      }
}


export const getConversationsForUser = async (username) => {
  const url = `/conversations/${username}`;
  let res = await fetch(url)

  if(res.status === 200) {
    let json = await res.json()
    return json
  }
}

export const updateConversations = async (username, conversation) => {
    // the URL for the request
    const url = `/conversations/${username}`;
    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: "put",
        body: JSON.stringify(conversation),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    const res = await fetch(request);

    if(res.status === 200) {
      return res
    } else {

    }
}

export const createNewConversation = async(username, conversation) => {
  const url = `/conversations/${username}`;

  // Create our request constructor with all the parameters we need
  const request = new Request(url, {
      method: "post",
      body: JSON.stringify(conversation),
      headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
      }
  });

  const res = await fetch(request);

  if(res.status === 200) {
    return res
  } else {
    console.log("failed creating new conversation")
  }

}

const changeIsReported = async (message, trueOrFalse) => {

  const url = `/messages/${message._id}`;

  // Create our request constructor with all the parameters we need
  const request = new Request(url, {
    method: 'PATCH',
    body: JSON.stringify([{ 'op': 'replace', 'path': '/isReported', 'value': trueOrFalse }]),
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    }
  });

  const res = await fetch(request);
  const updatedMessage = await res.json();
  return updatedMessage;
}


export const unreportMessage = async (message) => {
  return await changeIsReported(message, false);
}


export const reportMessage = async (message) => {
  return await changeIsReported(message, true);
}