/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react';
import {
  Alert, AlertTitle, Button, TextField,
} from '@mui/material';
import { Table } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { evaluateTruthtable, TruthtableEvaluation } from '../helper/expressionEvaluator';
import { checkCorrectSyntax } from '../helper/expressionValidator';
import { evaluateWholeExpression } from '../helper/logicConverter';

function Truthtable() {
  const [expression, setExpression] = useState('');
  const [evaluatedExpression, setEvaluatedExpression] = useState<TruthtableEvaluation>();
  const [counter, setCounter] = useState(0);

  const getEvaluation = () => {
    if (!checkCorrectSyntax(expression)) {
      toast.error('Der eingegebene Ausdruck enthält einen Fehler und kann nicht ausgewertet werden!', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } else {
      const evaluated = evaluateTruthtable(expression);
      setEvaluatedExpression(evaluated);
    }
  };

  const getReplacedValue = (values: number[] | number, index: number) => {
    if (typeof (values) !== 'number') {
      return values[index];
    }
    return Number(values);
  };

  const generateCell = (singleStep: string, values: number[], variables: string[]) => {
    let mutableExpression = singleStep;

    if (mutableExpression === 'blank') {
      return (
        <td>
          {' '}
          {' - '}
          {' '}
        </td>
      );
    }

    for (let x = 0; x < mutableExpression.length; x += 1) {
      const currentChar = mutableExpression.charAt(x);

      const index = variables.indexOf(currentChar);

      // eslint-disable-next-line no-continue
      if (index === -1) continue;
      const replacedValue = getReplacedValue(values, index);

      mutableExpression = mutableExpression.replaceAll(currentChar, `${replacedValue}`);
    }

    mutableExpression = evaluateWholeExpression(mutableExpression);

    return (
      <td>
        {' '}
        {mutableExpression}
        {' '}
      </td>
    );
  };

  const addColumn = () => {
    if (evaluatedExpression !== undefined) {
      if (counter < evaluatedExpression?.steps.length) {
        setCounter(counter + 1);
      }
    }
    getEvaluation();
  };
  const reduceColumn = () => {
    if (counter > 0) {
      setCounter(counter - 1);
    }

    getEvaluation();
  };

  const generateRow = (step: string[], values: number[], variables: string[]) => step.map((singleStep: string) => generateCell(singleStep, values, variables));

  return (
    <>
      <Alert severity="info">
        <AlertTitle>Info</AlertTitle>
        Please enter your expression and press evaluate
        <br />
        Allowed characters are (ordered in their precedence):
        <br />
        ()
        {' '}
        <br />
        !
        {' '}
        <br />
        &&
        {' '}
        <br />
        {'<=!=>'}
        {' '}
        <br />
        ||
        {' '}
        <br />
        {'<==>'}
        {' '}
        <br />
        {'=>'}
        {' '}
        <br />
      </Alert>
      <br />
      <TextField style={{ width: '40%' }} value={expression} onChange={(e) => setExpression(e.target.value)} onKeyDown={(e) => ((e.key === 'Enter') ? (getEvaluation()) : '')} id="standard-basic" label="Expression" variant="standard" />
      <Button onClick={() => getEvaluation()} variant="outlined">Evaluate</Button>
      <Button onClick={() => reduceColumn()} variant="outlined" style={{ marginLeft: '30px' }}>-1 Schritt</Button>
      <TextField style={{ width: '195px', marginLeft: '30px' }} value={`Angezeigte Schritte: ${counter}`} />
      <Button onClick={() => addColumn()} variant="outlined" style={{ marginLeft: '50px' }}>+1 Schritt</Button>
      <br />
      <br />

      {evaluatedExpression?.parentheses}
      <br />
      Variables:
      {' '}
      {evaluatedExpression?.variables}
      <ul>
        {evaluatedExpression?.steps.map((val, index) => (
          <li key={val}>
            Step
            {' '}
            {index}
            :
            {' '}
            {val}
          </li>
        ))}
      </ul>

      <Table striped bordered hover>
        <thead>
          <tr>
            {evaluatedExpression?.variables.map((variable) => (
              <th key={variable}>
                {' '}
                {variable}
                {' '}
              </th>
            ))}
            {evaluatedExpression?.steps.map((step) => (
              // eslint-disable-next-line react/jsx-key
              <th>
                {' '}
                {step}
                {' '}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {
            evaluatedExpression !== undefined && evaluatedExpression?.variables.length === 1
              ? evaluatedExpression?.binaryOptions.map((binaryValue) => (
                // eslint-disable-next-line react/jsx-key
                <tr>
                  {' '}
                  <td>
                    {' '}
                    {binaryValue}
                  </td>
                  {generateRow(evaluatedExpression?.steps, binaryValue, evaluatedExpression?.variables)}
                </tr>
              ))
              : evaluatedExpression?.binaryOptions.map((binaryRow) => (
                // eslint-disable-next-line react/jsx-key
                <tr>
                  {' '}
                  {
                    binaryRow.map((binaryValue) => (
                      // eslint-disable-next-line react/jsx-key
                      <td>
                        {' '}
                        {binaryValue}
                        {' '}
                      </td>
                    ))
                  }

                  {/* eslint-disable-next-line no-unsafe-optional-chaining */}
                  {generateRow(evaluatedExpression?.steps.slice(0, counter).concat(Array(evaluatedExpression?.steps.length - counter).fill('blank')), binaryRow, evaluatedExpression?.variables)}

                </tr>
              ))
          }
        </tbody>
      </Table>
    </>

  );
}

export default Truthtable;
