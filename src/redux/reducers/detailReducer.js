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
      let company = state.company;
      company.push(action.payload);
      return { ...state, company: company };
    case "DELETE_DETAIL":
      const detailFilter = state.company.filter((detail) =>
        detail.id === action.payload ? null : detail
      );
      return { ...state, company: detailFilter };
    case "UPDATE_DETAIL":
      const detailUpdate = state.company.filter((detail) =>
        detail.id === action.payload.id
          ? Object.assign(detail, action.payload)
          : detail
      );
      return { ...state, company: detailUpdate };
    case "RESET_DETAIL":
      state = initialState;
      return state;
    case "COMPANY_FILTER":
      return { ...state, filters: { search: action.payload } };
    default:
      return state;
  }
};