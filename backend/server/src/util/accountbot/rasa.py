from rasa.core.agent import Agent
from rasa.core.interpreter import RasaNLUInterpreter

# load the trained model
agent = Agent.load("models/dialogue", interpreter=RasaNLUInterpreter("models/nlu"))

# function to send user message and get response from the chatbot
def get_bot_response(message):
    # get the bot's response to the user's message
    bot_response = agent.handle_message(message)
    # return the bot's response as a string
    return bot_response[0]["text"]

# now you can use this function in your existing bot code to get a response from the chatbot
# for example
response = get_bot_response("Hello")
print(response)
