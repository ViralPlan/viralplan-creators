import OpenAI from "openai";

class AiAgent {
    constructor(name, prompt, config) {
        this.name = name;
        this.promptAddition = " You must ALWAYS return your corrections in valid JSON format, and translated to SPANISH.";
        this.creationPrompt = prompt + this.promptAddition;
        this.config = config;
        this.openai = new OpenAI({
            apiKey: config.apiKey,
            dangerouslyAllowBrowser: true,
        });
    }

    async complete(question) {
        const chatCompletion = await this.openai.chat.completions.create({
            messages: [
                { role: 'system', content: this.creationPrompt},
                { role: 'user', content: question}
            ],
            model: this.config.model,
            temperature: this.config.temperature

        })
        return chatCompletion.choices[0].message.content;
    }
}

export async function genIdeas(companyForm, num, model, apiKey) {
    const start = Date.now();
    const adminAgentPrompt = `You are the representative of ViralPlan. Your work is to create ideas
    for the company asked. The ideas have to be able to be in short form, because they are for tiktok
    . You will be working with three other people: one that makes sure 
    that the ideas are good, one that makes sure that the ideas are possible and one that 
    makes sure that the ideas are able to become viral. The ideas you create have to be funny,
    creative and new, not just informative about the brand. They cannot show the brand or product of 
    the company in a bad light. If you are given ideas, you should offer suggestions and corrections.
    Enfasis on FUN, CREATIVE AND ORIGINAL. ALL OF THEM MUST BE FUN AND ORIGINAL. What you return should be in SPANISH.`;

    const expertAgentPrompt = `You are an expert in Tiktok trends and marketing. Your job is to talk
    with the idea creator and help them come up with ideas for the company, based on your profound
    knowledge of Tiktok. You have to offer changes to the ideas it has said before, or just discard
    ideas if you think they are not funny or creative enough, and replace them with new ones. Always
    return the same number of ideas the other agent gave you. They cannot show the brand or product 
    of the company in a bad light.
    Enfasis on FUN, CREATIVE AND ORIGINAL. ALL OF THEM MUST BE FUN AND ORIGINAL. `;

    const criticAgentPrompt = `You are part of ViralPlan, and your job is to make sure that the ideas
    stick to the company's information, where they say what they can and cannot do. You
    have to talk with the idea creator and make sure that the ideas are creative, but possible.
    If they are not, tell the idea creator what to change. You have to always return the same number of ideas
    that the idea creator gave you. They cannot show the brand or product of the company in a bad light.
    Enfasis on FUN, CREATIVE AND ORIGINAL. ALL OF THEM MUST BE FUN AND ORIGINAL. `

    const tiktokerAgentPrompt = `You are a big Tiktok star, and you know what makes a video go viral.
    You have to act as quality assurance for the video ideas, and make sure that they are
    of great quality and that they will go viral. You talk with the idea creator to make changes
    to the ideas or just discard them if you think they are not good enough, and add a new one.
    You should always return the same number of ideas that the idea creator gave you.
    They cannot show the brand or product of the company in a bad light.
    Enfasis on FUN, CREATIVE AND ORIGINAL. ALL OF THEM MUST BE FUN AND ORIGINAL. `

    let llm_config_1 = {"temperature": 1, "model": model, "apiKey": apiKey}
    let llm_config_2 = {"temperature": 0.2, "model": model, "apiKey": apiKey}
    let llm_config_3 = {"temperature": 0.5, "model": model, "apiKey": apiKey}

    const adminAgent = new AiAgent('admin', adminAgentPrompt, llm_config_2);
    const expertAgent = new AiAgent('expert', expertAgentPrompt, llm_config_1);
    const criticAgent = new AiAgent('critic', criticAgentPrompt, llm_config_2);
    const tiktokerAgent = new AiAgent('tiktoker', tiktokerAgentPrompt, llm_config_3);

    let agents = {'admin': adminAgent, 'expert': expertAgent, 'critic': criticAgent, 'tiktoker': tiktokerAgent}
    let chatChain = ['admin', 'expert', 'critic', 'tiktoker', 'expert']

    let lastAnswer = 
    `
    Generate ${num} different video ideas, which have to be fun and with high probability to go viral for the following company: ${companyForm}. 
    Enfasis on FUN, CREATIVE AND ORIGINAL. ALL OF THEM MUST BE FUN AND ORIGINAL. 
    Do them in spanish and return them in json format. The last response has to be JUST VALID JSON. The schema is the following:
    [
        {
            title: "title",
            description: "description"
        }
    ]
    .
    `
    for (let i = 0; i < chatChain.length; i++) {
        await agents[chatChain[i]].complete(lastAnswer).then((ideas) => {
            lastAnswer = ideas;
        })  
    };
    const end = Date.now();
    console.log(`Execution time: ${end - start} ms`);
    return lastAnswer;
}


