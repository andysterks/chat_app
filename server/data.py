from server.routes.connection import *


def getUsers():
    return getUsersConnection()


def getSingleUser(id):

    return getSingleUserConnection(id)


def createUser(username, password):
    return createUserConnection(username, password)


def getMessages():
    return getMessagesConnection()


def getSingleMessage(messageId):
    return getSingleMessageConnection(messageId)


def createMessage(userId, text, topic):
    return createMessageConnection(userId, text, topic)


def getMessagesByTopic(topic):
    return getMessagesByTopicConnection(topic)


def checkUser(username): 
    return checkUserConnection(username)

def getActiveUsers(): 
    return getActiveUsersConnection()

def activateUser(username): 
    return activateUserConnection(username)

def deactiveUser(username): 
    return deactivateUserConnection(username)