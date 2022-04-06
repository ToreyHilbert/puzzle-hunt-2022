const faunadb = require('faunadb')

/* configure faunaDB Client with our secret */
const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
  domain: "db.us.fauna.com"
})

const createTeamObject = team => {
    return {
        name : team[1],
        submitted_puzzles : team[2],
        solved_puzzles : team.slice(3)
    }
}

exports.handler = async (event, context) => {
    try {
        const response = await client.query(
            q.Paginate(q.Match(q.Index("all_teams")))
        )

        const teams = response.data.map(createTeamObject)

        return {
            statusCode: 200,
            body: JSON.stringify(teams),
        }
    } catch (error) {
        console.log("Error in get-team-data.js", error)
        
        return {
            statusCode: 400,
            body: JSON.stringify(error),
        }
    }
}