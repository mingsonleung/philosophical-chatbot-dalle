export async function getChatCompletion(userMessage) {
  
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
  };

  const payload = {
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "Please provide a philosophical quote that is relevant to the user's situation or content of their message. After the quote, explain in a few short sentences how this quote pertains to the user's situation. The response should be insightful and empathetic."
      },
      {
        role: "user",
        content: userMessage
      }
    ]
  };

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    // console.log(data.choices[0].message.content);
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error fetching chat completion:", error);
    return null;
  }
}
