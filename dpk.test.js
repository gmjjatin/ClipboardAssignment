const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns 'test' when partitionKey is test", () => {
    const trivialKey = deterministicPartitionKey({ partitionKey: "test" });
    expect(trivialKey).toBe("test");
  });

  it("Returns the string type when empty object is passed", () => {
    const trivialKey = deterministicPartitionKey({});
    expect(typeof trivialKey).toBe('string');
  });
});
