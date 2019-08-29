import React from 'react';
import GameCell from './GameCell';
import Faceoff from "../faceoff/Faceoff";
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core';
import API, { graphqlOperation } from "@aws-amplify/api"
import gql from "graphql-tag"
import MessageBus from "../common/MessageBus";

const CategoryTableCell = withStyles(theme => ({
    head: {
        color: "slateblue",
        fontSize: 24,
        textAlign: "center"
    }
}))(TableCell);

// const createQuesIdMap = (questions) => {
//     const ret = {};
//     questions.forEach(ques => {
//         ret[`ques${ques.quesId}`] = ques;
//     });
//     return ret;
// };

const SUB_QUES_UPDATES_GQL = gql(`
    subscription quesUpdates {
        questionStateChange {
            quesId
            state
        }
    }
`);

/*
 * Matrix (2D array): rows are rows to display, columns are cols (one col per category).
 * This is purpose-built to make render() easy to understand.  Rows here are the same as
 * the <TableRow> below.  Columns here (cells in a row) are <TableCell> in the render()
 * below.  The order of columns in each row corresponds to the order of categories in
 * "categories" passed in.
 */
const createMatrixFromGame = (game) => {
    game.categories.forEach(catg => catg.questions.sort((a,b) => a.points - b.points));

    const mat = [];
    while(true) {
        const row = [];
        game.categories.forEach(catg => row.push(catg.questions.shift()));
        const nonNullEntries = row.find(x => x !== null);
        if (nonNullEntries)
            mat.push(row);
        else
            break;
    }

    return mat;
};

class GameBoard extends React.Component {

    constructor({ game }) {
        super();
        this.game = game;
        this.subscription = null;
        this.bus = new MessageBus();
    }

    state = {
        closedQuestions: new Set()
    };

    componentDidMount = () => {
        let me = this;
        this.subscription = API.graphql(graphqlOperation(SUB_QUES_UPDATES_GQL))
            .subscribe({
                next: (data) => {
                    console.log("Received subscription!");
                    console.log(data);
                    const cq = this.state.closedQuestions;
                    cq.add(data.quesId);
                    me.setState({ closedQuestions: cq });
                },
                error: err => {
                    this.bus.flashMessage(err);
                    this.game = null;
                }
            });
    }

    componentWillUnmount = () => this.subscription.unsubscribe();


    render() {
        const ranks = createMatrixFromGame(this.game);

        return (
            <div>
                <Table style={{ tableLayout: "fixed" }}>
                    <TableHead>
                        <TableRow>
                            {this.game.categories.map(catg => (
                                <CategoryTableCell key={`catg_${catg.categoryName}`}>
                                    {catg.categoryName}
                                </CategoryTableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ranks.map((rank, rankNum) => (
                            <TableRow key={`row_${rankNum}`}>
                                {rank.map((ques, quesNum) => (
                                    <TableCell key={`cell_${rankNum}_${quesNum}`}>
                                        { ques ? (<GameCell
                                                    points={ques.points}
                                                    state={ques.state} />)
                                               : "" }
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Faceoff
                    isOpen={false}
                    category="MyCategory"
                    points="100"
                    question="Lorem ipsum dolor sic amet?"/>
            </div>
        );
    }
}

export default GameBoard;
