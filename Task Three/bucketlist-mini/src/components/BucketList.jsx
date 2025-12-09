import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { useBuckets } from '../context/BucketContext.jsx';
import BucketItem from './BucketItem.jsx';

export default function BucketList() {
  const { filteredItems } = useBuckets();
  const list = filteredItems || [];

  if (list.length === 0) {
    return <div className="text-center text-muted py-4">No bucket items yet — add one!</div>;
  }

  return (
    <ListGroup className="bucket-list">
      {list.map(i => <BucketItem key={i.id} item={i} />)}
    </ListGroup>
  );
}
