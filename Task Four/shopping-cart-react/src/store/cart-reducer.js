export const initialState = {
  items: [],       // [{id, name, price, quantity}]
  isCartOpen: false,
  toastMessage: ""
};

export function cartReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_CART":
      return { ...state, isCartOpen: !state.isCartOpen };

    case "ADD_ITEM": {
      const { item } = action.payload;
      const existingIndex = state.items.findIndex((it) => it.id === item.id);

      let updatedItems;
      if (existingIndex > -1) {
        updatedItems = state.items.map((it, idx) =>
          idx === existingIndex ? { ...it, quantity: it.quantity + item.quantity } : it
        );
      } else {
        updatedItems = [...state.items, item];
      }

      return { ...state, items: updatedItems };
    }

    case "REMOVE_ITEM": {
      const id = action.payload.id;
      const existing = state.items.find((it) => it.id === id);
      if (!existing) return state;

      let updatedItems;
      if (existing.quantity === 1) {
        updatedItems = state.items.filter((it) => it.id !== id);
      } else {
        updatedItems = state.items.map((it) =>
          it.id === id ? { ...it, quantity: it.quantity - 1 } : it
        );
      }

      return { ...state, items: updatedItems };
    }

    case "CLEAR_CART":
      return { ...state, items: [] };

    case "SHOW_TOAST":
      return { ...state, toastMessage: action.payload };

    case "HIDE_TOAST":
      return { ...state, toastMessage: "" };

    default:
      return state;
  }
}
