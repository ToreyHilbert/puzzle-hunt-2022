const faunadb = require("faunadb");

/* configure faunaDB Client with our secret */
const q = faunadb.query;
const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET,
    domain: "db.us.fauna.com",
});

// I chose to use this long hand to decrease error chance
// As part of the puzzle layout, we had to align these clues with physical objects
// By explicitly giving the puzzle number, we decrease chance of error
const phraseDict = {
    "Cowardly Volcano": 1,
    "Disagreeable Swim": 2,
    "Grandiose Hydrant": 3,
    "Stormy Vegetable": 4,
    "Determined Plant": 5,
    "Unsuitable Liquid": 6,
    "Finicky Lunch": 7,
    "Enormous Goose": 8,
    "Modern Boats": 9,
    "Telling Cabbage": 10,
    "Transport Beef": 11,
    "Scandalous Avacado": 12,
    "Enthusiastic Dinosaurs": 13,
    "Capable Yarn": 14,
    "Beneficial Yak": 15,
    "Vulgar Duck": 16,
    "Aberrant Goat": 17,
    "Drab Sea": 18,
    "Grateful Donkey": 19,
    "Angry Eggnog": 20,
};

// This is a dict of which team made which puzzle - a team cannot solve their own puzzle
const teamPuzzleDict = {
    16: "Tensor",
    17: "Other 3",
    18: "Other 3",
    19: "Tensor",
    20: "Other 5",
};

const createTeamObject = (team) => {
    return {
        name: team[1],
        submitted_puzzles: team[2],
        solved_puzzles: team.slice(3),
    };
};

exports.handler = async (event, context, callback) => {
    try {
        return {
            statusCode: 400,
            message: "The Puzzle Hunt 2022 is over. See you again next year!",
        };

        const data = JSON.parse(event.body);

        if (!(data.phrase in phraseDict)) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    message: "Phrase is not the solution to a puzzle!",
                    phrase: data.phrase,
                }),
            };
        }

        const puzzleNum = phraseDict[data.phrase];
        if (teamPuzzleDict[puzzleNum] == data.team) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    message: "You cannot solve your own team's puzzle!",
                    phrase: data.phrase,
                    puzzleNum: puzzleNum,
                }),
            };
        }

        const response = await client.query(
            q.Paginate(q.Match(q.Index("all_teams")))
        );

        const teamsRaw = response.data;

        // 2nd entry in array is team name
        const submittingTeam = teamsRaw.find((team) => team[1] == data.team);
        if (submittingTeam == undefined) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    message: "Phrase is valid, but no such team exists!",
                    phrase: data.phrase,
                    puzzleNum: puzzleNum,
                }),
            };
        }

        // 4th entry in array is 1st puzzle
        const puzzleIndex = puzzleNum + 2;
        if (submittingTeam[puzzleIndex] > 0) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    message:
                        "Phrase is valid, but this team has already solved this puzzle!",
                    phrase: data.phrase,
                    puzzleNum: puzzleNum,
                }),
            };
        }

        // At this point, it's a valid puzzle for a valid team that hasn't solved the puzzle
        // Find whether they're the first team to solve the puzzle
        const isFirstTeam =
            teamsRaw.find((team) => team[puzzleIndex] > 0) == undefined;

        const updateData = {};
        updateData["p" + puzzleNum.toString()] = isFirstTeam ? 2 : 1;

        await client.query(
            q.Update(q.Ref(q.Collection("teams"), submittingTeam[0].id), {
                data: updateData,
            })
        );

        // At this point, the scoreboard has been successfully updated

        const teamsResponse = await client.query(
            q.Paginate(q.Match(q.Index("all_teams")))
        );

        const cleanedTeamsObj = teamsResponse.data.map(createTeamObject);

        return {
            statusCode: 200,
            body: JSON.stringify(cleanedTeamsObj),
        };
    } catch (error) {
        console.log("Error in phrase.js", error);

        return {
            statusCode: 400,
            body: JSON.stringify(error),
        };
    }
};
