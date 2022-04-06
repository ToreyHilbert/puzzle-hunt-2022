const faunadb = require('faunadb')

/* configure faunaDB Client with our secret */
const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
  domain: "db.us.fauna.com"
})

exports.handler = async (event, context) => {
    const data = JSON.parse(event.body)
    console.log("Function `add-team` invoked", data)
    const teamData = {
        name : data.name,
        members : data.members,
        submitted_puzzles : data.submitted_puzzles,
        p1 : 0,
        p2 : 0,
        p3 : 0,
        p4 : 0,
        p5 : 0,
        p6 : 0,
        p7 : 0,
        p8 : 0,
        p9 : 0,
        p10 : 0,
        p11 : 0,
        p12 : 0,
        p13 : 0,
        p14 : 0,
        p15 : 0,
        p16 : 0,
        p17 : 0,
        p18 : 0,
        p19 : 0,
        p20 : 0,
    }

    try {
        const response = await client.query(
            q.Create(
                q.Collection("teams"),
                {
                    data: teamData
                }    
            )
        )
        console.log("success", response)
    
        return {
            statusCode: 200,
            body: JSON.stringify(response),
        }
    } catch (error) {
        console.log("Error in add-team.js", error)
        
        return {
            statusCode: 400,
            body: JSON.stringify(error),
        }
    }
}