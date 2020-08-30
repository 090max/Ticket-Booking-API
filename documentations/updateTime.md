# Update Ticket Time

Allows to update ticket timming of a particular ticket id.

**URL** : `/updateTime/:id`

**Method** : `PUT`

**Data constraints**

```json
{
    "newTimming":"[YYYY-mm-dd HH:MM:SS]"
}
```

**Data examples**


```json
{
    "newTimming":"12-12-20 12:00:00"
}
```


## Success Responses

**Condition** : Date and ticket id provided are valid.

**Code** : `200 OK`

**Content example** : Response would contain the status code with a message or error.

```json
{
    "status": 200,
    "message": "Updated Successfully !!"
}
```

## Error Response

**Condition** : If provided ticket Id or Timming is invalid.

**Code** : `400 BAD REQUEST`

**Code** : `404 BAD REQUEST` If the Ticket id is valid but is not found.

**Content example** :

```json
{
    "status": 400,
    "error": "Incorrect Ticket Id"
}
```

```json
{
    "status": 400,
    "error": "Provide Date in YYYY-mm-dd Format"
}
```


```json
{
    "status": 400,
    "error": "No Booking for past date can be made"
}
```


```json
{
    "status": 404,
    "error": "No such TicketId Found!!"
}
```

## Notes

* The ticket id shall be provided to /updateTime/:id.
* 500 status code will be thrown if an unknown error occurs.
