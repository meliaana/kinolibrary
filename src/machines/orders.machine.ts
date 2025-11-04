import { assign, createActor, fromPromise, setup } from 'xstate';

export const orderDetailsMachine = setup({
  types: {} as {
    context: {
      orderId: number | null;
      orderDetails: any;
      orderClips: any;
      projectName: string | null;
      error?: string | null;
    };
    events:
      | { type: 'order.details.load' }
      | { type: 'order.clips.load' }
      | { type: 'order.projectName.load' }
      | { type: 'order.details.update.orderId'; data: { orderId: number } }
      | { type: 'order.details.clear' };
  },
  actors: {
    fetchOrderDetails: fromPromise(
      async ({ input }: { input: { orderId: number } }) => {
        const res = await fetch(`/api/orders/${input.orderId}/details`);
        if (!res.ok) throw new Error('Failed to fetch order details');
        return res.json();
      },
    ),
    fetchOrderClips: fromPromise(
      async ({ input }: { input: { orderId: number } }) => {
        const res = await fetch(`/api/orders/${input.orderId}/clips`);
        if (!res.ok) throw new Error('Failed to fetch order clips');
        return res.json();
      },
    ),
    fetchProjectName: fromPromise(
      async ({ input }: { input: { orderId: number } }) => {
        const res = await fetch(`/api/orders/${input.orderId}`);
        if (!res.ok) throw new Error('Failed to fetch project name');
        return res.json();
      },
    ),
  },
  actions: {
    setOrderDetails: assign({
      orderDetails: ({ event }) => (event as any).output,
      error: () => null,
    }),
    setOrderClips: assign({
      orderClips: ({ event }) => (event as any).output,
      error: () => null,
    }),
    setProjectName: assign(({ event }) => {
      const output = (event as any).output;

      return {
        projectName: output?.projectName,
        error: null,
      };
    }),
    setError: assign({
      error: ({ event }) => (event as any).error?.message ?? 'Unknown error',
    }),
    clearData: assign({
      orderDetails: () => null,
      orderClips: () => null,
      projectName: () => null,
      error: () => null,
    }),
  },
}).createMachine({
  id: 'order-details',
  context: () => ({
    orderId: null,
    orderDetails: null,
    orderClips: null,
    error: null,
    projectName: null,
  }),
  initial: 'idle',
  states: {
    idle: {
      on: {
        'order.projectName.load': { target: 'loadingProjectName' },
        'order.details.load': { target: 'loadingDetails' },
        'order.clips.load': { target: 'loadingClips' },
      },
    },
    loadingDetails: {
      invoke: {
        src: 'fetchOrderDetails',
        input: ({ context }) => {
          if (context.orderId == null) throw new Error('orderId is not set');
          return { orderId: context.orderId };
        },
        onDone: {
          actions: 'setOrderDetails',
          target: 'loaded',
        },
        onError: {
          actions: 'setError',
          target: 'idle',
        },
      },
    },
    loadingClips: {
      invoke: {
        src: 'fetchOrderClips',
        input: ({ context }) => {
          if (context.orderId == null) throw new Error('orderId is not set');
          return { orderId: context.orderId };
        },
        onDone: {
          actions: 'setOrderClips',
          target: 'loaded',
        },
        onError: {
          actions: 'setError',
          target: 'idle',
        },
      },
    },
    loadingProjectName: {
      invoke: {
        src: 'fetchProjectName',
        input: ({ context }) => {
          if (context.orderId == null) throw new Error('orderId is not set');
          return { orderId: context.orderId };
        },
        onDone: {
          actions: 'setProjectName',
          target: 'loaded',
        },
        onError: {
          actions: 'setError',
          target: 'idle',
        },
      },
    },
    loaded: {
      on: {
        'order.details.load': { target: 'loadingDetails' },
        'order.clips.load': { target: 'loadingClips' },
        'order.details.clear': { actions: 'clearData' },
      },
    },
  },
  on: {
    'order.details.update.orderId': {
      actions: assign({
        orderId: ({ event }) => event.data.orderId,
      }),
    },
  },
});

export const orderDetailsActor = createActor(orderDetailsMachine, {
  input: {},
});
orderDetailsActor.start();
