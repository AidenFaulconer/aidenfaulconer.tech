---
template: BlogPost
catagory: blog
path: /blog
date: 2022-12-14T00:33:56.364Z
title: Building a chat bot in python for Facebook messenger
metaDescription: Python is a popular, high-level programming language that is
  widely used for web development, data analysis, artificial intelligence, and
  scientific computing. Python is known for its simplicity and readability, and
  it offers a rich set of libraries and frameworks for building powerful and
  scalable applications.
thumbnail: public/assets/me.png
---
<!--StartFragment-->

# BLOG: building a chat bot for facebook messenger

Introduction to Python

Python is a popular, high-level programming language that is widely used for web development, data analysis, artificial intelligence, and scientific computing. Python is known for its simplicity and readability, and it offers a rich set of libraries and frameworks for building powerful and scalable applications.

In this tutorial, we will learn the basics of Python, and we will use it to build a chat bot for Facebook Messenger.

Getting Started

To follow along with this tutorial, you will need a computer with Python installed. You can download and install Python from the official website at [](https://www.python.org/)**<https://www.python.org/>**.

Once you have Python installed, you can verify that it is working correctly by opening a terminal or command prompt, and then running the following command:

```
python --version
```

This command should print the version of Python that is installed on your computer.

Hello, World!

The first program that many programmers write when learning a new language is a program that prints the message "Hello, world!" to the screen. In Python, this program is very simple:

```
print("Hello, world!")
```

To run this program, save it to a file with the **`.py`** extension, and then run the following command:

```
python hello.py
```

This will execute the program and print "Hello, world!" to the screen.

Variables and Data Types

In Python, a variable is a named storage location for a value. Variables are used to store data and manipulate it in programs.

To create a variable in Python, you use the **`=`** operator, like this:

```
x = 5
```

This creates a variable named **`x`** and assigns it the value `5

Functions

In Python, a function is a block of code that performs a specific task. Functions are used to modularize and organize code, and they can be called and reused in different parts of a program.

To create a function in Python, you use the **`def`** keyword, like this:

```
def hello():
    print("Hello, world!")


```

This defines a function named **`hello`** that prints the message "Hello, world!" to the screen. To call this function, you use its name followed by parentheses, like this:

```
hello()
```

This will execute the code inside the **`hello`** function and print "Hello, world!" to the screen.

Classes and Objects

In Python, a class is a template for creating objects. Classes are used to model real-world entities and their properties and behaviors.

To create a class in Python, you use the **`class`** keyword, like this:

```
class Dog:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def bark(self):
        print("Woof!")


```

This defines a class named **`Dog`** that has two attributes (**`name`** and **`age`**) and one method (**`bark`**). The **`__init__`** method is a special method that is called when an object is created, and it is used to initialize the object's attributes. The **`self`** keyword is used to refer to the object itself.

To create an object from a class, you use the **`class name`** followed by parentheses, like this:

```
my_dog = Dog("Buddy", 3)


```

This creates an object named **`my_dog`** that is an instance of the **`Dog`** class. The object is initialized with the name "Buddy" and the age 3.

To access the attributes and methods of an object, you use the **`.`** operator, like this:

```
print(my_dog.name)  # prints "Buddy"
print(my_dog.age)   # prints 3
my_dog.bark()       # prints "Woof!"


```

Building a Chat Bot for Facebook Messenger

Now that we have learned the basics of Python, we can use it to build a chat bot for Facebook Messenger.

To do this, we will need to use the **`facebook-sdk`** library, which provides a Python interface to the Facebook Graph API. To install this library, run the following command:

```
pip install facebook-sdk
```

Once the library is installed, you can use it to authenticate

nd interact with the Facebook Graph API.

First, we need to create a Facebook App and obtain an **`access_token`** for our chat bot. To do this, follow these steps:

1. Go to the Facebook Developers website at [](https://developers.facebook.com/)**<https://developers.facebook.com/>**
2. Click on the "My Apps" link in the top-right corner and then click on the "Add New App" button.
3. Enter a name for your app and click on the "Create App ID" button.
4. In the left-hand menu, click on the "Messenger" option and then click on the "Setup" button.
5. Click on the "Token Generation" tab, select the page that you want to use for your chat bot, and then click on the "Continue" button.
6. Click on the "Generate Token" button and then copy the generated **`access_token`**.

Next, we need to create a class for our chat bot. This class will use the **`facebook-sdk`** library to authenticate with the Facebook Graph API and listen for incoming messages. It will also have methods for sending messages and handling different types of messages.

Here is the code for our chat bot class:

```
class ChatBot:
    def __init__(self, access_token):
        self.graph = facebook.GraphAPI(access_token)

    def send_text_message(self, recipient_id, message):
        self.graph.send_message(recipient_id, message)

    def handle_message(self, message):
        recipient_id = message['sender']['id']

        if 'text' in message:
            text = message['text']
            if text == "hi":
                self.send_text_message(recipient_id, "Hello!")
            else:
                self.send_text_message(recipient_id, "I'm sorry, I don't understand.")
        elif 'attachments' in message:
            self.send_text_message(recipient_id, "I'm sorry, I can't handle attachments.")
        else:
            self.send_text_message(recipient_id, "I'm sorry, I don't understand.")


```

To use this class, we need to create an instance of the **`ChatBot`** class and pass it the **`access_token`** that we generated earlier. Then, we can use the **`handle_message`** method to handle incoming messages from Facebook Messenger.

Here is an example of how to use our chat bot class:

```
chatbot = ChatBot(access_token)

while True:
    messages = chatbot.graph.get_messages()
    for message in messages:
        chatbot.handle_message(message)


```

This code creates an instance of the **`ChatBot`** class and passes it the **`access_token`**. Then, it enters an infinite loop, where it retrieves incoming messages from the Facebook Graph API and passes them to the **`handle_message`** method of the **`chatbot`** object.

This is a simple example of how to build a chat bot for Facebook Messenger using Python. Of course, this chat bot is very basic and only handles text messages and attachments. You can extend it to handle more complex scenarios and use other features of the Facebook Graph API.

In conclusion, Python is a powerful and versatile programming language that is well-suited for building chat bots for Facebook Messenger and other messaging platforms. With Python, you can leverage the power of the Facebook Graph API and create chat bots that are fast, scalable, and easy to maintain.

<!--EndFragment-->