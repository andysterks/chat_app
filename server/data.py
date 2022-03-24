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


def createMessage(userId, text):
    return createMessageConnection(userId, text)
