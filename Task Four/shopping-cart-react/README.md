# Implementation Report — React Shopping Cart

## Objective
I have used React demonstrating context, reducers, portals, and refs to create the cart.

## What I implemented
- `CartProvider` this consists of (Context + useReducer) — which is used to holds items, modal open flag and toast message.
- Reducer actions: ADD_ITEM, REMOVE_ITEM, CLEAR_CART, TOGGLE_CART, SHOW_TOAST, HIDE_TOAST.
- Components:
  - `Header` here added two components cart button and item count.
  - `Meals`  showing 20 meals with images in 2 coulunm format.
  - `MealItem` with quantity input (forwardRef) and Add button.
  - `Cart` shown in a modal using a portal.
  - `Toast` auto-disappearing notification when item added.
- Styling: responsiveness is added.

## Challenges
- Ensuring reducer never returns partial state — always return full object.
- Toast timing — used a ref to clear previous timers.
- Keeping UI calm while staying readable.

## Extensions
- Persist cart to localStorage.
- Add product categories, filters, or a search bar.
- Add checkout/payment integration.


This Folder Consists of Submission for the Task Given in Module 8