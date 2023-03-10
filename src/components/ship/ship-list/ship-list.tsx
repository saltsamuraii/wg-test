import React, { useState, useEffect } from 'react';
import { Ship } from '../ship';
import { ShipCard } from '../ship-card';
import { Pagination } from '../../pagination';

import './ship-list.css';

interface ShipListProps {
  ships: Ship[];
  isLoading: boolean;
}

export default function ShipList({ ships, isLoading }: ShipListProps) {
  const [displayedShips, setDisplayedShips] = useState<Ship[]>([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [shipsPerPage] = useState(6);

  useEffect(() => {
    setDisplayedShips(
      ships.slice(pageNumber * shipsPerPage, (pageNumber + 1) * shipsPerPage)
    );
  }, [pageNumber, shipsPerPage, ships]);

  const pageCount = Math.ceil(ships.length / shipsPerPage);

  const handlePageChange = (selected: number) => {
    setPageNumber(selected);
  };

  if (isLoading) return <h1>Loading...</h1>;
  if (displayedShips.length <= 0) return <h2>No ships found...</h2>;

  return (
    <section className="ship_list_container">
      <ul className="ship_list">
        {displayedShips.map((ship) => (
          <ShipCard
            ship={ship}
            key={ship.id}
          />
        ))}
      </ul>
      <Pagination
        pageCount={pageCount}
        onPageChange={handlePageChange}
      />
    </section>
  );
}
