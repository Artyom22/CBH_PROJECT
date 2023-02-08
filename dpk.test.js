const { deterministicPartitionKey } = require("./dpk");
const crypto = require("crypto");

jest.mock("crypto", () => ({
  createHash: jest.fn(() => undefined),
}));

describe("deterministicPartitionKey", () => {
  let cryptoSpy;

  beforeAll(() => {
    cryptoSpy = jest.spyOn(crypto, "createHash");
  });

  afterEach(() => {
    cryptoSpy.mockClear();
  });

  it("Returns the literal '0' when given no input", () => {
    // Setup & Execution
    const trivialKey = deterministicPartitionKey();

    // Validation
    expect(trivialKey).toBe("0");
    expect(cryptoSpy).not.toBeCalled();
  });

  it("Returns the partitionKey when given an input with string partitionKey", () => {
    // Setup & Execution
    const trivialKey = deterministicPartitionKey({ partitionKey: "testKey" });

    // Validation
    expect(trivialKey).toBe("testKey");
    expect(cryptoSpy).not.toBeCalled();
  });

  it("Returns the stringified partitionKey when given an input with partitionKey that is not a string", () => {
    // Setup & Execution
    const trivialKey = deterministicPartitionKey({ partitionKey: { a: "testKey" } });

    // Validation
    expect(trivialKey).toBe('{"a":"testKey"}');
    expect(cryptoSpy).not.toBeCalled();
  });

  it("Returns a key created by crypto when given an input with partitionKey that exceeds the max length", () => {
    // Setup
    const maxLengthString = "a".repeat(257);
    givenKeyCreated("testString");

    // Execution
    const trivialKey = deterministicPartitionKey({ partitionKey: maxLengthString });

    // Validation
    expect(trivialKey).toBe("testString");
    thenCryptoFunctionsWereCalledWith(maxLengthString);
  });

  it("Returns a key created by crypto when given an input without partitionKey", () => {
    // Setup
    givenKeyCreated("testString");

    // Execution
    const trivialKey = deterministicPartitionKey({});

    // Validation
    expect(trivialKey).toBe("testString");
    thenCryptoFunctionsWereCalledWith("{}");
  });

  it("Returns a key created by crypto when given a string input", () => {
    // Setup
    givenKeyCreated("testString");

    // Execution
    const trivialKey = deterministicPartitionKey("123");

    // Validation
    expect(trivialKey).toBe("testString");
    thenCryptoFunctionsWereCalledWith('"123"');
  });

  it("Returns a key created by crypto when the first created key by crypto exceeds the max length", () => {
    // Setup
    const maxLengthString = "a".repeat(257);
    const hash1 = givenKeyCreatedOnce(maxLengthString);
    const hash2 = givenKeyCreatedOnce("testString2");

    // Execution
    const trivialKey = deterministicPartitionKey({});

    // Validation
    expect(trivialKey).toBe("testString2");
    thenCryptoFunctionsWereCalledOnceWith("{}", hash1);
    thenCryptoFunctionsWereCalledOnceWith(maxLengthString, hash2);
  });

  function givenKeyCreated(response) {
    const hash = {
      update: jest.fn().mockReturnThis(),
      digest: jest.fn().mockReturnValue(response),
    };
    cryptoSpy.mockImplementation(() => hash);
  }

  function givenKeyCreatedOnce(response) {
    const hash = {
      update: jest.fn().mockReturnThis(),
      digest: jest.fn().mockReturnValueOnce(response),
    };
    cryptoSpy.mockImplementationOnce(() => hash);

    return hash;
  }

  function thenCryptoFunctionsWereCalledWith(data) {
    expect(cryptoSpy).toBeCalledWith("sha3-512");
    expect(cryptoSpy().update).toBeCalledWith(data);
    expect(cryptoSpy().digest).toBeCalledWith("hex");
  }

  function thenCryptoFunctionsWereCalledOnceWith(data, hash) {
    expect(cryptoSpy).toHaveBeenNthCalledWith(1, "sha3-512");
    expect(hash.update).toHaveBeenNthCalledWith(1, data);
    expect(hash.digest).toHaveBeenNthCalledWith(1, "hex");
  }
});
