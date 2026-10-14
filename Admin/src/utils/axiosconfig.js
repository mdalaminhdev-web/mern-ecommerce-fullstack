export const config = {
  headers: {
    get Authorization() {
      try {
        const session = JSON.parse(localStorage.getItem("user") || "null");
        return `Bearer ${session?.token || ""}`;
      } catch { return "Bearer "; }
    },
    Accept: "application/json",
  },
};
