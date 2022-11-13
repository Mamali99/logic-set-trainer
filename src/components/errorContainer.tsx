import {Container} from 'react-bootstrap';
import React from 'react';
import "./errorContainer.css";
const ErrorContainer = () => {
  return (
          <Container id="error_container">
            <div id="error">
              <div id="error_text">
                ERROR
              </div>
              <div id="error_content">
                Your input is not valid
              </div>
            </div>
          </Container>
      )
}
export default ErrorContainer;
