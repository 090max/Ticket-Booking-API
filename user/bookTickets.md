# Update Current User

Allow the Authenticated User to update their details.

**URL** : `/bookTicket`

**Method** : `POST`

**Data constraints**

```json
{
    "name":[string input],
    "contact":[10 Digit Number],
    "timming":[YYYY-mm-dd HH:MM:SS]
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

**Condition** : If provided data is invalid, e.g. a name contains integer or date is not in correct format.

**Code** : `400 BAD REQUEST`

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


## Notes

* A user will be issued a TicketId for each booking, which would be later used to identify the user.
* 500 status code will be thrown if an unknown error occurs.
