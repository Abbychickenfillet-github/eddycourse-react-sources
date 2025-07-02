### Create

Create one

```
POST /ws/articles HTTP/1.1
Content-Type: application/json

{"name":"Screwdriver","price": 2.99,"qty":100}
```

Create bulk

```
POST /ws/articles HTTP/1.1
Content-Type: application/json

[{"name":"Screwdriver","price": 2.99,"qty":100},{"name":"Hammer","price": 1.50,"qty":80}]
```

### Retrieve

Retrieve all. Pagination applies.

```
GET /ws/articles HTTP/1.1
```

Retrieve the third page with default page size.

```
GET /ws/articles?page=3 HTTP/1.1
```

Retrieve the second page, with 50 items per page, reverse order by name,
and then ordered by price ascending, finally filter by the first address city which must start by 'A' or 'a' (case insensitive).

```
GET /ws/articles?page=2&pageSize=50&orderBy=-name,+price&filter[addresses][0][city]=/a.*/i HTTP/1.1
```

The query string uses the [`qs` node module format](https://github.com/ljharb/qs), integrated withing express.
Crudity query options are:

- `page`: page index starting at 1. Default is `1`.
- `pageSize`: number of items per page. Default is `20`. `0` means no limit.
- `orderBy`: order by field name.
  - It is a concatenated string of fields that are to be ordered,
    separated by a comma character `,`.
  - Each field can be reversed by prefixing it with `-`.
    `+` is also a optional prefix for ascending.
- `filter`: filter on field name given a javascript regex to be matched or simply a string to be equal to. The filter key must be an object with the same interface as the resource. The value are the regex or string wanted on the fields.
- `select`: list of fields to be returned, comma separated. `*` to return all. Default is `*`.

Retrieve one

```
GET /ws/articles/1234 HTTP/1.1
```

### Update

```
PUT /ws/articles/1234 HTTP/1.1
Content-Type: application/json

{"id":"1234","name":"Screwdriver","price": 2.99,"qty":100}
```

```
PATCH /ws/articles/1234 HTTP/1.1
Content-Type: application/json

{"name":"Screwdriver"}
```

```
PATCH /ws/articles HTTP/1.1
Content-Type: application/json

{"qty":"100"}
```

### Delete

Delete Many

```
DELETE /ws/articles HTTP/1.1
Content-Type: application/json

["1234"]
```

Delete All

```
DELETE /ws/articles HTTP/1.1
```
