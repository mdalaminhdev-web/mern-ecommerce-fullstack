export const base_url = process.env.REACT_APP_API_URL || "http://localhost:5000/api/";
export const config = {
  headers: {
    get Authorization() {
      try {
        const session = JSON.parse(localStorage.getItem("customer") || "null");
        return `Bearer ${session?.token || ""}`;
      } catch { return "Bearer "; }
    },
    Accept: "application/json",
  },
};
