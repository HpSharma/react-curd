const initialState = {
  company: [],
  filters: {
    search: [],
    sort: []
  }
};

initialState.company = [
  { id: 0, company: "ABC", office: "London", employees: 10, international: "True" },
  { id: 1, company: "XYZ", office: "India", employees: 40, international: "False" },
];

export const detailReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_DETAIL":
      console.log(action);
      state.company.push(action.payload)
      state = { ...state };
      return state;
    case "DELETE_DETAIL":
      const detailFilter = state.company.filter((detail) =>
        detail.id === action.payload ? null : detail
      );
      state.company = detailFilter;
      return state;
    case "UPDATE_DETAIL":
      const detailUpdate = state.company.filter((detail) =>
        detail.id === action.payload.id
          ? Object.assign(detail, action.payload)
          : detail
      );
      state.company = detailUpdate;
      return state;
    case "RESET_DETAIL":
      state = initialState;
      return state;
    case "COMPANY_FILTER":
      console.log(state.filters.search);
      state.filters.search = action.payload;
      console.log(state.filters.search);
      console.log({state});
      return state;
    default:
      return state;
  }
};