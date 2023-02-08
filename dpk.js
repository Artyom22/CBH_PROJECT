const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";

  if (!event) {
    return TRIVIAL_PARTITION_KEY;
  }

  if (event.partitionKey) {
    const candidate = stringifyIfNeeded(event.partitionKey);

    return createNewKeyIfExceedsMaxLength(candidate);
  }

  const data = JSON.stringify(event);
  const candidate = createHashKey(data);

  return createNewKeyIfExceedsMaxLength(candidate);
};

function stringifyIfNeeded(candidate) {
  if (typeof candidate === "string") {
    return candidate;
  }

  return JSON.stringify(candidate);
}

function createNewKeyIfExceedsMaxLength(candidate) {
  const MAX_PARTITION_KEY_LENGTH = 256;

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    return createHashKey(candidate);
  }

  return candidate;
}

function createHashKey(data) {
  return crypto.createHash("sha3-512").update(data).digest("hex");
}

