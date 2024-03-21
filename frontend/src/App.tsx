import { Suspense, useState } from "react";
import { requestGet } from "./api";
import { Contact, ContactListProps } from "./type";

function App() {
  return (
    <>
      <h1>Contacts</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <ContactListSuspense />
      </Suspense>
    </>
  );
}

function ContactListSuspense() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [order, setOrder] = useState(false);

  const handlePrevPageClick = () => {
    setPage((page) => page - 1);
  };

  const handleNextPageClick = () => {
    setPage((page) => page + 1);
  };

  const handleLimitChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setLimit(Number(event.target.value));
  };

  const handleOrderChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setOrder(event.target.value === "true");
  };

  return (
    <>
      <div>
        <button onClick={handlePrevPageClick} disabled={page === 1}>
          前へ
        </button>
        <button onClick={handleNextPageClick}>次へ</button>
        <form action="">
          <input type="number" onChange={handleLimitChange} value={limit} min={1} />
        </form>
        <div>
          <input type="radio" id="asc" name="order" value="false" onChange={handleOrderChange} />
          <label htmlFor="asc">昇順</label>
          <input type="radio" id="desc" name="order" value="true" onChange={handleOrderChange} />
          <label htmlFor="desc">降順</label>
        </div>
      </div>
      <Suspense>{<ContactList page={page} limit={limit} order={order} />}</Suspense>
    </>
  );
}

function ContactList({ page, limit, order }: ContactListProps) {
  // const contacts = getContacts();
  const contacts = requestGet<Contact[]>(
    `/contacts?page=${page}&limit=${limit}&order=${order ? "desc" : "asc"}`
  );
  return (
    <ul>
      {contacts.map((contact) => (
        <li key={contact.id}>
          <div style={{ color: "blue" }}>
            {contact.name} | {contact.email}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default App;
