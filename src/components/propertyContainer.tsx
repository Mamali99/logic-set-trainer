import {Container} from 'react-bootstrap';
import React, {useState} from 'react';
import "./propertyContainer.css";
import {TruthtableEvaluation} from '../helper/expressionEvaluator';

const PropertyContainer = () => {
  const [evaluatedExpression, setEvaluatedExpression] = useState<TruthtableEvaluation>();
  return (
      <Container id="property_container">
        <div id="property">
          <div id="property_text">
            property
          </div>
          <div id="property_content">
            {evaluatedExpression?.parentheses}
            <br />
            Variables:
            {' '}
            {evaluatedExpression?.variables}
            <ul>
              { evaluatedExpression?.steps.map((val, index) => (
                  <li key={val}>
                    Step
                    {' '}
                    {index}
                    :
                    {' '}
                    {val}
                  </li>
              )) }
            </ul>
          </div>
        </div>
      </Container>
      )
}
export default PropertyContainer;
