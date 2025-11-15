import { useCallback, useEffect, useState } from 'react';
import { useApiFetch } from '../../hooks/useApiFetch';
import { AddNewOrderDialog } from '../AddNewOrderDialog';
import { MainContent } from '../MainContent';
import { OrderItem } from '../OrderItem';
import { PrimitivePagination } from '../PrimitivePagination';
import { SearchInput } from '../SearchInput';
import styles from './OrdersList.module.css';

const OrdersList = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const PAGE_SIZE = 10;

  const [pageIndex, setPageIndex] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const apiFetch = useApiFetch();

  const [search, setSearch] = useState('');

  const fetchOrders = useCallback(
    async (page: number, keyword?: string) => {
      setLoading(true);

      try {
        const url =
          `/api/orders?page=${page}` +
          `&pageSize=${PAGE_SIZE}` +
          (keyword ? `&keyword=${encodeURIComponent(keyword)}` : '');

        const response = await apiFetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();

        setOrders(data.items ?? []);
        setTotalPages(Math.max(1, data.totalPages ?? 1));
        setTotalCount(data.totalCount ?? 0);
      } catch (err: any) {
        console.error(err);
        setOrders([]);
        setTotalPages(1);
        setTotalCount(0);
      } finally {
        setLoading(false);
      }
    },
    [apiFetch],
  );

  useEffect(() => {
    fetchOrders(pageIndex, search);
  }, [pageIndex]);

  useEffect(() => {
    const fetchInitialOrders = async () => {
      try {
        const response = await fetch('/api/orders');
        if (!response.ok) throw new Error('Failed to fetch orders');
        const data = await response.json();
        setOrders(data.items);
      } catch (error) {
        console.error(error);
      }
    };

    fetchInitialOrders();
  }, []);

  function handleSearch(value: string) {
    setPageIndex(1);
    setSearch(value);
    fetchOrders(1, value);
  }

  return (
    <MainContent title="Orders">
      <div className={styles.header}>
        <SearchInput
          value={search}
          onChange={setSearch}
          onSubmit={handleSearch}
        />
        <AddNewOrderDialog />
      </div>
      <ul className={styles.ordersList}>
        <li className={styles.ordersListHeader}>
          <span>Job Number</span>
          <span>Sales Person</span>
          <span>Client Name</span>
          <span>Order Status</span>
          <span>Number of Clips</span>
          <span>Actions</span>
        </li>
        {orders.map((order) => (
          <OrderItem key={order.id} order={order} />
        ))}
      </ul>

      {orders.length > 0 && (
        <PrimitivePagination
          currentPage={pageIndex}
          totalPages={totalPages}
          onPageChange={(page) => setPageIndex(page)}
          prevLabel="❮"
          nextLabel="❯"
          className={styles.pagination}
        />
      )}
    </MainContent>
  );
};

export default OrdersList;
