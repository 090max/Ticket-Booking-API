# Delete Ticket

To Delete a ticket with particular TicketId.


**URL** : `/deleteTicket`

**Method** : `DELETE`

**Data constraints**

```json
{
    "ticketId":"[Integer]"
}
```

**Data examples**


```json
{
    "ticketId":"53"
}
```


## Success Responses

**Condition** : If ticket exists and deletion is successfull.

**Code** : `200 OK`

**Content example** : Response will reflect the corresponding TicketId of the booking with a confirmation message of ticket being booked.

```json
{
    "status": 200,
    "message": "Deleted Successfully !!"
}
```

## Error Response

**Condition** : If provided data is invalid, e.g. a name contains integer or date is not in correct format or the maximum quota for the timming is exceeded.

**Code** : `400 BAD REQUEST`

**Code** : `404 RESOURCE NOT FOUND` If the Ticket id is valid but is not found.

**Content example** :

```json
{
    "status": 404,
    "error": "No such TicketId Found!!"
}
```

```json
{
    "status": 400,
    "error": "Invalid Ticket Id"
}
```

## Notes

* 500 status code will be thrown if an unknown error occurs.
