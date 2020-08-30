# Get User Details

Get the details of the user via the TicketId.

**URL** : `/getUserDetails`

**Method** : `GET`

**Data constraints**

```json
{
    "ticketId":"[Integer]"
}
```

**Data examples**


```json
{
    "ticketId":"29"
}
```


## Success Responses

**Condition** : If ticket id provided is valid and exists in the database.

**Code** : `200 OK`

**Content example** : Response will reflect the corresponding TicketId of the booking with a confirmation message of ticket being booked.

```json
{
    "status": 200,
    "data": {
        "Name": "Kapil",
        "Contact": "8209714523"
    }
}
```

## Error Response

**Condition** : If provided data is invalid.

**Code** : `400 BAD REQUEST`

**Code** : `404 RESOURCE NOT FOUND` If the Ticket id is valid but is not found.


**Content example** :

```json
{
    "status": 400,
    "error": "Invalid Ticket Id"
}
```

```json
{
    "status": 404,
    "error": "No such TicketId Found!!"
}
```


## Notes

* This route will provide the name and contact number of the user.
* 500 status code will be thrown if an unknown error occurs.
