const initialState = {
  connected: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
      case "setConnected": {
          console.log("######");
          return state;
      }
      default: {
          return state;
      }
  };
};
