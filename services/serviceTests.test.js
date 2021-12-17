import { getHistory } from "./database/searchHistory.js";
import chai from "chai";

describe("Test database get history call", () => {
  it("should return appropriate array structure", async () => {
    const historyRes = await getHistory();
    chai.expect(historyRes).to.be.an("array");
  });

  it("should contain history items", async() => {
    const historyRes = await getHistory();
    chai.expect(historyRes.length).to.be.greaterThan(0);
  })
});
