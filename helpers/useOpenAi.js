import OpenAI from "openai";
const key = import.meta.env.VITE_OPENAI_KEY


const configuration = {
    apiKey: key,
    // will set off the decay of the api key not being allowed to be exposed to the front end
    dangerouslyAllowBrowser: true

    
}

const openai = new OpenAI(configuration)

export default openai