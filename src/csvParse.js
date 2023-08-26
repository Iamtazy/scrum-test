
import { parse } from 'csv-parse';
import fs from 'fs'

const questions = [];

const parser = parse({ delimiter: ";", from_line: 1 })


parser
    .on("readable", function () {
        let row
        while ((row = parser.read()) !== null) {
            row = row.filter((rowItem) => rowItem !== '')
            const questionItem = { question: row[0], answers: [] }
            for (let i = 1; i < row.length - 1; i++) {
                if (i % 2 === 1)
                    questionItem.answers.push({ answer: row[i], isCorrect: row[i + 1] === 'I' })
            }
            questions.push(questionItem)
        }
    })
    .on('error', function (err) {
        console.error(err.message);
    })
    .on('end', function () {
        console.log(JSON.stringify(questions))
    })

fs.createReadStream("./src/assets/full-lista.csv").pipe(parser)