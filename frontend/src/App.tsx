import { Suspense } from "react";
import { getContacts } from "./api";

function App() {
  return (
    <>
      <h1>Contacts</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <ContactList />
      </Suspense>
    </>
  );
}

function ContactList() {
  const contacts = getContacts();

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
