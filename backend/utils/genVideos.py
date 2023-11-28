from autogen.agentchat import AssistantAgent
import autogen
import json



def genVideos(company_form, num):
    config_list_gpt4 = autogen.config_list_from_json(
        "OAI_CONFIG_LIST.json",
        filter_dict={
            "model": ["gpt-4"],
        },
    )

    # Define user proxy agent
    llm_config_1 = {"config_list": config_list_gpt4, "cache_seed": None, "temperature": 1}
    llm_config_2 = {"config_list": config_list_gpt4, "cache_seed": None, "temperature": 0.2}
    llm_config_3 = {"config_list": config_list_gpt4, "cache_seed": None, "temperature": 0.5}

    user_proxy = autogen.UserProxyAgent(
    name="idea",
    system_message="""You are the human representative of ViralPlan. Your work is to create ideas.
    make sure that the generated ideas are of high quality and with high possibility of viralizing.""",
    code_execution_config=False,
    llm_config=llm_config_3,
    human_input_mode="NEVER"
    )

    idea_manager = AssistantAgent(
    name="idea_manager",
    system_message="""You are the representative of ViralPlan. Your work is to create ideas
    for the company asked. You will be working with three other people: one that makes sure 
    that the ideas are good, one that makes sure that the ideas are possible and one that 
    makes sure that the ideas are able to become viral. The ideas you create have to be funny,
    creative and new, not just informative about the brand. They can not be offensive or
    discriminatory, and they cannot be weird. They cannot show the brand or product of the company in a bad light.
    You should ALWAYS return just JSON ideas with your suggested changes.""",
    llm_config=llm_config_2,
    )

    # define two GPTAssistants
    expert = AssistantAgent(
        name="expert",
        llm_config=llm_config_1,
        system_message="""You are an expert in Tiktok trends and marketing. Your job is to talk
        with the idea creator and help them come up with ideas for the company, based on your profound
        knowledge of Tiktok. You have to offer changes to the ideas it has said before, or just discard
        ideas if you think they are not funny or creative enough, and add new ones.
        They cannot show the brand or product of the company in a bad light.
        You should ALWAYS return just JSON ideas with your suggested changes.""",
    )

    critic = AssistantAgent(
        name="critic",
        system_message="""You are part of ViralPlan, and your job is to make sure that the ideas
        stick to the company's information, where they say what they can and cannot do. You
        have to talk with the idea creator and make sure that the ideas are creative, but possible.
        If they are not, tell the idea creator what to change.
        They cannot show the brand or product of the company in a bad light.
        You should ALWAYS return just JSON ideas with your suggested changes.""",
        llm_config=llm_config_2,
    )

    tiktoker = AssistantAgent(
        name="tiktoker",
        llm_config=llm_config_3,
        system_message="""You are a big Tiktok star, and you know what makes a video go viral.
        You have to act as quality assurance for the video ideas, and make sure that they are
        of great quality and that they will go viral. You talk with the idea creator to make changes
        to the ideas or just discard them if you think they are not good enough, and add a new one.
        They cannot show the brand or product of the company in a bad light.
        You should ALWAYS return just JSON ideas with your suggested changes.""",
    )

    # define group chat
    groupchat = autogen.GroupChat(agents=[idea_manager, expert, critic, tiktoker], messages=[], max_round=5)
    manager = autogen.GroupChatManager(groupchat=groupchat, llm_config=llm_config_3, system_message="The order to participate is as follows: idea_manager, expert, critic, tiktoker. The output HAS TO BE valid json.")

    user_proxy.initiate_chat(manager, message=
    """
    Generate %s different video ideas, which have to be fun and with high probability to go viral for the following company: %s. 
    Do them in spanish and return them in json format. The last response has to be JUST VALID JSON. The schema is the following:
    [
        {
            title: "title",
            description: "description"
        }
    ]
    .
    """%(str(num), company_form)
    )

    return json.loads(manager.last_message(agent=tiktoker)['content'])