# View Tickets For A Particular Timming

Allows to view tickets for a particular timming.
Parameters can be sent via query or body. 

**URL** : `/viewTickets`

**Method** : `GET`

**Data constraints**

**URL** : viewTickets?date=<YYYY-mm-dd>&time=<HH:MM:SS>

**BODY** : 
```json
{
    "date":"[YYYY-mm-dd]"
    "time":"[HH:MM:SS]"
}
```

**Data examples**:http://localhost:3000/viewTickets?date=2020-12-11&time=13:10:10

## Success Responses

**Condition** : Date and time provided are valid.

**Code** : `200 OK`

**Content example** : Response will reflect the corresponding tickets information for a particular timming.

```json
{
    "status": 200,
    "data": [
        {
            "TicketId": 30,
            "Name": "Kapil",
            "Contact": "8209714523"
        },
        {
            "TicketId": 31,
            "Name": "Kapil",
            "Contact": "8209714523"
        },
        {
            "TicketId": 32,
            "Name": "Sunil",
            "Contact": "9571524145"
        },
        {
            "TicketId": 33,
            "Name": "Raju",
            "Contact": "9571524225"
        }
    ]
}
```

## Error Response

**Condition** : If provided data is invalid, e.g. a name contains integer or date is not in correct format or the maximum quota for the timming is exceeded.

**Code** : `400 BAD REQUEST`
**Code** : `404 RESOURCE NOT FOUND` ,If date and time are valid but not found in the database.

**Content example** :

```json
{
    "status": 400,
    "error": "Incorrect Time Values"
}
```

```json
{
    "status": 404,
    "error": "No Ticket Exists For This Timming!"
}
```


```json
{
    "status": 400,
    "error": "Provide Date in YYYY-mm-dd Format"
}
```


## Notes

* The parameters can be sent via both url query or via body.
* 500 status code will be thrown if an unknown error occurs.
