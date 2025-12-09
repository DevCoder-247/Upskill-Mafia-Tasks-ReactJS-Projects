import React from 'react';
import Card from 'react-bootstrap/Card';

export default function About() {
  return (
    <Card className="shadow-sm">
      <Card.Body>
        <h3>About BucketList Mini</h3>
        <p className="text-muted">
          BucketList Mini is a lightweight, friendly app to capture short life goals and ideas.
          It uses React, Vite, React Router, React Bootstrap, and Context API.
        </p>

        <ul>
          <li>Quick-add bucket items from the Home page</li>
          <li>Detailed add & validation on the Add (Form) page</li>
          <li>Search, mark done, delete, and clear all</li>
          <li>All items persist in your browser via localStorage</li>
        </ul>
      </Card.Body>
    </Card>
  );
}
