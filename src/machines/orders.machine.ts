import { assign, createActor, setup } from 'xstate';

export const orderDetailsMachine = setup({
  types: {} as {
    context: {
      territories: any[];
      platforms: any[];
    };
    events:
      | { type: 'order.territories.update'; data: { territories: any[] } }
      | { type: 'order.platforms.update'; data: { platforms: any[] } };
  },
}).createMachine({
  id: 'order-details',
  context: () => ({
    territories: [],
    platforms: [],
  }),
  initial: 'idle',
  states: {
    idle: {
      on: {
        'order.territories.update': {
          actions: assign({
            territories: ({ event }) => event.data.territories,
          }),
        },
        'order.platforms.update': {
          actions: assign({ platforms: ({ event }) => event.data.platforms }),
        },
      },
    },
  },
});

export const orderDetailsActor = createActor(orderDetailsMachine, {
  input: {},
});

orderDetailsActor.start();
