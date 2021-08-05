# Code examples

A value in cache has a key (string) which is used to set that value into that cache, and as well as to retrieve it later on, via get methods.

In the below examples all keys will be represented by the string `"cache-key"` and the value will be represented by the variable name `foo`.

## Store a value by key

```ts
await set("cache-key", foo);
```

## Store an object by key for one minute

```ts
const ONE_MINUTE = 60;
await setTTL("cache-key", foo, ONE_MINUTE);
```

## Retrieve a value by key

```ts
await get("cache-key")
```

We can also use a generic to statically type the return value of get:

```ts
await get<User>("cache-key")
```

## Get or Set

Sometimes, we want to retrieve data from storage that takes a lot of time, for example from disk or via the internet. In such cases we might want to look whether the data is in cache and if not we want to retrieve the data from storage and add it into the cache for later use.

To achieve this we can use `getOrSet`.

```ts
await getOrSet("cache-key", async () => {
    return Users.findOne(...);
});

```

This method takes a cache key, and a call back which fetches the data if the value is not in cache. The `getOrSet` function will in that case store the value in cache after retrieving it

## Get or Set for one minute

The above Get or Set function can be replaced with `getOrSetTTL` to add a time to live field, like so.

```ts
const ONE_MINUTE = 60;
await getOrSet("cache-key", ONE_MINUTE, async () => {
    return Users.findOne(...);
});
```
