import {Container, Table} from 'react-bootstrap';
import React, {useState} from 'react';
import "./tableContainer.css";
import {TruthtableEvaluation} from '../helper/expressionEvaluator';
const tableContainer = () => {
  const [expression, setExpression] = useState('');
  const [evaluatedExpression, setEvaluatedExpression] = useState<TruthtableEvaluation>();
  return (
      <Container id="table_container">
        <div id="table">
          <div id="table_text">
            Truth Table
          </div>
          <div id="table_content">
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
                    <th key={step}>
                      {' '}
                      {step}
                      {' '}
                    </th>
                ))}
              </tr>
              </thead>
              <tbody>
              {/* todo better keys  */}
              {
                evaluatedExpression !== undefined && evaluatedExpression?.variables.length === 1
                    ? evaluatedExpression?.binaryOptions.map((binaryValue, upperIndex) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <tr key={`${upperIndex}upperBinary`}>
                          {' '}
                          <td>
                            {' '}
                            {binaryValue}
                          </td>
                          {evaluatedExpression?.steps.map((step, lowerIndex) => (
                              // eslint-disable-next-line react/no-array-index-key
                              <td key={step + upperIndex + lowerIndex}>
                                {' '}
                                **PLACEHOLDER**
                                {' '}
                              </td>
                          ))}
                        </tr>
                    ))
                    : evaluatedExpression?.binaryOptions.map((binaryRow, upperIndex) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <tr key={`${upperIndex}upperBinary1`}>
                          {' '}
                          {
                            binaryRow.map((binaryValue, lowerIndex) => (
                                // eslint-disable-next-line react/no-array-index-key
                                <td key={`${upperIndex}lowerBinary1${lowerIndex}`}>
                                  {' '}
                                  {binaryValue}
                                  {' '}
                                </td>
                            ))
                          }
                          {evaluatedExpression?.steps.map((step) => (
                              // eslint-disable-next-line react/no-array-index-key
                              <td key={step + binaryRow + upperIndex}>
                                {' '}
                                **PLACEHOLDER**
                                {' '}
                              </td>
                          ))}
                        </tr>
                    ))
              }
              </tbody>
            </Table>
          </div>
          <div id="table_instead_content"></div>
        </div>
      </Container>

  )
}
export default tableContainer;
