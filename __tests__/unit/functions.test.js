const { interpolate } = require("../../src/util/presentation/Constants");

describe("Interpolate object replace placeholder", () => {
  it("tranform object in placeholder request", async () => {
    const placed = interpolate("{{ }}", "Eduardo {{sub}}", {
      sub: "Melo",
    });

    expect(placed).toEqual("Eduardo Melo");
  });
});
