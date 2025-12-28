import { useMemo, useState } from 'react';

export default function useSort(items = [], initial = 'date') {
  const [sortBy, setSortBy] = useState(initial);
  const [order, setOrder] = useState('desc');

  const sortedTasks = useMemo(() => {
    if (!Array.isArray(items)) return [];
    const copy = [...items];
    copy.sort((a, b) => {
      if (sortBy === 'name') {
        return order === 'asc'
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      }
      // default: date
      return order === 'asc'
        ? new Date(a.createdAt) - new Date(b.createdAt)
        : new Date(b.createdAt) - new Date(a.createdAt);
    });
    return copy;
  }, [items, sortBy, order]);

  const toggleOrder = () => setOrder((o) => (o === 'asc' ? 'desc' : 'asc'));

  return { sortedTasks, sortBy, setSortBy, sortOrder: order, toggleSortOrder: toggleOrder };
}
