import React from 'react';
import 'styles/News.css';
import { Col, Panel } from 'react-bootstrap';

const News = () => (
  <Col xs={12} className="news-container">
    <Panel>
      <Panel.Heading>News</Panel.Heading>
      <Panel.Body>
        <p>Coming soon...</p>
      </Panel.Body>
    </Panel>
  </Col>
)

export default News;