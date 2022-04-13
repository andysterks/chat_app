import bcrypt
from data_connection import connection


def getUsersConnection():
    cursor = connection.cursor()
    cursor.execute("SELECT username, id, signedIn FROM users")
    columns = cursor.description
    records = [
        {columns[index][0]: column for index, column in enumerate(value)}
        for value in cursor.fetchall()
    ]
    return records


def createUserConnection(username, password):
    hashedPassword = bcrypt.hashpw(password.encode(), bcrypt.gensalt())
    stringedHashedPassword = hashedPassword.decode()
    cursor = connection.cursor()
    cursor.execute(
        f"INSERT INTO users (username, password) VALUES ('{username}', '{stringedHashedPassword}')"
    )
    connection.commit()
    cursor.close()
    connection.close()


def getSingleUserConnection(id):
    cursor = connection.cursor()
    cursor.execute(f"SELECT username,id FROM users WHERE Id={id}")
    columns = cursor.description
    records = [
        {columns[index][0]: column for index, column in enumerate(value)}
        for value in cursor.fetchall()
    ]
    return records


def getMessagesConnection():
    formattedTime = "Formatted_Time"
    formattedDate = "Formatted_Date"

    cursor = connection.cursor()
    cursor.execute(
        f"SELECT *, to_char (time_created, 'HH:MI PM') AS {formattedTime}, to_char (createddate, 'MM/DD/YY') AS {formattedDate} FROM messages ORDER BY {formattedDate} ASC"
    )
    columns = cursor.description
    records = [
        {columns[index][0]: column for index, column in enumerate(value)}
        for value in cursor.fetchall()
    ]
    return records


def getSingleMessageConnection(messageId):
    cursor = connection.cursor()
    cursor.execute(f"SELECT * FROM messages WHERE messageid={messageId}")
    columns = cursor.description
    records = [
        {columns[index][0]: column for index, column in enumerate(value)}
        for value in cursor.fetchall()
    ]
    return records


def createMessageConnection(userId, text, topic):
    cursor = connection.cursor()
    cursor.execute(
        f"INSERT INTO messages (userid, text, topic) VALUES ('{userId}', '{text}', '{topic}')"
    )
    connection.commit()
    cursor.close()
    connection.close()


def getMessagesByTopicConnection(topic):
    formattedDate = "Formatted_Date"

    cursor = connection.cursor()
    cursor.execute(
        f"SELECT *, to_char (createddate, 'Day, Month fmDDth, YYYY') AS {formattedDate} FROM messages WHERE topic='{topic}' ORDER BY messageid ASC"
    )
    columns = cursor.description
    records = [
        {columns[index][0]: column for index, column in enumerate(value)}
        for value in cursor.fetchall()
    ]
    return records


def checkUserConnection(username):
    cursor = connection.cursor()
    cursor.execute(f"SELECT username, password FROM users WHERE username='{username}'")
    columns = cursor.description
    records = [
        {columns[index][0]: column for index, column in enumerate(value)}
        for value in cursor.fetchall()
    ]
    return records


def getActiveUsersConnection():
    cursor = connection.cursor()
    cursor.execute(f"SELECT username from users where signedin='Yes'")
    columns = cursor.description
    records = [
        {columns[index][0]: column for index, column in enumerate(value)}
        for value in cursor.fetchall()
    ]
    return records


def activateUserConnection(username):
    cursor = connection.cursor()
    cursor.execute(f"update users set signedin='Yes' where username='{username}'")
    connection.commit()
    cursor.close()
    connection.close()


def deactivateUserConnection(username):
    cursor = connection.cursor()
    cursor.execute(f"update users set signedin='No' where username='{username}'")
    connection.commit()
    cursor.close()
    connection.close()
