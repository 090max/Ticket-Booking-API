# Book Tickets

Allows to book a ticket

**URL** : `/bookTicket`

**Method** : `POST`

**Data constraints**

```json
{
    "name":"[string input]",
    "contact":"[10 Digit Number]",
    "timming":"[YYYY-mm-dd HH:MM:SS]"
}
```

**Data examples**

Partial data is Not allowed.

```json
{
    "name":"Kapil",
    "contact":8209714523,
    "timming":"2020-12-13 12:09:34"
}
```


## Success Responses

**Condition** : Data provided is valid.

**Code** : `201 OK`

**Content example** : Response will reflect the corresponding TicketId of the booking with a confirmation message of ticket being booked.

```json
{
    "status": 201,
    "TicketId": 57,
    "message": "Ticket Booked"
}
```

## Error Response

**Condition** : If provided data is invalid, e.g. a name contains integer or date is not in correct format or the maximum quota for the timming is exceeded.

**Code** : `400 BAD REQUEST`
**Code** : `403 FORBIDDEN` , This happens when the seat buffer for a timming is full.

**Content example** :

```json
{
    "status": 400,
    "error": "Please recheck name provided"
}
```

```json
{
    "status": 400,
    "error": "Please recheck contact number provided"
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
    "status": 400,
    "error": "Incorrect Time Values"
}
```

```json
{
    "status": 400,
    "error": "Incorrect Date Format"
}
```

```json
{   "status": 403, 
    "error": "Seats Buffer For This Timming Is Ful" 
}
```

## Notes

* A user will be issued a TicketId for each booking, which would be later used to identify the user.
* No more than 20 seats be allocated for a particular timming.
* 500 status code will be thrown if an unknown error occurs.
