const crypto = require("crypto");

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;
const HASH_ALGORITHM = "sha3-512";
const ENCODING = "hex";

function deterministicPartitionKey (event) {
  let candidate;
  if (event) {
    if (event.partitionKey) {
      candidate = event.partitionKey;
    } else {
      // for the case when event is not object having partitionKey
      const data = JSON.stringify(event);
      candidate = crypto.createHash(HASH_ALGORITHM).update(data).digest(ENCODING);
    }
  }

  if (candidate) {
    // when candidate is not string
    if (typeof candidate !== "string") {
      candidate = JSON.stringify(candidate);
    }
  } else {
    candidate = TRIVIAL_PARTITION_KEY;
  }
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    // following will reduce candidate's length lesser than MAX_PARTITION_KEY_LENGTH
    candidate = crypto.createHash(HASH_ALGORITHM).update(candidate).digest(ENCODING);
  }
  return candidate;
};

exports.deterministicPartitionKey = deterministicPartitionKey;