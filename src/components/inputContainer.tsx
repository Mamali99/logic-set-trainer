import {Container} from 'react-bootstrap';
import React, {useState} from 'react';
import "./errorContainer.css";
import {Button, TextField} from '@mui/material';
import {evaluateTruthtable, TruthtableEvaluation} from '../helper/expressionEvaluator';
import {checkCorrectSyntax} from '../helper/expressionValidator';
import {toast} from 'react-toastify';
import "./inputContainer.css";



const InputContainer = () => {
  const [expression, setExpression] = useState('');
  const [evaluatedExpression, setEvaluatedExpression] = useState<TruthtableEvaluation>();
  const getEvaluation = () => {
    if (!checkCorrectSyntax(expression)) {
      toast.error('The entered expression contains an error and cannot be evaluated! You can click on the "i" icon for instructions on how to use', {
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
  return (
      <Container className="cover">
        <div id="text_field_control">
          <TextField id="input_text_field" fullWidth
                     placeholder="Enter the logical expression to be computed"
                     onChange={(e) => {
                       return setExpression(e.target.value)
                     }}
          />
          <Button onClick={getEvaluation} variant="contained" id="evaluate_button">Evaluate</Button>
        </div>
      </Container>
      )
}
export default InputContainer;
