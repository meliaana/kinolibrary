import { useCallback, useEffect, useState } from 'react';
import { MainContent } from '../MainContent';
import { OrderItem } from '../OrderItem';
import { PrimitivePagination } from '../PrimitivePagination';
import { SearchInput } from '../SearchInput';
import styles from './OrdersContent.module.css';

const OrdersContent = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const PAGE_SIZE = 10;

  const [pageIndex, setPageIndex] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const fetchOrders = useCallback(async (page: number) => {
    setLoading(true);
    const ctrl = new AbortController();
    try {
      const res = await fetch(
        `/api/orders?page=${page}&pageSize=${PAGE_SIZE}`,
        {
          signal: ctrl.signal,
        },
      );
      if (!res.ok) throw new Error(`Failed to fetch orders: ${res.status}`);
      const data: any = await res.json();

      setOrders(data.items ?? []);
      setTotalPages(Math.max(1, data.totalPages ?? 1));
      setTotalCount(data.totalCount ?? 0);
    } catch (err) {
      if ((err as any)?.name !== 'AbortError') {
        console.error(err);
        setOrders([]);
        setTotalPages(1);
        setTotalCount(0);
      }
    } finally {
      setLoading(false);
    }
    return () => ctrl.abort();
  }, []);

  useEffect(() => {
    fetchOrders(pageIndex);
    console.log(pageIndex);
  }, [pageIndex]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/orders');
        if (!response.ok) throw new Error('Failed to fetch orders');
        const data = await response.json();
        setOrders(data.items);
        console.log(data.items);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <MainContent title="Orders">
      <SearchInput />
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

      <PrimitivePagination
        currentPage={pageIndex}
        totalPages={totalPages}
        onPageChange={(page) => setPageIndex(page)}
        prevLabel="❮"
        nextLabel="❯"
        className={styles.pagination}
      />
    </MainContent>
  );
};

export default OrdersContent;
