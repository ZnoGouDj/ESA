function* map<TFrom, TTo>(
  generator: Generator<TFrom, any, any>,
  mapFn: (from: TFrom) => TTo
): Generator<TTo, any, any> {
  for (let item of generator) {
    yield mapFn(item)
  }
}

function* filter<TItem>(
  generator: Generator<TItem, any, any>,
  predicate: (item: TItem) => boolean
): Generator<TItem, any, any> {
  for (let item of generator) {
    if (predicate(item)) {
      yield item;
    }
  }
}

const forEach = <TItem>(
  generator: Generator<TItem, any, any>,
  action: (TItem) => void
): void => {
  for (let item of generator) {
    action(item);
  }
}

const head = <TItem>(generator: Generator<TItem, any, TItem>): TItem | null => {
  const next = generator.next();
  if (next.done) {
    return null;
  }

  return next.value;
}

function all<TItem>(
  generator: Generator<TItem, any, TItem>,
  predicate: (item: TItem) => boolean
): boolean {
  for (let item of generator) {
    if (!predicate(item)) {
      return false;
    }
  }

  return true;
}

export type ChainableGenerator<TItem> = {
  map: <TTo>(map: (from: TItem) => TTo) => ChainableGenerator<TTo>;
  filter: (predicate: (from: TItem) => boolean) => ChainableGenerator<TItem>;
  forEach: (act: (item: TItem) => void) => void;
  head: () => TItem | null;
  any: () => boolean;
  all: (predicate: (from: TItem) => boolean) => boolean;
}

export const wrap = <TItem>(generator: Generator<TItem, any, TItem>): ChainableGenerator<TItem> =>
  ({
    map: (mapFn) => wrap(map(generator, mapFn)),
    filter: (predicate) => wrap(filter(generator, predicate)),
    forEach: (action) => forEach(generator, action),
    head: () => head(generator),
    any: () => !generator.next().done,
    all: (predicate) => all(generator, predicate)
  });
