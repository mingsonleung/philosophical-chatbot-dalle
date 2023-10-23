export async function generateImage(text) {

    const headers = {
        "Content-Type": 'application/json',
        "Authorization": `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
    };

    const payload = {
        prompt: text,
        n: 1,
        size: "256x256",
    };

    try {
        const response = await fetch("https://api.openai.com/v1/images/generations", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            console.error("Network response was not ok: ", response.statusText);
        }

        const responseData = await response.json();
        const imageURL = responseData.data[0].url;
        console.log(responseData.data[0].url)
        return imageURL;

    } catch (error) {
        console.error("Error generating image: ", error);
        return null;
    }

}