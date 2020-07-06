import { RequestHandler } from 'express';

import { Item } from '../models/Item';

type ItemId = {
  id: string;
};

const Items: Item[] = [];

export const createItem: RequestHandler = (req, res, next) => {
  const text = (req.body as { text: string }).text;
  const newItem = new Item(Math.random().toString(16).slice(2), text);

  Items.push(newItem);

  res.status(201).json({ message: 'New item created', createdItem: newItem });
};

export const getItems: RequestHandler = (req, res, next) => {
  res.json({ items: Items });
};

export const getItem: RequestHandler<ItemId> = (req, res, next) => {
  const id = req.params.id;
  const item = Items.find((item) => item.id === id);

  if (!item) {
    throw new Error('Item could not be found');
  }

  res.status(201).json({ item: item });
};

export const updateItem: RequestHandler<ItemId> = (req, res, next) => {
  const id = req.params.id;
  const updatedText = (req.body as { text: string }).text;
  const itemIndex = Items.findIndex((item) => item.id === id);

  if (itemIndex < 0) {
    throw new Error('Item could not be found');
  }

  Items[itemIndex] = new Item(Items[itemIndex].id, updatedText);

  res
    .status(201)
    .json({ message: 'Item was updated', updatedItem: Items[itemIndex] });
};

export const deleteItem: RequestHandler<ItemId> = (req, res, next) => {
  const id = req.params.id;

  const itemIndex = Items.findIndex((item) => item.id === id);

  if (itemIndex < 0) {
    throw new Error('Item could not be found');
  }

  Items.splice(itemIndex, 1);

  res.status(201).json({ message: 'Item deleted' });
};
