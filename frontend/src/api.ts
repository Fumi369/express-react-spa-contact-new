import { Contact } from "./type";

const wrapPromise = <T>(promise: Promise<T>) => {
  let status = "pending";
  let result: T;
  let suspender = promise.then(
    (r) => {
      status = "success";
      result = r;
    },
    (e) => {
      status = "error";
      result = e;
    }
  );
  return {
    read(): T {
      if (status === "pending") {
        throw suspender;
      } else if (status === "error") {
        throw result;
      } else if (status === "success") {
        return result;
      } else {
        throw new Error("unreachable");
      }
    },
  };
};

export const request = async <T>(
  path: string,
  init?: RequestInit
): Promise<T> => {
  const ret = await fetch(`http://localhost:8000/${path}`, init);
  if (!ret.ok) {
    throw new Error("Request failed");
  }
  return (await ret.json()) as T;
};

const suspended: Record<string, { read: () => unknown }> = {};

export const generateSuspended = <T>(
  promiseBuilder: () => Promise<T>,
  key: string
) => {
  return () => {
    if (suspended[key] === undefined) {
      suspended[key] = wrapPromise(promiseBuilder());
    }
    return suspended[key].read() as T;
  };
};

const apiPort = 8000;

export const requestGetContacts = async () => {
  const ret = await fetch(`http://localhost:${apiPort}/contacts`);
  if (!ret.ok) {
    throw new Error("Request failed");
  }
  return (await ret.json()) as Contact[];
};

export const getContacts = generateSuspended(
  requestGetContacts,
  "requestGetContacts"
);
