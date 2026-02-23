console.clear();

const base = "http://localhost:3333";

const functions = {
  async getProduct() {
    const response = await fetch(base + "/curso/nodejs-fundamentos");
    const body = await response.json();
    console.table(body);
  },
};

functions[process.argv[2]]?.();
