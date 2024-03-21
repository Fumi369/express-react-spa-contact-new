export type Contact = {
  id: number;
  email: string;
  name: string;
};

export type ContactListProps = {
  page: number;
  limit: number;
  order: boolean;
};
