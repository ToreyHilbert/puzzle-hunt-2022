import faunadb from 'faunadb' /* Import faunaDB sdk */

/* configure faunaDB Client with our secret */
const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET
})

exports.handler = (event, context, callback) => {
    const data = JSON.parse(event.body)
    console.log("Function `get-team-data` invoked", data)

    return client.query(
        q.Get(q.Collection("teams"))
    ).then(response => {
        console.log("success", response)
        
        return callback(null, {
            statusCode: 200,
            body: JSON.stringify(response)
        })
    }).catch(error => {
        console.log("error", error)
        
        return callback(null, {
            statusCode: 400,
            body: JSON.stringify(error)
        })
    })
}